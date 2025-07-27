import React, { useState, useEffect } from 'react';
import '../styles/DriverNotification.css';

export default function DriverNotifications({ driverId }) {
    const [notifications, setNotifications] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/get_driver_notifications.php', {
                    credentials: 'include'
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
                    throw new Error(errorData.message || 'Failed to fetch notifications');
                }
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Fetch Notifications Error:", error);
                setError('A problem occurred while fetching notifications.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleApprove = async (id) => {
        try {
            const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/approve_trip.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to approve trip');
            }
            setNotifications(notifications.filter(notif => notif.id !== id));
        } catch (error) {
            console.error("Approve Trip Error:", error);
            setError('A problem occurred while approving the trip.');
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/reject_trip.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
                throw new Error(errorData.message || 'Failed to reject trip');
            }
            setNotifications(notifications.filter(notif => notif.id !== id));
        } catch (error) {
            console.error("Reject Trip Error:", error);
            setError('A problem occurred while rejecting the trip.');
        }
    };

    if (loading) {
        return <div className="driver-notifications-container">Loading...</div>;
    }

    if (error) {
        return <div className="driver-notifications-container">Error: {error}</div>;
    }

    if (notifications.length === 0) {
        return <div className="driver-notifications-container">No new notifications.</div>;
    }

    return (
        <div className="driver-notifications-container">
            {notifications.map((notif) => {
                const { id, pickup, pickuptown, destination, datetime, status, customer_name } = notif;
                const [date, time] = datetime.split('T');

                return (
                    <div key={id} className="driver-notifications-card">
                        <div className="driver-notifications-message">
                            <strong>Customer Name:</strong> {customer_name}<span style={{ color: 'red' }}> | </span>
                            <strong>Pickup:</strong> {pickup}, {pickuptown}
                            {!expanded[id] && (
                                <>
                                    <a
                                        href="#"
                                        className="driver-notifications-see-more-link"
                                        onClick={e => { e.preventDefault(); toggleExpand(id); }}
                                        style={{ marginLeft: 8 }}
                                    >
                                        See More
                                    </a>
                                </>
                            )}
                            {expanded[id] && (
                                <>
                                    <span style={{ color: 'red' }}> | </span>
                                    <strong>Destination:</strong> {destination}<span style={{ color: 'red' }}> | </span>
                                    <strong>Date:</strong> {date}<span style={{ color: 'red' }}> | </span>
                                    <strong>Time:</strong> {time}<span style={{ color: 'red' }}> | </span>
                                    <strong>Status:</strong> {status}
                                    <a
                                        href="#"
                                        className="driver-notifications-see-less-link"
                                        onClick={e => { e.preventDefault(); toggleExpand(id); }}
                                        style={{ marginLeft: 8 }}
                                    >
                                        See Less
                                    </a>
                                </>
                            )}
                        </div>
                        {status === 'pending' && (
                            <div className="driver-notifications-buttons">
                                <button
                                    className="driver-notifications-approve-button"
                                    onClick={() => handleApprove(id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="driver-notifications-reject-button"
                                    onClick={() => handleReject(id)}
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}