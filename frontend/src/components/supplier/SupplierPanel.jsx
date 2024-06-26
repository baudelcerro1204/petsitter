import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";
import { ProveedorSidebar } from "../general/SideBar";

export function ProviderPanel() {
  const { user } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

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

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3000/request/${requestId}/accept`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        fetchServiceRequests(); // Refresh requests
      } else {
        console.error("Error al aceptar la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  const handleDenyRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3000/request/${requestId}/deny`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        fetchServiceRequests(); // Refresh requests
      } else {
        console.error("Error al rechazar la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
    }
  };

  if (user?.role !== "proveedor") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <>
      <ProveedorSidebar />
      <div className="providerPanelContainer">
        <h2>Dashboard</h2>
        <div className="dashboard">
          <div className="dashboard-section">
            <h3>Servicios</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{service.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/supplier-panel/services-list">
              Ver todos los servicios
            </Link>
          </div>
          <div className="dashboard-section">
            <h3>Consultas</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Consulta</th>
                  <th>Mensaje</th>
                  <th>Solicitante</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {serviceRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.service?.name ?? 'Servicio no disponible'}</td>
                    <td>"{request.content}"</td>
                    <td>{request.sender ? `${request.sender.firstName} ${request.sender.lastName}` : 'Remitente no disponible'}</td>
                    <td className={`status-${request.status.toLowerCase()}`}>
                      {request.status}
                    </td>
                    <td>
                      <button onClick={() => handleAcceptRequest(request.id)}>Aceptar</button>
                      <button onClick={() => handleDenyRequest(request.id)}>Rechazar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/supplier-panel/consultations">
              Ver todas las contrataciones
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
