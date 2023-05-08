import { IRouteProp } from "../models/RouteProp";
import StudentsNavigator from "../navigations/StudentsNavigations";
import { HomeScreen } from "../screens/HomeScreen";
import { TeachersScreen } from "../screens/TeachersScreen";

export const routes: IRouteProp[] = [
    {
        name: 'Home',
        component: HomeScreen,
    },
    {
        name: 'StudentsScreen',
        component: StudentsNavigator
    },
    {
        name: 'TeachersScreen',
        component: TeachersScreen
    },
]