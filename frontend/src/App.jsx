import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationProvider } from './context/NotificationContext';
import { DarkModeProvider } from './context/DarkModeContext';

import RoleSelection from './pages/RoleSelection';
import Layout from './components/layout';
import { ratingsData } from './components/Ratings';
import ProtectedRoute from './components/ProtectedRoute';
import HowItWorks from './components/HowItWorksSection';    

import Home from './pages/Home';
import AddRating from './pages/AddRating';
import CustomerSignUp from './pages/CustomerSignUp';
import DriverSignUp from './pages/DriverSignUp';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';
import Register from './pages/Register';

import CustomerDashboard from './pages/customer/CustomerDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';

import PrivacyPolicy from './pages/PrivacyPolicy';

import SafetyGuidelines from './pages/SafetyGuideline';
import RefundPolicy from './pages/RefundPolicy';
import ContactUs from './pages/ContactUs';

import About from './pages/About';


import ScheduleTrip from './pages/customer/ScheduleTrip'; 
import ProfileCustomer from './pages/customer/ProfileCustomer';
import UpcomingTripsCustomer from './pages/customer/UpcomingTripsCustomer';
import PastTripsCustomer from './pages/customer/PastTripsCustomer';
import UpcomingDriver from './pages/driver/UpcomingTripsDriver';
import PastDriver from './pages/driver/PastTripsDriver';
import ProfileDriver from './pages/driver/ProfileDriver';



import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    const [ratings, setRatings] = useState(ratingsData);

    const addRating = (newRating) => {
        setRatings((prevRatings) => [...prevRatings, newRating]);
    };

    return (
      <DarkModeProvider>
        <NotificationProvider>
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
 
                        <Route path="/customer-dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
                      <Route path="/schedule" element={<ProtectedRoute><ScheduleTrip/></ProtectedRoute>}/>
                       <Route path="/profile/customer" element={<ProtectedRoute><ProfileCustomer/></ProtectedRoute>}/>
                        <Route path="/upcoming-trips-customer" element={<ProtectedRoute><UpcomingTripsCustomer/></ProtectedRoute>}/>
                        <Route path="/past-trips-customer" element={<ProtectedRoute><PastTripsCustomer/></ProtectedRoute>}/>  

                        <Route path="/driver-dashboard" element={<ProtectedRoute><DriverDashboard /></ProtectedRoute>} />
                        <Route path="/upcoming-trips-driver" element={<ProtectedRoute><UpcomingDriver/></ProtectedRoute>}/>
                        <Route path="/past-trips-driver" element={<ProtectedRoute><PastDriver/></ProtectedRoute>}/>
                        <Route path="/profile/driver" element={<ProtectedRoute><ProfileDriver/></ProtectedRoute>}/>
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                       
                        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
                        <Route path="/refund-policy" element={<RefundPolicy />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/how-it-works" element={<HowItWorks/>} />
                        <Route path="/aboutus" element={<About/>} />
                    </Route>
                </Routes>
            </Router>
        </NotificationProvider>
        </DarkModeProvider>
    );
}

export default App;
