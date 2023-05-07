import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { IStackScreenProp } from "../models/StackScreenProps";
import StudentsNavigator from "../navigations/StudentsNavigations";

export const StudentsScreen: React.FC<IStackScreenProp> = ({
  navigation,
  route,
  nameProp,
}) => {
  return (
    <View style={styles.container}>
      <StudentsNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 157,
    height: 157,
  },
  button: {},
  touchable: {},
  buttonTitle: {},
});
