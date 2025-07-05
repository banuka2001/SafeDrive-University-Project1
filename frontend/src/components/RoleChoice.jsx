import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import carIcon from '../assets/car-icon.png';

import "../styles/RoleSelection.css";
import "../styles/Buttons.css";

const RoleChoice = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const rolesFromLogin = location.state?.roles || [];

  // Determine page content based on mode
  const isRegisterMode = mode === 'register';
  const title = isRegisterMode ? 'Safe Drive' : 'Welcome Back';
  const subtitle = isRegisterMode ? 'Choose your role to continue' : 'Choose your dashboard to continue';
  const driverText = isRegisterMode ? 'I am a Driver' : 'Go to Driver Dashboard';
  const customerText = isRegisterMode ? 'I am a Customer' : 'Go to Customer Dashboard';

  const handleDriverClick = () => {
    if (isRegisterMode) {
      navigate('/register/driver');
    } else {
      navigate('/driver-dashboard');
    }
  };

  const handleCustomerClick = () => {
    if (isRegisterMode) {
      navigate('/register/customer');
    } else {
      navigate('/customer-dashboard');
    }
  };

  // Determine which buttons to show
  const showDriverButton = isRegisterMode || rolesFromLogin.includes('driver');
  const showCustomerButton = isRegisterMode || rolesFromLogin.includes('customer');
  
  // If in login mode and there are no roles, redirect
  if (!isRegisterMode && rolesFromLogin.length === 0) {
    navigate('/signin');
    return null;
  }

  return (
    <div className="d-flex justify-content-center px-3 py-5">
      <div className="w-100 text-center col-12 col-md-10 col-lg-8 col-xl-7">
        <div>
          <img
            src={carIcon}
            alt="Car Icon"
            className="img-fluid car-icon-roles"
            style={{ maxWidth: '100px' }}
          />
        </div>

        <h1 className="fw-bold mb-2 display-6 display-md-5 display-lg-4">
          {title}
        </h1>

        <p className="text-muted mb-5 fs-6 fs-md-5">
          {subtitle}
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 flex-wrap">
          {showDriverButton && (
            <button 
              className="btn btn-light shadow-sm px-4 py-3 fw-medium book-btn text-primary w-sm-auto style-btn"
              onClick={handleDriverClick}
            >
              <i className="bi bi-people-fill me-2"></i>
              {driverText}
            </button>
          )}
          {showCustomerButton && (
            <button
              className="btn btn-light shadow-sm px-4 py-3 fw-medium d-flex align-items-center justify-content-center gap-2 text-primary w-sm-auto style-btn"
              onClick={handleCustomerClick}
            >
              <i className="bi bi-car-front-fill me-2"></i>
              {customerText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleChoice; 