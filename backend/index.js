const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models');
const authRoutes = require('./routes/auth');
const PetRoutes = require('./routes/addPet');
const userRoutes = require('./routes/user');
const serviceRoutes = require('./routes/services');
const commentRoutes = require('./routes/comment');
const ratingRoutes = require('./routes/rating');
const imageRoutes = require('./routes/image');
const serviceRequestsRouter = require('./routes/serviceRequest');
const messageRoutes = require('./routes/messages'); 

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

app.use('/', messageRoutes); 

app.use('/', commentRoutes);

app.use('/', userRoutes);

app.use('/', PetRoutes);

app.use('/', imageRoutes);

app.use('/', ratingRoutes);


models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});
