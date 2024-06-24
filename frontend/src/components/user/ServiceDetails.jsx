import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/serviceDetails.css";
import { NavBar } from "../general/NavBar";
import { Footer } from "../general/Footer";
import Foto from "../../assets/ejemplo.png";
import { PuntajeHuesos } from "../general/PuntajeHuesos";

export function ServiceDetails() {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const [service, setService] = useState(null);
  const [comments, setComments] = useState([]);
  const [canRate, setCanRate] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasContracted, setHasContracted] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.service) {
      setService(state.service);
      fetchComments(state.service.id);
      checkCanRate(state.service.id);
      checkHasContracted(state.service.id);
      fetchUserRating(state.service.id);
    } else {
      fetchServiceById(id);
    }
  }, [id, state]);

  const fetchServiceById = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:3000/service/${serviceId}`);
      if (!response.ok) {
        throw new Error("Error al obtener el servicio");
      }
      const data = await response.json();
      setService(data);
      fetchComments(serviceId);
      checkCanRate(serviceId);
      checkHasContracted(serviceId);
      fetchUserRating(serviceId);
    } catch (error) {
      console.error("Error al obtener el servicio:", error);
    }
  };

  const fetchComments = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:3000/comments/${serviceId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  const checkCanRate = async (serviceId) => {
    if (!user || !user.token) {
      console.error("Usuario no autenticado o token no válido");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/can-rate/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setCanRate(data.canRate);
    } catch (error) {
      console.error("Error al verificar el permiso de calificación:", error);
    }
  };

  const checkHasContracted = async (serviceId) => {
    if (!user || !user.token) {
      console.error("Usuario no autenticado o token no válido");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/has-contracted/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setHasContracted(data.hasContracted);
    } catch (error) {
      console.error("Error al verificar si el usuario ya contrató el servicio:", error);
    }
  };

  const fetchUserRating = async (serviceId) => {
    if (!user || !user.token) {
      console.error("Usuario no autenticado o token no válido");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/user-rating/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setRating(data.rating || 0);
    } catch (error) {
      console.error("Error al obtener la calificación del usuario:", error);
    }
  };

  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    try {
      const response = await fetch(`http://localhost:3000/rate/${service.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ rating: newRating }),
      });

      if (!response.ok) {
        throw new Error("Error al calificar el servicio");
      }
    } catch (error) {
      console.error("Error al calificar el servicio:", error);
    }
  };

  const handleSendMessage = () => {
    navigate(`/messageform/${service.providerId}`, { state: { service } });
  };

  if (!service) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="serviceDetailsContainer">
        <div className="principal">
          <div className="textContent">
            <p className="category">Categoria: {service.category}</p>
            <h2>{service.name}</h2>
            <div className="details">
              <li>Duración: {service.duration} minutos</li>
              <li>Frecuencia: {service.frequency}</li>
              <li className="cost">Costo: ${service.cost}</li>
              <p className="description">{service.description}</p>
              <button onClick={handleSendMessage}>
                {hasContracted ? "Contratarlo de nuevo" : "Contratar"}
              </button>
            </div>
          </div>
          <img src={service.imageUrl || Foto} alt={service.name} className="serviceImage" />
        </div>

        {canRate && (
          <div>
            <h3>Calificar este servicio</h3>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'grey' }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="reviewsContainer">
          <h3>Reseñas</h3>
          <div className="reviews">
            {comments.map((comment) => (
              <div key={comment.id} className="review">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p className="nombre">
                    {comment.user.firstName} {comment.user.lastName}
                  </p>
                  <p>{comment.text}</p>
                </div>
                <PuntajeHuesos puntaje={4} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
