import React from 'react';
import { Link } from 'react-router-dom';

import { FaShieldAlt } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";

import "../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-3 sticky-top">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaShieldAlt className="text-primary me-3" size={30} />
          <span className="fw-bold fs-5">
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
                  <span className={`toggler-icon-wrapper ${isOpen ? 'is-open' : ''}`}>
                    {isOpen ? (
                        <IoMdClose className="text-warning" size={30} />
                      ) : (
                        <HiMenuAlt3 className="text-warning" size={30} />
                      )}
                    </span>
              </button>



        {/* Collapsible content */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarContent">

            {/* Nav Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-end text-lg-center">
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
            <div className="d-flex gap-3 align-items-center mt-3 mt-lg-0 justify-content-end">
              <Link to="/signin" className="btn btn-outline-secondary rounded-pill px-3">
                Login
              </Link>
              <Link to="/roles" className="btn btn-warning text-white rounded-pill px-3 fw-bold">
                Book Now →
              </Link>
              <DarkModeToggle />
            </div>
        </div>
      </div>
    </nav>
  );
}
