import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("Token in ProtectedRoute: ", token); // Agrega este log para verificar el token
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
