import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../constants/AppContext";
import Logo from "../../assets/logo.svg";
import loginImage from "../../assets/login.svg";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";
import "../../constants/css/auth.css";

export function Login() {
  const { setUser, setIsAuthenticated } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Manejo de mensajes de error
  const navigate = useNavigate(); // Para redirigir después del login

  const login = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario autenticado: ", data);
        setUser(data);
        setIsAuthenticated(true); // Establecer autenticación como verdadera
        navigate("/"); // Redirigir a la pantalla de inicio
      } else {
        const errorData = await response.text();
        console.log(
          "Error de inicio de sesión, código de estado: ",
          response.status,
          "Mensaje de error: ",
          errorData
        );
        setErrorMessage(`${errorData}`);
        alert("Error al iniciar sesión");
      }
    } catch (error) {
      console.error(`Failed to login: ${error}`);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      console.log("Error de inicio de sesión: ", errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      <Link to="/" className="logoauth">
        <img src={Logo} alt="Logo" />
      </Link>
      <div className="authContainer">
        <form className="form" onSubmit={login}>
          <h2 className="formTitle">Iniciar Sesion</h2>
          <h4 className="formSubtitle">
            Inicia Sesion para acceder a tu cuenta de pet buddies
          </h4>
          <div className="input-container">
            <input
              id="emailInput"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="emailInput" className={email ? "label-focus" : ""}>
              Email
            </label>
          </div>
          <div className="input-container">
            <div style={{ position: "relative" }}>
              <input
                id="passwordInput"
                className="input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="passwordInput"
                className={password ? "label-focus" : ""}
              >
                Password
              </label>
              <button
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeOff style={{ color: 'black' }} /> : <Eye style={{ color: 'black' }} />}
              </button>
            </div>
          </div>

          <div className="afterInputs">
            <div className="recordame">
              <input type="checkbox" />
              <label>Recordame</label>
            </div>
            <div className="olvideLaContraseña">
              <Link className="link" to="/forgot-password">
                Olvide la contraseña
              </Link>
            </div>
          </div>
          <button className="loginButton" type="submit">
            Iniciar Sesion
          </button>
          <p className="crearCuenta">
            ¿No tienes una cuenta?{" "}
            <Link className="link" to="/register">
              Registrate
            </Link>
          </p>
        </form>
        <div className="heroContainer">
          <img className="hero" src={loginImage} alt="login" />
        </div>
      </div>
    </>
  );
}
