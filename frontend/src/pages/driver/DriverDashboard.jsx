import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import '../../Styles/Dashboard.css';
import DashboardCard from '../../components/DashboardCard';
import DriverNotifications from '../../components/DriverNotifications';
import { DarkModeContext } from '../../context/DarkModeContext';
import '../../styles/Dashboard.css';

// Import images
import viewProfileImg from '../../assets/viewProfile.jpg';
import upcomingTripImg from '../../assets/upcomingTrip.jpg';
import bookingCompletedImg from '../../assets/bookingCompleted.jpg';

const DriverDashboard = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

// ERANDI PART
  const driverId='D001';
    
  
  const [isAvailable,setIsAvailable]=useState(()=>{
    const saved=localStorage.getItem('driverAvailability');
    return saved==='true';
  });

  const cards = [
    { title: 'View Profile', route: '/profile/driver', image: viewProfileImg, color: 'orange'},
    { title: 'Upcoming Trips', route: '/upcoming-trips-driver', image: upcomingTripImg, color: 'skyblue'},
    { title: 'Past Trips', route: '/past-trips-driver', image: bookingCompletedImg, color: 'lightgreen'},
  ];

const toggleAvailability=()=>{
  setIsAvailable(prev=>{
    const newValue=!prev;
    localStorage.setItem('driverAvailability',newValue);
    return newValue;
});

  //Send updated availability to database
}


  

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/get_driver_data.php', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setDriverData(data.data);
        } else if (response.status === 401) {
          setError('Please log in.');
        } else {
          setError(data.error || 'Failed to fetch driver data.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []);

  const renderRoleSwitcher = () => {
    if (!driverData || !driverData.roles) {
      return null;
    }

    const hasCustomerRole = driverData.roles.includes('customer');

    if (hasCustomerRole) {
      return (
        <Button as={Link} to="/customer-dashboard" variant="info" className="mt-3">
          Switch to Customer
        </Button>
      );
    } else {
      return (
        <Button as={Link} to="/register/customer" variant="success" className="mt-3">
          Become a Customer
        </Button>
      );
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          {/* Mobile: Role switcher at top, always occupies space */}
          <div className="d-block d-md-none mb-3 w-100 d-flex justify-content-end align-items-center" style={{ minHeight: '56px' }}>
            {renderRoleSwitcher() || <div style={{ minHeight: '40px' }}></div>}
          </div>
          <div className="d-flex align-items-center mb-0 flex-column flex-md-row" style={{ position: 'relative', minHeight: '48px' }}>
            <div className="flex-grow-1 d-flex justify-content-center order-2 order-md-1 mt-3 mt-md-0">
              <Card.Title className="text-center font-weight-bold mb-4 fs-1" style={{ marginBottom: 0 }}>
                <span className="text-primary">Driver</span>
                <span className="text-warning"> Dashboard</span>
              </Card.Title>
            </div>
            {/* Desktop: Role switcher at right */}
            <div style={{ position: 'absolute', right: 0, top: 0 }} className="d-none d-md-flex w-100 w-md-auto justify-content-end justify-content-md-end">
              {renderRoleSwitcher()}
            </div>
          </div>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {driverData ? (
            <div>
              <Card.Text className="text-center fs-2 fs-md-3 dashboard-welcome-message">
                Welcome {driverData.username}
              </Card.Text>
            </div>
          ) : (
            !loading && !error && <Card.Text>No driver data to display.</Card.Text>
          )}

          <div className="d-flex justify-content-center justify-content-md-end align-items-center mb-3">
            <div className='availability-switch-wrapper d-flex align-items-center gap-3'>
              <span className={`availability-status ${isAvailable ? 'text-success' : 'text-danger'} fs-5`}>
                {isAvailable ? 'Available' : 'Not available'}
              </span>
              <label className='switch'>
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={toggleAvailability}
                />
                <span className={`slider ${isAvailable ? 'available' : 'not-available'}`}></span>
              </label>
            </div>
          </div>
        </Card.Body>

        {/* Responsive dashboard cards */}
        <div className="container">
          <Row className="dashboard-container justify-content-center flex-column flex-md-row gap-3 gap-md-0">
            {cards.map((card, index) => (
              <Col key={index} xs={12} md={4} className="mb-3 mb-md-0 d-flex justify-content-center">
                <DashboardCard
                  title={card.title}
                  route={card.route}
                  image={card.image}
                  color={card.color}
                />
              </Col>
            ))}
          </Row>
        </div>

        <div className='container mt-5'>
          {driverData && <DriverNotifications driverId={driverData.user_id}/>}
        </div>
      </Card>
    </Container>
  );
};

export default DriverDashboard; 