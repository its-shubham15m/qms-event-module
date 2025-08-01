from sqlmodel import create_engine, SQLModel
import os

DATABASE_FILE = "qms_events.db"
DATABASE_URL = f"sqlite:///{DATABASE_FILE}"

engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})

def create_db_and_tables():
    """Initializes the database and creates tables if they don't exist."""
    if not os.path.exists(DATABASE_FILE):
        print("Creating database and tables...")
        SQLModel.metadata.create_all(engine)
        print("Database and tables created.")
    else:
        print("Database already exists.")