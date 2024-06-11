import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'usuario',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Usuario registrado: ', data);
        navigate('/login'); // Redirige a la página de login
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrorMessage('Error al registrar el usuario');
    }
  };

  return (
    <div className="authContainer">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="formTitle">Registrarse</h2>
        <div className="input-container">
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Número de Teléfono"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="usuario">Usuario</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}
