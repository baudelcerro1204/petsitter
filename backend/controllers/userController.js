const { User, ServiceRequest, Comment, Service, Sequelize } = require('../models');
const { Op } = Sequelize;

// Obtener información del usuario
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'address', 'role'],
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener solicitudes de servicio del usuario
exports.getUserServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.findAll({
      where: { senderId: req.user.id },
      include: [
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'name', 'providerId'],
          include: [
            {
              model: User,
              as: 'provider',
              attributes: ['firstName', 'lastName'],
            },
            {
              model: Comment,
              as: 'comments',
              attributes: ['rating', 'userId'],
              required: false,
            }
          ],
        },
      ],
    });

    const transformedRequests = serviceRequests.map(request => {
      const service = request.service;
      const provider = service ? service.provider : null;
      const userComment = service && service.comments.length > 0 
        ? service.comments.find(comment => comment.userId === req.user.id) 
        : null;
      const userRating = userComment ? userComment.rating : null;

      const averageRating = service && service.comments.length > 0 
        ? (service.comments.reduce((sum, comment) => sum + comment.rating, 0) / service.comments.length).toFixed(2)
        : null;

      return {
        id: request.id,
        service: {
          name: service ? service.name : "Servicio no disponible",
          provider: provider ? `${provider.firstName} ${provider.lastName}` : "Proveedor no disponible",
          averageRating: averageRating,
          userRating: userRating
        },
        status: request.status,
      };
    });

    res.json(transformedRequests);
  } catch (error) {
    console.error('Error al obtener las solicitudes de servicio del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
// Obtener comentarios del usuario
exports.getUserComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Service, as: 'service', attributes: ['name'] },
      ],
    });
    res.json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getProviderComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { providerId: req.user.id },
      include: [
        {
          model: Service,
          as: 'service',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName'],
        },
      ],
    });
    res.json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios del proveedor:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
