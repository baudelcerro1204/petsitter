const { Comment, User, Service, ServiceRequest, Sequelize } = require('../models');
const { Op } = Sequelize;

const createComment = async (req, res) => {
  const { text, serviceId, rating } = req.body;
  const userId = req.user.id;

  if (!text || !serviceId || !userId) {
    return res.status(400).send('Datos incompletos');
  }

  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).send('La calificación debe estar entre 1 y 5');
  }

  try {
    const serviceRequest = await ServiceRequest.findOne({
      where: { serviceId, userId, status: 'aceptada' }
    });

    if (!serviceRequest) {
      return res.status(403).send('No puedes calificar o comentar un servicio que no has contratado');
    }

    const comment = await Comment.create({ text, userId, serviceId, rating });
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
  const userId = req.params.userId;

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

const getAverageRatingByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const result = await Comment.findOne({
      where: { serviceId, rating: { [Op.ne]: null } },
      attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']],
      raw: true,
    });

    const averageRating = result && result.averageRating ? parseFloat(result.averageRating).toFixed(2) : 0;
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Error al obtener el promedio de calificaciones:', error);
    res.status(500).send('Error al obtener el promedio de calificaciones');
  }
};

const canRateService = async (req, res) => {
  const { serviceId } = req.params;
  const userId = req.user.id;

  try {
    const serviceRequest = await ServiceRequest.findOne({
      where: { serviceId, userId, status: 'aceptada' }
    });

    if (serviceRequest) {
      return res.status(200).json({ canRate: true });
    } else {
      return res.status(200).json({ canRate: false });
    }
  } catch (error) {
    console.error('Error al verificar el permiso de calificación:', error);
    res.status(500).send('Error al verificar el permiso de calificación');
  }
};

const hasContractedService = async (req, res) => {
  const { serviceId } = req.params;
  const userId = req.user.id;

  try {
    const serviceRequest = await ServiceRequest.findOne({
      where: { serviceId, userId, status: 'aceptada' }
    });

    if (serviceRequest) {
      return res.status(200).json({ hasContracted: true });
    } else {
      return res.status(200).json({ hasContracted: false });
    }
  } catch (error) {
    console.error('Error al verificar si el usuario ya contrató el servicio:', error);
    res.status(500).send('Error al verificar si el usuario ya contrató el servicio');
  }
};

module.exports = { createComment, getCommentsByServiceId, getCommentsByUserId, getAverageRatingByServiceId, canRateService, hasContractedService };
