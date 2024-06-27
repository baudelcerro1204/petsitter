import React, { useContext, useState, useEffect } from "react";
import Logo from "../../assets/logo.svg";
import LogoChico from "../../assets/logoChico.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/navbar.css";
import { Link } from "react-router-dom";

export function NavBar() {
  const { isAuthenticated, user } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (event, id) => {
    console.log(`Attempting to navigate to: ${id}`);
    if (isOpen) toggleMenu();
    if (location.pathname === "/") {
      event.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        console.log(`Scrolling to: ${id}`);
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      console.log(`Setting scrollTo: ${id} and redirecting to /`);
      localStorage.setItem("scrollTo", id);
      navigate("/");
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("scrollTo");
    if (id) {
      console.log(
        `Found scrollTo in localStorage: ${id}, attempting to scroll.`
      );

      const attemptScroll = (attemptsLeft) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          localStorage.removeItem("scrollTo");
        } else if (attemptsLeft > 0) {
          setTimeout(() => attemptScroll(attemptsLeft - 1), 500); // Aumenta el tiempo si es necesario
        }
      };

      attemptScroll(10); // Aumenta el número de intentos si es necesario
    }
  }, [location.pathname]); // Asegúrate de que esta dependencia cambie como se espera

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img className="logoGrande" src={Logo} alt="Logo" />
            <img className="logoChico" src={LogoChico} alt="LogoChico" />
          </Link>
        </div>
        <div className={`nav-links ${isOpen ? "open" : "closed"}`}>
          <Link to="/" onClick={(e) => handleLinkClick(e, "servicios")}>
            Servicios
          </Link>
          <Link to="/" onClick={(e) => handleLinkClick(e, "nosotros")}>
            Sobre Nosotros
          </Link>
          <Link to="/" onClick={(e) => handleLinkClick(e, "contactanos")}>
            Contáctanos
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="TheButton">
              <p>Iniciar Sesión</p>
            </Link>
          ) : (
            <Link
              to={user.role === "proveedor" ? "/supplier-panel" : "/user-panel"}
              className="TheButton"
            >
              <p>Panel</p>
            </Link>
          )}
        </div>
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}
