import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/petform.css'; // Asegúrate de tener el archivo CSS
import Pet from '../assets/images/pet-love.png';

const PetForm = () => {
  const [pets, setPets] = useState([{ type: '', quantity: 1 }]);

  const handleChange = (index, event) => {
    const values = [...pets];
    values[index][event.target.name] = event.target.value;
    setPets(values);
  };

  const handleAdd = () => {
    setPets([...pets, { type: '', quantity: 1 }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Asume que el token se almacena en localStorage
      await axios.post('http://localhost:3000/pets', { pets }, {
        headers: {
          Authorization: `Bearer ${token}` // Asegúrate de que el token JWT esté incluido en el encabezado
        }
      });
      alert('Datos enviados con éxito');
    } catch (error) {
      console.error('Error al enviar los datos', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Mascotas</h2>
        <p>Ingrese cuántas y de qué tipo (perro, gato, etc) son sus mascotas</p>
        <form onSubmit={handleSubmit}>
          {pets.map((pet, index) => (
            <div key={index} className="pet-input">
              <input
                type="number"
                name="quantity"
                value={pet.quantity}
                onChange={(event) => handleChange(index, event)}
                min="1"
                placeholder="Cantidad"
                required
              />
              <select
                name="type"
                value={pet.type}
                onChange={(event) => handleChange(index, event)}
                required
              >
                <option value="">Seleccione el tipo de mascota</option>
                <option value="Dog">Perro</option>
                <option value="Cat">Gato</option>
                <option value="Bird">Pájaro</option>
                <option value="Fish">Pez</option>
                <option value="Reptile">Reptil</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleAdd}>Añadir otra mascota</button>
          <button type="submit">Confirmar datos</button>
        </form>
      </div>
      <div className="login-image">
        <img src={Pet} alt="Pet Buddies" />
      </div>
    </div>
  );
};

export default PetForm;
