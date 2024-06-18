const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/auth');
const PetRoutes = require('./routes/addPet');
const userRoutes = require('./routes/user');
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

app.use('/', authRoutes);

app.use('/', serviceRoutes);

app.use('/', serviceRequestsRouter);

app.use('/', messageRoutes); // Añade las rutas de mensajes

app.use('/', commentRoutes); // Añade las rutas de comentarios

app.use('/', userRoutes);

app.use('/', PetRoutes);


models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});
