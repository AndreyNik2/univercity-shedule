import { IRouteProp } from "../models/RouteProp";
import { HomeScreen } from "../screens/HomeScreen";
import { StudentsScreen } from "../screens/StudentsScreen";
import { TeachersScreen } from "../screens/TeachersScreen";

export const routes: IRouteProp[] = [
    {
        name: 'Home',
        component: HomeScreen,
    },
    {
        name: 'StudentsScreen',
        component: StudentsScreen
    },
    {
        name: 'TeachersScreen',
        component: TeachersScreen
    },
]