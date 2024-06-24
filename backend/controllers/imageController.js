const { bucket } = require('../config/firebaseConfig');

const uploadImageName = (req, res) => {
  const imageName = req.body.imageName;
  // Aquí puedes guardar el nombre de la imagen en tu base de datos
  console.log('Image name received:', imageName);
  res.status(200).send({ message: 'Image name received successfully' });
};

const getImageUrl = async (req, res) => {
  const imageName = req.params.imageName;
  try {
    const file = bucket.file(`images/${imageName}`);
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60, // 1 hora
    });
    res.status(200).send({ url });
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  uploadImageName,
  getImageUrl
};
