import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost/SafeDrive-University-Project1/backend/api/check_session.php', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Session check failed:', error);
                navigate('/signin');
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute; 