import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAppContext } from "./context";
import { styles } from "./styles";

export function ItemDetailsScreen({ route, navigation, darkTheme }) {
  const itemPost = route.params?.post;
  const { items } = useAppContext();
  const [item, setItem] = useState(itemPost);

  useFocusEffect(
    useCallback(() => {
      const updated = items.find((i) => i.id === itemPost.id);
      if (updated) {
        setItem(updated);
      }
    }, [items, itemPost.id]),
  );

  return (
    <View style={styles.container}>
      {item?.image && (
        <Image
          source={
            typeof item.image === "string" ? { uri: item.image } : item.image
          }
          style={styles.image}
        />
      )}
      <Text style={[styles.title, darkTheme && styles.darkText]}>
        {item?.title}
      </Text>
      <Text style={[styles.description, darkTheme && styles.darkText]}>
        {item?.body || item?.description}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          darkTheme && styles.darkButton,
          { marginTop: 10 },
        ]}
        onPress={() => navigation.navigate("Edit", { post: item })}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          Оновити дані
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          darkTheme && styles.darkButton,
          { marginTop: 10 },
        ]}
        onPress={() => navigation.navigate("MainApp", { screen: "List" })}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          Назад
        </Text>
      </TouchableOpacity>
    </View>
  );
}
