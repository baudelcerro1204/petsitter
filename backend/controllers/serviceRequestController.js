const { ServiceRequest, User, Service } = require('../models');

// Crear una solicitud de servicio con mensaje
const createServiceRequest = async (req, res) => {
  const { serviceId, content } = req.body;
  const senderId = req.user.id;

  if (!serviceId || !senderId || !content) {
    console.error('Faltan campos obligatorios:', { serviceId, senderId, content });
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    const receiverId = service.providerId;

    const serviceRequest = await ServiceRequest.create({
      serviceId,
      senderId,
      receiverId,
      content,
      status: 'pendiente'
    });

    res.status(201).json(serviceRequest);
  } catch (error) {
    console.error('Error al crear la solicitud de servicio:', error);
    res.status(500).json({ error: 'Error al crear la solicitud de servicio' });
  }
};

// Aceptar una solicitud de servicio
const acceptServiceRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await ServiceRequest.findByPk(id);
    if (!request) {
      return res.status(404).send('Solicitud no encontrada');
    }
    request.status = 'aceptada';
    await request.save();
    res.status(200).send(request);
  } catch (error) {
    console.error('Error al aceptar la solicitud de servicio:', error);
    res.status(500).send('Error al aceptar la solicitud de servicio');
  }
};

// Rechazar una solicitud de servicio
const denyServiceRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await ServiceRequest.findByPk(id);
    if (!request) {
      return res.status(404).send('Solicitud no encontrada');
    }
    request.status = 'rechazada';
    await request.save();
    res.status(200).send(request);
  } catch (error) {
    console.error('Error al rechazar la solicitud de servicio:', error);
    res.status(500).send('Error al rechazar la solicitud de servicio');
  }
};

// Obtener solicitudes de servicio del usuario
const getUserServiceRequests = async (req, res) => {
  const userId = req.user.id;
  try {
    const requests = await ServiceRequest.findAll({ 
      where: { senderId: userId },
      include: [
        { model: Service, as: 'service' }
      ]
    });
    res.status(200).send(requests);
  } catch (error) {
    console.error('Error al obtener las solicitudes del usuario:', error);
    res.status(500).send('Error al obtener las solicitudes del usuario');
  }
};

// Obtener solicitudes de servicio para el proveedor
const getProviderServiceRequests = async (req, res) => {
  const userId = req.user.id;
  try {
    const services = await Service.findAll({ where: { providerId: userId } });
    const serviceIds = services.map(service => service.id);
    const requests = await ServiceRequest.findAll({ 
      where: { serviceId: serviceIds },
      include: [
        { model: User, as: 'sender', attributes: ['firstName', 'lastName'] },
        { model: User, as: 'receiver', attributes: ['firstName', 'lastName'] },
        { model: Service, as: 'service' }
      ]
    });
    res.status(200).send(requests);
  } catch (error) {
    console.error('Error al obtener las solicitudes del proveedor:', error);
    res.status(500).send('Error al obtener las solicitudes del proveedor');
  }
};

module.exports = {
  createServiceRequest,
  acceptServiceRequest,
  denyServiceRequest,
  getUserServiceRequests,
  getProviderServiceRequests
};
