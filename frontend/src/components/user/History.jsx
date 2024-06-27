import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../constants/AppContext";
import "../../constants/css/userPanel.css";
import { UserSidebar } from "../general/SideBar";

export function History() {
  const { user } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({});
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchServiceRequests();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/me/service-requests",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setServiceRequests(data);
    } catch (error) {
      console.error("Error al obtener las solicitudes de servicio:", error);
    }
  };

  if (user?.role !== "usuario") {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <>
      <UserSidebar />
      <div className="providerPanelContainer">
        <h2>Historial de Contrataciones</h2>
        <div className="dashboard-section">
          <table className="servicesTable">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Servicio</th>
                <th>Estado</th>
                <th>Puntaje del servicio</th>
                <th>Tu Puntaje</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    {request.service.provider
                      ? request.service.provider
                      : "Proveedor no disponible"}
                  </td>
                  <td>{request.service.name}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.service.averageRating !== null
                      ? request.service.averageRating
                      : "No disponible"}
                  </td>
                  <td>
                    {request.status === "aceptada" ? (
                      request.service.userRating !== null ? (
                        request.service.userRating
                      ) : (
                        <Link to={`/user-panel/rate/${request.id}`}>
                          Calificá
                        </Link>
                      )
                    ) : (
                      "Pendiente"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
