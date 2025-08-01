import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../features/events/eventsSlice';
import { ClipboardCheck, ArrowLeft, ArrowRight, Save } from 'lucide-react';

import Step1 from '../components/wizard/Step1_Initialization';
import Step2 from '../components/wizard/Step2_AuditeeDetails';
import Step3 from '../components/wizard/Step3_SchedulingTeam';
import Step4 from '../components/wizard/Step4_AuditPlan';
import Step5 from '../components/wizard/Step5_Review';
import WizardStepIndicator from '../components/wizard/WizardStepIndicator';

const CreateEventWizard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        audit_title: '', audit_type: '', audit_scope: '', audit_objective: '',
        auditee_name: '', auditee_site_location: '', auditee_country: '',
        primary_contact_name: '', primary_contact_email: '',
        proposed_start_date: '', proposed_end_date: '',
        confirmed_start_date: '', confirmed_end_date: '',
        lead_auditor: '', audit_team: '', audit_criteria: '', audit_agenda: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value || null }));
    };

    const handleNext = () => { if (currentStep < 5) setCurrentStep(currentStep + 1); };
    const handlePrev = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    // This function will now only be called via an onClick event
    const handleSubmit = async () => {
        const resultAction = await dispatch(createEvent(formData));
        if (createEvent.fulfilled.match(resultAction)) {
            alert('New Audit Logged Successfully!');
            navigate('/');
        } else {
            const errorMessage = resultAction.payload ? JSON.stringify(resultAction.payload.detail) : resultAction.error.message;
            alert(`Failed to create event: ${errorMessage}`);
        }
    };
    
    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1 formData={formData} handleChange={handleInputChange} />;
            case 2: return <Step2 formData={formData} handleChange={handleInputChange} />;
            case 3: return <Step3 formData={formData} handleChange={handleInputChange} />;
            case 4: return <Step4 formData={formData} handleChange={handleInputChange} />;
            case 5: return <Step5 formData={formData} />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="p-1.5 px-2 border-b border-slate-200 bg-white flex justify-between items-center flex-shrink-0">
                <h1 className="text-sm font-semibold text-indigo-700 flex items-center">
                    <ClipboardCheck className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    New Audit Record
                </h1>
                <span className="text-xs text-slate-500">ID: (Generated upon save)</span>
            </div>

            <WizardStepIndicator currentStep={currentStep} />

            <div className="flex-1 overflow-y-auto p-3 bg-slate-50">
                {/* FIX: Removed the onSubmit handler from the form tag */}
                <form id="new-audit-form" noValidate>
                    {renderStep()}
                </form>
            </div>

            <div className="px-3 py-2 border-t border-slate-200 bg-slate-100 flex justify-between items-center flex-shrink-0">
                <button type="button" onClick={handlePrev} disabled={currentStep === 1} className="btn btn-secondary">
                    <ArrowLeft className="w-3 h-3 mr-1" /> Previous
                </button>

                {currentStep < 5 ? (
                    <button type="button" onClick={handleNext} className="btn btn-primary">
                        Next <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                ) : (
                    // FIX: The final button is now type="button" and uses onClick
                    <button type="button" onClick={handleSubmit} className="btn btn-success">
                        <Save className="w-3 h-3 mr-1" /> Log New Audit
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreateEventWizard;