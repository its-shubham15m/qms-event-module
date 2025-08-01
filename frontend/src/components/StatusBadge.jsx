import React from 'react';

const StatusBadge = ({ status }) => {
    const statusStyles = {
        planned: 'bg-blue-100 text-blue-800',
        'in progress': 'bg-yellow-100 text-yellow-800',
        closed: 'bg-green-100 text-green-800',
        cancelled: 'bg-gray-100 text-gray-800',
    };
    const style = statusStyles[status?.toLowerCase()] || statusStyles.cancelled;
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xxs font-semibold capitalize ${style}`}>
            {status}
        </span>
    );
};

export default StatusBadge;