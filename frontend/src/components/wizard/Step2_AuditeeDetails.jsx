import React from 'react';
import { Building2, Users, Factory, MapPin, Globe, User, Mail } from 'lucide-react';

const Step2 = ({ formData, handleChange }) => {
    return (
        <div className="space-y-4">
            <div className="wizard-form-section">
                <h3><Building2 className="w-4 h-4 mr-2 text-slate-500" />Auditee Information</h3>
                <div className="wizard-grid md:grid-cols-3">
                    <div className="wizard-input-group">
                        <label htmlFor="auditee_name"><Factory className="w-3 h-3 mr-1.5 text-slate-400" />Auditee Name / Department *</label>
                        <input type="text" id="auditee_name" name="auditee_name" value={formData.auditee_name} onChange={handleChange} placeholder="e.g., Acme Pharmaceuticals Inc." required />
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="auditee_site_location"><MapPin className="w-3 h-3 mr-1.5 text-slate-400" />Site Location / Address *</label>
                        <input type="text" id="auditee_site_location" name="auditee_site_location" value={formData.auditee_site_location} onChange={handleChange} placeholder="Full address of the facility" required />
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="auditee_country"><Globe className="w-3 h-3 mr-1.5 text-slate-400" />Country *</label>
                        <select id="auditee_country" name="auditee_country" value={formData.auditee_country} onChange={handleChange} required>
                            <option value="">Select Country...</option>
                            <option value="USA">United States</option>
                            <option value="India">India</option>
                            <option value="Germany">Germany</option>
                            <option value="China">China</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Switzerland">Switzerland</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="wizard-form-section">
                <h3><Users className="w-4 h-4 mr-2 text-slate-500" />Key Auditee Contacts</h3>
                <div className="wizard-grid md:grid-cols-2">
                    <div className="wizard-input-group">
                        <label htmlFor="primary_contact_name"><User className="w-3 h-3 mr-1.5 text-slate-400" />Primary Site Contact *</label>
                        <input type="text" id="primary_contact_name" name="primary_contact_name" value={formData.primary_contact_name} onChange={handleChange} placeholder="Name of the main contact" required />
                    </div>
                    <div className="wizard-input-group">
                        <label htmlFor="primary_contact_email"><Mail className="w-3 h-3 mr-1.5 text-slate-400" />Contact Email</label>
                        <input type="email" id="primary_contact_email" name="primary_contact_email" value={formData.primary_contact_email || ''} onChange={handleChange} placeholder="email@example.com" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2;