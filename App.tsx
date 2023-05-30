import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-native-gesture-handler";
import { persistor, store } from "./redux/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { EventRegister } from "react-native-event-listeners";
import { ThemeContext } from "./context/ThemeContext";
import { theme } from "./config/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppRouter } from "./navigations/AppRouter";
import Toast from "react-native-toast-message";
import {SafeAreaView, StyleSheet} from 'react-native'

const App: React.FC = () => {
  //  const  userType  = useAppSelector((state) => state.initial.userType);
  const [mode, setMode] = useState<Boolean>(false);
  const [fontsLoaded] = useFonts({
    "Exo2-Medium": require("./fonts/Exo2-Medium.ttf"),
    "Exo2-Regular": require("./fonts/Exo2-Regular.ttf"),
    "Exo2-SemiBold": require("./fonts/Exo2-SemiBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    const eventListner = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeAllListeners();
    };
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeContext.Provider value={mode === true ? theme.dark : theme.light}>
          <SafeAreaView style={styles.container}>
            <AppRouter />
            <Toast />
          </SafeAreaView>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default App;
