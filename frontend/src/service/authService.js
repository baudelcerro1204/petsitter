import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Asegúrate de que esta URL sea correcta

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const logout = () => {
  localStorage.removeItem('token');
};

export default {
  register,
  login,
  isAuthenticated,
  logout,
};
