import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectGrous from "../components/SelectGroup";

const TimetableScreen = () => {
  return (
      <View style={styles.container}>
          <SelectGrous />
      <Text>Росклад</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TimetableScreen;
