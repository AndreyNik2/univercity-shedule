import React, { useCallback, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Switch } from "react-native-gesture-handler";
import { EventRegister } from "react-native-event-listeners";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUser } from "../redux/initial/initialSlice";
import { logOut } from "../redux/auth/operations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConfigScreen = () => {
  const [mode, setMode] = useState(false);
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const userType = useAppSelector((state) => state.initial.userType);

  const telegramBotURL = "https://t.me/schedule_polytech_bot";


  type OpenURLButtonProps = {
    url: string;
    children: string;
  };

  const logout = () => {
    dispatch(setUser(""));
    dispatch(logOut())
  }

  useEffect(() => {
    AsyncStorage.getItem("THEME_VALUE").then((value) => {
      if (value) {
        setMode(JSON.parse(value));
      }
    });
  }, []);

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
      colors={theme.gradient}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      {Platform.OS === "android" && (
        <StatusBar
          animated={false}
          backgroundColor={theme.statusBarBG}
          barStyle={theme.statusBarColor}
        />
      )}
      <View
        style={[
          styles.container,
          { backgroundColor: theme.middleContainerBackground },
        ]}
      >
        <View
          style={[
            styles.socialContainer,
            { borderColor: theme.dashedBorderColor },
          ]}
        >
          <Text style={[styles.socialsText, { color: theme.textColor }]}>
            Соціальні мережі
          </Text>
          <TouchableOpacity
            style={styles.telegramContainer}
            onPress={() => onPress()}
          >
            <FontAwesome name="telegram" size={40} color="#229ED9" />
          </TouchableOpacity>
        </View>
        <View style={styles.themeContainer}>
          <Text style={[styles.themeText, { color: theme.textColor }]}>
            Тема Black
          </Text>
          <Switch
            value={mode}
            style={styles.switch}
            onValueChange={(value) => {
              setMode(value);
              EventRegister.emit("changeTheme", value);
            }}
          />
        </View>
      </View>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.middleContainerBackground },
        ]}
      >
        <View
          style={[
            styles.itemContainer,
            { borderColor: theme.dashedBorderColor },
          ]}
        >
          <Text style={[styles.configText, { color: theme.textColor }]}>
            Допомога та підтримка
          </Text>
        </View>
        <View
          style={[
            styles.itemContainer,
            { borderColor: theme.dashedBorderColor },
          ]}
        >
          <Text style={[styles.configText, { color: theme.textColor }]}>
            Зв'язатися з нами
          </Text>
        </View>
        <View
          style={[
            styles.itemContainer,
            { borderColor: theme.dashedBorderColor },
          ]}
        >
          <Text style={[styles.configText, { color: theme.textColor }]}>
            Політитка конфіденційності
          </Text>
        </View>
        <View style={styles.itemContainerLast}>
          <Text style={[styles.configText, { color: theme.textColor }]}>
            Вийти
          </Text>
          <TouchableOpacity onPress={logout}>
            <Ionicons name="exit-outline" size={40} color="#229ED9" />
          </TouchableOpacity>
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
  rowContainer: {
    flexDirection: "row",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    ...Platform.select({
      android: {
        borderStyle: "dashed",
        paddingTop: 5,
        paddingBottom: 5,
      },
      ios: { borderStyle: "solid", paddingTop: 7, paddingBottom: 7 },
      default: { borderStyle: "solid" },
    }),
  },
  socialsText: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
  },
  telegramContainer: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      android: {},
      ios: { paddingTop: 12, paddingBottom: 12 },
      default: {},
    }),
  },
  themeText: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
  },
  switch: {
    width: 40,
    ...Platform.select({
      android: {},
      ios: {
        marginRight: 10,
      },
      default: {},
    }),
  },
  configText: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    ...Platform.select({
      android: {
        borderStyle: "dashed",
      },
      ios: { borderStyle: "solid" },
      default: { borderStyle: "solid" },
    }),
  },
  itemContainerLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default ConfigScreen;
