import React from 'react';
import "../styles/MainSection.css";



const HowItWorksSection = () => {
  const customerSteps = [
    {
      icon: 'bi bi-person-plus',
      title: 'Sign Up',
      description: 'Create your account and provide your trip details.',
      bgColor: '#007bff',
    },
    {
      icon: 'bi bi-car-front',
      title: 'Request a Driver',
      description: 'Request a professional driver to drive you home safely.',
      bgColor: '#28a745',
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Enjoy the Ride',
      description: 'Sit back and relax while our driver takes you home in your own car.',
      bgColor: '#ffc107',
    },

  ];

  const driverSteps = [
    {
      icon: 'bi bi-person-badge',
      title: 'Register as Driver',
      description: 'Sign up and complete your driver profile.',
      bgColor: '#6f42c1',
    },
    {
      icon: 'bi bi-geo-alt',
      title: 'Accept Requests',
      description: 'View and accept ride requests from customers.',
      bgColor: '#fd7e14',
    },
    {
      icon: 'bi bi-gear-fill',
      title: 'Drive Safely',
      description: 'Pick up customers and drive them home in their own vehicles.',
      bgColor: '#20c997',
    },
 
  ];

  return (
    <>
      <div className="row mt-5 pt-5">
        <div className="col-12 text-center mb-5">
          <div className="fw-bold display-5">
            <span className="text-primary">How&nbsp;</span>
            <span className="text-warning">It Works</span>
          </div>
          <p className="fs-4 text-muted">
            Simple steps to get you home safely
          </p>
        </div>
      </div>

      {/* Customer Steps */}
          <h2 className="fs-4 text-center font-weight-bold mb-5">
            For Customers
          </h2>
      <div
        className="howitworks-steps-row mb-5 align-items-center justify-content-center"
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}
      >
        {customerSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="howitworks-col mb-4 d-flex flex-column align-items-center">
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
              <div className="howitworks-arrow d-flex justify-content-center align-items-center">
                <i className="bi bi-arrow-right" style={{ fontSize: '2rem', color: '#222' }}></i>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Driver Steps */}
          <h2 className="fs-4 text-center font-weight-bold mb-5">
            For Drivers
          </h2>
      <div
        className="howitworks-steps-row mb-5 align-items-center justify-content-center"
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}
      >
        {driverSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="howitworks-col mb-4 d-flex flex-column align-items-center">
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
              <div className="howitworks-arrow d-flex justify-content-center align-items-center">
                <i className="bi bi-arrow-right" style={{ fontSize: '2rem', color: '#222' }}></i>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default HowItWorksSection; 