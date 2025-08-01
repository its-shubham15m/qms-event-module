import React from 'react';
import { LayoutDashboard, ClipboardCheck, Truck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const SubNavigation = () => {
    return (
        <div className="sub-navigation-container">
            <nav className="sub-nav">
                <NavLink to="/dashboard" className="sub-nav-item">
                    <LayoutDashboard />Dashboard
                </NavLink>
                <NavLink to="/" end className={({ isActive }) => `sub-nav-item ${isActive ? 'active' : ''}`}>
                    <ClipboardCheck />Audit Management
                </NavLink>
                <NavLink to="/suppliers" className="sub-nav-item">
                    <Truck />Suppliers
                </NavLink>
            </nav>
        </div>
    );
};

export default SubNavigation;