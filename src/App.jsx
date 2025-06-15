import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import RoleSelection from './pages/RoleSelection';
import Layout from './components/layout';
import Home from './pages/home';
import TripData from './components/TripData';
import { ratingsData } from './components/Ratings';
import CustomerSignUp from './components/CustomerSignUp';
import DriverSignUp from './components/DriverSignUp';

import 'bootstrap-icons/font/bootstrap-icons.css';

// Dummy SignIn page (replace with real one if needed)
const SignIn = () => <h2 className="text-center mt-5">Sign In Page</h2>;

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
                    <Route path="/roles" element={<RoleSelection />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/rate-trip" element={<TripData onNewRating={addRating} />} />
                    <Route path="/register/customer" element={<CustomerSignUp />} />
                    <Route path="/register/driver" element={<DriverSignUp />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
