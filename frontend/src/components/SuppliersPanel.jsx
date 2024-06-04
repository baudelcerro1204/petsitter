import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierPanel = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    category: 'Cuidado', // Default value to one of the valid categories
    duration: '',
    frequency: '',
    cost: '',
    status: 'Habilitado',
    description: '', // Nuevo campo de descripción
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error al obtener servicios', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleCreateService = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/services', newService, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchServices();
    } catch (error) {
      console.error('Error al crear el servicio', error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchServices();
    } catch (error) {
      console.error('Error al eliminar el servicio', error);
    }
  };

  return (
    <div>
      <h1>Supplier Panel</h1>
      <div>
        <h2>Create New Service</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newService.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newService.description}
          onChange={handleInputChange}
        />
        <select name="category" value={newService.category} onChange={handleInputChange}>
          <option value="Cuidado">Cuidado</option>
          <option value="Adiestramiento">Adiestramiento</option>
          <option value="Paseo">Paseo</option>
        </select>
        <input
          type="number"
          name="duration"
          placeholder="Duration (hours)"
          value={newService.duration}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="frequency"
          placeholder="Frequency"
          value={newService.frequency}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={newService.cost}
          onChange={handleInputChange}
        />
        <select name="status" value={newService.status} onChange={handleInputChange}>
          <option value="Habilitado">Habilitado</option>
          <option value="Deshabilitado">Deshabilitado</option>
        </select>
        <button onClick={handleCreateService}>Create Service</button>
      </div>
      <div>
        <h2>Services</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th> {/* Añadido campo de descripción */}
              <th>Category</th>
              <th>Duration</th>
              <th>Frequency</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td> {/* Mostrar descripción */}
                <td>{service.category}</td>
                <td>{service.duration}</td>
                <td>{service.frequency}</td>
                <td>{service.cost}</td>
                <td>{service.status}</td>
                <td>
                  <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                  {/* Add buttons for Edit and Enable/Disable actions as needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierPanel;
