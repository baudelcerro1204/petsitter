import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AppProvider } from "./constants/AppContext";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Logout } from "./components/auth/Logout";
import { Index } from "./components/Index";
import { Services } from "./components/user/ServiceList";
import { ProviderPanel } from "./components/supplier/SupplierPanel";
import { ServiceRegister } from "./components/supplier/ServiceRegister";
import { ServiceList } from "./components/supplier/ServiceList";
import { Consultations } from "./components/supplier/Consultations";
import { Comments } from "./components/supplier/Comments";
import { Help } from "./components/supplier/Help";
import { UserPanel } from "./components/user/UserPanel";
import { MessageForm } from "./components/user/MessageForm";
import { ServiceDetails } from "./components/user/ServiceDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} /> {/* Ruta pública */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Agregar la ruta para el registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          {" "}
          {/* Ruta protegida */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceType" element={<Services />} />
          {/* rutas de supplier */}
          <Route path="/supplier-panel" element={<ProviderPanel />} />{" "}
          {/* Ruta para el panel del proveedor */}
          <Route
            path="/supplier-panel/services-list"
            element={<ServiceList />}
          />
          <Route
            path="/supplier-panel/services-list/register"
            element={<ServiceRegister />}
          />
          <Route
            path="/supplier-panel/consultations"
            element={<Consultations />}
          />
          <Route path="/supplier-panel/comments" element={<Comments />} />
          <Route path="/supplier-panel/help" element={<Help />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/messageform/:providerId" element={<MessageForm />} />
        </Route>
      </Routes>
    </Router>
  </AppProvider>
);
