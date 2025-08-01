import React from 'react';
import { CalendarDays, UserCheck, Calendar, CalendarCheck as ConfirmedCalendar, Award, Users2 } from 'lucide-react';

const Step3 = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4">
            <div className="wizard-form-section">
                <h3><CalendarDays className="w-4 h-4 mr-2 text-slate-500" />Audit Schedule</h3>
                <div className="wizard-grid md:grid-cols-2 lg:grid-cols-4">
                    <div className="wizard-input-group">
                        <label htmlFor="proposed_start_date"><Calendar className="w-3 h-3 mr-1.5 text-slate-400" />Proposed Start Date</label>
                        <input type="date" id="proposed_start_date" name="proposed_start_date" value={formData.proposed_start_date || ''} onChange={handleChange} />
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="proposed_end_date"><Calendar className="w-3 h-3 mr-1.5 text-slate-400" />Proposed End Date</label>
                        <input type="date" id="proposed_end_date" name="proposed_end_date" value={formData.proposed_end_date || ''} onChange={handleChange} />
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="confirmed_start_date"><ConfirmedCalendar className="w-3 h-3 mr-1.5 text-slate-400" />Confirmed Start Date *</label>
                        <input type="date" id="confirmed_start_date" name="confirmed_start_date" value={formData.confirmed_start_date} onChange={handleChange} required />
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="confirmed_end_date"><ConfirmedCalendar className="w-3 h-3 mr-1.5 text-slate-400" />Confirmed End Date *</label>
                        <input type="date" id="confirmed_end_date" name="confirmed_end_date" value={formData.confirmed_end_date} onChange={handleChange} required />
                    </div>
                </div>
            </div>
            <div className="wizard-form-section">
                <h3><UserCheck className="w-4 h-4 mr-2 text-slate-500" />Audit Team</h3>
                <div className="wizard-grid md:grid-cols-2">
                    <div className="wizard-input-group">
                        <label htmlFor="lead_auditor"><Award className="w-3 h-3 mr-1.5 text-slate-400" />Lead Auditor *</label>
                        <select id="lead_auditor" name="lead_auditor" value={formData.lead_auditor} onChange={handleChange} required>
                            <option value="">Select Lead Auditor...</option>
                            <option value="Sakthivel G">Sakthivel G</option>
                            <option value="Jane Smith">Jane Smith</option>
                            <option value="John Doe">John Doe</option>
                        </select>
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="audit_team"><Users2 className="w-3 h-3 mr-1.5 text-slate-400" />Other Auditors / SMEs</label>
                        <input type="text" id="audit_team" name="audit_team" value={formData.audit_team || ''} onChange={handleChange} placeholder="Comma-separated names" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3;