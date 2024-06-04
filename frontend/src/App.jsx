import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import LandingPage from "./components/LandingPage.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from './components/ResetPassword';
import PetForm from './components/PetForm';
import ProtectedRoute from './components/ProtectedRoute';
import SupplierPanel from './components/SuppliersPanel';
import UserPanel from './components/UserPanel';
import ServiceList from './components/ServiceList'; // Importa el componente de lista de servicios
import ServiceDetails from './components/ServiceDetails'; // Importa el componente de detalles de servicio

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/pets"
            element={
              <ProtectedRoute>
                <PetForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier-panel"
            element={
              <ProtectedRoute>
                <SupplierPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-panel"
            element={
              <ProtectedRoute>
                <UserPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/services" element={<ServiceList />} /> {/* Nueva ruta para lista de servicios */}
          <Route path="/services/:serviceId" element={<ServiceDetails />} /> {/* Nueva ruta para detalles del servicio */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
