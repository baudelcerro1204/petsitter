import React, { useContext, useState } from "react";
import { AppContext } from "../../constants/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

export function MessageForm() {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { service } = location.state;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/messages", {
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
        alert("Mensaje enviado exitosamente");
        navigate("/services");
      } else {
        const errorData = await response.json();
        alert(`Error al enviar el mensaje: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert(`Error al enviar el mensaje: ${error.message}`);
    }
  };

  if (!user) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="messageFormContainer">
      <h2>Enviar mensaje al proveedor</h2>
      <form className="form" onSubmit={handleSendMessage}>
        <div className="input-container">
          <textarea
            placeholder="Escribe tu mensaje"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
}
