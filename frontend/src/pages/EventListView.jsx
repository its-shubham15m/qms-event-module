import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../features/events/eventsSlice';
import { format } from 'date-fns';
import { PlusCircle, Filter, Eye } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const statusClass = status ? status.toLowerCase().replace(/ /g, '_') : 'cancelled';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
};

const EventListView = () => {
    const dispatch = useDispatch();
    const { events, status, error } = useSelector((state) => state.events);

    // State for Filtering and Sorting
    const [filterText, setFilterText] = useState('');
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'descending' });

    useEffect(() => {
        if (status === 'idle') { dispatch(fetchEvents()); }
    }, [status, dispatch]);

    const formatDate = (dateString) => {
        try { return format(new Date(dateString), 'yyyy-MM-dd'); }
        catch (e) { return "Invalid Date"; }
    };

    // Memoized Sorting and Filtering
    const processedEvents = useMemo(() => {
        let processableEvents = [...events];

        if (filterText) {
            processableEvents = processableEvents.filter(event =>
                (event.audit_id && event.audit_id.toLowerCase().includes(filterText.toLowerCase())) ||
                event.audit_title.toLowerCase().includes(filterText.toLowerCase()) ||
                event.auditee_name.toLowerCase().includes(filterText.toLowerCase())
            );
        }

        if (sortConfig.key) {
            processableEvents.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return processableEvents;
    }, [events, filterText, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const renderTableContent = () => {
        if (status === 'loading') return <tr><td colSpan="9" className="text-center p-4">Loading events...</td></tr>;
        if (status === 'failed') return <tr><td colSpan="9" className="text-center p-4 text-red-600">Error: Could not fetch data.</td></tr>;
        if (processedEvents.length === 0) return <tr><td colSpan="9" className="text-center p-4">No audit events found.</td></tr>;
        
        return processedEvents.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
                {/* --- THIS IS THE CORRECTED LINE --- */}
                {/* Display the full audit_id string from the backend */}
                <td className="linkable font-medium">{event.audit_id}</td>
                {/* ------------------------------------ */}

                <td className="wrap-text">{event.audit_title}</td>
                <td>{event.audit_type}</td>
                <td><StatusBadge status={event.status} /></td>
                <td className="linkable">{event.auditee_name}</td>
                <td>{event.lead_auditor}</td>
                <td>{formatDate(event.confirmed_end_date)}</td>
                <td>{event.auditee_country}</td>
                <td className="action-cell">
                    <button title="View Details"><Eye className="w-4 h-4" /></button>
                </td>
            </tr>
        ));
    };

    return (
        <main className="content-view">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">
                    Audit Management
                </h1>
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowFilterPanel(!showFilterPanel)} className="flex items-center gap-2 px-4 py-2 text-xs font-normal text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50">
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                    <Link to="/create-event" className="flex items-center gap-2 px-4 py-2 text-xs font-normal text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                        <PlusCircle className="w-4 h-4" />
                        <span>Schedule New Audit</span>
                    </Link>
                </div>
            </div>

            {showFilterPanel && (
                <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-md">
                    <input
                        type="text"
                        placeholder="Filter by ID, title, or auditee..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>
            )}

            <div className="content-card">
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('audit_id')} className="cursor-pointer hover:bg-slate-100">Audit ID</th>
                                <th onClick={() => requestSort('audit_title')} className="cursor-pointer hover:bg-slate-100">Title</th>
                                <th onClick={() => requestSort('audit_type')} className="cursor-pointer hover:bg-slate-100">Type</th>
                                <th onClick={() => requestSort('status')} className="cursor-pointer hover:bg-slate-100">Status</th>
                                <th onClick={() => requestSort('auditee_name')} className="cursor-pointer hover:bg-slate-100">Auditee</th>
                                <th onClick={() => requestSort('lead_auditor')} className="cursor-pointer hover:bg-slate-100">Lead Auditor</th>
                                <th onClick={() => requestSort('confirmed_end_date')} className="cursor-pointer hover:bg-slate-100">End Date</th>
                                <th onClick={() => requestSort('auditee_country')} className="cursor-pointer hover:bg-slate-100">Site</th>
                                <th className="action-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableContent()}</tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default EventListView;