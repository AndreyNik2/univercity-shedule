import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import StudentsSheduleScreen from "../screens/StudentsSheduleScreen";
import StudentsSessionsScreen from "../screens/StudentsSessionsScreen";
import ConfigScreen from "../screens/ConfigScreen";
import { ThemeContext } from "../context/ThemeContext";
import { TeachersSheduleScreen } from "../screens/TeachersSheduleScreen";
import { TeachersUnselectedScreen } from "../screens/TeachersUnselectedScreen";
import { useAppSelector } from "../hooks/redux";
import { TeachersNotesNavigation } from "./TeachersNotesNavigation";
import { TeachersLoadScreen } from "../screens/TeachersLoadScreen";
import { selectTeacher } from "../redux/initial/initialSlice";
import { TeachersHourAccountingScreen } from "../screens/TeachersHourAccountingScreen";

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
        component={TeachersSheduleScreen}
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
          component={TeachersUnselectedScreen}
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
      {selecctedTeacher.name.length === 0 && (
        <Tab.Screen
          name="Навантаження"
          component={TeachersUnselectedScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="layers" size={24} color={color} />
            ),
          }}
        />
      )}
      {selecctedTeacher.name.length > 0 && (
        <Tab.Screen
          name="Навантаження"
          component={TeachersLoadScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="layers" size={24} color={color} />
            ),
          }}
        />
      )}
      {selecctedTeacher.name.length === 0 && (
        <Tab.Screen
          name="Облік годин"
          component={TeachersUnselectedScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="clock" size={24} color={color} />
            ),
          }}
        />
      )}
      {selecctedTeacher.name.length > 0 && (
        <Tab.Screen
          name="Облік годин"
          component={TeachersHourAccountingScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="clock" size={24} color={color} />
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
