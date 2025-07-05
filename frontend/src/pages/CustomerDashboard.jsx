import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        <Card.Body>
          <Card.Title>Customer Dashboard</Card.Title>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          
          {customerData ? (
            <div>
              <Card.Text>
                Hello {customerData.username}
              </Card.Text>
              {renderRoleSwitcher()}
            </div>
          ) : (
            !loading && !error && <Card.Text>No customer data to display.</Card.Text>
          )}

        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerDashboard; 