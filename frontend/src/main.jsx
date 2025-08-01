import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </DarkModeProvider>
  </StrictMode>
)
