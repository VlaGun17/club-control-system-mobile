import React, { createContext, useContext, useState } from "react";
import { Item } from "./types";

interface AppContextType {
  items: Item[];
  addItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      title: "Dell XPS 15",
      description: "Intel i7, 16GB RAM",
      image: require("./assets/comp1.png"),
    },
    {
      id: "2",
      title: "HP Spectre x360",
      description: "Intel i5, 8GB RAM",
      image: require("./assets/comp2.png"),
    },
    {
      id: "3",
      title: "Lenovo ThinkPad X1",
      description: "AMD Ryzen 7, 16GB RAM",
      image: require("./assets/comp3.png"),
    },
  ]);

  const addItem = (newItem: Item) => {
    setItems((prev) => [newItem, ...prev]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{ items, addItem, deleteItem, darkTheme, setDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}

export const VALID_USERS = [
  { username: "admin", password: "123" },
  { username: "user", password: "password" },
];
