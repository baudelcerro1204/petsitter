import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../constants/AppContext";
import { useNavigate } from "react-router-dom";

export function Services() {
  const { user } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "usuario" || user?.role === "proveedor") {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/services", {
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

  if (!user) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  const handleContract = (service) => {
    navigate(`/service/${service.id}`, { state: { service } });
  };  

  return (
    <div className="servicesContainer">
      <h2>Servicios Disponibles</h2>
      <ul className="servicesList">
        {services.map((service) => (
          <li key={service.id} className="serviceItem">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Categoria: {service.category}</p>
            <p>Duración: {service.duration} minutos</p>
            <p>Frecuencia: {service.frequency}</p>
            <p>Costo: ${service.cost}</p>
            <p>Estado: {service.status}</p>
            {user.role === "usuario" && (
              <button onClick={() => handleContract(service)}>Contratar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
