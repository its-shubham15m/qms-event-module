from sqlmodel import Field, SQLModel
from typing import Optional
import datetime

class EventBase(SQLModel):
    # This is the custom, human-readable ID we will generate
    audit_id: Optional[str] = Field(default=None, unique=True, index=True)
    
    # All other event fields
    audit_title: str
    audit_type: str
    audit_scope: str
    audit_objective: str
    auditee_name: str
    auditee_site_location: str
    auditee_country: str
    primary_contact_name: str
    primary_contact_email: Optional[str] = None
    proposed_start_date: Optional[datetime.date] = None
    proposed_end_date: Optional[datetime.date] = None
    confirmed_start_date: datetime.date
    confirmed_end_date: datetime.date
    lead_auditor: str
    audit_team: Optional[str] = None
    audit_criteria: str
    audit_agenda: Optional[str] = None
    status: str = "Planned"


class Event(EventBase, table=True):
    # The primary key for the database is still a simple integer
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)


class EventCreate(EventBase):
    pass


class EventRead(EventBase):
    id: int
    created_at: datetime.datetime