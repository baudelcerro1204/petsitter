const { Comment, User } = require('../models');

const createComment = async (req, res) => {
  const { text, serviceId } = req.body;
  const userId = req.user.id;

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
    });
    res.status(200).send(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).send('Error al obtener los comentarios');
  }
};
module.exports = { createComment, getCommentsByServiceId };
