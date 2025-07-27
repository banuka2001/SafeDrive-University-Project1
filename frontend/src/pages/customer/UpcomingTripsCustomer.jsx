import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Trips.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal, Button } from 'react-bootstrap';

export default function UpcomingTrips(){
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState(null);
    const navigate = useNavigate();
   
    useEffect(()=>{
        const fetchUpcomingTrips = async () => {
            try {
                const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/get_upcoming_trips_customer.php', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok) {
                    setUpcomingTrips(data);
                } else {
                    setError(data.error || 'Failed to fetch upcoming trips.');
                }
            } catch (err) {
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingTrips();
    }, []);
     
const handleCancelTrip = async () => {
    console.log('Cancelling trip with ID:', selectedTripId);
    try {
        const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/cancel_trip.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ trip_id: selectedTripId }),
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
            // Remove the cancelled trip from the list
            setUpcomingTrips((prevTrips) => prevTrips.filter(t => t.id !== selectedTripId));
            setShowModal(false);
        } else {
            console.error('Failed to cancel trip:', data.error);
            alert('Failed to cancel trip: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error cancelling trip:', error);
        alert('Error cancelling trip: ' + error.message);
    }
};
    
  

    return(
     
        <div className='customer-driver-trip-container'>
            
            <div className="customer-driver-trip-title mt-3">
              <span className="text-warning fs-2 fw-bold">Upcoming</span>
              <span className="text-primary fs-2 fw-bold" style={{marginLeft: '1rem'}}>Trips</span>
          </div>
            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && upcomingTrips.length>0?(
                <div className='customer-driver-trip-list-wrapper'>
                <ul className='customer-driver-trip-list'>
                    {upcomingTrips.map((trip)=>(
                        trip && (
                        <li key={trip.id} className='customer-driver-trip-item'>
                            <div className="customer-driver-trip-content-row">
                              <div className="customer-driver-trip-details-clean">
                                <div className="customer-driver-trip-route">
                                  <span className="customer-driver-trip-city"><strong>{trip.pickup}</strong></span>
                                  <span className="customer-driver-trip-arrow">→</span>
                                  <span className="customer-driver-trip-city"><strong>{trip.destination}</strong></span>
                                </div>
                                <div className="customer-driver-trip-meta-vertical">
                                  <div className="customer-driver-trip-date">Date: {new Date(trip.datetime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                  <div className="customer-driver-trip-time">Time: {new Date(trip.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                  <div className="customer-driver-trip-driver">Driver: <span className='customer-driver-driver-link' onClick={() => navigate(`/driver/${trip.id}`)}>{trip.driver_first_name} {trip.driver_last_name}</span></div>
                                </div>
                              </div>
                              <div className="customer-driver-trip-action">
                                <button
                                  className="customer-driver-delete-button"
                                  onClick={() => {
                                    setSelectedTripId(trip.id);
                                    setShowModal(true);
                                  }}
                                >
                                  Cancel trip
                                </button>
                              </div>
                            </div>
                        </li>
                        )
                     ))}
                </ul>
                </div>
                ):(
                !loading && !error && <div className='alert alert-info mt-3'>No upcoming trips.</div>
            )}
           
            <button type='button' className="customer-driver-back-button mt-4" onClick={() => navigate(-1)}>
              ← Back
            </button>

       {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this trip?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleCancelTrip}>
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
    
}