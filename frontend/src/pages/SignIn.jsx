import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaUser, FaLock, FaEye, FaEyeSlash, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/ForgetPassword.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-start" style={{ paddingTop: '8rem' }}>
            <div className="login-card">
                <div className="text-center mb-4">
                    <div className="logo-circle mb-3">
                        <FaUser size={40} color="white" />
                    </div>
                    <h2>Log In</h2>
                    <p className="text-muted pb-3">Access your dashboard</p>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label pb-2">Email or Phone Number</label>
                        <div className="input-group">
                             <span className="input-group-text"><FaUser /></span>
                            <input type="text" className="form-control" id="email" placeholder="Enter email or phone number" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label pb-2" >Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input type={passwordShown ? "text" : "password"} className="form-control" id="password" placeholder="Enter your password" />
                            <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {passwordShown ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="text-decoration-none forgot-password">Forgot your password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 signin-btn">Sign In to Dashboard</button>
                    <hr className="my-4" />
                    <div className="text-center mb-4">
                        <p className="mb-2">Not a user ? Register here now</p>
                        <Link to="/roles" className="btn btn-secondary w-100 register-btn">Register now</Link>
                    </div>
                    <div className="text-center">
                        <p className="text-muted">Need help? Contact driver support</p>
                        <div>
                            <a href="tel:0706572895" className="text-decoration-none me-3 support-link">
                               Call Support  <FaPhone className="me-5 ms-2" /> 
                            </a>
                            <a href="mailto:padbdilshan@gmail.com" className="text-decoration-none support-link">
                                <FaEnvelope className="me-2" /> Email
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
