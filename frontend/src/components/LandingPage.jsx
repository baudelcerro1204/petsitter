import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import NavbarAfterLogin from './NavbarAfterLogin';
import '../assets/styles/landing_page.css';
import Paseos from '../assets/images/walking-icon.png';
import Adiestramiento from '../assets/images/training-icon.png';
import Cuidados from '../assets/images/care-icon.png';
import HeroImage from '../assets/images/hero-image.png'; // Adjust the path as needed

function LandingPage() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
      <div className="App">
        {isAuthenticated ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
        <section className="hero">
          <div className="hero-text">
            <h1>¡Nos encargamos de tu mascota mientras tu no puedes!</h1>
            <p>Contamos con los mejores servicios de aseo y cuidado para tu mascota</p>
            <a href="#services" className="info-button">Más Información</a>
          </div>
          <img src={HeroImage} alt="Happy Dog" />
        </section>
        <section id="services" className="services">
          <h2>Nuestros Servicios</h2>
          <div className="service-cards">
            <button className="service-card">
              <img src={Cuidados} alt="Cuidado" />
              <h3>Cuidados</h3>
            </button>
            <button className="service-card">
              <img src={Adiestramiento} alt="Adiestramientos" />
              <h3>Adiestramientos</h3>
            </button>
            <button className="service-card">
              <img src={Paseos} alt="Paseos" />
              <h3>Paseos</h3>
            </button>
          </div>
        </section>
        <section id="about" className="about">
          <h2>Sobre Nosotros</h2>
          <p>Con años de experiencia en el cuidado de mascotas, entendemos que tus mascotas son más que simples animales: son miembros queridos de tu familia. Por eso, nos esforzamos continuamente para ofrecer el más alto nivel de cuidado y atención. Nuestros servicios son personalizados y adaptados a las necesidades únicas de cada mascota, desde el cuidado básico hasta necesidades médicas. Nos tomamos el tiempo para conocer a cada uno de nuestros clientes y sus mascotas, asegurándonos de que reciban el mejor servicio posible. Ya sea que necesites cuidados diarios, adiestramiento, o simplemente un paseo, estamos aquí para garantizar que reciban el cuidado personalizado que merecen.</p>
        </section>
        <section className="newsletter">
          <h2>Unete a nosotros y garantiza el mejor servicio</h2>
          <input type="email" placeholder="Escribe tu mail aquí" />
          <button className="signup-button">Registrate</button>
        </section>
        <footer className="footer">
          <div className="social-media">
            <p>Síguenos en nuestras redes</p>
            <a href="https://www.instagram.com">Instagram</a>
            <a href="https://www.facebook.com">Facebook</a>
          </div>
          <div className="contact-info">
            <div>
              <h3>Cuidados y Adiestramientos</h3>
              <p>11 0918 2018</p>
              <p>Av. Pérez, Figueroa Alcorta 757, Palomar, Ciudad Autónoma de Buenos Aires</p>
            </div>
            <div>
              <h3>Paseos</h3>
              <p>11 1503 2018</p>
              <p>Av. Pérez, Figueroa Alcorta 757, Palomar, Ciudad Autónoma de Buenos Aires</p>
            </div>
          </div>
        </footer>
      </div>
    );
}

export default LandingPage;
