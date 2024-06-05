import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PetForm from './components/PetForm';
import ProtectedRoute from './components/ProtectedRoute';
import SupplierPanel from './components/SuppliersPanel';
import UserPanel from './components/UserPanel';
import ServiceList from './components/ServiceList';
import ServiceDetails from './components/ServiceDetails';
import SendMessage from './components/SendMessage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/pets"
            element={
              <ProtectedRoute>
                <PetForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier-panel"
            element={
              <ProtectedRoute>
                <SupplierPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-panel"
            element={
              <ProtectedRoute>
                <UserPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/send-message/:serviceId" element={<SendMessage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
