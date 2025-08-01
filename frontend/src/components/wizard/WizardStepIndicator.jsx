import React from 'react';
import { Check } from 'lucide-react';

const WizardStepIndicator = ({ currentStep }) => {
    const steps = [
        { num: 1, title: 'Initialization', desc: 'Type, Scope & Objective' },
        { num: 2, title: 'Auditee Details', desc: 'Entity & Location' },
        { num: 3, title: 'Scheduling & Team', desc: 'Dates & Personnel' },
        { num: 4, title: 'Audit Plan', desc: 'Criteria & Agenda' },
        { num: 5, title: 'Review & Log', desc: 'Confirm Details' },
    ];

    return (
        <nav aria-label="Progress" className="px-3 py-2 border-b border-slate-200 bg-white overflow-x-auto whitespace-nowrap">
            <ol role="list" className="flex items-center">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.num;
                    const isActive = currentStep === step.num;
                    return (
                        <React.Fragment key={step.num}>
                            <li className="flex items-center">
                                <span className={`
                                    flex items-center justify-center w-5 h-5 rounded-full border-2 font-bold text-xs mt-0.5 shrink-0
                                    ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                                    ${isActive ? 'border-indigo-600 text-indigo-600' : ''}
                                    ${!isCompleted && !isActive ? 'border-slate-300 text-slate-500' : ''}
                                `}>
                                    {isCompleted ? <Check className="w-3 h-3" /> : step.num}
                                </span>
                                <div className="ml-2 hidden md:flex flex-col">
                                    <span className={`text-sm font-semibold 
                                        ${isCompleted ? 'text-green-700' : ''}
                                        ${isActive ? 'text-indigo-700' : ''}
                                        ${!isCompleted && !isActive ? 'text-slate-600' : ''}
                                    `}>
                                        {step.title}
                                    </span>
                                    <span className="text-xs text-slate-500">{step.desc}</span>
                                </div>
                            </li>
                            {/* --- THIS IS THE CORRECTED SEPARATOR --- */}
                            {index < steps.length - 1 && (
                                <li className="text-slate-300 mx-2 self-center text-sm font-light" aria-hidden="true">➔</li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default WizardStepIndicator;