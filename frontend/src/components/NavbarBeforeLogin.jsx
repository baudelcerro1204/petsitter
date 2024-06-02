import React from 'react';
import '../assets/styles/navbar.css';
import logoImage from '../assets/images/logo.png';

function NavbarBeforeLogin() {
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
        <a href="/login"><button className="login-button">Iniciar Sesión</button></a>
      </header>
    );
}

export default NavbarBeforeLogin;
