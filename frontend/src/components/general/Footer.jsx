import React, { useContext } from "react";
import "../../constants/css/footer.css";
import logoChico from "../../assets/logoChico.svg";
import { AppContext } from "../../constants/AppContext";

export function Footer() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <>
      <div className="footer">
        <div className="mainBox">
          <h4>Unete a nosotros y garantiza el mejor servicio</h4>
          <div className="suscribe">
            <input
              type="email"
              placeholder="Correo electronico"
              className="input"
            />
            {!isAuthenticated ? (
            <button>Registrate</button>
            ) : (
            <button>Unirse</button>
            )}
          </div>
        </div>
        <div className="secondaryBox">
          <div className="redes">
            <p>Seguinos en nuestras Redes</p>
            <div className="icons">
              <a href="/">
                <img src={logoChico} alt="Facebook" />
              </a>
              <a href="/">
                <img src={logoChico} alt="Instagram" />
              </a>
            </div>
          </div>
          <div className="contactMethods">
            <div className="contact">
              <p>Telefono</p>
              <p>123456789</p>
              <p>AV. Siempre Viva 1234</p>
            </div>
            <div className="contact">
              <p>Telefono</p>
              <p>123456789</p>
              <p>AV. Siempre Viva 1234</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}