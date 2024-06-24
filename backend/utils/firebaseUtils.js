const { bucket } = require('../config/firebaseConfig');

/**
 * Obtiene la URL pública de una imagen en Firebase Storage por su nombre.
 * @param {string} imageName - El nombre de la imagen en Firebase Storage.
 * @returns {Promise<string>} La URL pública de la imagen.
 */
const getImageUrlByName = async (imageName) => {
  try {
    const file = bucket.file(imageName);
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${imageName}`;
    return publicUrl;
  } catch (error) {
    console.error('Error al obtener la URL de la imagen:', error);
    throw new Error('Error al obtener la URL de la imagen');
  }
};

module.exports = { getImageUrlByName };
