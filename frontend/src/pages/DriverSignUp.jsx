import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaCar, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCamera, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import FileUpload from '../components/FileUpload';
import '../styles/DriverSignUp.css';

const DriverSignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    phone: '',
    experienceYears: '',
    age: '',
    nearestTown: ''
  });
  const [files, setFiles] = useState({
    profilePhoto: null,
    licenseFront: null,
    licenseBack: null
  });
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

  const handleFileSelect = (controlId, file) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [controlId]: file
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?(\d{1,3})?[-. ]?(\(?\d{3}\)?[-. ]?)?(\d{3}[-. ]?)?(\d{4})$/;

    if (!emailRegex.test(formData.emailOrPhone) && !phoneRegex.test(formData.emailOrPhone)) {
      setMessage('Please enter a valid email or phone number.');
      return;
    }

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.emailOrPhone);
    data.append('password', formData.password);
    data.append('phone', formData.phone);
    data.append('experienceYears', formData.experienceYears);
    data.append('age', formData.age);
    data.append('nearestTown', formData.nearestTown);

    for (const key in files) {
      if (files[key]) {
        data.append(key, files[key]);
      } else {
        setMessage(`Error: Please upload the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} image.`);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/driver_signup.php', {
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

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your first name" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your last name" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="emailOrPhone">
              <Form.Label>Email or Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="Email or phone number" 
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup className="password-input-group">
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control 
                  type={passwordShown ? 'text' : 'password'} 
                  placeholder="Create a password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {passwordShown ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
          
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your phone number" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="experienceYears">
                  <Form.Label>Years of Experience</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaStar /></InputGroup.Text>
                    <Form.Control 
                      type="number" 
                      placeholder="e.g., 5" 
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="age">
              <Form.Label>Age</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaUser /></InputGroup.Text>
                <Form.Control 
                  type="number" 
                  placeholder="e.g., 25" 
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="nearestTown">
              <Form.Label>Nearest Town</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaMapMarkerAlt /></InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="e.g., Colombo" 
                  name="nearestTown"
                  value={formData.nearestTown}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Row>
              <Col md={4} className="mb-3">
                <Form.Label>Profile Photo</Form.Label>
                <FileUpload
                  controlId="profilePhoto"
                  uploadText="Click to upload your photo"
                  subText="PNG, JPG"
                  icon={<FaCamera size={30} className="text-muted mb-2" />}
                  accept="image/png, image/jpeg"
                  onFileSelect={(file) => handleFileSelect('profilePhoto', file)}
                  colProps={{ xs: 12 }}
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Driver's License (Front)</Form.Label>
                <FileUpload
                  controlId="licenseFront"
                  uploadText="Upload license front"
                  subText="PNG, JPG"
                  icon={<FaCamera size={30} className="text-muted mb-2" />}
                  accept="image/png, image/jpeg"
                  onFileSelect={(file) => handleFileSelect('licenseFront', file)}
                  colProps={{ xs: 12 }}
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Driver's License (Back)</Form.Label>
                <FileUpload
                  controlId="licenseBack"
                  uploadText="Upload license back"
                  subText="PNG, JPG"
                  icon={<FaCamera size={30} className="text-muted mb-2" />}
                  accept="image/png, image/jpeg"
                  onFileSelect={(file) => handleFileSelect('licenseBack', file)}
                  colProps={{ xs: 12 }}
                />
              </Col>
            </Row>

            {message && <p className="text-center mt-4" style={{ whiteSpace: 'pre-wrap' }}>{message}</p>}

            <Button variant="primary" type="submit" className="w-100 py-3 create-account-btn">
              <FaCar className="me-2" /> Create Account
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p className="signin-link">Already have an account ? <a href="/signin">Sign in</a></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DriverSignUp; 