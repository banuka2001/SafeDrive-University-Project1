import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';

import "../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaShieldAlt className="text-primary me-2" size={24} />
          <span className="fw-bold">
            <span className="text-primary">Safe</span>
            <span className="text-warning">Drive</span>
          </span>
        </Link>

        {/* Toggler */}
             <button
                className="navbar-toggler border-remove"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg width="30" height="30" viewBox="0 0 30 30">
              <path stroke="#ffc107" strokeWidth="2" d="M2 7h28M8 15h14M1 23h30"/>



                </svg>
              </button>



        {/* Collapsible content */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarContent">
          <div className="w-100 d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center">

            {/* Nav Links */}
            <ul className="navbar-nav ms-5 mb-3 mb-lg-0 text-end text-lg-center">
              <li className="nav-item">
                <Link className="nav-link active fw-semibold" to="/" onClick={() => setIsOpen(false)}>Home</Link>
              </li>

              {/* Test case for Rate Trip */}
              <li className="nav-item">
                <Link className="nav-link" to="/rate-trip" onClick={() => setIsOpen(false)}>Rate Trip</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about" onClick={() => setIsOpen(false)}>About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features" onClick={() => setIsOpen(false)}>Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how" onClick={() => setIsOpen(false)}>How It Works</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
              </li>
            </ul>

            {/* Right-Aligned Buttons (work in both mobile & large) */}
            <div className="d-flex gap-2 justify-content-end">
              <Link to="/signin" className="btn btn-outline-secondary rounded-pill px-3">
                Login
              </Link>
              <Link to="/roles" className="btn btn-warning text-white rounded-pill px-3 fw-bold">
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
