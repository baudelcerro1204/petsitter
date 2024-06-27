import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../constants/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../general/NavBar";
import { Footer } from "../general/Footer";
import "../../constants/css/services.css";
import { PuntajeHuesos } from "../general/PuntajeHuesos";
import Foto from "../../assets/ejemplo.png"; // Asegúrate de que esta ruta sea correcta

export function Services() {
  let { serviceType } = useParams();
  console.log(serviceType);
  const { user } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [rating, setRating] = useState("0");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedPetType, setSelectedPetType] = useState(""); // Estado para almacenar el tipo de mascota seleccionado
  const [selectedFrequency, setSelectedFrequency] = useState(""); // Estado para almacenar la frecuencia seleccionada
  const [selectedZone, setSelectedZone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "usuario" || user?.role === "proveedor") {
      const fetchServices = async () => {
        try {
          let url = "http://localhost:3000/services";
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al obtener los servicios: ${errorText}`);
          }
          const data = await response.json();
          await fetchAverageRatings(data); // Obtener los promedios de calificaciones
          setServices(data);
        } catch (error) {
          console.error("Error al obtener los servicios:", error);
        }
      };

      fetchServices();
    }
  }, [user]);

  const fetchAverageRatings = async (services) => {
    const updatedServices = await Promise.all(
      services.map(async (service) => {
        try {
          const response = await fetch(
            `http://localhost:3000/comments/average-rating/${service.id}`
          );
          const data = await response.json();
          service.averageRating = data.averageRating;
        } catch (error) {
          console.error(
            `Error al obtener el promedio de calificaciones para el servicio ${service.id}:`,
            error
          );
          service.averageRating = 0;
        }
        return service;
      })
    );
    setServices(updatedServices);
  };

  if (!user) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  const handleContract = (service) => {
    navigate(`/service/${service.id}`, { state: { service } });
  };

  const mapServiceType = (type) => {
    const types = {
      paseos: "Paseo",
      adiestramientos: "Adiestramiento",
      cuidados: "Cuidado",
    };
    return types[type] || type; // Retorna la versión mapeada o el tipo original si no se encuentra en el mapeo
  };

  // Usar la función mapServiceType para transformar serviceType
  const displayServiceType = mapServiceType(serviceType);

  const [filteredServices, setFilteredServices] = useState(
    services.filter(
      (service) =>
        service.status === "habilitado" &&
        (displayServiceType ? service.category === displayServiceType : true)
    )
  );

  useEffect(() => {
    // Mapea los valores de serviceType a los valores esperados por el <select>
    const serviceTypeMap = {
      paseos: "Paseo",
      adiestramientos: "Adiestramiento",
      cuidados: "Cuidado",
    };

    // Actualiza el estado basado en serviceType o reestablece a la opción por defecto si es undefined
    setSelectedServiceType(serviceTypeMap[serviceType] || "");
  }, [serviceType]);

  const handlePetTypeChange = (event) => {
    setSelectedPetType(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setSelectedFrequency(event.target.value);
  };

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSelectChange = (event) => {
    const newSelectedServiceType = event.target.value;
    setSelectedServiceType(newSelectedServiceType);

    // Usa newSelectedServiceType para filtrar, ya que selectedServiceType aún no se ha actualizado
    const filtered = services.filter(
      (service) =>
        service.status === "habilitado" &&
        (newSelectedServiceType
          ? service.category === newSelectedServiceType
          : true)
    );
    setFilteredServices(filtered);
  };

  useEffect(() => {
    // Filtrar servicios basándose en el tipo de servicio, tipo de mascota, frecuencia, zona y calificación seleccionados
    const filtered = services.filter(
      (service) =>
        service.status === "habilitado" &&
        (!selectedServiceType || service.category === selectedServiceType) &&
        (!selectedPetType ||
          service.petTypes.some((pet) => pet.petType === selectedPetType)) &&
        (!selectedFrequency || service.frequency === selectedFrequency) &&
        (!selectedZone || service.zone === selectedZone) &&
        (!rating || Math.round(service.averageRating) >= parseInt(rating))
    );
    setFilteredServices(filtered);
  }, [
    services,
    selectedServiceType,
    selectedPetType,
    selectedFrequency,
    selectedZone,
    rating,
  ]); // Dependencias actualizadas para incluir los nuevos filtros

  console.log(services);
  return (
    <>
      <NavBar />
      <h2 className="titulo">Servicios</h2>
      <div className="servicesContainer">
        <div className="filtros">
          <div className="filtro">
            <label htmlFor="serviceTypeSelect">Categoría: </label>
            <select
              id="serviceTypeSelect"
              value={selectedServiceType}
              onChange={handleSelectChange}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Paseo">Paseos</option>
              <option value="Adiestramiento">Adiestramientos</option>
              <option value="Cuidado">Cuidados</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="petTypeSelect">Mascota: </label>
            <select
              id="petTypeSelect"
              value={selectedPetType}
              onChange={handlePetTypeChange}
            >
              <option value="">Tipo</option>
              <option value="Dog">Perro</option>
              <option value="Cat">Gato</option>
              <option value="Bird">Pájaro</option>
              <option value="Fish">Pez</option>
              <option value="Reptile">Reptil</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="frequencySelect">Frecuencia: </label>
            <select
              id="frequencySelect"
              value={selectedFrequency}
              onChange={handleFrequencyChange}
            >
              <option value="">Tiempo</option>
              <option value="diaria">Diaria</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
          <div className="filtro">
            <label htmlFor="zoneSelect">Zona: </label>
            <select
              id="zoneSelect"
              value={selectedZone}
              onChange={handleZoneChange}
            >
              <option value="">Barrio</option>
              <option value="Palermo">Palermo</option>
              <option value="Recoleta">Recoleta</option>
              <option value="Belgrano">Belgrano</option>
            </select>
          </div>
          <div className="filtro">
            <label>Calificación mayor a: </label>
            <div className="calificacion">
              {[0, 1, 2, 3, 4, 5].map((value) => (
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
              <img
                src={service.imageUrl || Foto}
                alt={service.name}
                className="serviceImage"
                onError={(e) => {
                  e.target.src = Foto;
                }} // Fallback en caso de error de carga
              />
              <div className="textContent">
                <div>
                  <h3>{`${service.provider.firstName} ${service.provider.lastName}`}</h3>
                  <p>Categoria: {service.category}</p>
                  <p>
                    Para:{" "}
                    {service.petTypes.map((pet) => pet.petType).join(", ")}
                  </p>
                  <p>{service.description}</p>
                </div>
                <PuntajeHuesos
                  puntaje={Math.round(service.averageRating)}
                  mascotas={service.petTypes.map((pet) => pet.petType)}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
