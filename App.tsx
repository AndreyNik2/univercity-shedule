import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./navigations/AppNavigators";

const App: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="App Navigation"
            component={AppNavigator}
            options={{
              headerTitle: () => (
                <Image
                  style={{  width: 70, height: 70, marginHorizontal:140 }}
                  source={require("./assets/logo.png")}
                />
              ),
              headerTitleStyle: { flex: 1, textAlign: "center" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
