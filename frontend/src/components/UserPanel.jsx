import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/userPanel.css';

const UserPanel = () => {
  const [user, setUser] = useState({});
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState('');
  const [contracts, setContracts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchUserPets();
    fetchUserContracts();
    fetchUserComments();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(response.data);
  };

  const fetchUserPets = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user/pets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPets(response.data);
  };

  const fetchUserContracts = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user/contracts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setContracts(response.data);
  };

  const fetchUserComments = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/user/comments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setComments(response.data);
  };

  const handleNewPetChange = (e) => {
    setNewPet(e.target.value);
  };

  const handleAddPet = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:3000/user/pets',
      { type: newPet },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchUserPets();
  };

  return (
    <div className="user-panel-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Usuario</h2>
        <nav className="sidebar-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#contracts">Historial contrataciones</a>
          <a href="#comments">Comentarios</a>
          <a href="#help">Help</a>
        </nav>
        <button className="logout-button">Cerrar Sesión</button>
      </aside>
      <main className="main-content">
        <section id="dashboard" className="dashboard-section">
          <h2>Dashboard</h2>
          <div className="user-info">
            <h3>{user.firstName} {user.lastName}</h3>
            <p><strong>Mail:</strong> {user.email}</p>
            <p><strong>Domicilio:</strong> {user.address}</p>
            <p><strong>Tel:</strong> {user.phoneNumber}</p>
            <div className="pet-selector">
              <label>Mascotas:</label>
              <select value={newPet} onChange={handleNewPetChange}>
                <option value="">Seleccione una mascota</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                {/* Agrega más opciones según tus necesidades */}
              </select>
              <button onClick={handleAddPet}>REGISTRAR NUEVA MASCOTA</button>
            </div>
          </div>
        </section>
        <section id="contracts" className="contracts-section">
          <h2>Historial contrataciones</h2>
          <table className="contracts-table">
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id}>
                  <td>{contract.service}</td>
                  <td>{new Date(contract.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="comments" className="comments-section">
          <h2>Comentarios</h2>
          <table className="comments-table">
            <thead>
              <tr>
                <th>Tu comentario</th>
                <th>Servicio comentado</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.text}</td>
                  <td>{comment.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default UserPanel;
