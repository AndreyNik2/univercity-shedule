import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SessionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Сесії</Text>
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

export default SessionsScreen;
