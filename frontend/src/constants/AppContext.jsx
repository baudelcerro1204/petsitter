import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
