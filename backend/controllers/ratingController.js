const { Rating, ServiceRequest } = require('../models');

const rateService = async (req, res) => {
  const { serviceId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  try {
    // Verificar que el usuario haya contratado el servicio
    const serviceRequest = await ServiceRequest.findOne({
      where: { userId, serviceId, status: 'aceptada' },
    });

    if (!serviceRequest) {
      return res.status(403).json({ error: 'No tienes permiso para calificar este servicio.' });
    }

    // Crear o actualizar la puntuación
    const [ratingRecord, created] = await Rating.upsert({
      userId,
      serviceId,
      rating,
    });

    res.status(201).json(ratingRecord);
  } catch (error) {
    console.error('Error al calificar el servicio:', error);
    res.status(500).send('Error al calificar el servicio');
  }
};

const canRateService = async (req, res) => {
  const { serviceId } = req.params;
  const userId = req.user.id;

  try {
    const serviceRequest = await ServiceRequest.findOne({
      where: { userId, serviceId, status: 'aceptada' },
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
      where: { userId, serviceId, status: 'aceptada' },
    });

    if (serviceRequest) {
      return res.status(200).json({ hasContracted: true });
    } else {
      return res.status(200).json({ hasContracted: false });
    }
  } catch (error) {
    console.error('Error al verificar si el usuario contrató el servicio:', error);
    res.status(500).send('Error al verificar si el usuario contrató el servicio');
  }
};

const getUserRating = async (req, res) => {
  const { serviceId } = req.params;
  const userId = req.user.id;

  try {
    const rating = await Rating.findOne({
      where: { userId, serviceId },
    });

    if (rating) {
      return res.status(200).json({ rating: rating.rating });
    } else {
      return res.status(200).json({ rating: 0 });
    }
  } catch (error) {
    console.error('Error al obtener la calificación del usuario:', error);
    res.status(500).send('Error al obtener la calificación del usuario');
  }
};

const getAverageRating = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const ratings = await Rating.findAll({
      where: { serviceId },
    });

    if (ratings.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = totalRating / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Error al obtener el promedio de calificaciones:', error);
    res.status(500).send('Error al obtener el promedio de calificaciones');
  }
};

module.exports = { rateService, canRateService, hasContractedService, getUserRating, getAverageRating };
