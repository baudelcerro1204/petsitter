const { Pet } = require('../models');

const petTypeMapping = {
  Dog: 'Dog',
  Cat: 'Cat',
  Bird: 'Bird',
  Fish: 'Fish',
  Reptile: 'Reptile'
};

const addPets = async (req, res) => {
  const { pets } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario autenticado

  try {
    for (const pet of pets) {
      const mappedType = petTypeMapping[pet.type];
      if (!mappedType) {
        return res.status(400).send(`Tipo de mascota inválido: ${pet.type}`);
      }
      await Pet.create({ type: mappedType, quantity: pet.quantity, userId });
    }
    res.status(201).send('Mascotas añadidas con éxito');
  } catch (error) {
    console.error('Error al añadir mascotas:', error.message);
    res.status(500).send('Error al añadir mascotas');
  }
};

module.exports = { addPets };
