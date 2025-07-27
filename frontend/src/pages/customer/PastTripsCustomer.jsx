import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import '../../styles/Trips.css';


// Temporary mock data until database is connected


const mockTrips = [
    { id: 'T001',pickup: 'Colombo',destination: 'Kandy',datetime: '2025-06-20T10:00',status: 'completed',driver: { id: 'D001', name: 'John Perera' }},
    {id: 'T002',pickup: 'Galle',destination: 'Matara',datetime: '2025-06-25T15:30', status: 'completed',driver: { id: 'D001', name: 'John Perera' }}
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
        <div className="container-fluid customer-driver-trip-container py-4">
            <div className="customer-driver-trip-title mt-3">
                <span className="text-warning fs-2 fw-bold">Past</span>
                <span className="text-primary fs-2 fw-bold ms-3">Trips</span>
            </div>
            {pastTrips.length > 0 ? (
                <div className="row g-1 justify-content-center">
                    {pastTrips.map(trip => (
                        <div key={trip.id} className="col-12 col-md-10 col-lg-8">
                            <div className="card shadow-lg customer-driver-trip-item p-4 position-relative">
                                <div className="card-body">
                                    <h4 className="card-title mb-2 fw-bold">{trip.pickup} → {trip.destination}</h4>
                                    <p className="mb-1"><strong>Date:</strong> {new Date(trip.datetime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="mb-1"><strong>Time:</strong> {new Date(trip.datetime).toLocaleTimeString()}</p>
                                    <p className="mb-1"><strong>Driver:</strong> <span className='customer-driver-driver-link ms-1' onClick={()=>navigate(`/driver/${trip.driver.id}`)}>{trip.driver.name}</span></p>
                                </div>
                                <div className="customer-driver-feedbackbutton-wrapper">
                                    <button
                                        className="btn btn-primary customer-driver-feedback-button"
                                        onClick={() => navigate('/rate-trip', { state: { tripId: trip.id, driver: trip.driver, trip: trip } })}
                                    >
                                        Give Feedback
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Back button in a matching column, left-aligned */}
                    <div className="col-12 col-md-10 col-lg-8">
                        <button className="btn btn-dark customer-driver-back-button mt-3" onClick={() => navigate(-1)}>
                            ← Back
                        </button>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning mt-4">
                    No past trips available.
                </div>
            )}
        </div>
    );
}