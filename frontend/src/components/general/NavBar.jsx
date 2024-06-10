import React from "react";
import Logo from "../../assets/logo.svg";
import "../../constants/css/navbar.css";
import { Link } from "react-router-dom";

export function NotAuthenticatedNavBar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <a href="/">Servicios</a>
          <a href="/">Sobre Nosotros</a>
          <a href="/">Contactanos</a>
          <div className="TheButton">
            <Link to="/login">Iniciar Sesion</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function AuthenticatedNavBar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="nav-links">
          <a href="/">Servicios</a>
          <a href="/">Sobre Nosotros</a>
          <a href="/">Contactanos</a>
          <div className="TheButton">
            <a href="/">Panel</a>
          </div>
        </div>
      </div>
    </>
  );
}