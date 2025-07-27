import React, { useEffect, useState, useContext } from 'react';
import '../../styles/Trips.css';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';

const UpcomingTrips = () => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchUpcomingTrips = async () => {
      try {
        const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/get_upcoming_trips_driver.php', {
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

  return (
    <div className={`customer-driver-trip-container${isDarkMode ? ' dark' : ''}`}>
      <div className="customer-driver-trip-title mt-3">
        <span className="text-warning fs-2 fw-bold">Upcoming</span>
        <span className="text-primary fs-2 fw-bold" style={{marginLeft: '1rem'}}>Trips</span>
      </div>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && upcomingTrips.length > 0 ? (
        <ul className="customer-driver-trip-list">
          {upcomingTrips.map(trip => (
            <li key={trip.id} className="customer-driver-trip-item">
              <div className="trip-details-container">
                <div className="trip-detail"><strong>Customer:</strong> {trip.customer_name}</div>
                <div className="trip-detail"><strong>Phone No:</strong> {trip.customer_phone}</div>
                <div className="trip-detail"><strong>Pickup:</strong> {trip.pickup}</div>
                <div className="trip-detail"><strong>Destination:</strong> {trip.destination}</div>
                <div className="trip-detail"><strong>Date:</strong> {new Date(trip.datetime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="trip-detail"><strong>Time:</strong> {new Date(trip.datetime).toLocaleTimeString()}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <div className="alert alert-warning">No upcoming trips.</div>
      )}
      <button className="customer-driver-back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default UpcomingTrips;