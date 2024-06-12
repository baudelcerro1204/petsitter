const { ServiceRequest, User, Service } = require('../models');

const createRequest = async (req, res) => {
  const { serviceId } = req.body;
  const userId = req.user.id;

  if (!serviceId || !userId) {
    return res.status(400).send('Datos incompletos');
  }

  try {
    const request = await ServiceRequest.create({ serviceId, userId });
    res.status(201).send(request);
  } catch (error) {
    console.error('Error al crear la solicitud de servicio:', error);
    res.status(500).send('Error al crear la solicitud de servicio');
  }
};

const acceptRequest = async (req, res) => {
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

const denyRequest = async (req, res) => {
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

const getUserRequests = async (req, res) => {
  const userId = req.user.id;
  try {
    const requests = await ServiceRequest.findAll({ 
      where: { userId },
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

const getProviderRequests = async (req, res) => {
  const userId = req.user.id;
  try {
    const services = await Service.findAll({ where: { providerId: userId } });
    const serviceIds = services.map(service => service.id);
    const requests = await ServiceRequest.findAll({ 
      where: { serviceId: serviceIds },
      include: [
        { model: User, as: 'user' },
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
  createRequest,
  acceptRequest,
  denyRequest,
  getUserRequests,
  getProviderRequests
};
