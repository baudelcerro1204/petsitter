const { Service } = require('../models');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).send('Error al obtener servicios');
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).send('Servicio no encontrado');
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).send('Error al obtener el servicio');
  }
};

const createService = async (req, res) => {
  const { name, category, duration, frequency, cost, status, description } = req.body;
  const providerId = req.user.id;

  try {
    const newService = await Service.create({ name, category, duration, frequency, cost, status, providerId, description });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).send('Error al crear el servicio');
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, category, duration, frequency, cost, status, description } = req.body;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).send('Servicio no encontrado');
    }
    await service.update({ name, category, duration, frequency, cost, status, description });
    res.json(service);
  } catch (error) {
    res.status(500).send('Error al actualizar el servicio');
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).send('Servicio no encontrado');
    }
    await service.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error al eliminar el servicio');
  }
};

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService };
