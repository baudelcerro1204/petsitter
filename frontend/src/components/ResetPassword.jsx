import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/reset_password.css';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/reset-password', { token, newPassword });
      setMessage('Contraseña restablecida exitosamente');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect to login page after 3 seconds
    } catch (err) {
      setError('Error al restablecer la contraseña');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2>Cambiar contraseña</h2>
        <p>La contraseña anterior fue borrada, por favor ingrese la nueva contraseña</p>
        <form onSubmit={handleSubmit}>
          <label>Nueva contraseña:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <label>Confirmar nueva contraseña:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit">Cambiar contraseña</button>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
