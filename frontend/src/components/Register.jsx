import React, { useState } from "react";
import axios from "axios";
import "../assets/styles/register.css";
import registerIllustration from "../assets/images/register-illustration.png";
import logoImage from "../assets/images/logo.png";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/register", {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password,
        role: userType, // Usar "role" en lugar de "userType"
      });
      alert("Registro exitoso");
    } catch (err) {
      setError("Error al registrar");
    }
  };

  return (
    <div className="register-container">
      <img src={logoImage} alt="Pet Buddies Logo" className="logo" />
      <div className="register-image">
        <img src={registerIllustration} alt="Register Illustration" />
      </div>
      <div className="register-form">
        <h2>Registrarse</h2>
        <p>
          Completa los campos para que puedas acceder a tu cuenta de Pet Buddies
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group inline">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group inline">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group inline">
            <div className="form-group">
              <label>Domicilio</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tipo de usuario</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Seleccione tipo de usuario</option>
                <option value="usuario">Usuario</option>
                <option value="proveedor">Proveedor</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group checkbox">
            <input type="checkbox" />
            <label>
              Acepto todos los <a href="#">Términos y Condiciones de uso</a>
            </label>
          </div>
          <button type="submit">Crear cuenta</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
