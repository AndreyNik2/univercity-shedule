import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ForTeacherScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Для викладачів</Text>
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

export default ForTeacherScreen;
