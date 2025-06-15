import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import '../styles/ForgetPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgetPassword = () => {
    return (
        <div className="login-container d-flex justify-content-center align-items-start" style={{ paddingTop: '8rem' }}>
            <div className="login-card text-center">
                <div className="logo-circle mb-4">
                    <FaLock size={30} color="white" />
                </div>
                <h2 className="mb-3">Forgot Password?</h2>
                <p className="text-secondary mb-4">
                    Enter your registered email address <br /> We'll send you a link to reset your password.
                </p>
                <form>
                    <div className="form-group text-start mb-4">
                        <label htmlFor="email" className="form-label pb-2">Email Address</label>
                        <div className="input-group">
                             <input type="email" className="form-control" id="email" placeholder="Enter email address" />
                             <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3 signin-btn">Send Recovery Link</button>
                </form>
                <Link to="/signin" className="btn btn-link text-decoration-none back-to-login mb-4">
                    <FaArrowLeft className="me-2" /> Back to Login
                </Link>
                <div className="contact-support">
                    <p className="text-muted mb-1">Still having trouble?</p>
                    <Link to="/contact-support" className="text-decoration-none support-link">Contact Support</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
