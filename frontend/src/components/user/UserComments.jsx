import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/userPanel.css";
import { UserSidebar } from "../general/SideBar";
import { PuntajeHuesos } from "../general/PuntajeHuesos";

export function UserComments() {
  const { user } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({});
  const [serviceRequests, setServiceRequests] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [newPetType, setNewPetType] = useState("");
  const [newPetQuantity, setNewPetQuantity] = useState("");

  useEffect(() => {
    fetchUserInfo();
    fetchServiceRequests();
    fetchUserComments();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/me/service-requests",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setServiceRequests(data);
    } catch (error) {
      console.error("Error al obtener las solicitudes de servicio:", error);
    }
  };

  const fetchUserComments = async () => {
    try {
      const response = await fetch("http://localhost:3000/me/comments", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setUserComments(data);
    } catch (error) {
      console.error("Error al obtener los comentarios del usuario:", error);
    }
  };

  const handleAddPet = async () => {
    try {
      const petData = {
        pets: [{ type: newPetType, quantity: newPetQuantity }],
      };
      console.log("Enviando datos de mascota:", petData);
      const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(petData),
      });
      if (response.ok) {
        alert("Mascota añadida con éxito");
        setNewPetType("");
        setNewPetQuantity("");
        fetchUserInfo();
      } else {
        const errorData = await response.json();
        console.error("Error al añadir la mascota:", errorData);
      }
    } catch (error) {
      console.error("Error al añadir la mascota:", error);
    }
  };

  if (user?.role !== "usuario") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <>
      <UserSidebar />
      <div className="providerPanelContainer">
        <h2>Reseñas</h2>

        <div style={{ marginTop: 20 }} className="dashboard-section">
          <table className="servicesTable">
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Comentario</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userComments) &&
                userComments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.service.name}</td>
                    <td>{comment.text}</td>
                    <td>
                      <PuntajeHuesos
                        puntaje={comment.rating}
                        mascotas={{ length: 2 }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
