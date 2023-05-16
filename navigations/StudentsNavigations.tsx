import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import SheduleScreen from "../screens/SheduleScreen";
import SessionsScreen from "../screens/SessionsScreen";
import ConfigScreen from "../screens/ConfigScreen";
import { themeContext } from "../config/themeContext";

const Tab = createBottomTabNavigator();

const StudentsNavigator = () => {

  const theme = useContext(themeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1976D2",
        tabBarStyle: {
          minHeight: 80,
          backgroundColor: theme.innerContainerBackground,
        },
        tabBarLabelStyle: {
          fontFamily: "Exo2-Regular",
          fontSize: 14,
          marginBottom: 10,
          marginTop: 0,
        },
        tabBarIconStyle: { marginBottom: 8 },
      }}
    >
      <Tab.Screen
        name="Розклад"
        component={SheduleScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Сесії"
        component={SessionsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="book" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Налаштування"
        component={ConfigScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StudentsNavigator;
