const { User, ServiceRequest, Comment, Service } = require('../models');

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
        { model: Service, as: 'service', attributes: ['name', 'providerId'] },
      ],
    });
    res.json(serviceRequests);
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
