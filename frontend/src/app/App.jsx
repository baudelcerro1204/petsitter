import React, { useContext } from "react";
import { AppContext } from "../constants/AppContext";
import { Admin } from "../components/admin/Admin";

function App() {
  const { user } = useContext(AppContext);

  console.log("App component: user =", user);

  return (
    <>
      {user?.role === "admin" ? (
        <Admin />
      ) : user?.role === "usuario" ? (
        <p>Usuario no tiene acceso a esta área.</p>
      ) : (
        <p>Usuario no tiene un rol válido.</p>
      )}
    </>
  );
}

export default App;
