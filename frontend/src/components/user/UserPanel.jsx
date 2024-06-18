import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/userPanel.css";

export function UserPanel() {
  const { user } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({});
  const [serviceRequests, setServiceRequests] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [newPetType, setNewPetType] = useState('');
  const [newPetQuantity, setNewPetQuantity] = useState('');

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
      const response = await fetch("http://localhost:3000/me/service-requests", {
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
      const petData = { pets: [{ type: newPetType, quantity: newPetQuantity }] };
      console.log('Enviando datos de mascota:', petData); // Añadir log para verificar los datos
      const response = await fetch("http://localhost:3000/pets", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(petData),
      });
      if (response.ok) {
        alert('Mascota añadida con éxito');
        setNewPetType('');
        setNewPetQuantity('');
        fetchUserInfo(); // Actualizar información del usuario
      } else {
        const errorData = await response.json();
        console.error('Error al añadir la mascota:', errorData);
      }
    } catch (error) {
      console.error('Error al añadir la mascota:', error);
    }
  };

  if (user?.role !== "usuario") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="userPanelContainer">
      <h2>Dashboard</h2>
      <div className="dashboard">
        <div className="userInfo">
          <h3>{userInfo.firstName} {userInfo.lastName}</h3>
          <p><strong>Mail:</strong> {userInfo.email}</p>
          <p><strong>Domicilio:</strong> {userInfo.address}</p>
          <p><strong>Tel:</strong> {userInfo.phoneNumber}</p>
          <select>
            {userInfo.pets?.map((pet, index) => (
              <option key={index} value={pet.type}>
                {pet.type} ({pet.quantity})
              </option>
            ))}
          </select>
          <div>
            <select value={newPetType} onChange={(e) => setNewPetType(e.target.value)}>
              <option value="">Selecciona un tipo de mascota</option>
              <option value="Dog">Perro</option>
              <option value="Cat">Gato</option>
              <option value="Bird">Pájaro</option>
              <option value="Fish">Pez</option>
              <option value="Reptile">Reptil</option>
            </select>
            <input 
              type="number" 
              value={newPetQuantity} 
              onChange={(e) => setNewPetQuantity(e.target.value)} 
              placeholder="Cantidad"
            />
            <button onClick={handleAddPet}>REGISTRAR NUEVA MASCOTA</button>
          </div>
        </div>
        <div className="serviceHistory">
          <h3>Historial contrataciones</h3>
          <ul>
            {serviceRequests.map((request) => (
              <li key={request.id}>
                <span>{request.service.name}</span>
                <span>{new Date(request.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
          <a href="#">Ver todas las contrataciones</a>
        </div>
        <div className="commentsSection">
          <h3>Comentarios</h3>
          <ul>
            {userComments.map((comment) => (
              <li key={comment.id}>
                <div>
                  <strong>Tu comentario:</strong> {comment.text}
                </div>
                <div>
                  <strong>Servicio comentado:</strong> {comment.service.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
