import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FontProvider } from './contexts/FontContext'
import {AuthProvider} from "./contexts/AuthContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FontProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FontProvider>
  </StrictMode>,
)
