import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { IStackScreenProp } from "../models/StackScreenProps";

export const TeachersScreen: React.FC<IStackScreenProp> = ({
  navigation,
  route,
  nameProp,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonTitle}>Студент</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate("StudentsScreen")}
        >
          <Text style={styles.buttonTitle}>Вчитель</Text>
        </TouchableOpacity>
      </View>
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
