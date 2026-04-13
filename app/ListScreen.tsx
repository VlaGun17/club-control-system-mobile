import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Item } from "./types";

interface ListScreenProps {
  darkTheme: boolean;
  items: Item[];
  navigation: StackNavigationProp<any>;
}

export function ListScreen({ darkTheme, items, navigation }: ListScreenProps) {
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
            <View
              style={[styles.modalContent, darkTheme && styles.darkContainer]}
            >
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: "#007bff",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    closeDetails();
                    navigation.navigate("ItemDetails", {
                      post: selectedItem,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      darkTheme && styles.darkText,
                      { color: "#fff" },
                    ]}
                  >
                    Детальніше
                  </Text>
                </TouchableOpacity>

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
          </View>
        </Modal>
      )}
    </View>
  );
}
