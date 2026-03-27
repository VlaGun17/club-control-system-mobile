import React, { createContext, useContext, useState } from "react";
import { VALID_USERS } from "./context";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const foundUser = VALID_USERS.find(
      (u) => u.username === username && u.password === password,
    );

    if (foundUser) {
      setUser({ username, password });
      return true;
    } else {
      alert("Невірний логін або пароль");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
