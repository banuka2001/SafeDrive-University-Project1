import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/HeroSection.css";
import "../styles/Buttons.css";

const HeroSection = () => {
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

  const handleBookDriver = () => {
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

  return (
    <section className="d-flex align-items-center mt-5 mt-sm-3 px-4 hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            <h1 className="fw-bold display-5">
              Prevent drunk driving <br />
              <span className="text-warning">Protect every journey</span>
            </h1>
            <p className="mt-4 mb-5 fs-5">
              Safe Drive provides professional drivers to get you and your vehicle
              home safely when you're unable to drive. <br />Your safety is our priority.
            </p>
            <div className="mt-4 d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <button 
                onClick={handleBookDriver}
                className="btn shadow-sm px-4 py-3 fw-medium book-btn text-primary w-75 w-sm-auto style-btn book-driver-btn"
              >
                {isAuthenticated ? 'My Dashboard' : 'Book a Driver'}
              </button>
              <Link to="/learn-more" className="btn shadow-sm px-4 py-3 fw-medium d-flex align-items-center justify-content-center gap-2 text-secondary w-75 w-sm-auto style-btn style-btn-outline">
                <i className="bi bi-info-circle-fill "></i>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 