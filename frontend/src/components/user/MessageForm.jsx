import React, { useContext, useState } from "react";
import { AppContext } from "../../constants/AppContext";
import mensaje from "../../assets/mensaje.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "../../constants/css/message.css";
import { NavBar } from "../general/NavBar";
import { Footer } from "../general/Footer";

export function MessageForm() {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { service } = location.state;

  const handleRequestService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          serviceId: service.id,
          content,
        }),
      });
      if (response.ok) {
        alert("Solicitud de servicio enviada exitosamente");
        navigate("/services");
      } else {
        const errorData = await response.json();
        alert(`Error al solicitar el servicio: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al solicitar el servicio:", error);
      alert(`Error al solicitar el servicio: ${error.message}`);
    }
  };

  if (!user) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <>
      <NavBar />
      <div className="messageContainer">
        <form className="form" onSubmit={handleRequestService}>
          <h2 className="formTitle">Enviar mensaje al proveedor</h2>
          <div className="input-container">
            <textarea
              placeholder="Escribe tu mensaje"
              value={content}
              className="input"
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button className="loginButton" type="submit">
            Enviar Mensaje y Solicitar Servicio
          </button>
        </form>
        <div className="heroContainer">
          <img className="hero" src={mensaje} alt="register" />
        </div>
      </div>
      <Footer />
    </>
  );
}
