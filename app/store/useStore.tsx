import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Item, User } from "../types";

interface AppState {
  user: User | null;
  darkTheme: boolean;
  sessionOnly: boolean;
  language: "en" | "uk";
  items: Item[];
  setUser: (user: User | null) => void;
  setDarkTheme: (value: boolean) => void;
  setSessionOnly: (value: boolean) => void;
  setLanguage: (value: "en" | "uk") => void;
  addItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: Item) => void;
  logout: () => void;
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      darkTheme: false,
      sessionOnly: false,
      language: "uk",
      items: [
        {
          id: "1",
          title: "Dell XPS 15",
          description: "Intel i7, 16GB RAM",
          image: require("../assets/comp1.png"),
        },
        {
          id: "2",
          title: "HP Spectre x360",
          description: "Intel i5, 8GB RAM",
          image: require("../assets/comp2.png"),
        },
        {
          id: "3",
          title: "Lenovo ThinkPad X1",
          description: "AMD Ryzen 7, 16GB RAM",
          image: require("../assets/comp3.png"),
        },
      ],

      setUser: (user) => set({ user }),

      setDarkTheme: (darkTheme) => set({ darkTheme }),

      setSessionOnly: (sessionOnly) => set({ sessionOnly }),

      setLanguage: (language) => set({ language }),

      addItem: (item) => set((state) => ({ items: [item, ...state.items] })),

      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateItem: (updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item,
          ),
        })),
      logout: () => set({ user: null }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        if (state.sessionOnly) {
          const { items, ...rest } = state;
          return rest;
        }
        return state;
      },
    },
  ),
);

export default useStore;
