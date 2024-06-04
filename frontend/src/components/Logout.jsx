import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    navigate('/login'); // Redirige al usuario a la página de login
  }, [navigate]);

  return null; // No necesita renderizar nada
};

export default Logout;
