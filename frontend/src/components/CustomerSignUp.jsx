import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaUserPlus, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';
import FileUpload from './FileUpload';
import '../styles/CustomerSignUp.css';

const CustomerSignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const vehicleUploads = [
    { label: "Front View", uploadText: "Click to upload front view", controlId: "formFileFront" },
    { label: "Back View", uploadText: "Click to upload back view", controlId: "formFileBack" },
    { label: "Side View", uploadText: "Click to upload side view", controlId: "formFileSide" },
  ];

  const driverUpload = {
    uploadText: "Click to upload driver photo",
    subText: "Clear front-facing photo required",
    controlId: "formFileDriver",
    icon: <FaUser size={30} className="text-muted mb-2" />
  };

  return (
    <Container className="py-5 px-3">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <div className="text-center mb-5">
            <BsPersonCircle size={50} className="text-primary" />
            <h2 className="mt-2">Customer Registration</h2>
            <p className="text-muted">Create your account to get started with our services</p>
          </div>

          <Form>
            <Row className="mb-4 g-3">
              <Form.Group as={Col} md={6} controlId="formGridFullName">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" />
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridEmail">
                <Form.Label>Email or Phone Number *</Form.Label>
                <Form.Control type="email" placeholder="Email or phone number" />
              </Form.Group>
            </Row>

            <Row className="mb-4 g-3">
              <Form.Group as={Col} md={6} controlId="formGridPassword">
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                  <Form.Control type={passwordShown ? 'text' : 'password'} placeholder="Create a strong password" />
                  <InputGroup.Text onClick={togglePasswordVisibility} style={{cursor: 'pointer'}}>
                    {passwordShown ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md={6} controlId="formGridVehicleNumber">
                <Form.Label>Vehicle Number *</Form.Label>
                <Form.Control type="text" placeholder="Enter vehicle number" />
              </Form.Group>
            </Row>

            <h5 className="mt-5 mb-3">Required Documents</h5>
            
            <h6>Vehicle Photographs *</h6>
            <Row className="mb-4 g-3">
              {vehicleUploads.map((upload) => (
                <FileUpload key={upload.controlId} {...upload} />
              ))}
            </Row>

            <h6>Driver Photograph *</h6>
            <Row className="mb-4 justify-content-center">
                <FileUpload {...driverUpload} colProps={{ md: 6 }} />
            </Row>

            <Button variant="primary" type="submit" className="w-100 py-2 mt-3">
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



