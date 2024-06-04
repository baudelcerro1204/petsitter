import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/service_list.css';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error al obtener los servicios', error);
    }
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="service-list-container">
      {services.map((service) => (
        <div key={service.id} className="service-card" onClick={() => handleServiceClick(service.id)}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
