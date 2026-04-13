import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";

export function EditScreen({ route, navigation, darkTheme, updateItem }) {
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body || post.description);
  const [image, setImage] = useState(post.image);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Помилка", "Потрібен доступ до галереї");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const updatedItem = {
      ...post,
      title: title,
      description: body,
      image: image,
    };
    updateItem(updatedItem);
    Alert.alert("Успіх", "Дані оновлено", [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("ItemDetails", { post: updatedItem }),
      },
    ]);
  };

  return (
    <ScrollView style={[styles.container, darkTheme && styles.darkContainer]}>
      <View style={{ padding: 20 }}>
        <Text style={[styles.modalTitle, darkTheme && styles.darkText]}>
          Редагування
        </Text>

        <Text style={darkTheme && styles.darkText}>Назва:</Text>
        <TextInput
          style={[styles.textInput, { color: darkTheme ? "#fff" : "#000" }]}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={darkTheme && styles.darkText}>Опис:</Text>
        <TextInput
          style={[
            styles.textInput,
            { height: 100, color: darkTheme ? "#fff" : "#000" },
          ]}
          multiline
          value={body}
          onChangeText={setBody}
        />

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={{ color: "#007bff" }}>Змінити фото</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={typeof image === "string" ? { uri: image } : image}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginVertical: 15,
            }}
          />
        )}

        <TouchableOpacity
          style={[styles.authButton, { backgroundColor: "#28a745" }]}
          onPress={handleSave}
        >
          <Text style={styles.authText}>Зберегти зміни</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
