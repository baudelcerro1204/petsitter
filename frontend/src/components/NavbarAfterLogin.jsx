import React from 'react';
import '../assets/styles/navbar.css';
import logoImage from '../assets/images/logo.png';

function NavbarAfterLogin() {
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
        <a href="/dashboard"><button className="login-button">Panel</button></a>
      </header>
    );
}

export default NavbarAfterLogin;
