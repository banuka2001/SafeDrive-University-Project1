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
    <Container className="driver-signup-page py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={6}>
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

            <Row className="g-3">
                <Col md={6} className="mb-3 mb-md-4">
                <Form.Label>Driver's License Front Side</Form.Label>
                <FileUpload
                  controlId="driverLicenseFront"
                  uploadText="Click to upload driver's license front side"
                  subText="PNG, JPG up to 5MB"
                  icon={<FaAddressCard size={30} className="text-muted mb-2" />}
                  accept="image/png, image/jpeg"
                  colProps={{ md: 12 }}
                />
              </Col>
              <Col md={6} className="mb-3 mb-md-4">
                <Form.Label>Driver's License Back Side</Form.Label>
                <FileUpload
                  controlId="driverLicenseBack"
                  uploadText="Click to upload driver's license back side"
                  subText="PNG, JPG up to 5MB"
                  icon={<FaAddressCard size={30} className="text-muted mb-2" />}
                  accept="image/png, image/jpeg"
                  colProps={{ md: 12 }}
                />
              </Col>
              <Col md={6} className="mb-3 mb-md-4">
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

            <Button variant="primary" type="submit" className="w-100 create-account-btn mt-3">
              Create Driver Account
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p>Already have an account? <a href="/signin" className="signin-link">Sign in</a></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DriverSignUp;
