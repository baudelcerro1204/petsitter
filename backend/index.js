const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/auth');
const addPetRoutes = require('./routes/addPet'); // Importa las rutas de agregar mascotas
const serviceRoutes = require('./routes/services'); // Importa las rutas de servicios
const commentRoutes = require('./routes/comment'); // Importa las rutas de servicios

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Ruta básica para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a Pet Buddies API');
});

// Rutas de autenticación
app.use('/', authRoutes);

// Rutas de gestión de mascotas
app.use('/', addPetRoutes);

//Rutas de servicios
app.use('/', serviceRoutes);

// Rutas de comentarios
app.use('/comments', commentRoutes);

// Rutas de servicios
app.use('/services', serviceRoutes);

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});
