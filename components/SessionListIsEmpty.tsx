import React, {useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../hooks/redux";
import { themeContext } from "../config/themeContext";

export const SessionListIsEmpty: React.FunctionComponent = () => {
  const { allGroups, weeks, currentDay, selectedGroup } = useAppSelector(
    (state) => state.initialReduser
  );
  const theme = useContext(themeContext);

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
