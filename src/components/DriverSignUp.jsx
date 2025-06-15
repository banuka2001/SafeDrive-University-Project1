import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaCar, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaAddressCard, FaCamera } from 'react-icons/fa';
import FileUpload from './FileUpload';
import '../styles/DriverSignUp.css';

const DriverSignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="driver-signup-container py-5">
      <Container>
        <div className="driver-signup-form">
          <div className="text-center">
            <div className="form-icon-container">
              <FaCar className="car-icon" />
            </div>
            <h2>Driver Registration</h2>
            <p className="text-muted mb-4">Join our platform as a driver</p>
          </div>

          <Form>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <Form.Control type="text" placeholder="Enter your full name" />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email or Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                <Form.Control type="email" placeholder="Email or phone number" />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup className="password-input-group">
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control type={passwordShown ? 'text' : 'password'} placeholder="Create a password" />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {passwordShown ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Row>
              <Col md={6} className="mb-4">
                <Form.Label>Driver's License</Form.Label>
                <FileUpload
                  controlId="driverLicense"
                  uploadText="Click to upload driver's license"
                  subText="PNG, JPG up to 5MB"
                  icon={<FaAddressCard size={30} className="text-muted mb-2" />}
                  accept="image/png, image/jpeg"
                  colProps={{ md: 12 }}
                />
              </Col>
              <Col md={6} className="mb-4">
                <Form.Label>Profile Photo</Form.Label>
                <FileUpload
                  controlId="profilePhoto"
                  uploadText="Click to upload your photo"
                  subText="PNG, JPG up to 5MB"
                  icon={<FaCamera size={30} className="text-muted mb-2" />}
                  accept="image/png, image/jpeg"
                  colProps={{ md: 12 }}
                />
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100 create-account-btn">
              Create Driver Account
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p>Already have an account? <a href="/signin" className="signin-link">Sign in</a></p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DriverSignUp;
