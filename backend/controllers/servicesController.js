const { where } = require('sequelize');
const { Service, ServicePet, User } = require('../models');
const { getImageUrlByName } = require('../utils/firebaseUtils');
const { v4: uuidv4 } = require('uuid');
const { bucket } = require('../config/firebaseConfig');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['firstName', 'lastName'],
        },
        {
          model: ServicePet,
          as: 'petTypes',
          attributes: ['petType'],
        },
      ],
    });

    for (let service of services) {
      if (service.imageUrl) {
        service.imageUrl = await getImageUrlByName(service.imageUrl);
      }
    }

    res.json(services);
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    res.status(500).send('Error al obtener los servicios');
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
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['firstName', 'lastName'],
        },
        {
          model: ServicePet,
          as: 'petTypes',
          attributes: ['petType'],
        },
      ],
    });

    for (let service of services) {
      if (service.imageUrl) {
        service.imageUrl = await getImageUrlByName(service.imageUrl);
      }
    }

    res.json(services);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).send('Error al obtener servicios');
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['firstName', 'lastName'],
        },
        {
          model: ServicePet,
          as: 'petTypes',
          attributes: ['petType'],
        },
      ],
    });
    if (!service) {
      return res.status(404).send('Servicio no encontrado');
    }

    if (service.imageUrl) {
      service.imageUrl = await getImageUrlByName(service.imageUrl);
    }

    res.json(service);
  } catch (error) {
    console.error('Error al obtener el servicio:', error);
    res.status(500).send('Error al obtener el servicio');
  }
};

const createService = async (req, res) => {
  const { name, category, startDate, endDate, frequency, cost, status, description, petTypes, zone } = req.body;
  const providerId = req.user.id;
  let imageName = null;

  try {
    if (req.file) {
      console.log("File received:", req.file);
      const file = req.file;
      const uniqueSuffix = uuidv4();
      const filename = `${uniqueSuffix}-${file.originalname}`;
      imageName = filename;
      const storageRef = bucket.file(filename);
      await storageRef.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });

      await storageRef.makePublic();
      console.log("File uploaded and made public:", filename);
    }

    const newService = await Service.create({
      name,
      category,
      startDate,
      endDate,
      frequency,
      cost,
      status,
      providerId,
      description,
      zone,
      imageUrl: imageName,
    });

    console.log("Service created:", newService);

    if (petTypes && petTypes.length > 0) {
      for (const petType of petTypes) {
        await ServicePet.create({
          serviceId: newService.id,
          petType,
        });
      }
    }

    res.status(201).json(newService);
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    res.status(500).send('Error al crear el servicio');
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, category, startDate, endDate, frequency, cost, status, description, petTypes, zone } = req.body;
  let imageUrl = null;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).send('Servicio no encontrado');
    }

    if (req.file) {
      const file = req.file;
      const storageRef = bucket.file(`services/${file.originalname}`);
      await storageRef.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });
      imageUrl = `https://storage.googleapis.com/${bucket.name}/services/${file.originalname}`;
    }

    await service.update({
      name,
      category,
      startDate,
      endDate,
      frequency,
      cost,
      status,
      description,
      zone,
      imageUrl: imageUrl || service.imageUrl, // Mantener la URL anterior si no hay nueva imagen
    });

    if (petTypes && petTypes.length > 0) {
      await ServicePet.destroy({ where: { serviceId: id } });
      for (const petType of petTypes) {
        await ServicePet.create({
          serviceId: id,
          petType,
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
    const services = await Service.findAll({
      where: { providerId },
      include: [
        {
          model: ServicePet,
          as: 'petTypes',
          attributes: ['petType'],
        },
      ],
    });
    res.json(services);
  } catch (error) {
    res.status(500).send('Error al obtener los servicios del proveedor');
  }
};

module.exports = { getAllServices, getServicesByType, getServiceById, createService, updateService, deleteService, getServicesByProvider };
