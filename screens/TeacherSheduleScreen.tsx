import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { ThemeContext } from "../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/redux";


export const TeacherSheduleScreen: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [accessCode, setAccessCode] = useState<string>("");
  const [isChecked, setChecked] = useState<boolean>(false);
  const authError = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();



  return (
    <LinearGradient
      colors={theme.gradient}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar
          animated={false}
          backgroundColor={theme.statusBarBG}
          barStyle={theme.statusBarColor}
        />
        
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  authenticateContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
  },
  inputCode: {
    margin: 20,
    marginBottom: 8,
    paddingLeft: 12,
    height: 44,
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 8,
  },
  buttonContainer: {
    height: 46,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1976D2",
    borderRadius: 14,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
  },
  buttonTitle: {
    fontFamily: "Exo2-Medium",
    fontSize: 18,
  },
});
