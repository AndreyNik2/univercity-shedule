import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export const StudentsUnselectedGroup: React.FunctionComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.middleContainerBackground },
      ]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>
        Вибиріть групу зі списку
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 33,
    borderRadius: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    paddingVertical: 24,
  },
});
