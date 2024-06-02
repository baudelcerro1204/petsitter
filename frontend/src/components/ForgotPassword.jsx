import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/forgot_password.css';
import logoImage from '../assets/images/logo.png';
import resetIllustration from '../assets/images/reset-illustration.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate(`/reset-password/${response.data.token}`);
      }, 2000); // Redirect to reset password page after 2 seconds
    } catch (err) {
      setError('Error al enviar la solicitud de restablecimiento de contraseña');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <img src={logoImage} alt="Pet Buddies Logo" className="logo" />
        <h2>Olvidé mi contraseña</h2>
        <p>No te preocupes, a todos nos pasa. Ingresa tu mail para recuperar la contraseña</p>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Enviar</button>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
      <div className="forgot-password-image">
        <img src={resetIllustration} alt="Reset Illustration" />
      </div>
    </div>
  );
}

export default ForgotPassword;
