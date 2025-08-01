from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
from pydantic import BaseModel

from database import engine, create_db_and_tables
from models import Event, EventCreate, EventRead
from ai_assistant import get_ai_response

# --- App Setup ---
app = FastAPI(
    title="AIVOA QMS API",
    description="API for managing Quality Management System Events."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

def get_session():
    with Session(engine) as session:
        yield session

# --- Helper Function for Custom ID Generation ---
def generate_audit_id(session: Session, event_type: str) -> str:
    """Generates a structured audit ID like AUD-TYPE-001."""
    
    type_code_map = {
        "Internal": "INT",
        "Supplier/Vendor": "SUP",
        "Regulatory": "REG",
        "For-Cause": "FOR",
        "CRO": "CRO",
        "Pre-Approval Inspection (PAI)": "PAI",
        "Surveillance": "SUR",
    }
    type_code = type_code_map.get(event_type, "GEN")
    
    # Count existing audits of the same type to determine the next number
    count = session.query(Event).filter(Event.audit_type == event_type).count()
    next_number = count + 1
    
    # Format the final ID string with 3-digit zero-padding
    return f"AUD-{type_code}-{str(next_number).zfill(3)}"


# --- API Endpoints ---
@app.get("/")
def read_root():
    """Provides a welcome message for the API root."""
    return {"message": "Welcome to the QMS API. Visit /docs for the API documentation."}

@app.post("/api/events", response_model=EventRead, status_code=201)
def create_event(event_data: EventCreate, session: Session = Depends(get_session)):
    """API endpoint to create a new QMS Event."""
    try:
        db_event = Event.from_orm(event_data)
        
        # Generate and assign the new custom ID before saving
        db_event.audit_id = generate_audit_id(session, db_event.audit_type)
        
        session.add(db_event)
        session.commit()
        session.refresh(db_event)
        return db_event
    except Exception as e:
        session.rollback()
        print(f"Error creating event: {e}")
        raise HTTPException(status_code=400, detail="Error creating event.")

@app.get("/api/events", response_model=List[EventRead])
def list_events(session: Session = Depends(get_session)):
    """API endpoint to list all existing QMS Events."""
    events = session.exec(select(Event).order_by(Event.id.desc())).all()
    return events

class AIQuery(BaseModel):
    query: str

@app.post("/api/assist")
def process_ai_query(ai_query: AIQuery, session: Session = Depends(get_session)):
    """API endpoint to handle natural language queries using the AI assistant."""
    all_events = session.exec(select(Event)).all()
    ai_response_text = get_ai_response(query=ai_query.query, context_events=all_events)
    return {"response": ai_response_text}