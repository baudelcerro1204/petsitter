import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './constants/AppContext';
import App from './app/App';
import { Login } from './components/auth/Login';
import { Logout } from './components/auth/Logout';
import { Index } from './components/Index';
import ProtectedRoute from './components/auth/ProtectedRoute'; // Importa el nuevo componente

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} /> {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}> {/* Ruta protegida */}
          <Route path="/admin" element={<App />} /> {/* Ajusta la ruta según sea necesario */}
        </Route>
      </Routes>
    </Router>
  </AppProvider>
);
