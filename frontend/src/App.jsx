import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import RoleSelection from './pages/RoleSelection';
import Layout from './components/layout';
import Home from './pages/Home';
import AddRating from './pages/AddRating';
import { ratingsData } from './components/Ratings';
import CustomerSignUp from './pages/CustomerSignUp';
import DriverSignUp from './pages/DriverSignUp';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import 'bootstrap-icons/font/bootstrap-icons.css';

// Dummy SignIn page (replace with real one if needed)
// const SignIn = () => <h2 className="text-center mt-5">Sign In Page</h2>;

function App() {
    const [ratings, setRatings] = useState(ratingsData);

    const addRating = (newRating) => {
        setRatings((prevRatings) => [...prevRatings, newRating]);
    };

    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home ratings={ratings} />} />
                    <Route path="/role-selection" element={<RoleSelection />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/rate-trip" element={<AddRating onNewRating={addRating} tripDetails={{
                      startTime: "8:00 AM",
                      endTime: "8:45 AM",
                      location: "Uptown to Midtown",
                      budget: "$35.00",
                      driverName: "Maria",
                      driverAvatar: "https://i.pravatar.cc/150?img=49",
                      customerName: "John Doe",
                    }} />} />
                    <Route path="/register/customer" element={<CustomerSignUp />} />
                    <Route path="/register/driver" element={<DriverSignUp />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/customer-dashboard" element={
                        <ProtectedRoute>
                            <CustomerDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/driver-dashboard" element={
                        <ProtectedRoute>
                            <DriverDashboard />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
