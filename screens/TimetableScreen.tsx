import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectGrous from "../components/SelectGroup";
import WeekCalendar from "../components/WeekShedule";

const TimetableScreen = () => {
  return (
    <View style={styles.container}>
      <SelectGrous />
      <WeekCalendar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default TimetableScreen;
