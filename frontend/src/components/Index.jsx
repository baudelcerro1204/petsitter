import React, { useContext } from "react";
import { AppContext } from "../constants/AppContext";
import { NavBar } from "./general/NavBar";
import "../constants/css/index.css";
import logoChico from "../assets/logoChico.svg";
import Background from "../assets/background.svg";
import { Footer } from "./general/Footer";
import { Link } from "react-router-dom";

export function Index() {
  const { isAuthenticated } = useContext(AppContext);

  // Agrega un console.log para verificar si el usuario está autenticado
  console.log("Index component: Usuario autenticado:", isAuthenticated);

  return (
    <>
      <NavBar />
      <div className="heroContainer">
        <div className="intro">
          <h1>¡Nos encargamos de tu mascota mientras tu no puedes!</h1>
          <p>
            Contamos con los mejores servicios de aseo y cuidado para tu mascota
          </p>
          <button>Mas informacion &gt;</button>
        </div>
        <div className="hero">
          <img src={Background} alt="hero" />
        </div>
      </div>
      <div className="serviciosContainer" id="servicios">
        <Link to={"/services"} style={{ textDecoration: "none" }}>
          <h2>Nuestros Servicios</h2>
        </Link>
        <div className="titulo"></div>
        <div className="servicios">
          <Link to={"/services/cuidados"} className="servicio">
            <div className="simbolo">
              <img src={logoChico} alt="" />
            </div>
            <h3>Cuidados</h3>
          </Link>

          <Link to={"/services/adiestramientos"} className="servicio">
            <div className="simbolo">
              <img src={logoChico} alt="" />
            </div>
            <h3>Adiestramientos</h3>
          </Link>

          <Link to={"/services/paseos"} className="servicio">
            <div className="simbolo">
              <img src={logoChico} alt="" />
            </div>
            <h3>Paseos</h3>
          </Link>
        </div>
      </div>
      <div className="nosotrosContainer" id="nosotros">
        <h2>Sobre Nosotros</h2>
        <div className="titulo"></div>
        <div className="nosotros">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            convallis libero in dui sollicitudin, nec ultricies ex aliquet.
            Curabitur nec mi quis libero ultrices lacinia. Nulla facilisi.
            Phasellus nec risus et nunc ultricies ultricies. Nulla facilisi.
            Phasellus nec risus et nunc ultricies ultricies. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Optio dolor amet deserunt
            quam enim molestias corporis, veniam consectetur, sunt aperiam
            libero eius beatae eveniet omnis doloremque! Dolorem vero delectus
            itaque?Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quas molestias ad corrupti soluta ratione dolor, minima iure
            necessitatibus cupiditate voluptas reiciendis numquam, sapiente ea
            enim ut doloremque! Illo, dolorum tempora?
          </p>
        </div>
      </div>
      <div id="contactanos" />
      <Footer />
    </>
  );
}
