import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import { ThemeContext } from "../context/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch } from "../hooks/redux";
import { logIn } from "../redux/auth/operations";

export const AuthTeacherScreen: React.FunctionComponent = () => {
  const theme = useContext(ThemeContext);
  const [accessCode, setAccessCode] = useState<string>("");
    const [isChecked, setChecked] = useState<boolean>(false);
    const dispatch = useAppDispatch;
    
    const submit = () => {
        dispatch(logIn({code: accessCode, rememberMe: isChecked}))
        
}

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
        <View
          style={[
            styles.authenticateContainer,
            { backgroundColor: theme.middleContainerBackground },
          ]}
        >
          <TextInput
            style={[
              styles.inputCode,
              { backgroundColor: theme.innerContainerBackground },
            ]}
            placeholder="Код доступу викладача"
            onChangeText={setAccessCode}
            autoFocus={true}
            secureTextEntry={true}
          ></TextInput>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={() => setChecked((state) => !state)}
            />
            <Text>Запам'ятай мене</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={submit}>
              <Text>Увійти</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    height: 44,
    border: 1,
    borderColor: "#1976D2",
  },
});
