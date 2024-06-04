import React from 'react';
import '../assets/styles/navbar.css';
import logoImage from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

function NavbarAfterLogin() {
  const navigate = useNavigate();

  const handlePanelClick = () => {
    const role = localStorage.getItem('role');
    if (role === 'proveedor') {
      navigate('/supplier-panel');
    } else {
      navigate('/user-panel');
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="Pet Buddies" className="logo-img" />
      </div>
      <nav className="nav">
        <a href="#services">Servicios</a>
        <a href="#about">Sobre Nosotros</a>
        <a href="#contact">Contactanos</a>
      </nav>
      <button className="login-button" onClick={handlePanelClick}>Panel</button>
    </header>
  );
}

export default NavbarAfterLogin;
