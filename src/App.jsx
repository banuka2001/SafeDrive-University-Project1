import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import RoleSelection from './components/RoleSelection';
import Layout from './components/layout';
import MainSection from './components/MainSection';




import Home from './pages/home';


import 'bootstrap-icons/font/bootstrap-icons.css';


// Dummy SignIn page (replace with real one if needed)
const SignIn = () => <h2 className="text-center mt-5">Sign In Page</h2>;

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<RoleSelection />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<MainSection />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
