import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../hooks/redux";
import { ThemeContext } from "../context/ThemeContext";

export const SessionListIsEmpty: React.FunctionComponent = () => {
  const selectedGroup = useAppSelector((state) => state.initial.selectedGroup);
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.middleContainerBackground },
      ]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>
        Розклад сессії для <Text>{selectedGroup.name}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 33,
    backgroundColor: "#F2F5FD",
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: "Exo2-Medium",
    fontSize: 16,
    paddingVertical: 24,
  },
  droup: {
    fontFamily: "Exo2-SemiBold",
    fontSize: 18,
  },
});
