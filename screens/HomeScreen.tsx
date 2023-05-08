import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { IStackScreenProp } from "../models/StackScreenProps";

export const HomeScreen: React.FC<IStackScreenProp> = ({
  navigation,
  route,
  nameProp,
}) => {
  return (
    <LinearGradient
      colors={["#FEEFF2", "#DDE9FD"]}
      // colors={["#FEEFF2", "#000"]}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      <View style={styles.buttonsContainer}>
        <Image
          style={[
            styles.logo,
            {
              transform: [{ translateY: 0 }, { translateX: 60 }],
            },
          ]}
          source={require("../assets/logo.png")}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => navigation.navigate("StudentsScreen")}
        >
          <Text style={styles.buttonTitle}>Студент</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => navigation.navigate("TeachersScreen")}
        >
          <Text style={styles.buttonTitle}>Вчитель</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linearGradient(90deg, #FEEFF2 0%, #DDE9FD 50.45%)",
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 157,
    height: 157,
    position: "absolute",
    right: "50%",
    top: -203,
  },
  buttonsContainer: {
    position: "relative",
    padding: 20,
    gap: 20,
    marginHorizontal: 21,
    backgroundColor: "#F2F5FD",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#1976D2",
    height: 46,
    borderRadius: 14,
  },
  buttonTitle: {
    fontFamily: "Exo2-Medium",
    fontSize: 18,
    lineHeight: 16,
    color: "#FFFFFF",
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 15
  },
});
