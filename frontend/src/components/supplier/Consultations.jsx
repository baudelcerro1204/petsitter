import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";
import { ProveedorSidebar } from "../general/SideBar";

export function Consultations() {
  const { user } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchServiceRequests();
  }, []);

  const fetchServices = async () => {
    console.log(user);
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

  if (user?.role !== "proveedor") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <>
      <ProveedorSidebar />
      <div className="providerPanelContainer">
        <h2>Panel del Proveedor</h2>
        <h3>Solicitudes de Servicio</h3>
        <table className="servicesTable">
          <thead>
            <tr>
              <th>Servicio</th>
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
                <td>
                  {request.sender ? `${request.sender.firstName} ${request.sender.lastName}` : 'Solicitante no disponible'}
                </td>
                <td>{request.status}</td>
                <td>
                  {request.status === "pendiente" && (
                    <div>
                      <button onClick={() => handleAcceptRequest(request.id)}>
                        Aceptar
                      </button>
                      <button onClick={() => handleDenyRequest(request.id)}>
                        Rechazar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
