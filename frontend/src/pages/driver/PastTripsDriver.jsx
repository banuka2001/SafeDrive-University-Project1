import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Trips.css';

const mockTrips = [
    {
        id: 'T001',
        pickup: 'Kandy',
        destination: 'Matale',
        datetime: '2025-08-15T15:00:00',
        status: 'completed',
        driver: { id: 'D001', name: 'John Perera' },
        customer: { id: 'C001', name: 'Nimal Perera', phone: '0711234567' }
    },
    {
        id: 'T002',
        pickup: 'Colombo',
        destination: 'Kandy',
        datetime: '2025-08-16T10:00:00',
        status: 'completed',
        driver: { id: 'D001', name: 'John Perera' },
        customer: { id: 'C002', name: 'Erandi Aluvihare', phone: '0714357621' }
    }
];


export default function PastTrips() {
    const navigate = useNavigate();
    const [pastTrips, setPastTrips] = useState([]);

    useEffect(() => {
        // Filter only completed trips
        const completedTrips = mockTrips.filter(trip => trip.status === 'completed');
        setPastTrips(completedTrips);
    }, []);

    return (
        <div className="customer-driver-trip-container mt-5">
            <h2 className="customer-driver-trip-title fw-bold">
                <span className='text-primary'>Past</span>
                <span className='text-warning'> Trips</span>
            </h2>
            {pastTrips.length > 0 ? (
                <ul className="customer-driver-trip-list">
                    {pastTrips.map(trip => (
                        <li key={trip.id} className="customer-driver-trip-item p-4">
                            <p><strong>Customer:</strong> {trip.customer.name}</p>
                            <p><strong>Phone No:</strong> {trip.customer.phone}</p>
                            <p><strong>Pickup:</strong> {trip.pickup}</p>
                            <p><strong>Destination:</strong> {trip.destination}</p>
                            <p><strong>Date:</strong> {new Date(trip.datetime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p><strong>Time:</strong> {new Date(trip.datetime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="alert alert-warning">
                    No past trips available.
                </div>
            )}
            <button className="customer-driver-back-button" onClick={() => navigate(-1)}>
            ← Back
            </button>
        </div>
    );
}