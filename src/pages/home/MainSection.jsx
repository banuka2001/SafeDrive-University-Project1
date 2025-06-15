import React from 'react';
import "../../styles/MainSection.css";


const MainSection = () => {
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

  return (
    <section className="container py-3">
      <div className="row text-center mb-5">
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
                  Get home in your own vehicle, no need for pickup later
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-warning me-2"></i>
                  Secure payment and tracking through our app
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container py-5">
        <div className="row text-center mb-5">
          <div className="col">
            <h2 className="fw-bold display-5 my-5">Key Features</h2>
            <p className="fs-4 text-muted mt-3">
              Our platform is designed with your safety and convenience in mind,
              offering a comprehensive solution to prevent drunk driving.
            </p>
          </div>
        </div>

        <div className="row gy-4">
          {[
            {
              icon: 'bi-person-check-fill',
              title: 'Secure Registration',
              description:
                'Create your account with verified phone number and email for maximum security and peace of mind.',
            },
            {
              icon: 'bi-calendar-check',
              title: 'Driver Scheduling',
              description:
                'Book immediately or schedule in advance with our flexible booking system that adapts to your plans.',
            },
            {
              icon: 'bi-file-earmark-text',
              title: 'Vehicle Submission',
              description:
                'Easily upload your vehicle details and driving license for quick verification and seamless service.',
            },
            {
              icon: 'bi-qr-code-scan',
              title: 'QR Verification',
              description:
                "Scan your driver's unique QR code to confirm identity before starting your journey for added security.",
            },
            {
              icon: 'bi-credit-card',
              title: 'Card-Only Payments',
              description:
                'Cashless transactions only, ensuring transparency, security and convenience for every ride.',
            },
            {
              icon: 'bi-chat-dots',
              title: 'In-App Messaging',
              description:
                'Communicate directly with your driver through our secure in-app messaging system for coordination.',
            },
          ].map((feature, index) => (
            <div className="col-lg-4 col-md-6 mt-5" key={index}>
              <div className="card h-100 shadow card-popup border-0 rounded-4 p-3">
                <div className="card-body">
                  <div className="mb-3">
                    <i
                      className={`bi ${feature.icon} text-primary`}
                      style={{ fontSize: '2rem' }}
                    ></i>
                  </div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container py-5">
        <div className="row text-center mb-5">
          <div className="col">
            <h2 className="fw-bold display-5">How It Works</h2>
            <p className="fs-5 text-muted">
              Simple steps to get started with our ride service platform
            </p>
          </div>
        </div>

        {/* For Customers */}
        <div className="text-center mb-5">
          <h2 className="fw-bold pb-3">For Customers</h2>
          <p className="text-muted pb-3">Get home safely in your own vehicle</p>
        </div>
        
        <div className="row justify-content-center align-items-start gy-5">
          {customerSteps.map((step, index) => (
            <React.Fragment key={`customer-step-${index}`}>
              <div className="col-lg-3 col-md-4 col-12 text-center">
                <div className="mb-3">
                  <div className="step-icon-wrapper mx-auto" style={{ backgroundColor: step.bgColor }}>
                    <i className={`${step.icon} text-white`} style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
                <h4 className="fw-bold pt-3">{step.title}</h4>
                <p className="text-muted fs-4 small mb-0">{step.description}</p>
              </div>
              {index < customerSteps.length - 1 && (
                <div className="col-auto d-none d-lg-flex align-items-center" style={{ height: '80px' }}>
                    <i className="bi bi-arrow-right text-muted fs-2"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* For Drivers */}
        <div className="text-center mb-5 mt-5 pt-5">
          <h2 className="fw-bold pb-3">For Drivers</h2>
          <p className="text-muted pb-5">Earn money by helping customers get home safely</p>
        </div>

        <div className="row justify-content-center align-items-start gy-5">
          {driverSteps.map((step, index) => (
            <React.Fragment key={`driver-step-${index}`}>
              <div className="col-lg-3 col-md-4 col-12 text-center">
                <div className="mb-3">
                  <div className="step-icon-wrapper mx-auto" style={{ backgroundColor: step.bgColor }}>
                    <i className={`${step.icon} text-white`} style={{ fontSize: '2.5rem' }}></i>
                  </div>
                </div>
                <h4 className="fw-bold pt-3">{step.title}</h4>
                <p className="text-muted fs-4 small mb-0">{step.description}</p>
              </div>
              {index < driverSteps.length - 1 && (
                <div className="col-auto d-none d-lg-flex align-items-center" style={{ height: '80px' }}>
                    <i className="bi bi-arrow-right text-muted fs-2"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Ready to Get Started */}
        <div className="row mt-5 pt-5">
          <div className="col">
            <div className="text-white rounded-4 p-5 text-center" style={{ backgroundColor: '#5865F2' }}>
              <h2 className="fw-bold">Ready to Get Started?</h2>
              <p className="fs-5 my-4">
                Register our platform today and experience the convenience of safe rides home
              </p>
              <a href="#" className="btn btn-warning btn-lg rounded-pill px-5 py-3 fw-bold shadow-sm d-inline-flex align-items-center register-btn-hover">
                Register Now
                <i className="bi bi-arrow-right-circle ms-3" style={{ fontSize: '2rem' }}></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection; 