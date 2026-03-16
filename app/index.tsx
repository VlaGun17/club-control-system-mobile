import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "./i18n";

export default function App() {
  const [screen, setScreen] = useState("list");
  const [darkTheme, setDarkTheme] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();

  const [items, setItems] = useState([
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

  const addItem = (newItem: {
    id: string;
    title: string;
    description: string;
    image: any;
  }) => {
    setItems((prevItems) => [newItem, ...prevItems]);
    setScreen("list");
  };

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <View style={{ justifyContent: "space-between" }}>
        <TouchableOpacity
          style={[styles.dropdownButton, darkTheme && styles.darkButton]}
          onPress={() => setIsDropdownOpen(true)}
        >
          <Text style={[styles.settingText, darkTheme && styles.darkText]}>
            {t("menu")}
          </Text>
          <Text style={[styles.settingText, darkTheme && styles.darkText]}>
            {isDropdownOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>

      {isDropdownOpen && (
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setIsDropdownOpen(false)}
          />

          <View style={[styles.dropdownBox, darkTheme && styles.darkContainer]}>
            <TouchableOpacity
              onPress={() => [setScreen("list"), setIsDropdownOpen(false)]}
            >
              <Text style={[styles.item, darkTheme && styles.darkText]}>
                {t("list")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [setScreen("control"), setIsDropdownOpen(false)]}
            >
              <Text style={[styles.item, darkTheme && styles.darkText]}>
                {t("control")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [setScreen("settings"), setIsDropdownOpen(false)]}
            >
              <Text style={[styles.item, darkTheme && styles.darkText]}>
                {t("settings")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screen === "list" ? (
        <ListScreen darkTheme={darkTheme} items={items} />
      ) : screen === "control" ? (
        <ComputerManagementScreen darkTheme={darkTheme} setScreen={setScreen} />
      ) : screen == "add" ? (
        <AddScreen darkTheme={darkTheme} onAdd={addItem} />
      ) : screen === "delete" ? (
        <DeleteScreen darkTheme={darkTheme} items={items} setItems={setItems} />
      ) : (
        <SettingsScreen darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      )}
    </View>
  );
}

interface Item {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType | string;
}

interface ListScreenProps {
  darkTheme: boolean;
  items: Item[];
}

function ListScreen({ darkTheme, items }: ListScreenProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const openDetails = (item: Item) => {
    setModalVisible(true);
    setSelectedItem(item);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({ item }: { item: Item }) => {
    const imageSource =
      typeof item.image === "number" ? item.image : { uri: item.image };

    return (
      <TouchableOpacity
        style={[styles.card, darkTheme && styles.darkCard]}
        onPress={() => openDetails(item)}
      >
        <Image
          source={imageSource as ImageSourcePropType}
          style={styles.image}
        />
        <Text style={[styles.title, darkTheme && styles.darkText]}>
          {item.title}
        </Text>
        <Text style={[styles.description, darkTheme && styles.darkText]}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeDetails}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={selectedItem.image as ImageSourcePropType}
                style={styles.modalImage}
              />
              <Text style={[styles.modalTitle, darkTheme && styles.darkText]}>
                {selectedItem.title}
              </Text>
              <Text
                style={[styles.modalDescription, darkTheme && styles.darkText]}
              >
                {selectedItem.description}
              </Text>

              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#007bff",
                  borderRadius: 10,
                }}
                onPress={closeDetails}
              >
                <Text
                  style={[
                    styles.buttonText,
                    darkTheme && styles.darkText,
                    { color: "#fff" },
                  ]}
                >
                  {t("closeButtonText")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

function AddScreen({ darkTheme, onAdd }) {
  const [brand, setBrand] = useState("");
  const [specs, setSpecs] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { t } = useTranslation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(t("alertPickImage"));
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAdd = () => {
    if (!brand || !specs || !image) {
      alert(t("alertAddComp"));
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title: brand,
      description: specs,
      image: image,
    };

    onAdd(newItem);
  };

  return (
    <ScrollView style={styles.settingsContainer}>
      <Text style={[styles.settingsTitle, darkTheme && styles.darkText]}>
        {t("addTitle")}
      </Text>
      <View style={[styles.card, darkTheme && styles.darkCard]}>
        <Text style={[styles.title, darkTheme && styles.darkText]}>
          {t("addFormTitle")}
        </Text>
        <View>
          <Text
            style={[
              styles.settingText,
              darkTheme && styles.darkText,
              { marginLeft: 5 },
            ]}
          >
            {t("brand")}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={t("brandPlaceholder")}
            value={brand}
            onChangeText={setBrand}
          />

          <Text
            style={[
              styles.settingText,
              darkTheme && styles.darkText,
              { marginLeft: 5 },
            ]}
          >
            {t("description")}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={t("descPlaceholder")}
            value={specs}
            onChangeText={setSpecs}
          />

          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Text style={[{ color: "#007bff" }]}>
              {image ? t("selectedPhoto") : t("choosePhoto")}
            </Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image }} style={styles.choosedImage} />
          )}

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#007bff",
              borderRadius: 10,
            }}
            onPress={handleAdd}
          >
            <Text
              style={[
                styles.buttonText,
                darkTheme && styles.darkText,
                { color: "#fff" },
              ]}
            >
              {t("addButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function ComputerManagementScreen({ darkTheme, setScreen }) {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={() => setScreen("add")}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          {t("addComputer")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.controlButton}
        onPress={() => setScreen("delete")}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          {t("deleteComputer")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function DeleteScreen({ darkTheme, items, setItems }) {
  const { t } = useTranslation();

  const deleteItem = (id) => {
    const filteredData = items.filter((item) => item.id != id);
    setItems(filteredData);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.deleteCard, darkTheme && styles.darkContainer]}>
      <View
        style={[{ flexDirection: "column" }, darkTheme && styles.darkContainer]}
      >
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          {item.title}
        </Text>
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          {item.description}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.photoButton, darkTheme && styles.darkButton]}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={{ color: "red", fontWeight: "bold" }}>
          {t("deleteButton")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

function SettingsScreen({ darkTheme, setDarkTheme }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isUkrainian = i18n.language === "ua";

  return (
    <View style={styles.settingsContainer}>
      <Text style={[styles.settingsTitle, darkTheme && styles.darkText]}>
        {t("settings")}
      </Text>

      <View style={styles.settingRow}>
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          {t("darkTheme")}
        </Text>
        <Switch value={darkTheme} onValueChange={setDarkTheme} />
      </View>
      <View style={styles.settingRow}>
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          {t("language")}
        </Text>
        <Switch
          value={isUkrainian}
          onValueChange={(value) => changeLanguage(value ? "ua" : "en")}
        />
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
    textAlign: "center",
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
  photoButton: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  choosedImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  textInput: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  controlButton: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#808080",
    borderWidth: 2,
    alignItems: "flex-start",
  },
  deleteCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  deleteContainerInfo: {
    flexDirection: "column",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "25%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
    borderRadius: 5,
  },
  dropdownWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdownBox: {
    width: "40%",
    height: "25%",
    right: "30%",
    top: "12%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  item: {
    paddingVertical: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: "100%",
  },

  picker: {
    height: 50,
    width: "10%",
  },
  settingColumn: {
    marginBottom: 20,
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 150,
    resizeMode: "contain",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
  },
});
