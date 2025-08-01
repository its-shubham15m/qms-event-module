import React from 'react';
import { FileCheck2, Target, Edit3, Tags, ScanSearch, Flag } from 'lucide-react';

const Step1 = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4">
            <div className="wizard-form-section">
                <h3><FileCheck2 className="w-4 h-4 mr-2 text-slate-500" />Audit Definition</h3>
                <div className="wizard-grid md:grid-cols-2">
                    <div className="wizard-input-group">
                        <label htmlFor="audit-title"><Edit3 className="w-3 h-3 mr-1.5 text-slate-400" />Audit Title *</label>
                        <input type="text" id="audit-title" name="audit_title" value={formData.audit_title} onChange={handleChange} placeholder="e.g., Annual GMP Audit of Facility X" required />
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="audit-type"><Tags className="w-3 h-3 mr-1.5 text-slate-400" />Audit Type *</label>
                        <select id="audit-type" name="audit_type" value={formData.audit_type} onChange={handleChange} required>
                            <option value="">Select Type...</option>
                            <option value="Internal">Internal (Self-Inspection)</option>
                            <option value="Supplier/Vendor">Supplier / Vendor</option>
                            <option value="Regulatory">Regulatory Agency</option>
                            <option value="CRO">CRO / Partner</option>
                            <option value="For-Cause">For-Cause</option>
                            <option value="Pre-Approval Inspection (PAI)">Pre-Approval Inspection (PAI)</option>
                            <option value="Surveillance">Surveillance</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="wizard-form-section">
                <h3><Target className="w-4 h-4 mr-2 text-slate-500" />Scope & Objective</h3>
                <div className="wizard-input-group">
                    <label htmlFor="audit-scope"><ScanSearch className="w-3 h-3 mr-1.5 text-slate-400" />Audit Scope *</label>
                    <textarea id="audit-scope" name="audit_scope" value={formData.audit_scope} onChange={handleChange} rows="3" placeholder="Define the areas, processes, products..." required></textarea>
                </div>
                <div className="wizard-input-group">
                    <label htmlFor="audit-objective"><Flag className="w-3 h-3 mr-1.5 text-slate-400" />Audit Objective *</label>
                    <textarea id="audit-objective" name="audit_objective" value={formData.audit_objective} onChange={handleChange} rows="3" placeholder="Describe the purpose of the audit..." required></textarea>
                </div>
            </div>
        </div>
    );
};

export default Step1;