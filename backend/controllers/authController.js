const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authController = {
  register: async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, address, petType } = req.body;

    try {
      // Validar datos
      if (!firstName || !lastName || !email || !password || !phoneNumber || !address || !petType) {
        return res.status(400).send('Todos los campos son obligatorios');
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send('El usuario ya existe');
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear nuevo usuario
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        petType,
      });

      res.status(201).send(user);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).send('Error al registrar el usuario');
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Validar datos
      if (!email || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
      }

      // Buscar usuario por email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send('Credenciales inválidas');
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send('Credenciales inválidas');
      }

      // Generar token de autenticación
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).send({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).send('Error al iniciar sesión');
    }
  },

  getLoginForm: (req, res) => {
    res.status(200).send("Formulario de inicio de sesión");
  },

  getRegisterForm: (req, res) => {
    res.status(200).send("Formulario de registro");
  }
};

module.exports = authController;
