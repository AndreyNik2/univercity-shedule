import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import SheduleScreen from "../screens/StudentsSheduleScreen";
import SessionsScreen from "../screens/SessionsScreen";
import ConfigScreen from "../screens/ConfigScreen";
import { ThemeContext } from "../context/ThemeContext";
import { TeacherSheduleScreen } from "../screens/TeacherSheduleScreen";

const Tab = createBottomTabNavigator();

const TeachersNavigator = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1976D2",
        tabBarStyle: {
          ...Platform.select({
            android: {
              height: 80,
            },
            ios: {
              height: 90,
            },
            default: {
              minHeight: 70,
            },
          }),

          backgroundColor: theme.innerContainerBackground,
        },
        tabBarLabelStyle: {
          fontFamily: "Exo2-Regular",
          fontSize: 14,
          ...Platform.select({
            android: {
              marginBottom: 15,
            },
            ios: {},
            default: {},
          }),
        },
        tabBarIconStyle: { marginBottom: 8 },
      }}
    >
      <Tab.Screen
        name="Розклад"
        component={TeacherSheduleScreen}
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

export default TeachersNavigator;
