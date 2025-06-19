import React from "react";
import "../../styles/HeroSection.css";
import "../../styles/Buttons.css";

const HeroSection = () => {
  return (
    <section className="d-flex align-items-center mt-5 mt-sm-3 px-4 hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="fw-bold display-5 text-secondary">
              Prevent drunk driving <br />
              <span className="text-warning">Protect every journey</span>
            </h1>
            <p className="mt-4 mb-5 fs-5 text-muted">
              Safe Drive provides professional drivers to get you and your vehicle
              home safely when you're unable to drive. Your safety is our priority.
            </p>
              <div className="mt-4 d-flex flex-column flex-sm-row gap-3 align-items-stretch">
                <button className="btn shadow-sm px-4 py-3 fw-medium book-btn text-primary w-100 w-sm-auto style-btn book-driver-btn">
                  Book a Driver
                </button>
                <button className="btn shadow-sm px-4 py-3 fw-medium d-flex align-items-center justify-content-center gap-2 text-secondary w-100 w-sm-auto style-btn">
                  <i className="bi bi-info-circle-fill "></i>
                  Learn More
                </button>
              </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
