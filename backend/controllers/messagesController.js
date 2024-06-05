const models = require('../models');

const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Verifica que todos los campos necesarios están presentes
    if (!senderId || !receiverId || !content) {
      console.error('Faltan campos obligatorios:', req.body);
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Crea el mensaje
    const message = await models.Message.create({
      senderId,
      receiverId,
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error al crear el mensaje:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
};

const getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Obtiene los mensajes del usuario
    const messages = await models.Message.findAll({
      where: {
        senderId: userId,
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

module.exports = {
  createMessage,
  getMessagesByUserId,
};
