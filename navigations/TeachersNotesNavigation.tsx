import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TeachersNotesList } from "../components/TeachersNotesList";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../hooks/redux";
import { getTeachersJournal } from "../servises/api/apiShadule";
import { IJournal } from "../models/IJournal";
import { IRouteProp } from "../models/RouteProp";
import { TeachersJournal } from "../screens/TeachersJournal";
// import { teachersJournalRout, teachersNotesListRout } from "../config/routes";

const teachersJournalRout: IRouteProp = {
  name: "TeachersJournal",
  component: TeachersJournal,
};

const teachersNotesListRout: IRouteProp = {
  name: "TeachersNotesList",
  component: TeachersNotesList,
};


export const TeachersNotesNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  const [journalList, setJournalList] = useState<null | IJournal[]>(null);
  const selectedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );

  useEffect(() => {
    try {
      const getData = async () => {
        if (selectedTeacher.id.length > 0) {
          const result = await getTeachersJournal(selectedTeacher.id);
          setJournalList(result.data);
        }
      };
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to upload journal",
      });
    }
  }, [selectedTeacher]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={teachersNotesListRout.name}>
        {(props) => (
          <teachersNotesListRout.component
            nameProp={teachersNotesListRout.name}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={teachersJournalRout.name}>
        {(props) => (
          <teachersJournalRout.component
            nameProp={teachersJournalRout.name}
            {...props}
          />
        )}
      </Stack.Screen>
      {/* <Stack.Screen
        name="Home"
        component={TeachersNotesList}
        options={{ headerShown: false }}
      /> */}
      {/* {journalList &&
        journalList.map((item) => (
          <Stack.Screen
            name={item.subject}
            component={TeachersJournal}
            options={{ headerShown: false }}
          />
        ))} */}
    </Stack.Navigator>
  );
};
