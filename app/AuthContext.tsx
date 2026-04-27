import React, { createContext, useContext } from "react";
import useStore from "./store/useStore";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useStore();

  const login = async (email: string, password: string): Promise<boolean> => {
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
        setUser({ id: "1", name: email, password: password, email: email });
        return true;
      } else {
        alert("Помилка API: " + (data.error || "Невірні дані"));
        return false;
      }
    } catch (error) {
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
