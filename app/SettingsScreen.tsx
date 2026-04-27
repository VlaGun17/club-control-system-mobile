import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useStore from "./store/useStore";
import { styles } from "./styles";

interface SettingsScreenProps {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
}

export function SettingsScreen({
  darkTheme,
  setDarkTheme,
}: SettingsScreenProps) {
  const { t, i18n } = useTranslation();
  const { user, logout, sessionOnly, setSessionOnly } = useStore();

  const imageUrl =
    "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    Alert.alert("Вихід", "Ви впевнені, що хочете вийти?", [
      { text: "Скасувати", style: "cancel" },
      { text: "Так", onPress: () => logout() },
    ]);
  };

  const isUkrainian = i18n.language === "ua";

  return (
    <View style={styles.settingsContainer}>
      <View style={{ alignItems: "center", paddingBottom: 10 }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 5,
          }}
        />
        <Text
          style={[
            styles.settingText,
            { fontSize: 28 },
            darkTheme && styles.darkText,
          ]}
        >
          {user?.name}
        </Text>
      </View>

      <View style={[styles.settingRow, { paddingBottom: 15 }]}>
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          {t("currentPassword")}
        </Text>
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          {user?.password}
        </Text>
      </View>

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

      <View style={styles.settingRow}>
        <Text style={[styles.settingText, darkTheme && styles.darkText]}>
          {t("sessionOnly")}
        </Text>
        <Switch value={sessionOnly} onValueChange={setSessionOnly} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          {t("logout")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
