import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../constants/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../general/NavBar";
import { Footer } from "../general/Footer";
import "../../constants/css/services.css";
import Foto from "../../assets/ejemplo.png";
import { PuntajeHuesos } from "../general/PuntajeHuesos";

export function Services() {
  const { user } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const { serviceType } = useParams();
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (user?.role === "usuario" || user?.role === "proveedor") {
      const fetchServices = async () => {
        try {
          let url = `http://localhost:3000/services/${serviceType}`;
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error("Error al obtener los servicios:", error);
        }
      };

      fetchServices();
    }
  }, [user, serviceType]);

  if (!user) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  const handleContract = (service) => {
    navigate(`/service/${service.id}`, { state: { service } });
  };

  const handleSelectChange = (event) => {
    const selectedServiceType = event.target.value;
    navigate(`/services/${selectedServiceType.toLowerCase()}`);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <>
      <NavBar />
      <h2 className="titulo">
        {capitalizeFirstLetter(serviceType) || "Servicios"}
      </h2>
      <div className="servicesContainer">
        <div className="filtros">
          <div className="filtro">
            <label htmlFor="serviceTypeSelect">Categoría: </label>
            <select
              id="serviceTypeSelect"
              value={serviceType}
              onChange={handleSelectChange}
            >
              <option value="paseos">Paseos</option>
              <option value="adiestramientos">Adiestramientos</option>
              <option value="cuidados">Cuidados</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="petTypeSelect">Mascota: </label>
            <select id="petTypeSelect">
              <option value="">Tipo</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="frequencySelect">Frecuencia: </label>
            <select id="frequencySelect">
              <option value="">Tiempo</option>
              <option value="diaria">Diaria</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="startDate">Inicio: </label>
            <input type="date" id="startDate" />
          </div>
          <div className="filtro">
            <label htmlFor="endDate">Finalización: </label>
            <input type="date" id="endDate" />
          </div>
          <div className="filtro">
            <label htmlFor="zoneSelect">Zona: </label>
            <select id="zoneSelect">
              <option value="">Barrio</option>
              <option value="zona1">Zona 1</option>
              <option value="zona2">Zona 2</option>
              <option value="zona3">Zona 3</option>
            </select>
          </div>
          <div className="filtro">
            <label>Calificación: </label>
            <div className="calificacion">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="rating"
                    value={value.toString()}
                    checked={rating === value.toString()}
                    onChange={handleRatingChange}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="servicesList">
          {services.map((service) => (
            <button
              onClick={() => handleContract(service)}
              key={service.id}
              className="serviceItem"
            >
              <img src={Foto} alt={service.name} className="serviceImage" />
              <div className="textContent">
                <div>
                  <h3>Nombre del proveedor</h3>
                  <p>Categoria: {service.category}</p>
                  <p>{service.description}</p>
                </div>
                <PuntajeHuesos puntaje={4} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export function GeneralServices() {
  const { user } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "usuario" || user?.role === "proveedor") {
      const fetchServices = async () => {
        try {
          // URL fija sin añadir serviceType
          let url = "http://localhost:3000/services";
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error("Error al obtener los servicios:", error);
        }
      };

      fetchServices();
    }
  }, [user]);

  if (!user) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  const handleContract = (service) => {
    navigate(`/service/${service.id}`, { state: { service } });
  };

  const [filteredServices, setFilteredServices] = useState(services);

  const handleSelectChange = (event) => {
    const selectedServiceType = event.target.value;

    if (selectedServiceType) {
      const filtered = services.filter(
        (service) => service.category === selectedServiceType
      );
      setFilteredServices(filtered);
    } else {
      // Si no se selecciona ninguna categoría, mostrar todos los servicios
      setFilteredServices(services);
    }
  };

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);
  
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  console.log(filteredServices);

  return (
    <>
      <NavBar />
      <h2 className="titulo">Servicios</h2>
      <div className="servicesContainer">
        <div class="filtros">
          <div className="filtro">
            <label for="serviceTypeSelect">Categoría: </label>
            <select id="serviceTypeSelect" onChange={handleSelectChange}>
              <option value="">Seleccione una categoría</option>
              <option value="Paseo">Paseos</option>
              <option value="Adiestramiento">Adiestramientos</option>
              <option value="Cuidado">Cuidados</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="petTypeSelect">Mascota: </label>
            <select id="petTypeSelect">
              <option value="">Tipo</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="frequencySelect">Frecuencia: </label>
            <select id="frequencySelect">
              <option value="">Tiempo</option>
              <option value="diaria">Diaria</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="startDate">Inicio: </label>
            <input type="date" id="startDate" />
          </div>
          <div className="filtro">
            <label htmlFor="endDate">Finalización: </label>
            <input type="date" id="endDate" />
          </div>
          <div className="filtro">
            <label htmlFor="zoneSelect">Zona: </label>
            <select id="zoneSelect">
              <option value="">Barrio</option>
              <option value="zona1">Zona 1</option>
              <option value="zona2">Zona 2</option>
              <option value="zona3">Zona 3</option>
            </select>
          </div>
          <div className="filtro">
            <label>Calificación: </label>
            <div className="calificacion">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="rating"
                    value={value.toString()}
                    checked={rating === value.toString()}
                    onChange={handleRatingChange}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="servicesList">
          {filteredServices.map((service) => (
            <button
              onClick={() => handleContract(service)}
              key={service.id}
              className="serviceItem"
            >
              <img src={Foto} alt={service.name} className="serviceImage" />
              <div className="textContent">
                <div>
                  <h3>Nombre del proveedor</h3>
                  <p>Categoria: {service.category}</p>
                  <p>{service.description}</p>
                </div>
                <PuntajeHuesos puntaje={4} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
