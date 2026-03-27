import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ComputerManagementScreenProps {
  darkTheme: boolean;
  setScreen: (screen: string) => void;
}

export function ComputerManagementScreen({
  darkTheme,
  setScreen,
}: ComputerManagementScreenProps) {
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
