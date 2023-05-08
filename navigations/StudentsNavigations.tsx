import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SheduleScreen from "../screens/SheduleScreen";
import SessionsScreen from "../screens/SessionsScreen";
import ConfigScreen from "../screens/ConfigScreen";

const Tab = createBottomTabNavigator();

const StudentsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Розклад"
        component={SheduleScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Сесії"
        component={SessionsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Налаштування"
        component={ConfigScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default StudentsNavigator;
