const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/auth');
const addPetRoutes = require('./routes/addPet');
const serviceRoutes = require('./routes/services');
const commentRoutes = require('./routes/comment');
const serviceRequestsRouter = require('./routes/serviceRequest');
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

// Rutas de servicios
app.use('/', serviceRoutes);

app.use('/', serviceRequestsRouter);

// Rutas de mensajes
app.use('/', messageRoutes); // Añade las rutas de mensajes

app.use('/', commentRoutes); // Añade las rutas de comentarios


models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});
