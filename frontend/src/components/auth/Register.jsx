import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import registerImage from "../../assets/mensaje.svg";
import "../../constants/css/auth.css";


export function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "usuario",
  });
  const [errorMessage, setErrorMessage] = useState("");
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
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario registrado: ", data);
        navigate("/login"); // Redirige a la página de login
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData);
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setErrorMessage("Error al registrar el usuario");
    }
  };

  return (
    <>
      <Link to="/" className="logoauth">
        <img src={Logo} alt="Logo" />
      </Link>
      <div className="authContainer">
        <form className="form" onSubmit={handleSubmit}>
          <h2 style={{marginTop: 0}} className="formTitle">Registrarse</h2>
          <h4 style={{marginTop: 0}} className="formSubtitle">
            Crea una cuenta para unirte a pet buddies
          </h4>
          <div style={{marginTop: 0}} className="input-container">
            <input
              type="text"
              name="firstName"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label className={formData.firstName ? "label-focus" : ""}>
              Nombre
            </label>
          </div>
          <div style={{marginTop: 0}} className="input-container">
            <input
              type="text"
              name="lastName"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label className={formData.lastName ? "label-focus" : ""}>
              Apellido
            </label>
          </div>
          <div style={{marginTop: 0}} className="input-container">
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className={formData.email ? "label-focus" : ""}>Email</label>
          </div>
          <div style={{marginTop: 0}} className="input-container">
            <input
              type="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className={formData.password ? "label-focus" : ""}>
              Contraseña
            </label>
          </div>
          <div style={{marginTop: 0}} className="input-container">
            <input
              type="text"
              name="phoneNumber"
              className="input"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label className={formData.phoneNumber ? "label-focus" : ""}>
              Número de Teléfono
            </label>
          </div>
          <div style={{marginTop: 0}} className="input-container">
            <input
              type="text"
              name="address"
              className="input"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label className={formData.address ? "label-focus" : ""}>
              Dirección
            </label>
          </div>
          <div style={{marginTop: 0}} className="input-container">
            <select
              name="role"
              className="input"
              style={{ width: "100%"}}
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="usuario">Usuario</option>
              <option value="proveedor">Proveedor</option>
            </select>
          </div>
          <button className="loginButton" type="submit">
            Registrarse
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <p className="crearCuenta">
            ¿Ya tienes una cuenta?{" "}
            <Link className="link" to="/login">
              Inicia Sesión
            </Link>
          </p>
        </form>
        <div className="heroContainer">
          <img className="hero" src={registerImage} alt="register" />
        </div>
      </div>
    </>
  );
}
