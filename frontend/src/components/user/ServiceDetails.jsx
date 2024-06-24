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
  // const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.service) {
      setService(state.service);
      fetchComments(state.service.id);
    } else {
      fetchServiceById(id);
    }
  }, [id, state]);

  const fetchServiceById = async (serviceId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/service/${serviceId}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener el servicio");
      }
      const data = await response.json();
      setService(data);
      fetchComments(serviceId);
    } catch (error) {
      console.error("Error al obtener el servicio:", error);
    }
  };

  const fetchComments = async (serviceId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/${serviceId}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  // useEffect(() => {
  //   // Llama a generateComments y actualiza el estado con el resultado
  //   const generatedComments = generateComments();
  //   setComments(generatedComments);
  // }, []);

  // const generateComments = () => {
  //   let comments = [];
  //   for (let i = 1; i <= 10; i++) {
  //     comments.push({
  //       id: i,
  //       user: {
  //         firstName: `First ${i}`,
  //         lastName: `Last ${i}`,
  //       },
  //       text: `Description for service ${i} lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  //       category: "paseos",
  //     });
  //   }
  //   return comments;
  // };


  const handleSendMessage = () => {
    navigate(`/messageform/${service.providerId}`, { state: { service } });
  };

  // const handleAddComment = async () => {
  //   if (!newComment) return;

  //   try {
  //     const response = await fetch("http://localhost:3000/comments", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({ text: newComment, serviceId: service.id }),
  //     });
  //     if (response.ok) {
  //       const newCommentData = await response.json();
  //       setComments([...comments, newCommentData]);
  //       setNewComment("");
  //     } else {
  //       console.error("Error al añadir comentario");
  //     }
  //   } catch (error) {
  //     console.error("Error al añadir comentario:", error);
  //   }
  // };

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
              <button onClick={handleSendMessage}>Contratar</button>
            </div>
          </div>
          <img src={Foto} alt={service.name} />
        </div>

        {/* <div className="commentsSection">
          <h3>Comentarios</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.text}</p>
                {comment.user ? (
                  <small>
                    Por: {comment.user.firstName} {comment.user.lastName}
                  </small>
                ) : (
                  <small>Usuario desconocido</small>
                )}
              </li>
            ))}
          </ul>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Añadir un comentario"
          />
          <button onClick={handleAddComment}>Añadir Comentario</button>
        </div> */}

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


