import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../hooks/redux";
import StudentsSelectGroup from "../components/StudentsSelectGroup";
import { StudentsUnselectedGroup } from "../components/StudentsUnselectedGroup";
import { StudentsSessionListIsEmpty } from "../components/StudentsSessionListEmpty";
import { ThemeContext } from "../context/ThemeContext";
import { getStudentsSessions } from "../servises/api/apiShadule";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { StudentsSessionList } from "../components/StudentsSessionList";
import { ISession } from "../models/ISession";

const StudentsSessionsScreen = () => {
  const allGroups = useAppSelector((state) => state.initial.allGroups);
  const selectedGroup = useAppSelector((state) => state.initial.selectedGroup);
  const theme = useContext(ThemeContext);
  const [sessionList, setSessionList] = useState<[] | ISession[]>([]);


  useEffect(() => {
    const getData = async () => {
      try {
        if (selectedGroup.name.length > 0) {
          const result = await getStudentsSessions(selectedGroup.code);
          setSessionList(result.data);
          console.log(result.data);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to upload session list",
        });
      }
    };
    getData();
  }, [selectedGroup]);

  return (
    <LinearGradient
      colors={theme.gradient}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      <StatusBar
        animated={false}
        backgroundColor={theme.statusBarBG}
        barStyle={theme.statusBarColor}
      />
      <ScrollView
        style={styles.container}
      >
        {allGroups.data.length > 0 && <StudentsSelectGroup />}
        {selectedGroup.name.length === 0 && <StudentsUnselectedGroup />}
        {selectedGroup.name.length > 0 && sessionList.length === 0 && (
          <StudentsSessionListIsEmpty />
        )}
        {sessionList.length > 0 && <StudentsSessionList sessionList={sessionList} />}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scroll: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  sheduleContainer: {
    marginHorizontal: 20,
    mb: 0,
    marginTop: 33,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F2F5FD",
  },
  selectedDayContainer: {
    marginTop: 48,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dateText: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
    color: "#000000",
  },
  dateTextHiden: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
    color: "transparent",
  },
});

export default StudentsSessionsScreen;
