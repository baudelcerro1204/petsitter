import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../constants/css/sidebar.css";
import logoChico from "../../assets/logoChico.svg";
import logo from "../../assets/logo.svg";
import dashboardIcon from "../../assets/dashboardIcon.svg";
import registerIcon from "../../assets/registerIcon.svg";
import consultIcon from "../../assets/consultIcon.svg";
import commentsIcon from "../../assets/commentsIcon.svg";
import helpIcon from "../../assets/helpIcon.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import historyIcon from "../../assets/history.svg";

export const ProveedorSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [showText, setShowText] = useState(false); // Nuevo estado para controlar la visibilidad del texto
  const location = useLocation();

  const toggleSidebar = () => {
    if (!isActive) {
      setIsActive(true);
      // Establece un retraso para mostrar el texto
      setTimeout(() => {
        setShowText(true);
      }, 300); // Ajusta este tiempo según sea necesario
    } else {
      setIsActive(false);
      setShowText(false); // Oculta el texto inmediatamente cuando se cierra el sidebar
    }
  };

  return (
    <>
      <div className={`mobile-toggle ${isActive ? "active" : ""}`}>
        <button className="boton" onClick={toggleSidebar}>
          &gt; {/* Cambiado de ☰ a > */}
        </button>
      </div>

      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <Link to={"/"} className="sidebar-header">
          <img src={logoChico} alt="Logo" className="logoChico" />
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="linea"></div>
        <div className="contenedor">
          <nav className="nav-links">
            <Link
              to="/supplier-panel"
              className={location.pathname === "/supplier-panel" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={dashboardIcon} alt="Dashboard" />
              {showText && <span>Dashboard</span>}
            </Link>
            <Link
              to="/supplier-panel/services-list"
              className={
                location.pathname === "/supplier-panel/services-list" ? "active" : ""
              }
              onClick={toggleSidebar}
            >
              <img src={registerIcon} alt="Register" />

              {showText && <span>Registro de Servicios</span>}
            </Link>
            <Link
              to="/supplier-panel/consultations"
              className={location.pathname === "/supplier-panel/consultations" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={consultIcon} alt="Consultations" />

              {showText && <span>Consultas y Contrataciones</span>}
            </Link>
            <Link
              to="/supplier-panel/comments"
              className={location.pathname === "/supplier-panel/comments" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={commentsIcon} alt="Comments" />

              {showText && <span>Comentarios</span>}
            </Link>
            <Link
              to="/supplier-panel/help"
              className={location.pathname === "/supplier-panel/help" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={helpIcon} alt="Help" />
              {showText && <span>Help</span>}
            </Link>
          </nav>
          <div className="sidebar-footer">
            <Link to="/logout" onClick={toggleSidebar}>
              <img src={logoutIcon} alt="Logout" />
              {showText && <span>Cerrar Sesión</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const UserSidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [showText, setShowText] = useState(false); // Nuevo estado para controlar la visibilidad del texto
  const location = useLocation();

  const toggleSidebar = () => {
    if (!isActive) {
      setIsActive(true);
      // Establece un retraso para mostrar el texto
      setTimeout(() => {
        setShowText(true);
      }, 300); // Ajusta este tiempo según sea necesario
    } else {
      setIsActive(false);
      setShowText(false); // Oculta el texto inmediatamente cuando se cierra el sidebar
    }
  };

  return (
    <>
      <div className={`mobile-toggle ${isActive ? "active" : ""}`}>
        <button className="boton" onClick={toggleSidebar}>
          &gt; {/* Cambiado de ☰ a > */}
        </button>
      </div>

      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <Link to={"/"} className="sidebar-header">
          <img src={logoChico} alt="Logo" className="logoChico" />
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="linea"></div>
        <div className="contenedor">
          <nav className="nav-links">
            <Link
              to="/user-panel"
              className={location.pathname === "/user-panel" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={dashboardIcon} alt="Dashboard" />
              {showText && <span>Dashboard</span>}
            </Link>
            <Link
              to="/user-panel/history"
              className={location.pathname === "/user-panel/history" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={historyIcon} alt="Dashboard" />
              {showText && <span>Dashboard</span>}
            </Link>
            <Link
              to="/user-panel/comments"
              className={location.pathname === "/user-panel/comments" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={commentsIcon} alt="Dashboard" />
              {showText && <span>Dashboard</span>}
            </Link>
            <Link
              to="/user-panel/help"
              className={location.pathname === "/user-panel/help" ? "active" : ""}
              onClick={toggleSidebar}
            >
              <img src={helpIcon} alt="Help" />
              {showText && <span>Help</span>}
            </Link>
          </nav>
          <div className="sidebar-footer">
            <Link to="/logout" onClick={toggleSidebar}>
              <img src={logoutIcon} alt="Logout" />
              {showText && <span>Cerrar Sesión</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
