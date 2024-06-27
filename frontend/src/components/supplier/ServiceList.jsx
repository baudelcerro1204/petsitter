import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/supplierPanel.css";
import { ProveedorSidebar } from "../general/SideBar";
import { Link } from "react-router-dom";

export function ServiceList() {
  const { user } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
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
                <td>{new Date(service.startDate).toLocaleDateString()}</td>
                <td>
                  {service.endDate
                    ? new Date(service.endDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{service.frequency}</td>
                <td>{service.cost}</td>
                <td>{service.zone}</td>
                <td>
                  <button
                    className={
                      service.status === "habilitado" ? "enabled" : "disabled"
                    }
                    onClick={() =>
                      updateServiceStatus(
                        service.id,
                        service.status === "habilitado"
                          ? "deshabilitado"
                          : "habilitado"
                      )
                    }
                  >
                    {service.status === "habilitado"
                      ? "Deshabilitar"
                      : "Habilitar"}
                  </button>
                  <button>Editar</button>
                  <button
                    className="delete"
                    onClick={() => deleteService(service.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/supplier-panel/services-list/register">Registrar nuevo servicio</Link>
      </div>
    </>
  );
}
