import React, {useContext} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Image, TouchableOpacity, Text, StatusBar } from "react-native";
import { IStackScreenProp } from "../models/StackScreenProps";
import { themeContext } from "../config/themeContext";

export const HomeScreen: React.FC<IStackScreenProp> = ({
  navigation,
  route,
  nameProp,
}) => {

  const theme = useContext(themeContext);

  return (
    <LinearGradient
      colors={theme.gradient}
      // colors={["#FEEFF2", "#000"]}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      <StatusBar
        animated={false}
        backgroundColor={theme.statusBarBG}
        barStyle={theme.statusBarColor}
      />
      <View style={styles.logoContainer}>
        <View style={[styles.logoContainerBG,{ backgroundColor: theme.logoContainerBG }]}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
      </View>
      <View
        style={[
          styles.buttonsContainer,
          { backgroundColor: theme.innerContainerBackground },
        ]}
      >
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
  },
  linearGradient: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 88,
    marginHorizontal: 21,
    alignItems: "center",
  },
  logoContainerBG: {
    width: 164,
    height: 164,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:82,

  },
  logo: {
    width: 157,
    height: 157,
  },
  buttonsContainer: {
    marginTop: 44,
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
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 15,
  },
});
