import React from "react";
import "../../constants/css/footer.css";
import logoChico from "../../assets/logoChico.svg";

export function NotAuthenticatedFooter() {
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
            <button>Registrate</button>
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

export function AuthenticatedFooter() {
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
            <button>Unirse</button>
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