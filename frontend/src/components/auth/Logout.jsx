import React, { useContext, useEffect } from "react";
import { AppContext } from "../../constants/AppContext";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return null; // No necesita renderizar nada
}
