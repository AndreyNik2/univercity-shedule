import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Switch, TouchableOpacity } from "react-native-gesture-handler";
import { EventRegister } from "react-native-event-listeners";
import { FontAwesome } from "@expo/vector-icons"; 

const ConfigScreen = () => {

  const [mode, setMode] = useState<Boolean>(false)
  
  const telegramBotURL = "https://t.me/schedule_polytech_bot";

  type OpenURLButtonProps = {
    url: string;
    children: string;
  };

  const onPress = useCallback(async () => {
    const supported = await Linking.canOpenURL(telegramBotURL);
    if (supported) {
      await Linking.openURL(telegramBotURL);
    } else {
      console.log(`Don't know how to open this URL: ${telegramBotURL}`);
    }
  }, [telegramBotURL]);

  return (
    <LinearGradient
      colors={["#FEEFF2", "#DDE9FD"]}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View style={styles.socialContainer}>
          <Text style={styles.socialsText}>Соціальні мережі</Text>
          <TouchableOpacity
            onPress={() => onPress()}
          >
            <FontAwesome style={{marginRight:10}} name="telegram" size={28} color="#229ED9" />
          </TouchableOpacity>
        </View>
        <View style={styles.themeContainer}>
          <Text style={styles.themeText}>Тема Black</Text>
          <Switch
            onValueChange={() => {
              setMode((value) => !value);
              EventRegister.emit("changeTheme", mode);
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    minHeight: 82,
    marginHorizontal: 20,
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: "#F2F5FD",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal:20,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#000000",
  },
  socialsText: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
    color: "#000000",
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingBottom: 8,
  },
  themeText: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
    color: "#000000",
  },
});

export default ConfigScreen;
