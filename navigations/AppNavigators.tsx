import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TimetableScreen from "../screens/TimetableScreen";
import SessionsScreen from "../screens/SessionsScreen";
import ForTeacherScreen from "../screens/ForTeacherScreen";

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Розклад" component={TimetableScreen} />
        <Tab.Screen name="Сесії" component={SessionsScreen} />
        <Tab.Screen name="Для викладачів" component={ForTeacherScreen} />
      </Tab.Navigator>
    );
};

export default AppNavigator;