import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Item } from "./types";

interface AddScreenProps {
  darkTheme: boolean;
  onAdd: (item: Item) => void;
}

export function AddScreen({ darkTheme, onAdd }: AddScreenProps) {
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

    const result = await ImagePicker.launchImageLibraryAsync({
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

    const newItem: Item = {
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
            <Text style={{ color: "#007bff" }}>
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
