import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import '../styles/Footer.css';

// Icons import
import { FaShieldAlt } from 'react-icons/fa';
import visaIcon from '../assets/visa_icon.svg';
import mastercardIcon from '../assets/mastercard.svg';
import amexIcon from '../assets/american-express.svg';

const Footer = () => {      
  return (
    <footer className="bg-light text-muted pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                <FaShieldAlt className="text-primary me-2" size={40} />
                <span className="fw-bold fs-2">
                    <span className="text-primary">Safe</span>
                    <span className="text-warning">Drive</span>
                </span>
                </Link>
            <p className='mt-4'>
              Your safety is our priority. We're committed to preventing drunk driving accidents across Sri Lanka.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Quick Links</h5>
            <p><Link to="/" className="text-muted fs-5 text-decoration-none">Home</Link></p>
            <p><Link to="/about" className="text-muted fs-5 text-decoration-none">About Us</Link></p>
            <p><Link to="/services" className="text-muted fs-5 text-decoration-none">Services</Link></p>
            <p><Link to="/become-a-driver" className="text-muted fs-5 text-decoration-none">Become a Driver</Link></p>
            <p><Link to="/contact" className="text-muted fs-5 text-decoration-none">Contact Us</Link></p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Legal</h5>
            <p><Link to="/terms" className="text-muted fs-5 text-decoration-none">Terms of Service</Link></p>
            <p><Link to="/privacy" className="text-muted fs-5 text-decoration-none">Privacy Policy</Link></p>
            <p><Link to="/cookie-policy" className="text-muted fs-5 text-decoration-none">Cookie Policy</Link></p>
            <p><Link to="/safety-guidelines" className="text-muted fs-5 text-decoration-none">Safety Guidelines</Link></p>
            <p><Link to="/refund-policy" className="text-muted fs-5 text-decoration-none">Refund Policy</Link></p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Contact Us</h5>
            <div className="d-flex align-items-start mb-2">
              <FiMapPin className="me-2 fs-2 text-warning" style={{ minWidth: '28px' }}/> 
              <a href="https://www.google.com/maps/search/?api=1&query=123+Temple+Road,Colombo+10,Sri+Lanka" target="_blank" rel="noopener noreferrer" className="text-muted fs-5 text-decoration-none">123 Temple Road, Colombo 10, Sri Lanka</a>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FiMail className="me-2 fs-2 text-warning" /> 
              <a href="mailto:support@safedrive.lk" className="text-muted fs-5 text-decoration-none">support@safedrive.lk</a>
            </div>
            <div className="d-flex align-items-center">
              <FiPhone className="me-2 fs-2 text-warning" /> 
              <a href="tel:+94112345678" className="text-muted fs-5 text-decoration-none">+94 11 234 5678</a>
            </div>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start text-muted">&#169; 2023 SafeDrive Sri Lanka. All rights reserved.</p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
                <img src={visaIcon} alt="Visa" className="payment-icon colored" />
                <img src={mastercardIcon} alt="Mastercard" className="payment-icon colored" />
                <img src={amexIcon} alt="American Express" className="payment-icon grayscale" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
