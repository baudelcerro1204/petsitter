import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";
import { ProveedorSidebar } from "../general/SideBar";

export function ProviderPanel() {
  const { user } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

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
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {serviceRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.service.name}</td>
                    <td className={`status-${request.status.toLowerCase()}`}>
                      {request.status}
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
        <div style={{ marginTop: 20 }} className="dashboard-section">
          <div className="comments-section">
            <h3>Comentarios</h3>
            <ul className="commentsList">
              {receivedMessages.map((msg) => (
                <li key={msg.id}>
                  <strong>
                    {msg.sender?.firstName} {msg.sender?.lastName}:
                  </strong>{" "}
                  "{msg.content}"
                </li>
              ))}
            </ul>
            <Link to="/supplier-panel/comments">Ver todos los comentarios</Link>
          </div>
        </div>
      </div>
    </>
  );
}
