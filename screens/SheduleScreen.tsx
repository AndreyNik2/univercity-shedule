import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectGroups from "../components/SelectGroup";
import SelectDayOfTheWeek from "../components/SelectDayOfTheWeek";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchGroups,
  fetchWeeks,
  getCurrentDay,
} from "../redux/initial/operations";
import SelectWeeks from "../components/SelectWeeks";
import { LinearGradient } from "expo-linear-gradient";
import { IDataWeeks, IWeeks } from "../models/IWeeks";
import { SheduleList } from "../components/ShaduleList";

const SheduleScreen = () => {
  const dispatch = useAppDispatch();
  const { allGroups, weeks, currentDay, selectedGroup } = useAppSelector(
    (state) => state.initialReduser
  );
  const [shedule, setShedule] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState<IWeeks[]|[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);

  

  const selectLastWeek = (selectedWeek: IWeeks[]) => {
    if (weeks) {
      const index = weeks.data.findIndex((week) => (week.id = selectedWeek[0].id));
      if (index > 0) {
        setSelectedWeek([weeks.data[index - 1]]);
      }
    }
    return;
  };

  const selectNextWeek = (selectedWeek: IWeeks[]) => {
    if (weeks) {
      const index = weeks.data.findIndex(
        (week) => (week.id = selectedWeek[0].id)
      );
      if (index < weeks.data.length) {
        setSelectedWeek([weeks.data[index + 1]]);
      }
      return;
    }
  };

  const selectDayOfTheWeek = (value: number) => {
    setSelectedDay(value);
  };

  const selectCurrentWeek = (
    weeks: IDataWeeks,
    currentDay: {
      currentWeek: string;
      currentDay: number;
    }
  ) => {
    weeks.data.filter((week) => week.id === currentDay.currentWeek);
  };


  useEffect(() => {
    dispatch(getCurrentDay());
    dispatch(fetchGroups());
    dispatch(fetchWeeks());
  }, []);

  useEffect(() => {
    
  },[dispatch])



  return (
    <LinearGradient
      colors={["#FEEFF2", "#DDE9FD"]}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      {allGroups.data.length > 0 && <SelectGroups />}
      {selectedGroup.name.length > 0 && (
        <View style={styles.sheduleContainer}>
          {weeks && currentDay && selectedWeek.length > 0 && (
            <SelectWeeks
              selectLastWeek={selectLastWeek}
              selectNextWeek={selectNextWeek}
              selectedWeek={selectedWeek}
            />
          )}
          <SelectDayOfTheWeek
            selectDayOfTheWeek={selectDayOfTheWeek}
            selectedDay={selectedDay}
          />
          <View style={styles.selectedDayContainer}>
            <Text style={styles.dateTextHiden}>Вибрана дата</Text>
            <Text style={styles.dateText}>День тиждня</Text>
            <Text style={styles.dateText}>Вибрана дата</Text>
          </View>
          <SheduleList />
        </View>
      )}
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
