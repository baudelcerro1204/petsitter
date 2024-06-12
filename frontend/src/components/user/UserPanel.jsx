import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/userPanel.css";

export function UserPanel() {
  const { user } = useContext(AppContext);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    fetchServiceRequests();
    fetchUserComments();
  }, []);

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/requests", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setServiceRequests(data);
    } catch (error) {
      console.error("Error al obtener las solicitudes de servicio:", error);
    }
  };

  const fetchUserComments = async () => {
    try {
      if (user && user.id) {
        const response = await fetch(`http://localhost:3000/comments/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setUserComments(data);
      } else {
        console.error("ID de usuario no disponible en el objeto de usuario",);
      }
    } catch (error) {
      console.error("Error al obtener los comentarios del usuario:", error);
    }
  };
  
  
  
  if (user?.role !== "usuario") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="userPanelContainer">
      <h2>Panel del Usuario</h2>
      <h3>Mis Solicitudes de Servicio</h3>
      <ul className="requestsList">
        {serviceRequests.map((request) => (
          <li key={request.id} className="requestItem">
            <h4>Servicio: {request.service.name}</h4>
            <p>Proveedor: {request.service.providerId}</p>
            <p>Estado: {request.status}</p>
          </li>
        ))}
      </ul>
      <h3>Mis Comentarios</h3>
      <ul className="commentsList">
        {userComments.map((comment) => (
          <li key={comment.id} className="commentItem">
            <h4>Servicio: {comment.service.name}</h4>
            <p>Comentario: {comment.text}</p>
            <p>Fecha: {new Date(comment.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
