import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import SheduleScreen from "../screens/StudentsSheduleScreen";
import SessionsScreen from "../screens/SessionsScreen";
import ConfigScreen from "../screens/ConfigScreen";
import { ThemeContext } from "../context/ThemeContext";
import { TeacherSheduleScreen } from "../screens/TeacherSheduleScreen";
import { TeachersUnselectNotes } from "../screens/TeachersUnselectJournal";
import { useAppSelector } from "../hooks/redux";
import { TeachersNotesNavigation } from "./TeachersNotesNavigation";

const Tab = createBottomTabNavigator();

const TeachersNavigator = () => {
  const theme = useContext(ThemeContext);
  const selecctedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );

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
      {selecctedTeacher.name.length === 0 && (
        <Tab.Screen
          name="Записи"
          component={TeachersUnselectNotes}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="edit" size={24} color={color} />
            ),
          }}
        />
      )}
      {selecctedTeacher.name.length > 0 && (
        <Tab.Screen
          name="Записи"
          component={TeachersNotesNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="edit" size={24} color={color} />
            ),
          }}
        />
      )}
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
