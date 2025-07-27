import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import '../../styles/Trips.css';
import { useNotifications } from '../../context/NotificationContext';
import { DarkModeContext } from '../../context/DarkModeContext';

export default function ScheduleTrip() {
    const navigate = useNavigate();
    const { sendNotification } = useNotifications();
    const { isDarkMode } = useContext(DarkModeContext);

    const [formData, setFormData] = useState({
        pickup: '',
        pickuptown:'',
        destination: '',
        datetime: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [selectedDriverId, setSelectedDriverId] = useState('');

    const sanitizeInput = (input) => {
    return input
    .replace(/[^a-zA-Z0-9 ,.-]/g, "")  
    .replace(/\s+/g, " ")              
    .trim();                           
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const sanitizedPickup = sanitizeInput(formData.pickup);
        const sanitizedPickuptown = sanitizeInput(formData.pickuptown);
        const sanitizedDestination = sanitizeInput(formData.destination);

        if (!sanitizedPickup || !sanitizedDestination|| !sanitizedPickuptown) {
          setError(" Valid Pickup and Destination are required.");
          return;
        }

        const now = new Date();
        const selected = new Date(formData.datetime);

        if (selected < now) {
            setError("Pickup time must be in the future.");
            return;
        }
        const isSameDay = 
            selected.getDate() === now.getDate() &&
            selected.getMonth() === now.getMonth() &&
            selected.getFullYear() === now.getFullYear();

        if (isSameDay) {
            const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
            if (selected < oneHourLater) {
                setError("Pickup must be at least 1 hour from now.");
                return;
            }
        }

        if(!selectedDriverId){
            setError("Please select a driver.");
            return;
        }
        const driver=availableDrivers.find(d=>d.id===selectedDriverId);

        const tripData = {
            pickup: sanitizedPickup,
            pickuptown: sanitizedPickuptown,
            destination: sanitizedDestination,
            datetime: formData.datetime,
            driverId: selectedDriverId,
        };

        fetch('http://localhost/SafeDrive-University-Project1/backend/api/schedule_trip.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Send cookies with the request
            body: JSON.stringify(tripData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setSuccess(`Trip scheduled successfully with driver ${driver.first_name} ${driver.last_name}`);
                sendNotification({
                    trip: {
                        id: new Date().getTime(),
                        ...tripData,
                        status: 'pending',
                    },
                    driverId: driver.id,
                    driverName: `${driver.first_name} ${driver.last_name}`,
                    message: `New trip request from ${sanitizedPickup} to ${sanitizedDestination} on ${formData.datetime}`,
                });
            } else {
                setError(data.error || 'Failed to schedule trip.');
            }
        })
        .catch(error => {
            console.error('Error scheduling trip:', error);
            setError('An error occurred while scheduling the trip.');
        });
    };

       const handleReset = () => {
        setFormData({
            pickup: '',
            destination: '',
            datetime: ''
        });
        setSelectedDriverId(null);
       }
      

    useEffect(() => {
        if (formData.pickuptown) {
            fetch(`http://localhost/SafeDrive-University-Project1/backend/api/get_available_drivers.php?town=${formData.pickuptown}`)
                .then(response => response.json())
                .then(data => {
                    setAvailableDrivers(data);
                })
                .catch(error => {
                    console.error('Error fetching available drivers:', error);
                });
        } else {
            setAvailableDrivers([]);
        }
    }, [formData.pickuptown]);

    useEffect(() => {
        if (error){
           const timer = setTimeout(() => setError(''), 3000);
           return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className={`container d-flex justify-content-center customer-driver-trip-container${isDarkMode ? ' dark' : ''}`}>
            <div className="w-100" style={{ maxWidth: '600px' }}>
       
            <div className="customer-driver-trip-title mt-3">
                <span className="text-warning fs-2 fw-bold">Shedule</span>
                <span className="text-primary fs-2 fw-bold ms-3">Trips</span>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Pickup Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pickup"
                        value={formData.pickup}
                        onChange={handleChange}
                        placeholder='e.g. Apt 5B, Blue Ocean Building, No. 123, Galle Road, Colombo 03'
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Nearest Town to the Pickup Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pickuptown"
                        value={formData.pickuptown}
                        onChange={handleChange}
                        placeholder='e.g.Colombo'
                        required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Destination</label>
                    <input
                        type="text"
                        className="form-control"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder='e.g. No. 123, Galle Road, Colombo'
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date and Time</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="datetime"
                        value={formData.datetime}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().slice(0, 16)} />
                </div>

                <div className="mt-4">
                   <label className="form-label">Available Drivers </label>
                    {availableDrivers.length>0?(
                    <ul className="list-group mt-3">
                        {availableDrivers.map((driver) => (
                            <li
                                key={driver.id}
                                className={`list-group-item d-flex justify-content-between align-items-center ${selectedDriverId === driver.id ? 'active' : ''}`}
                                onClick={() => setSelectedDriverId(driver.id)}
                            >
                                <div>
                                    <div className="fw-bold">{driver.first_name} {driver.last_name}</div>
                                    <div>Experience: {driver.experience_years} years</div>
                                </div>
                               
                            </li>
                        ))}
                    </ul>
                     ) : (
                   <div className="alert alert-warning mt-3">
                    No available drivers.
                   </div>    
                  )}
                </div>
                <div className="d-flex align-items-center mt-4">
                    <button type="button" className="customer-driver-back-button no-margin-bottom"  onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <div className="ms-auto d-flex gap-2">
                        <button type='reset' className='customer-driver-reset-button' onClick={handleReset}>
                            Reset
                        </button>
                        <button type="submit" className="customer-driver-book-button">
                            Book Trip
                        </button>
                    </div>
                </div>
         </form>   
     </div>
    </div>
              );
            }
              
            
            
            
        
       
  




        