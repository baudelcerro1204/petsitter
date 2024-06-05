import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceComments from './ServiceComments';
import '../assets/styles/service_details.css';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/services/${serviceId}`);
      setService(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error al obtener los detalles del servicio');
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const handleContact = () => {
    navigate(`/send-message/${serviceId}`);
  };

  return (
    <div className="service-details-container">
      <div className="service-info">
        <h2>{service.name}</h2>
        <p>{service.description}</p>
        <button onClick={handleContact}>Contactar</button>
      </div>
      <ServiceComments serviceId={serviceId} />
    </div>
  );
};

export default ServiceDetails;
