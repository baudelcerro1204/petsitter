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
  const [newComment, setNewComment] = useState('');
  const [hasContracted, setHasContracted] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.service) {
      setService(state.service);
      fetchComments(state.service.id);
      checkCanRate(state.service.id);
      checkHasContracted(state.service.id);
      fetchAverageRating(state.service.id);
    } else {
      fetchServiceById(id);
    }
  }, [id, state]);

  const fetchServiceById = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:3000/services/${serviceId}`);
      if (!response.ok) {
        throw new Error("Error al obtener el servicio");
      }
      const data = await response.json();
      setService(data);
      fetchComments(serviceId);
      checkCanRate(serviceId);
      checkHasContracted(serviceId);
      fetchAverageRating(serviceId);
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
      const response = await fetch(`http://localhost:3000/comments/can-rate/${serviceId}`, {
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
      const response = await fetch(`http://localhost:3000/comments/has-contracted/${serviceId}`, {
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

  const fetchAverageRating = async (serviceId) => {
    try {
      const response = await fetch(`http://localhost:3000/comments/average-rating/${serviceId}`);
      const data = await response.json();
      setAverageRating(data.averageRating ? parseFloat(data.averageRating) : 0);
    } catch (error) {
      console.error("Error al obtener el promedio de calificaciones:", error);
    }
  };

  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    try {
      const response = await fetch(`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ rating: newRating, text: newComment, serviceId: service.id }),
      });

      if (!response.ok) {
        throw new Error("Error al calificar el servicio");
      }
      fetchComments(service.id); // Refresh comments
      fetchAverageRating(service.id); // Refresh average rating
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

  console.log(service);

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
              <li>Ubicacion: {service.zone}</li>
              <li>Inicio: {service.startDate}</li>
              <li>Fin: {service.endDate}</li>

              <li className="cost">Costo: ${service.cost}</li>
              <p className="description">{service.description}</p>
              <button onClick={handleSendMessage}>
                {hasContracted ? "Contratarlo de nuevo" : "Contratar"}
              </button>
            </div>
          </div>
          <img src={service.imageUrl || Foto} alt={service.name} className="serviceImage" />
        </div>


        <div className="reviewsContainer">
          <h3>Reseñas ({service.averageRating} ⭐)</h3>
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
                <PuntajeHuesos puntaje={Math.round(comment.rating)} mascotas={service.petTypes.map(pet => pet.petType)}/>
              </div>
            ))}
          </div>
          {/* <h3>Calificación promedio: {averageRating.toFixed(2)} / 5</h3> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
