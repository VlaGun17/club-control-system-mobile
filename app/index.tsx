import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("list");
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <Pressable
        onPress={() => setScreen("list")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressedButton,
          darkTheme && styles.darkButton,
          darkTheme && pressed && styles.pressedButtonDark,
        ]}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          Список
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setScreen("settings")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressedButton,
          darkTheme && styles.darkButton,
          darkTheme && pressed && styles.pressedButtonDark,
        ]}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          Налаштування
        </Text>
      </Pressable>

      {screen === "list" ? (
        <ListScreen darkTheme={darkTheme} />
      ) : (
        <SettingsScreen darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      )}
    </View>
  );
}

function ListScreen({ darkTheme }) {
  const pcBrands = [
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "Apple",
    "MSI",
    "Gigabyte",
  ];
  const pcSpecs = [
    "Intel i5, 8GB RAM",
    "Intel i7, 16GB RAM",
    "AMD Ryzen 5, 8GB RAM",
    "AMD Ryzen 7, 16GB RAM",
  ];
  const pcImages = [
    require("./assets/comp1.png"),
    require("./assets/comp2.png"),
    require("./assets/comp3.png"),
  ];

  const items = Array.from({ length: 20 }, (_, index) => ({
    id: index.toString(),
    title: `${pcBrands[index % pcBrands.length]} #${index + 1}`,
    description: `${pcSpecs[index % pcSpecs.length]}`,
    image: pcImages[index % pcImages.length],
  }));

  const renderItem = ({ item }) => (
    <View style={[styles.card, darkTheme && styles.darkCard]}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.title, darkTheme && styles.darkText]}>
        {item.title}
      </Text>
      <Text style={[styles.description, darkTheme && styles.darkText]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
}

function SettingsScreen({ darkTheme, setDarkTheme }) {
  return (
    <View style={styles.settingsContainer}>
      <Text style={[styles.settingsTitle, darkTheme && styles.darkText]}>
        Налаштування
      </Text>

      <View style={styles.settingRow}>
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          Темна тема
        </Text>
        <Switch value={darkTheme} onValueChange={setDarkTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
  },
  button: {
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  pressedButton: {
    backgroundColor: "#8a8a8a",
  },
  pressedButtonDark: {
    backgroundColor: "#555555",
  },
  darkButton: {
    backgroundColor: "#333333",
  },
  buttonText: {
    fontSize: 16,
    padding: 10,
  },
  darkContainer: {
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  list: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  darkCard: {
    backgroundColor: "#333333",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  darkText: {
    color: "#ffffff",
  },
  settingsContainer: {
    marginTop: 20,
  },
  settingsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
  },
});
