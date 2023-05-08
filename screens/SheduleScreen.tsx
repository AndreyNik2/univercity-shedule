import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectGrous from "../components/SelectGroup";
import WeekShedule from "../components/WeekShedule";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchGroups,
  fetchWeeks,
  getCurrentDay,
} from "../redux/initial/operations";
import SelectWeeks from "../components/SelectWeeks";
import { LinearGradient } from "expo-linear-gradient";

const SheduleScreen = () => {
  const [dropdownValue, setDropdownValue] = useState("");
  const [shedule, setShedule] = useState([]);

  const selectDropdownValue = (value: string) => {
    setDropdownValue(value);
  };

  const dispatch = useAppDispatch();
  const { allGroups, weeks, currentDay } = useAppSelector(
    (state) => state.initialReduser
  );

  useEffect(() => {
    dispatch(fetchWeeks());
    dispatch(fetchGroups());
    dispatch(getCurrentDay());
  }, []);

  return (
    <LinearGradient
      colors={["#FEEFF2", "#DDE9FD"]}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      <SelectGrous selectDropdownValue={selectDropdownValue} />
      <View style={styles.sheduleContainer}>
        <SelectWeeks />
        <WeekShedule selectedGroup={dropdownValue} />
        <View style={styles.selectedDayContainer}>
          <Text style={styles.dateTextHiden}>Вибрана дата</Text>
          <Text style={styles.dateText}>День тиждня</Text>
          <Text style={styles.dateText}>Вибрана дата</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  sheduleContainer: {
    marginHorizontal: 20,
    mb: 0,
    marginTop: 33,
    height: "100%",
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

export default SheduleScreen;
