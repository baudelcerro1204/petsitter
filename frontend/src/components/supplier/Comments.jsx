import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";
import { ProveedorSidebar } from "../general/SideBar";

export function Comments() {
  const { user } = useContext(AppContext);
  const [receivedComments, setReceivedComments] = useState([]);

  useEffect(() => {
    if (user && user.token) {
      fetchComments();
    }
  }, [user]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/provider/comments`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al obtener los comentarios");
      }

      const data = await response.json();
      setReceivedComments(data);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  console.log(receivedComments);

  if (!user) {
    return <p>Cargando...</p>;
  }

  if (user.role !== "proveedor") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <>
      <ProveedorSidebar />
      <div className="providerPanelContainer">
        <h2>Panel del Proveedor</h2>
        <table className="servicesTable">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Servicio</th>
              <th>Comentario</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(receivedComments) &&
              receivedComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.user?.firstName} {comment.user?.lastName}</td>
                  <td>{comment.service?.name}</td>
                  <td>{comment.text}</td>
                  <td>{comment.rating}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
