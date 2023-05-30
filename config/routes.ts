import { TeachersJournalListScreen } from "../screens/TeachersJournalListScreen";
import { IRouteProp } from "../models/RouteProp";
import StudentsNavigator from "../navigations/StudentsNavigations";
import TeachersNavigator from "../navigations/TeachersNavigation";
import { TeachersAuthScreen } from "../screens/TeachersAuthScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { TeachersJournalScreen } from "../screens/TeachersJournalScreen";

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
  component: TeachersAuthScreen,
};

export const teachersJournalRout: IRouteProp = {
  name: "TeachersJournal",
  component: TeachersJournalScreen,
};

export const teachersNotesListRout: IRouteProp = {
  name: "TeachersNotesList",
  component: TeachersJournalListScreen,
};
