import React from 'react';
import { useNavigate } from 'react-router-dom';
import carIcon from '../assets/car-icon.png';

import "../styles/RoleSelection.css";
import "../styles/Buttons.css";

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/register/customer');
  };

  const handleDriverClick = () => {
    navigate('/register/driver');
  };

  return (
    <div className="d-flex justify-content-center px-3 py-5">
      <div className="w-100 text-center col-12 col-md-10 col-lg-8 col-xl-7">

        {/* Car Icon */}
        <div>
          <img
            src={carIcon}
            alt="Car Icon"
            className="img-fluid car-icon-roles"
            style={{
              maxWidth: '100px',
            }}
          />
        </div>

        {/* Title */}
        <h1 className="fw-bold mb-2 display-6 display-md-5 display-lg-4">
          Safe Drive
        </h1>

        {/* Subtitle */}
        <p className="text-muted mb-5 fs-6 fs-md-5">
          Choose your role to continue
        </p>

        {/* Buttons */}
<div className="d-flex flex-column flex-sm-row justify-content-center gap-4 flex-wrap">
  <button className="btn btn-light shadow-sm px-4 py-3 fw-medium book-btn text-primary w-sm-auto style-btn"
  onClick={handleDriverClick}
  >
    
    <i className="bi bi-people-fill me-2"></i>
    I am a Driver
  </button>
  <button 
    className="btn btn-light shadow-sm px-4 py-3 fw-medium d-flex align-items-center justify-content-center gap-2 text-primary w-sm-auto style-btn"
    onClick={handleCustomerClick}
  >
    <i className="bi bi-car-front-fill me-2"></i>
    I am a Customer
  </button>
</div>




      </div>
    </div>
  );
}
