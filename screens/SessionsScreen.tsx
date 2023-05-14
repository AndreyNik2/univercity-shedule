import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../hooks/redux";
import SelectGroups from "../components/SelectGroup";
import { UnselectGroup } from "../components/unselectGroup";
import { SessionListIsEmpty } from "../components/SessionListIsEmpty";

const SessionsScreen = () => {
  const { allGroups, weeks, currentDay, selectedGroup } = useAppSelector(
    (state) => state.initialReduser
  );

  const [sessionList, setSessionList] = useState<[]>([]);

  return (
    <LinearGradient
      colors={["#FEEFF2", "#DDE9FD"]}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      {allGroups.data.length > 0 && <SelectGroups />}
      {selectedGroup.name.length === 0 && <UnselectGroup />}
      {selectedGroup.name.length > 0 && sessionList.length === 0 && (
        <SessionListIsEmpty />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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

export default SessionsScreen;
