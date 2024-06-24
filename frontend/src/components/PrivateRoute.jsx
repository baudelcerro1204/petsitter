import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'usuario') {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
