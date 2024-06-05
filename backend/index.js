const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/auth');
const addPetRoutes = require('./routes/addPet');
const serviceRoutes = require('./routes/services');
const commentRoutes = require('./routes/comment');
const messageRoutes = require('./routes/messages'); // Importa las rutas de mensajes

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

// Rutas de servicios
app.use('/', serviceRoutes);

// Rutas de comentarios
app.use('/', commentRoutes);

// Rutas de mensajes
app.use('/', messageRoutes); // Añade las rutas de mensajes

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});
