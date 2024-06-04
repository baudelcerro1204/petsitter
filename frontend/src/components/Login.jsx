import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../assets/styles/login.css';
import loginIllustration from '../assets/images/login-illustration.png';
import logoImage from '../assets/images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      alert('Login exitoso');
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setIsAuthenticated(true);
      if (role === 'proveedor') {
        navigate('/supplier-panel');
      } else {
        navigate('/user-panel');
      }
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logoImage} alt="Pet Buddies Logo" style={{ marginBottom: '1rem' }} />
        <h2>Iniciar sesión</h2>
        <p>Inicia sesión para acceder a tu cuenta de Pet Buddies</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className="remember-me">
            <input type="checkbox" />
            <label>Recordarme</label>
            <a href="/forgot-password">Olvide la contraseña</a>
          </div>
          <button type="submit">Iniciar sesión</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>No tienes cuenta? <a href="/register">Registrate</a></p>
      </div>
      <div className="login-image">
        <img src={loginIllustration} alt="Login Illustration" />
      </div>
    </div>
  );
}

export default Login;
