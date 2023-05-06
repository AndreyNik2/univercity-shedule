import React from "react";
import {Provider} from 'react-redux'
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./navigations/StudentsNavigations";
import { setupStore } from "./redux/store";
import { HomeScreen } from "./screens/HomeScreen";
import StudentsNavigator from "./navigations/StudentsNavigations";
import { routes } from "./config/routes";

const store = setupStore();

const App: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          {routes.map((r, i) => (
            <Stack.Screen
              key={i}
              name={r.name}>
              {(props) => <r.component nameProp={r.name} {...props} />}
              </Stack.Screen>
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
