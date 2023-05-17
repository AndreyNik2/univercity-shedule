import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { setupStore } from "./redux/store";
import { routes } from "./config/routes";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { EventRegister } from "react-native-event-listeners";
import { themeContext } from "./config/themeContext";
import { theme } from "./config/theme";

const store = setupStore();

const App: React.FC = () => {
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
    
  }, [])

  useEffect(() => {
    const eventListner = EventRegister.addEventListener('changeTheme', (data) => {
      setMode(data);
    });
    return () => {
      EventRegister.removeAllListeners()
      
    }
  })

   if (!fontsLoaded) {
     return null;
   } else {
     SplashScreen.hideAsync();
   }

  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <themeContext.Provider value={mode === true? theme.dark : theme.light}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"Home"}
            screenOptions={{
              headerShown: false,
            }}
          >
            {routes.map((r, i) => (
              <Stack.Screen key={i} name={r.name}>
                {(props) => <r.component nameProp={r.name} {...props} />}
              </Stack.Screen>
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </themeContext.Provider>
    </Provider>
  );
};

export default App;
