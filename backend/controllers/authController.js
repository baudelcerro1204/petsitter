const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authController = {
  register: async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, address, petType } = req.body;

    try {
      if (!firstName || !lastName || !email || !password || !phoneNumber || !address || !petType) {
        return res.status(400).send('Todos los campos son obligatorios');
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send('El usuario ya existe');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

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
      if (!email || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send('Credenciales inválidas');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send('Credenciales inválidas');
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).send({ token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).send('Error al iniciar sesión');
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send('El usuario no existe');
      }

      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).send({ token, message: 'Usuario encontrado. Redirigiendo para cambiar contraseña.' });
    } catch (error) {
      console.error('Error al solicitar restablecimiento de contraseña:', error);
      res.status(500).send('Error al solicitar restablecimiento de contraseña');
    }
  },

  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.update(
        { password: hashedPassword },
        { where: { id: decoded.id } }
      );

      res.status(200).send('Contraseña restablecida exitosamente');
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      res.status(500).send('Error al restablecer la contraseña');
    }
  }
};

module.exports = authController;
