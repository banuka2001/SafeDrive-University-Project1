import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          <Card.Title>Driver Dashboard</Card.Title>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          
          {driverData ? (
            <div>
              <Card.Text>
                Hello {driverData.username}
              </Card.Text>
              {renderRoleSwitcher()}
            </div>
          ) : (
            !loading && !error && <Card.Text>No driver data to display.</Card.Text>
          )}

        </Card.Body>
      </Card>
    </Container>
  );
};

export default DriverDashboard; 