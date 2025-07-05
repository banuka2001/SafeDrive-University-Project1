import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaUserPlus, FaEye, FaEyeSlash, FaUser, FaCamera } from 'react-icons/fa';
import FileUpload from '../components/FileUpload';
import '../styles/CustomerSignUp.css';

const CustomerSignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileSelect = (file) => {
    setProfilePhoto(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    
    if (profilePhoto) {
      data.append('profilePhoto', profilePhoto);
    } else {
      setMessage(`Error: Please upload your profile photo.`);
      return;
    }

    try {
      const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/customer_signup.php', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Success: ${result.success}`);
      } else {
        setMessage(`Error: ${result.error || result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Container className="py-5 px-3">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <div className="text-center mb-5">
            <FaUserPlus size={50} className="text-primary" />
            <h2 className="mt-2">Customer Registration</h2>
            <p className="text-muted">Create your account to get started with our services</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-4 g-3">
              <Form.Group as={Col} md={6} controlId="formGridFirstName">
                <Form.Label>First Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your first name" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridLastName">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your last name" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-4 g-3">
              <Form.Group as={Col} md={6} controlId="formGridEmail">
                <Form.Label>Email or Phone Number *</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Email or phone number" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridPassword">
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                  <Form.Control 
                    type={passwordShown ? 'text' : 'password'} 
                    placeholder="Create a strong password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility} style={{cursor: 'pointer'}}>
                    {passwordShown ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>

            <h5 className="mt-5 mb-3">Profile Photo</h5>
            <FileUpload
              controlId="profilePhoto"
              uploadText="Click to upload your photo"
              subText="PNG, JPG up to 5MB"
              icon={<FaCamera size={30} className="text-muted mb-2" />}
              accept="image/png, image/jpeg"
              onFileSelect={(file) => handleFileSelect(file)}
            />
            
            {message && <p className="text-center mt-4" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>}

            <Button variant="primary" type="submit" className="w-100 py-2 mt-4">
              <FaUserPlus className="me-2" /> Register as Customer
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p>Already have an account? <a href="/signin">Sign in</a></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerSignUp; 