import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Item } from "./types";

interface DeleteScreenProps {
  darkTheme: boolean;
  items: Item[];
  deleteItem: (id: string) => void;
}

export function DeleteScreen({
  darkTheme,
  items,
  deleteItem,
}: DeleteScreenProps) {
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.deleteCard}>
      <View style={{ flexDirection: "column" }}>
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
