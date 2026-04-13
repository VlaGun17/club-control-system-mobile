import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "pro_c036923e6bea114887ee6562dc03e65f7141bc52e25d36ea8d9ea19ae3df5f5a",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ name: email, token: data.token });
        return true;
      } else {
        alert("Помилка API: " + (data.error || "Невірні дані"));
        return false;
      }
    } catch (error) {
      alert("Помилка мережі" + error.message);
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
