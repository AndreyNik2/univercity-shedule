import React from "react";
import {Provider} from 'react-redux'
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./navigations/AppNavigators";
import { setupStore } from "./redux/store";

const store = setupStore();

const App: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="App Navigation"
            component={AppNavigator}
            options={{
              headerTitle: () => (
                <Image
                  style={{ width: 70, height: 70, marginHorizontal: 140 }}
                  source={require("./assets/logo.png")}
                />
              ),
              headerTitleStyle: { flex: 1, textAlign: "center" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
