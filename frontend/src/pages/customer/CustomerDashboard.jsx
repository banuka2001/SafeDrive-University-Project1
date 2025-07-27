import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import Profile from '../../components/ProfileCustomer';
import '../../Styles/Dashboard.css';
import DashboardCard from '../../components/DashboardCard';
import '../../styles/Dashboard.css';


// Import images
import bookingTripImg from '../../assets/bookingTrip.jpg';
import upcomingTripImg from '../../assets/upcomingTrip.jpg';
import bookingCompletedImg from '../../assets/bookingCompleted.jpg';

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ERANDI PART 
  const userName="Erandi";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cards = [
    { title: 'Schedule Trip', route: '/schedule', image: bookingTripImg, color: 'orange'},
    { title: 'Upcoming Trips', route: '/upcoming-trips-customer', image: upcomingTripImg, color: 'skyblue'},
    { title: 'Past Trips', route: '/past-trips-customer', image: bookingCompletedImg, color: 'lightgreen'},
  ];

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/get_customer_data.php', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setCustomerData(data.data);
        } else if (response.status === 401) {
          setError('Please log in.');
        } else {
          setError(data.error || 'Failed to fetch customer data.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const renderRoleSwitcher = () => {
    if (!customerData || !customerData.roles) {
      return null;
    }
    
    const hasDriverRole = customerData.roles.includes('driver');
    
    if (hasDriverRole) {
      return (
        <Button as={Link} to="/driver-dashboard" variant="info" className="mt-3">
          Switch to Driver
        </Button>
      );
    } else {
      return (
        <Button as={Link} to="/register/driver" variant="success" className="mt-3">
          Become a Driver
        </Button>
      );
    }
  };
  
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body className="p-3 p-md-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/profile/customer" className="text-decoration-none">
              <span className="text-primary fs-6 fs-md-5">View Profile</span>
            </Link>
            {renderRoleSwitcher()}
          </div>
          <div className="d-flex align-items-center mb-0 flex-column flex-md-row position-relative" style={{ minHeight: '48px' }}>
            <div className="flex-grow-1 d-flex justify-content-center order-2 order-md-1 mt-3 mt-md-0">
              <Card.Title className="text-center font-weight-bold mb-0 fs-1" style={{ marginBottom: 0 }}>
                <span className="text-primary">Customer</span>
                <span className="text-warning"> Dashboard</span>
              </Card.Title>
            </div>
          </div>

          {/* Welcome message - centered */}
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {customerData ? (
            <div>
              <Card.Text className="p-3 text-center fs-2 fs-md-3 dashboard-welcome-message">
                Welcome {customerData.username}
              </Card.Text>
            </div>
          ) : (
            !loading && !error && <Card.Text>No customer data to display.</Card.Text>
          )}

          {/* View Profile - centered on mobile */}

          {/* Responsive dashboard cards */}
          <div className="dashboard-center-wrapper">
            <Row className="dashboard-container">
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerDashboard; 