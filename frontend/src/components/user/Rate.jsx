import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/userPanel.css";
import { UserSidebar } from "../general/SideBar";

export function Rate() {
  const { serviceId } = useParams();
  const { user } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({});
  const [serviceRequests, setServiceRequests] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [newPetType, setNewPetType] = useState("");
  const [newPetQuantity, setNewPetQuantity] = useState("");
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    try {
      const response = await fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          rating: newRating,
          text: newComment,
          serviceId: serviceId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al calificar el servicio");
      }
    } catch (error) {
      console.error("Error al calificar el servicio:", error);
    }
  };

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

  console.log(serviceRequests);
  return (
    <>
      <UserSidebar />
      <div className="providerPanelContainer">
        <h2>Historial de Contrataciones</h2>
        <div className="dashboard-section">
          <div>
            <h3>Calificar este servicio</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Deja tu comentario aquí"
            />
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= rating ? "gold" : "grey",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
