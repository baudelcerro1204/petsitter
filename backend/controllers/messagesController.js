const models = require('../models');

const createMessage = async (req, res) => {
  try {
    const { content, serviceId } = req.body;
    const senderId = req.user.id;

    if (!senderId || !serviceId || !content) {
      console.error('Faltan campos obligatorios:', { senderId, serviceId, content });
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const service = await models.Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    const receiverId = service.providerId;

    const message = await models.Message.create({
      senderId,
      receiverId,
      content,
      serviceId
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error al crear el mensaje:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
};

const getMessagesByProviderId = async (req, res) => {
  try {
    const providerId = req.user.id;

    const messages = await models.Message.findAll({
      where: {
        receiverId: providerId,
      },
      include: [
        { model: models.User, as: 'sender', attributes: ['firstName', 'lastName'] },
        { model: models.Service, as: 'service', attributes: ['name'] }
      ]
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

module.exports = {
  createMessage,
  getMessagesByProviderId,
};
