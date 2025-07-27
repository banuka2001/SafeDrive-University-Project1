import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import '../styles/DarkModeToggle.css';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle; 