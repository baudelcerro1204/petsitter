import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/send_message.css';

const SendMessage = () => {
  const { serviceId } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { loading } = useContext(AuthContext);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Debe iniciar sesión para enviar un mensaje');
      return;
    }

    const decodedToken = parseJwt(token);
    if (!decodedToken) {
      alert('Token inválido');
      return;
    }

    const senderId = decodedToken.id; // Supongo que el ID del usuario está en el campo "id" del JWT

    try {
      const response = await axios.get(`http://localhost:3000/services/${serviceId}`);
      const receiverId = response.data.providerId;

      await axios.post(
        'http://localhost:3000/messages',
        {
          senderId,
          receiverId,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      alert('Mensaje enviado con éxito');
      navigate(`/services/${serviceId}`);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        alert(`Error del servidor: ${error.response.data}`);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        alert('No se recibió respuesta del servidor');
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
        alert('Error al configurar la solicitud');
      }
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="send-message-container">
      <h2>Envíale un mensaje al proveedor</h2>
      <textarea
        placeholder="Escribe aquí tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Enviar solicitud</button>
    </div>
  );
};

export default SendMessage;
