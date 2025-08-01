# In backend/schemas.py
from pydantic import BaseModel
from datetime import date
from typing import Optional

class QMSEventBase(BaseModel):
    # Step 1
    title: str
    event_type: str
    scope: Optional[str] = None
    objective: Optional[str] = None
    
    # Step 2
    auditee_name: Optional[str] = None
    auditee_site_location: Optional[str] = None

    # Step 3
    confirmed_start_date: Optional[date] = None
    confirmed_end_date: Optional[date] = None
    lead_auditor: Optional[str] = None

    # Step 4
    audit_criteria: Optional[str] = None

class QMSEventCreate(QMSEventBase):
    pass

class QMSEvent(QMSEventBase):
    id: int

    class Config:
        from_attributes = True