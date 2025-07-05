import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/MainSection.css";

const MainSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/check_session.php', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUserRoles(data.roles || []);
        } else {
          setIsAuthenticated(false);
          setUserRoles([]);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setIsAuthenticated(false);
        setUserRoles([]);
      }
    };

    checkSession();
  }, []);

  const handleRegisterNow = () => {
    if (isAuthenticated && userRoles.length > 0) {
      // User is logged in - navigate to their dashboard
      if (userRoles.length === 1) {
        navigate(`/${userRoles[0]}-dashboard`);
      } else {
        // Multiple roles - navigate to role selection
        navigate('/role-selection', { state: { roles: userRoles } });
      }
    } else {
      // User not logged in - go to registration
      navigate('/register');
    }
  };

  const cardData = [
    {
      icon: 'bi bi-bullseye',
      title: 'Our Mission',
      description:
        'To eliminate drunk driving accidents in Sri Lanka by providing a reliable alternative that keeps both drivers and communities safe.',
    },
    {
      icon: 'bi bi-lightbulb',
      title: 'Our Solution',
      description:
        'Professional drivers who come to your location and drive you home in your own vehicle, ensuring both you and your car arrive safely.',
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Our Impact',
      description:
        'Thousands of safe rides completed, contributing to a significant reduction in DUI incidents across Sri Lanka.',
    },
  ];

  const customerSteps = [
    {
      icon: 'bi bi-person-plus-fill',
      title: 'Create Account',
      description: 'Register and verify your identity',
      bgColor: '#007AFF',
    },
    {
      icon: 'bi bi-car-front-fill',
      title: 'Book a Driver',
      description: 'Request a driver to your location',
      bgColor: '#5AC8FA',
    },
    {
      icon: 'bi bi-house-door-fill',
      title: 'Arrive Safely',
      description: 'Get home in your own vehicle',
      bgColor: '#34C759',
    },
  ];

  const driverSteps = [
    {
      icon: 'bi bi-person-vcard-fill',
      title: 'Register as Driver',
      description: 'Submit details and complete verification',
      bgColor: '#AF52DE',
    },
    {
      icon: 'bi bi-bell-fill',
      title: 'Accept Requests',
      description: 'Get notified when customers need rides',
      bgColor: '#007AFF',
    },
    {
      icon: 'bi bi-currency-dollar',
      title: 'Earn Money',
      description: 'Provide the service and earn income',
      bgColor: '#30D158',
    },
  ];

  // Key Features data
  const features = [
    {
      icon: 'bi bi-person-check',
      title: 'Secure Registration',
      description: 'Create your account with verified phone number and email for maximum security and peace of mind.'
    },
    {
      icon: 'bi bi-calendar-check',
      title: 'Driver Scheduling',
      description: 'Book immediately or schedule in advance with our flexible booking system that adapts to your plans.'
    },
    {
      icon: 'bi bi-file-earmark',
      title: 'Vehicle Submission',
      description: 'Easily upload your vehicle details and driving license for quick verification and seamless service.'
    },
    {
      icon: 'bi bi-qr-code',
      title: 'QR Verification',
      description: 'Scan your driver\'s unique QR code to confirm identity before starting your journey for added security.'
    },
    {
      icon: 'bi bi-credit-card',
      title: 'Card-Only Payments',
      description: 'Cashless transactions only, ensuring transparency, security and convenience for every ride.'
    },
    {
      icon: 'bi bi-chat-dots',
      title: 'In-App Messaging',
      description: 'Communicate directly with your driver through our secure in-app messaging system for coordination.'
    },
  ];

  return (
    <section className="py-3">
      <div className="container">
        {/* Key Features Section */}
        <div className="row text-center mt-5 mb-5">
          <div className="col">
            <h2 className="fw-bold display-4 mb-4" id="features">Key Features</h2>
            <p className="fs-4 text-muted mb-5 mt-3">
              Our platform is designed with your safety and convenience in mind, offering a comprehensive solution to prevent drunk driving.
            </p>
          </div>
        </div>
        <div className="row g-4 justify-content-center mb-5">
          {features.map((feature, idx) => (
            <div className="col-12 col-md-6 col-lg-4 d-flex" key={idx}>
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 flex-fill text-start feature-card">
                <div className="mb-3">
                  <i className={`${feature.icon} text-primary`} style={{ fontSize: '2.2rem' }}></i>
                </div>
                <h5 className="fw-bold mb-2">{feature.title}</h5>
                <p className="mb-0 text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row text-center mt-5 mb-5">
          <div className="col">
            <h2 className="fw-bold display-5">
              What is <span style={{ color: '#0D6EFD' }}>Safe</span>
              <span style={{ color: '#FFC107' }}>Drive</span>?
            </h2>
            <p className="fs-4 text-muted mb-5 mt-5">
              Safe Drive is Sri Lanka's premier transportation safety platform
              dedicated to preventing drunk driving accidents by connecting users
              with professional drivers.
            </p>
          </div>
        </div>

        <div className="row gy-4">
          {cardData.map((card, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card h-100 shadow card-popup border-0 rounded-4">
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i className={`${card.icon} text-primary`} style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3">{card.title}</h5>
                  <p className="card-text text-muted">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5 pt-5 gy-4">
          {/* Problem Card */}
          <div className="col-lg-6">
            <div className="card h-100 shadow border-0 rounded-4 p-3">
              <div className="card-body">
                <div className="mb-3">
                  <i
                    className="bi bi-exclamation-triangle-fill text-danger"
                    style={{ fontSize: '2rem' }}
                  ></i>
                </div>
                <h4 className="fw-bold">The Problem</h4>
                <p className="text-muted">
                  Drunk driving remains one of the leading causes of road
                  accidents in Sri Lanka, resulting in preventable injuries and
                  fatalities each year.
                </p>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center mb-2">
                    <i className="bi bi-x-circle-fill text-danger me-2"></i>
                    Over 30% of fatal accidents involve alcohol
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <i className="bi bi-x-circle-fill text-danger me-2"></i>
                    Limited safe transportation options at night
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bi bi-x-circle-fill text-danger me-2"></i>
                    Concern about leaving vehicles behind
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Solution Card */}
          <div className="col-lg-6">
            <div className="card h-100 shadow border-0 rounded-4 p-3">
              <div className="card-body">
                <div className="mb-3">
                  <i
                    className="bi bi-check2-all text-primary"
                    style={{ fontSize: '2rem' }}
                  ></i>
                </div>
                <h4 className="fw-bold text-black-50">Our Solution</h4>
                <p className="text-muted">
                  Safe Drive provides on-demand professional drivers who come to
                  you and drive both you and your vehicle home safely.
                </p>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center mb-2">
                    <i className="bi bi-check-circle-fill text-warning me-2"></i>
                    Vetted, professional drivers available 24/7
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <i className="bi bi-check-circle-fill text-warning me-2"></i>
                    Drive your own vehicle home safely
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-warning me-2"></i>
                    Affordable, transparent pricing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="row mt-5 pt-5">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold display-5">How It Works</h2>
            <p className="fs-4 text-muted">
              Simple steps to get you home safely
            </p>
          </div>
        </div>

        {/* Customer Steps */}
        <div className="row mb-5 align-items-center justify-content-center">
          <div className="col-12">
            <h3 className="text-center mb-5">For Customers</h3>
            <p className="text-center text-muted mb-5">Get home safely in your own vehicle</p>
          </div>
          {customerSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column align-items-center">
                <div className="text-center w-100">
                  <div 
                    className="step-icon-wrapper mx-auto mb-3"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <i className={`${step.icon} text-white`} style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{step.title}</h5>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
              {/* Add arrow between steps, but not after the last step */}
              {index < customerSteps.length - 1 && (
                <div className="col-lg-1 d-none d-lg-flex justify-content-center align-items-center">
                  <i className="bi bi-arrow-right" style={{ fontSize: '2rem', color: '#222' }}></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Driver Steps */}
        <div className="row mb-5 align-items-center justify-content-center">
        <div className="col-12">
            <h3 className="text-center mb-5">For Drivers</h3>
          </div>
          {driverSteps.map((step, index) => (
              <React.Fragment key={index}>
              <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column align-items-center">
              <div className="text-center w-100">
                <div 
                  className="step-icon-wrapper mx-auto mb-3"
                  style={{ backgroundColor: step.bgColor }}
                >
                  <i className={`${step.icon} text-white`} style={{ fontSize: '2rem' }}></i>
                </div>
                <h5 className="fw-bold mb-2">{step.title}</h5>
                <p className="text-muted">{step.description}</p>
              </div>
            </div>
            {/* Add arrow between steps, but not after the last step */}
            {index < driverSteps.length - 1 && (
                <div className="col-lg-1 d-none d-lg-flex justify-content-center align-items-center">
                  <i className="bi bi-arrow-right" style={{ fontSize: '2rem', color: '#222' }}></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Section */}
        <div className="row mt-5 pt-5">
          <div className="col-12 text-center">
            <div className="cta-section">
              <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
              <p className="fs-5 mb-4">
                Register our platform today and experience the convenience of safe rides home
              </p>
              <button 
                onClick={handleRegisterNow}
                className="cta-register-btn"
              >
                Register Now
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection; 