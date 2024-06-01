const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importa el paquete cors
const models = require('./models');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());  // Usa el middleware cors

// Ruta básica para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a Pet Buddies API');
});

// Rutas de autenticación
app.use('/', authRoutes);

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar con la base de datos:', error);
});
