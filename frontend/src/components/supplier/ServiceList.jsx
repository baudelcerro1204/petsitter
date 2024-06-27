import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";
import { ProveedorSidebar } from "../general/SideBar";
import { Link } from "react-router-dom";

export function ServiceList() {
  const { user } = useContext(AppContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Paseo");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [cost, setCost] = useState("");
  const [zone, setZone] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchServices();
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
      const response = await fetch(
        `http://localhost:3000/request/${id}/accept`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const createService = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('frequency', frequency);
    formData.append('cost', cost);
    formData.append('zone', zone);
    formData.append('status', 'habilitado');
    formData.append('description', description);
    formData.append('petTypes', JSON.stringify(petTypes));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
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
    <>
      <ProveedorSidebar />
      <div className="providerPanelContainer">
        <h2>Panel del Proveedor</h2>
        <h3>Registrar nuevo servicio</h3>
        <form onSubmit={createService}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Paseo">Paseo</option>
            <option value="Cuidado">Cuidado</option>
            <option value="Adiestramiento">Adiestramiento</option>
          </select>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Fecha de Inicio" required />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="Fecha de Finalización (opcional)" />
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
            <option value="">Seleccionar Frecuencia</option>
            <option value="única">Única</option>
            <option value="diaria">Diaria</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
          </select>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Costo" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción"></textarea>
          <select value={zone} onChange={(e) => setZone(e.target.value)} required>
            <option value="">Seleccionar Zona</option>
            <option value="zona1">Zona 1</option>
            <option value="zona2">Zona 2</option>
            <option value="zona3">Zona 3</option>
            {/* Añadir más opciones de barrios de CABA según sea necesario */}
          </select>
          <div>
            <label>
              <input
                type="checkbox"
                value="dog"
                checked={petTypes.includes('dog')}
                onChange={handlePetTypeChange}
              />
              Perro
            </label>
            <label>
              <input
                type="checkbox"
                value="cat"
                checked={petTypes.includes('cat')}
                onChange={handlePetTypeChange}
              />
              Gato
            </label>
            {/* Añadir más tipos de mascotas según sea necesario */}
          </div>
          <input type="file" onChange={handleImageChange} />
          <button type="submit">Crear Servicio</button>
        </form>
        <h3>Mis Servicios</h3>
        <table className="servicesTable">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Finalización</th>
              <th>Frecuencia</th>
              <th>Costo</th>
              <th>Zona</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.startDate}</td>
                <td>{service.endDate || "N/A"}</td>
                <td>{service.frequency}</td>
                <td>{service.cost}</td>
                <td>{service.zone}</td>
                <td>
                  <button
                    className={service.status === "habilitado" ? "enabled" : "disabled"}
                    onClick={() => updateServiceStatus(service.id, service.status === "habilitado" ? "deshabilitado" : "habilitado")}
                  >
                    {service.status === "habilitado" ? "Deshabilitar" : "Habilitar"}
                  </button>
                  <button>Editar</button>
                  <button className="delete" onClick={() => deleteService(service.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
