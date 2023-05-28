import React, { useContext, useEffect, useState } from "react";
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
import Toast from "react-native-toast-message";
import { ThemeContext } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../hooks/redux";
import { SelectTeacher } from "./SelectTeacher";
import { getTeachersJournal } from "../servises/api/apiShadule";
import { IJournals } from "../models/IJournal";
import { useNavigation } from "@react-navigation/native";
import { IStackScreenProp } from "../models/StackScreenProps";



export const TeachersNotesList: React.FC<IStackScreenProp> = ({
  navigation,
  route,
  nameProp,
}) => {
  const theme = useContext(ThemeContext);
  const teachersList = useAppSelector((state) => state.initial.teachrsList);
  const [journalList, setJournalList] = useState<null | IJournals[]>(null);
  const selectedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );

  useEffect(() => {
    const getData = async () => {
      try {
        if (selectedTeacher.id.length > 0) {
          const result = await getTeachersJournal(selectedTeacher.id);
          setJournalList(result.data);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to upload journal",
        });
      }
    };
    getData();
  }, [selectedTeacher]);

  return (
    <LinearGradient
      colors={theme.gradient}
      // colors={["#FEEFF2", "#000"]}
      start={[0, 1]}
      style={styles.container}
    >
      <StatusBar
        animated={false}
        backgroundColor={theme.statusBarBG}
        barStyle={theme.statusBarColor}
      />
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          {teachersList.data.length > 0 && <SelectTeacher />}
          <View
            style={[
              styles.journalsContainer,
              { backgroundColor: theme.middleContainerBackground },
            ]}
          >
            {journalList &&
              journalList.map((item) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    navigation.navigate("TeachersJournal", {
                      journalParam: { item },
                    });
                  }}
                  key={item.id}
                >
                  <Text style={[styles.itemTitle, { color: theme.textColor }]}>
                    {item.subject}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  journalsContainer: {
    paddingVertical:10,
    minHeight: 82,
    marginHorizontal: 20,
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: "#F2F5FD",
  },
  itemContainer: {
    marginHorizontal: 20,
    marginVertical:2,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemTitle: {
    textAlign: 'center'
  },
});
