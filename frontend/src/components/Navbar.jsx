import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <h1>Mi Aplicación</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated && user ? (
          <>
            {user.role === 'usuario' && <li><Link to="/panel">Panel</Link></li>}
            <li>Bienvenido, {user.firstName} {user.lastName}</li>
            <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
          </>
        ) : (
          <li><Link to="/login">Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
