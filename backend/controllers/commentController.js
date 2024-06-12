const { Comment, User, Service } = require('../models');

const createComment = async (req, res) => {
  const { text, serviceId } = req.body;
  const userId = req.user.id;

  if (!text || !serviceId || !userId) {
    return res.status(400).send('Datos incompletos');
  }

  try {
    const comment = await Comment.create({ text, userId, serviceId });
    res.status(201).send(comment);
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).send('Error al crear el comentario');
  }
};

const getCommentsByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const comments = await Comment.findAll({ 
      where: { serviceId },
      include: { model: User, as: 'user', attributes: ['firstName', 'lastName'] } 
    });
    res.status(200).send(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).send('Error al obtener los comentarios');
  }
};

const getCommentsByUserId = async (req, res) => {
  const userId = req.params.userId; // Obtener el ID del usuario de la ruta

  try {
    const comments = await Comment.findAll({ 
      where: { userId },
      include: [
        { model: Service, as: 'service', attributes: ['name'] },
        { model: User, as: 'user', attributes: ['firstName', 'lastName'] }
      ]
    });
    res.status(200).send(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios del usuario:', error);
    res.status(500).send('Error al obtener los comentarios del usuario');
  }
};

module.exports = { createComment, getCommentsByServiceId, getCommentsByUserId };
