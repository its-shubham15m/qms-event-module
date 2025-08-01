import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const SummaryItem = ({ label, value }) => (
    <div>
        <dt className="text-xs font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 text-sm text-slate-900 whitespace-pre-wrap">{value || <span className="italic text-slate-400">Not provided</span>}</dd>
    </div>
);

const Step5 = ({ formData }) => {
    return (
        <div className="wizard-form-section">
            <h3><CheckCircle2 className="w-4 h-4 mr-2 text-slate-500" />Review Audit Details</h3>
            <p className="text-xs text-slate-500 mb-4">Please review all entered information for accuracy before logging the new audit record.</p>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <SummaryItem label="Audit Title" value={formData.audit_title} />
                <SummaryItem label="Audit Type" value={formData.audit_type} />
                <SummaryItem label="Auditee" value={formData.auditee_name} />
                <SummaryItem label="Location" value={formData.auditee_site_location} />
                <SummaryItem label="Country" value={formData.auditee_country} />
                <SummaryItem label="Primary Contact" value={formData.primary_contact_name} />
                <SummaryItem label="Proposed Start Date" value={formData.proposed_start_date} />
                <SummaryItem label="Proposed End Date" value={formData.proposed_end_date} />
                <SummaryItem label="Confirmed Start Date" value={formData.confirmed_start_date} />
                <SummaryItem label="Confirmed End Date" value={formData.confirmed_end_date} />
                <SummaryItem label="Lead Auditor" value={formData.lead_auditor} />
                <SummaryItem label="Team Members" value={formData.audit_team} />
                <div className="md:col-span-2"><SummaryItem label="Scope" value={formData.audit_scope} /></div>
                <div className="md:col-span-2"><SummaryItem label="Objective" value={formData.audit_objective} /></div>
                <div className="md:col-span-2"><SummaryItem label="Criteria" value={formData.audit_criteria} /></div>
                <div className="md:col-span-2"><SummaryItem label="Agenda" value={formData.audit_agenda} /></div>
            </dl>
        </div>
    );
};

export default Step5;