import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './constants/AppContext';
import App from './app/App';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Logout } from './components/auth/Logout';
import { Index } from './components/Index';
import { Services } from './components/user/ServiceList';
import { ProviderPanel } from './components/supplier/SupplierPanel';
import { UserPanel } from './components/user/UserPanel';
import { MessageForm } from './components/user/MessageForm';
import { ServiceDetails } from './components/user/ServiceDetails';
import ProtectedRoute from './components/auth/ProtectedRoute'; // Importa el nuevo componente

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Index />} /> {/* Ruta pública */}
        <Route path="/register" element={<Register />} /> {/* Agregar la ruta para el registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}> {/* Ruta protegida */}
          <Route path="/admin" element={<App />} /> {/* Ajusta la ruta según sea necesario */}
          <Route path="/services" element={<Services />} /> {/* Ruta para ver servicios */}
          <Route path="/supplier-panel" element={<ProviderPanel />} /> {/* Ruta para el panel del proveedor */}
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/messageform/:providerId" element={<MessageForm />} />
        </Route>
      </Routes>
    </Router>
  </AppProvider>
);
