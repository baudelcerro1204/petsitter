import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";

export function ProviderPanel() {
  const { user } = useContext(AppContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Paseo");
  const [duration, setDuration] = useState("");
  const [frequency, setFrequency] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchMessages();
    fetchServiceRequests();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/provider/services", {
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

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/supplier/message", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log("Received messages data:", data);
      setReceivedMessages(data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/provider/requests", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setServiceRequests(data);
    } catch (error) {
      console.error("Error al obtener las solicitudes de servicio:", error);
    }
  };

  const handleAcceptRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/request/${id}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        fetchServiceRequests();
      } else {
        const errorData = await response.json();
        alert(`Error al aceptar la solicitud: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      alert(`Error al aceptar la solicitud: ${error.message}`);
    }
  };

  const handleDenyRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/request/${id}/deny`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        fetchServiceRequests();
      } else {
        const errorData = await response.json();
        alert(`Error al rechazar la solicitud: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      alert(`Error al rechazar la solicitud: ${error.message}`);
    }
  };

  const handlePetTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPetTypes([...petTypes, value]);
    } else {
      setPetTypes(petTypes.filter((type) => type !== value));
    }
  };

  const createService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          category,
          duration,
          frequency,
          cost,
          status: "habilitado",
          description,
          petTypes
        }),
      });
      if (response.ok) {
        setMessage("Servicio creado exitosamente");
        fetchServices();
      } else {
        const errorData = await response.text();
        setMessage(`Error al crear el servicio: ${errorData}`);
      }
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      setMessage(`Error al crear el servicio: ${error.message}`);
    }
  };

  const updateServiceStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      if (response.ok) {
        setMessage("Estado del servicio actualizado");
        fetchServices();
      } else {
        const errorData = await response.text();
        setMessage(`Error al actualizar el estado: ${errorData}`);
      }
    } catch (error) {
      console.error("Error al actualizar el estado del servicio:", error);
      setMessage(`Error al actualizar el estado: ${error.message}`);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        setMessage("Servicio eliminado exitosamente");
        fetchServices();
      } else {
        const errorData = await response.text();
        setMessage(`Error al eliminar el servicio: ${errorData}`);
      }
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      setMessage(`Error al eliminar el servicio: ${error.message}`);
    }
  };

  if (user?.role !== "proveedor") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="providerPanelContainer">
      <h2>Panel del Proveedor</h2>
      <form className="form" onSubmit={createService}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nombre del Servicio"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Paseo">Paseo</option>
            <option value="Cuidado">Cuidado</option>
            <option value="Adiestramiento">Adiestramiento</option>
          </select>
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Duración (minutos)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Frecuencia"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Costo ($)"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Tipos de mascotas:</label>
          <div>
            <label>
              <input type="checkbox" value="Dog" onChange={handlePetTypeChange} />
              Perro
            </label>
            <label>
              <input type="checkbox" value="Cat" onChange={handlePetTypeChange} />
              Gato
            </label>
            <label>
              <input type="checkbox" value="Bird" onChange={handlePetTypeChange} />
              Pájaro
            </label>
            <label>
              <input type="checkbox" value="Fish" onChange={handlePetTypeChange} />
              Pez
            </label>
            <label>
              <input type="checkbox" value="Reptile" onChange={handlePetTypeChange} />
              Reptil
            </label>
          </div>
        </div>
        <button type="submit">Crear Servicio</button>
      </form>
      {message && <p>{message}</p>}
      <h3>Mis Servicios</h3>
      <ul className="servicesList">
        {services.map((service) => (
          <li key={service.id} className="serviceItem">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Categoria: {service.category}</p>
            <p>Duración: {service.duration} minutos</p>
            <p>Frecuencia: {service.frequency}</p>
            <p>Costo: ${service.cost}</p>
            <p>
              Estado: 
              <select
                value={service.status}
                onChange={(e) => updateServiceStatus(service.id, e.target.value)}
              >
                <option value="habilitado">Habilitado</option>
                <option value="deshabilitado">Deshabilitado</option>
              </select>
            </p>
            <button onClick={() => deleteService(service.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3>Mensajes Recibidos</h3>
      <ul className="messagesList">
        {Array.isArray(receivedMessages) && receivedMessages.map((msg) => (
          <li key={msg.id} className="messageItem">
            <h4>De: {msg.sender?.firstName} {msg.sender?.lastName}</h4>
            <p>Servicio: {msg.service.name}</p>
            <p>Mensaje: {msg.content}</p>
          </li>
        ))}
      </ul>
      <h3>Solicitudes de Servicio</h3>
      <ul className="requestsList">
        {serviceRequests.map((request) => (
          <li key={request.id} className="requestItem">
            <h4>Servicio: {request.service.name}</h4>
            <p>Usuario: {request.user.firstName} {request.user.lastName}</p>
            <p>Estado: {request.status}</p>
            {request.status === 'pendiente' && (
              <div>
                <button onClick={() => handleAcceptRequest(request.id)}>Aceptar</button>
                <button onClick={() => handleDenyRequest(request.id)}>Rechazar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
