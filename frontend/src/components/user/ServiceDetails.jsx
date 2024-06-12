import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import '../../constants/css/serviceDetails.css';


export function ServiceDetails() {
  const { id } = useParams();
  const { user } = useContext(AppContext); // Obtén el usuario del contexto
  const [service, setService] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
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
      const response = await fetch(`http://localhost:3000/services/${serviceId}`);
      if (!response.ok) {
        throw new Error('Error al obtener el servicio');
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
      const response = await fetch(`http://localhost:3000/comments/${serviceId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener los comentarios:", error);
    }
  };

  const handleSendMessage = () => {
    navigate(`/messageform/${service.providerId}`, { state: { service } });
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    
    try {
      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Usa el token del contexto de aplicación
        },
        body: JSON.stringify({ text: newComment, serviceId: service.id })
      });
      if (response.ok) {
        const newCommentData = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment('');
      } else {
        console.error('Error al añadir comentario');
      }
    } catch (error) {
      console.error('Error al añadir comentario:', error);
    }
  };

  if (!service) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="serviceDetailsContainer">
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p>Categoria: {service.category}</p>
      <p>Duración: {service.duration} minutos</p>
      <p>Frecuencia: {service.frequency}</p>
      <p>Costo: ${service.cost}</p>
      <p>Estado: {service.status}</p>
      <button onClick={handleSendMessage}>Enviar Mensaje</button>
      
      <div className="commentsSection">
        <h3>Comentarios</h3>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              {comment.user ? (
                <small>Por: {comment.user.firstName} {comment.user.lastName}</small>
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
      </div>
    </div>
  );
}
