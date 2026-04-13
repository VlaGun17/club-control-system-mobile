import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

const fetchNews = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );
  return response.json();
};

export function NewsScreen({ navigation, darkTheme }) {
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  if (isLoading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, darkTheme && styles.darkCard]}
            onPress={() =>
              navigation.navigate("Details", {
                post: {
                  title: item.title,
                  body: item.body,
                },
              })
            }
          >
            <Text style={[styles.title, darkTheme && styles.darkText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
