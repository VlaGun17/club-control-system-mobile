import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "./AuthContext";
import { styles } from "./styles";

export function AuthScreen({ darkTheme }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    if (name.trim() === "" || password.trim() === "") {
      Alert.alert("Помилка", "Заповніть всі поля");
      return;
    }
    login(name, password);
  };

  return (
    <View style={[styles.authContainer, darkTheme && styles.darkContainer]}>
      <Text
        style={[
          { fontSize: 24, marginBottom: 20 },
          darkTheme && styles.darkText,
        ]}
      >
        Авторизація
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Введіть логін"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Введіть пароль"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[styles.authButton, darkTheme && styles.darkButton]}
        onPress={handleLogin}
      >
        <Text style={[styles.authText, darkTheme && styles.darkText]}>
          Увійти
        </Text>
      </TouchableOpacity>
    </View>
  );
}
