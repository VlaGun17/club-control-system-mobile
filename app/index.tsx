import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AddScreen } from "./AddScreen";
import { AuthProvider, useAuth } from "./AuthContext";
import { AuthScreen } from "./AuthScreen";
import { ComputerManagementScreen } from "./ComputerManagementScreen";
import { AppProvider, useAppContext } from "./context";
import { DeleteScreen } from "./DeleteScreen";
import "./i18n";
import { ListScreen } from "./ListScreen";
import { SettingsScreen } from "./SettingsScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
  const { darkTheme, setDarkTheme, items, addItem, deleteItem } =
    useAppContext();
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: darkTheme ? "#333" : "#fff" },
        headerTintColor: darkTheme ? "#fff" : "#000",
        drawerStyle: { backgroundColor: darkTheme ? "#333" : "#fff" },
        drawerLabelStyle: { color: darkTheme ? "#fff" : "#000" },
      }}
    >
      <Drawer.Screen
        name="List"
        options={{
          title: t("list"),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="list"
              color={darkTheme ? (color = "#fff") : (color = "#333")}
              size={size}
            />
          ),
        }}
      >
        {() => (
          <View
            style={[
              { flex: 1 },
              darkTheme
                ? { backgroundColor: "#333" }
                : { backgroundColor: "#fff" },
            ]}
          >
            <ListScreen darkTheme={darkTheme} items={items} />
          </View>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Management"
        options={{
          title: t("control"),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="desktop"
              color={darkTheme ? (color = "#fff") : (color = "#333")}
              size={size}
            />
          ),
        }}
      >
        {(props) => (
          <View
            style={[
              { flex: 1 },
              darkTheme
                ? { backgroundColor: "#333" }
                : { backgroundColor: "#fff" },
            ]}
          >
            <ComputerManagementScreen
              darkTheme={darkTheme}
              setScreen={(screen) =>
                props.navigation.navigate(screen === "add" ? "Add" : "Delete")
              }
            />
          </View>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Settings"
        options={{
          title: t("settings"),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings"
              color={darkTheme ? (color = "#fff") : (color = "#333")}
              size={size}
            />
          ),
        }}
      >
        {() => (
          <View
            style={[
              { flex: 1 },
              darkTheme
                ? { backgroundColor: "#333" }
                : { backgroundColor: "#fff" },
            ]}
          >
            <SettingsScreen darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          </View>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Add"
        options={{
          drawerItemStyle: { display: "none" },
          title: t("addComputer"),
        }}
      >
        {(props) => (
          <View
            style={[
              { flex: 1 },
              darkTheme
                ? { backgroundColor: "#333" }
                : { backgroundColor: "#fff" },
            ]}
          >
            <AddScreen
              darkTheme={darkTheme}
              onAdd={(item) => {
                addItem(item);
                props.navigation.navigate("List");
              }}
            />
          </View>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Delete"
        options={{
          drawerItemStyle: { display: "none" },
          title: t("deleteComputer"),
        }}
      >
        {() => (
          <View
            style={[
              { flex: 1 },
              darkTheme
                ? { backgroundColor: "#333" }
                : { backgroundColor: "#fff" },
            ]}
          >
            <DeleteScreen
              darkTheme={darkTheme}
              items={items}
              deleteItem={deleteItem}
            />
          </View>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function NavigationRoot() {
  const { user } = useAuth();
  const { darkTheme } = useAppContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Auth">
          {(props) => <AuthScreen {...props} darkTheme={darkTheme} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <NavigationRoot />
      </AppProvider>
    </AuthProvider>
  );
}
