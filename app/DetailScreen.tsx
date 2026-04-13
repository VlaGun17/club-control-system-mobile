import * as Calendar from "expo-calendar";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function DetailScreen({ route, darkTheme }) {
  const news = route.params?.post;
  const now = new Date();

  const saveEvent = async (calendarId: string) => {
    const eventId = await Calendar.createEventAsync(calendarId, {
      title: "Прочитати: " + news.title,
      startDate: new Date(now.getTime() + 5 * 60 * 1000),
      endDate: new Date(now.getTime() + 60 * 60 * 1000),
      notes: news.body,
    });
    console.log("Подію додано з ID:", eventId);
    Alert.alert("Успіх", "Подію додано до календаря");
  };

  const addToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Помилка", "Дозвіл на доступ до календаря не надано");
        return;
      }
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      );

      let writableCalendar = calendars.find(
        (cal) =>
          cal.allowsModifications === true &&
          cal.source?.name &&
          cal.source.name.includes("@"),
      );

      if (!writableCalendar) {
        writableCalendar = calendars[0];
      }
      await saveEvent(writableCalendar.id);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося додати подію до календаря");
    }
  };

  const deleteEvent = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Помилка", "Дозвіл на доступ до календаря не надано");
        return;
      }
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      );
      const events = await Calendar.getEventsAsync(
        calendars.map((cal) => cal.id),
        new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      );
      const eventToDelete = events.find(
        (e) => e.title === "Прочитати: " + news.title,
      );
      if (eventToDelete) {
        await Calendar.deleteEventAsync(eventToDelete.id);
        Alert.alert("Успіх", "Подію видалено з календаря");
      } else {
        Alert.alert("Інформація", "Подія не знайдена в календарі");
      }
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося видалити подію з календаря");
    }
  };

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <Text style={[styles.title, darkTheme && styles.darkText]}>
        {news.title}
      </Text>
      <Text
        style={[
          styles.description,
          darkTheme && styles.darkText,
          { marginVertical: 20 },
        ]}
      >
        {news.body}
      </Text>
      <TouchableOpacity
        style={[styles.button, darkTheme && styles.darkButton]}
        onPress={addToCalendar}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          Додати до календаря
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          darkTheme && styles.darkButton,
          { marginTop: 10 },
        ]}
        onPress={deleteEvent}
      >
        <Text style={[styles.buttonText, darkTheme && styles.darkText]}>
          Видалити з календаря
        </Text>
      </TouchableOpacity>
    </View>
  );
}
