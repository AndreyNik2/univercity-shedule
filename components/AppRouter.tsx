import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { authTeacherRout, homeRout, studentRout, teacherRout } from "../config/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

export const AppRouter: React.FunctionComponent = () => {
  
    const Stack = createNativeStackNavigator();
  const userType = useAppSelector((state) => state.initial.userType);
  const access_token = useAppSelector((state) => state.auth.user.access_token)
    const dispatch = useAppDispatch();

  useEffect(()=> {
  
  },[dispatch, userType])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {userType === "" && (
          <Stack.Screen name={homeRout.name}>
            {(props) => (
              <homeRout.component nameProp={homeRout.name} {...props} />
            )}
          </Stack.Screen>
        )}
        {userType === "student" && (
          <Stack.Screen name={studentRout.name}>
            {(props) => (
              <studentRout.component nameProp={studentRout.name} {...props} />
            )}
          </Stack.Screen>
        )}
        {userType === "teacher" && access_token.length > 0 && (
          <Stack.Screen name={teacherRout.name}>
            {(props) => (
              <teacherRout.component nameProp={teacherRout.name} {...props} />
            )}
          </Stack.Screen>
        )}
        {userType === "teacher" && access_token.length === 0 && (
          <Stack.Screen name={authTeacherRout.name}>
            {(props) => (
              <authTeacherRout.component nameProp={authTeacherRout.name} {...props} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
