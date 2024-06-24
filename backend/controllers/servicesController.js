const { where } = require('sequelize');
const { Service, ServicePet } = require('../models');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    console.log(services);
    res.json(services);
  } catch (error) {
    res.status(500).send('Error al obtener servicios');
  }
};

const getServicesByType = async (req, res) => {
  let { serviceType } = req.params;
  if (serviceType === 'cuidados') {
    serviceType = 'Cuidado';
  } else if (serviceType === 'paseos') {
    serviceType = 'Paseo';
  } else if (serviceType === 'adiestramientos') {
    serviceType = 'Adiestramiento';
  }
  console.log(serviceType);
  try {
    const services = await Service.findAll({
      where: { category: serviceType },
    });
    res.json(services);
  } catch (error) {
    res.status(500).send('Error al obtener servicios');
  }
}

const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id, {
      where: { id: id },
    });
    if (!service) {
      return res.status(404).send('Servicio no encontrado');
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).send('Error al obtener el servicio');
  }
};

const createService = async (req, res) => {
  const { name, category, duration, frequency, cost, status, description, petTypes } = req.body;
  const providerId = req.user.id;

  try {
    const newService = await Service.create({
      name,
      category,
      duration,
      frequency,
      cost,
      status,
      providerId,
      description
    });

    if (petTypes && petTypes.length > 0) {
      for (const petType of petTypes) {
        await ServicePet.create({
          serviceId: newService.id,
          petType
        });
      }
    }

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).send('Error al crear el servicio');
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, category, duration, frequency, cost, status, description, petTypes } = req.body;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).send('Servicio no encontrado');
    }

    await service.update({
      name,
      category,
      duration,
      frequency,
      cost,
      status,
      description
    });

    if (petTypes && petTypes.length > 0) {
      await ServicePet.destroy({ where: { serviceId: id } });
      for (const petType of petTypes) {
        await ServicePet.create({
          serviceId: id,
          petType
        });
      }
    }

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

const getServicesByProvider = async (req, res) => {
  const providerId = req.user.id;
  try {
    const services = await Service.findAll({ where: { providerId } });
    res.json(services);
  } catch (error) {
    res.status(500).send('Error al obtener los servicios del proveedor');
  }
};

module.exports = { getAllServices, getServicesByType ,getServiceById, createService, updateService, deleteService, getServicesByProvider };
