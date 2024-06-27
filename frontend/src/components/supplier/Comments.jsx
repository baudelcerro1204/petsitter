import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";
import { ProveedorSidebar } from "../general/SideBar";
import { PuntajeHuesos } from "../general/PuntajeHuesos";

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

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3000/comments/delete/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar el comentario");
      }

      setReceivedComments(receivedComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(receivedComments) &&
              receivedComments.map((comment) => (
                <tr key={comment.id}>
                  <td>
                    {comment.user?.firstName} {comment.user?.lastName}
                  </td>
                  <td>{comment.service?.name}</td>
                  <td>{comment.text}</td>
                  <td>
                    <PuntajeHuesos
                      puntaje={comment.rating}
                      mascotas={{ length: 2 }}
                    />
                  </td>
                  <td>
                    <button onClick={() => deleteComment(comment.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
