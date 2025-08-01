import React from 'react';
import { ShieldCheck, ListChecks, BookMarked, FileText } from 'lucide-react';

const Step4 = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4">
            <div className="wizard-form-section">
                <h3><ShieldCheck className="w-4 h-4 mr-2 text-slate-500" />Audit Criteria & Standards</h3>
                <div className="wizard-input-group">
                    <label htmlFor="audit_criteria"><BookMarked className="w-3 h-3 mr-1.5 text-slate-400" />Applicable Regulations / Standards *</label>
                    <textarea id="audit_criteria" name="audit_criteria" value={formData.audit_criteria} onChange={handleChange} rows="3" placeholder="List all standards, regulations, guidelines, and internal procedures..." required></textarea>
                </div>
            </div>
            <div className="wizard-form-section">
                <h3><ListChecks className="w-4 h-4 mr-2 text-slate-500" />Audit Agenda</h3>
                <div className="wizard-input-group">
                    <label htmlFor="audit_agenda"><FileText className="w-3 h-3 mr-1.5 text-slate-400" />Audit Plan / Agenda</label>
                    <textarea id="audit_agenda" name="audit_agenda" value={formData.audit_agenda || ''} onChange={handleChange} rows="6" placeholder="Provide a detailed day-by-day plan..."></textarea>
                </div>
            </div>
        </div>
    );
};

export default Step4;