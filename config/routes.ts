import { IRouteProp } from "../models/RouteProp";
import StudentsNavigator from "../navigations/StudentsNavigations";
import TeachersNavigator from "../navigations/TeachersNavigation";
import { AuthTeacherScreen } from "../screens/AuthTeacherScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { TeachersScreen } from "../screens/TeachersScreen";



export const homeRout: IRouteProp = {
  name: "Home",
  component: HomeScreen,
};

export const studentRout: IRouteProp = {
  name: "StudentsScreen",
  component: StudentsNavigator,
};

export const teacherRout: IRouteProp = {
  name: "TeachersScreen",
  component: TeachersNavigator,
};

export const authTeacherRout: IRouteProp = {
  name: "AuthTeachersScreen",
  component: AuthTeacherScreen,
};
