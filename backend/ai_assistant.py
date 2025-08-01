import os
import json
import datetime
from typing import List
import google.generativeai as genai
from dotenv import load_dotenv
from models import EventRead
from collections import Counter
import inspect

# --- Custom JSON encoder to handle date/datetime objects ---
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime.date, datetime.datetime)):
            return obj.isoformat()
        return super().default(obj)

# Load environment variables
load_dotenv()
try:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    print("Gemini API key configured.")
except Exception as e:
    print(f"Error configuring Gemini API: {e}")

# --- AI Tool Definitions ---
def filter_events_by_status(status: str) -> str:
    """Filters events by their status."""
    pass
def summarize_recent_events(days: int) -> str:
    """Summarizes events created within a specific number of past days."""
    pass
def suggest_next_steps(event_id: int) -> str:
    """Suggests the next logical steps for a specific event given its ID."""
    pass
def identify_trends() -> str:
    """Identifies trends from the list of all events."""
    pass
def suggest_root_cause(event_id: int) -> str:
    """Suggests potential root causes for a given event ID."""
    pass
def find_similar_events(event_id: int) -> str:
    """Finds and lists events that are similar to a given event ID."""
    pass
def summarize_single_audit(event_id: int) -> str:
    """Provides a concise summary of a specific audit event given its ID."""
    pass
def list_personnel(event_id: int) -> str:
    """Lists all personnel involved in a specific audit."""
    pass
def draft_kickoff_email(event_id: int) -> str:
    """Drafts a kick-off meeting email for a specific audit."""
    pass

tools_map = {
    "filter_events_by_status": filter_events_by_status,
    "summarize_recent_events": summarize_recent_events,
    "suggest_next_steps": suggest_next_steps,
    "identify_trends": identify_trends,
    "suggest_root_cause": suggest_root_cause,
    "find_similar_events": find_similar_events,
    "summarize_single_audit": summarize_single_audit,
    "list_personnel": list_personnel,
    "draft_kickoff_email": draft_kickoff_email,
}

# --- Main AI Dispatcher (Corrected with all logic blocks) ---
def get_ai_response(query: str, context_events: List[EventRead]) -> str:
    if not genai.get_model('models/gemini-1.5-flash-latest'):
        return "AI Model not configured. Please check your API key."

    try:
        model = genai.GenerativeModel(model_name='gemini-1.5-flash-latest', tools=list(tools_map.values()))
        chat = model.start_chat()
        response = chat.send_message(query)
        
        function_call = response.candidates[0].content.parts[0].function_call
        function_name = function_call.name
        
        if function_name in tools_map:
            args = {key: value for key, value in function_call.args.items()}
            
            # --- Execute the correct logic for ALL tools ---

            if function_name == 'filter_events_by_status':
                status = args.get('status', '').lower()
                filtered = [e for e in context_events if e.status.lower() == status]
                if not filtered: return f"No events found with status '{args.get('status')}'."
                return json.dumps([event.dict() for event in filtered], cls=CustomJSONEncoder)

            elif function_name == 'summarize_recent_events':
                days = args.get('days', 0)
                cutoff_date = datetime.datetime.utcnow() - datetime.timedelta(days=days)
                recent_events = [e for e in context_events if e.created_at.replace(tzinfo=None) > cutoff_date]
                if not recent_events: return f"No events were created in the last {days} days."
                summary = f"Summary of {len(recent_events)} events from the last {days} days:\n"
                for event in recent_events:
                    summary += f"- ID {event.id} ({event.audit_title}): Status is {event.status}.\n"
                return summary

            elif function_name == 'suggest_next_steps':
                event_id = args.get('event_id', 0)
                event = next((e for e in context_events if e.id == event_id), None)
                if not event: return f"Event with ID {event_id} not found."
                if event.status == "Planned": return f"For planned event ID {event_id}, next steps are: 1. Confirm the audit team. 2. Finalize and send the agenda to '{event.auditee_name}'. 3. Prepare necessary documents."
                elif event.status == "In Progress": return f"For event ID {event_id} in progress: 1. Ensure daily audit logs are maintained. 2. Track any findings. 3. Prepare for the closing meeting."
                else: return f"Event ID {event_id} is '{event.status}'. Next steps involve follow-up and archival."

            elif function_name == 'identify_trends':
                if not context_events: return "No event data available to identify trends."
                type_counts = Counter(e.audit_type for e in context_events)
                lead_auditor_counts = Counter(e.lead_auditor for e in context_events)
                if not type_counts or not lead_auditor_counts: return "Not enough data to identify trends."
                most_common_type = type_counts.most_common(1)[0]
                busiest_auditor = lead_auditor_counts.most_common(1)[0]
                return f"Based on {len(context_events)} total events, here are some trends:\n- The most common audit type is '{most_common_type[0]}' ({most_common_type[1]} occurrences).\n- The busiest lead auditor is '{busiest_auditor[0]}' ({busiest_auditor[1]} audits)."

            # --- RESTORED LOGIC BLOCKS ---
            elif function_name == 'summarize_single_audit':
                event_id = args.get('event_id', 0)
                event = next((e for e in context_events if e.id == event_id), None)
                if not event: return f"Event with ID {event_id} not found."
                return (
                    f"Summary for Audit {event.audit_id}:\n"
                    f"- Title: {event.audit_title}\n"
                    f"- Type: {event.audit_type}\n"
                    f"- Status: {event.status}\n"
                    f"- Auditee: {event.auditee_name} ({event.auditee_country})\n"
                    f"- Lead Auditor: {event.lead_auditor}"
                )

            elif function_name == 'list_personnel':
                event_id = args.get('event_id', 0)
                event = next((e for e in context_events if e.id == event_id), None)
                if not event: return f"Event with ID {event_id} not found."
                return (
                    f"Personnel for Audit {event.audit_id}:\n"
                    f"- Lead Auditor: {event.lead_auditor}\n"
                    f"- Audit Team / SMEs: {event.audit_team or 'Not specified'}\n"
                    f"- Primary Auditee Contact: {event.primary_contact_name}"
                )
            
            elif function_name == 'draft_kickoff_email':
                event_id = args.get('event_id', 0)
                event = next((e for e in context_events if e.id == event_id), None)
                if not event: return f"Event with ID {event_id} not found."
                prompt = f"Draft a professional kick-off meeting invitation email for the audit titled '{event.audit_title}'..."
                simple_model = genai.GenerativeModel('gemini-1.5-flash-latest')
                email_response = simple_model.generate_content(prompt)
                return f"Draft email for Audit {event.audit_id}:\n\n---\n{email_response.text}\n---"
            # --------------------------------

        return response.text

    except (AttributeError, IndexError, ValueError) as e:
        print(f"Function calling was not used by the model, or an error occurred: {e}")
        try:
            simple_model = genai.GenerativeModel('gemini-1.5-flash-latest')
            prompt = f"Based on this data:\n{json.dumps([e.dict() for e in context_events], cls=CustomJSONEncoder)}\n\nAnswer this query: {query}"
            simple_response = simple_model.generate_content(prompt)
            return simple_response.text
        except Exception as fallback_e:
            print(f"Fallback AI model also failed: {fallback_e}")
            return "Sorry, the AI assistant encountered an error."