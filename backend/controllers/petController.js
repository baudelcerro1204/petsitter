const { Pet } = require('../models');

const addPets = async (req, res) => {
  const { pets } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario autenticado

  try {
    for (const pet of pets) {
      await Pet.create({ type: pet.type, quantity: pet.quantity, userId });
    }
    res.status(201).send('Mascotas añadidas con éxito');
  } catch (error) {
    console.error('Error al añadir mascotas', error);
    res.status(500).send('Error al añadir mascotas');
  }
};

module.exports = { addPets };
