import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/ForgetPassword.css';

const SignIn = () => {
    const [email_phone, setEmailPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData();
        formData.append('email_phone', email_phone);
        formData.append('password', password);

        try {
            console.log('Attempting to sign in with:', { email_phone, password: '***' });
            
            const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/login.php', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                if (data.roles && data.roles.length === 1) {
                    const role = data.roles[0];
                    console.log('Navigating to:', `/${role}-dashboard`);
                    navigate(`/${role}-dashboard`);
                } else if (data.roles && data.roles.length > 1) {
                    console.log('Multiple roles, navigating to role selection');
                    navigate('/role-selection', { state: { roles: data.roles } });
                } else {
                    setError('Invalid response from server: no roles found');
                }
            } else {
                setError(data.error || 'An unknown error occurred.');
            }
        } catch (err) {
            console.error('Sign-in error:', err);
            setError('Failed to connect to the server. Please try again later.');
        } finally {
            setIsLoading(false);
        }
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
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignIn}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label pb-2">Email or Phone Number</label>
                        <div className="input-group">
                             <span className="input-group-text"><FaUser /></span>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Enter email or phone number"
                                value={email_phone}
                                onChange={(e) => setEmailPhone(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label pb-2" >Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type={passwordShown ? "text" : "password"}
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                {passwordShown ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mb-3">
                        <Link to="/forgot-password" className="text-decoration-none forgot-password">Forgot your password?</Link>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 signin-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
                    </button>
                    
                </form>
            </div>
        </div>
    );
};

export default SignIn;
