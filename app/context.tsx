import React, { createContext, useContext } from "react";
import useStore from "./store/useStore";
import { Item } from "./types";

interface AppContextType {
  items: Item[];
  addItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
  updateItem: (item: Item) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const store = useStore();

  return (
    <AppContext.Provider
      value={{
        items: store.items,
        addItem: store.addItem,
        deleteItem: store.deleteItem,
        darkTheme: store.darkTheme,
        setDarkTheme: store.setDarkTheme,
        updateItem: store.updateItem,
      }}
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
