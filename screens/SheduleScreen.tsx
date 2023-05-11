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
import { format } from "date-fns";
import { weekDays } from "../components/SelectDayOfTheWeek";
import { UnselectGroup } from "../components/unselectGroup";

const SheduleScreen = () => {
  const dispatch = useAppDispatch();
  const { allGroups, weeks, currentDay, selectedGroup } = useAppSelector(
    (state) => state.initialReduser
  );
  const [shedule, setShedule] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState<IWeeks[] | []>([]);
  const [selectedDay, setSelectedDay] = useState(0);

  const selectLastWeek = (weeks: IDataWeeks, selectedWeek: IWeeks[]) => {
    if (weeks) {
      const index = weeks.data.findIndex(
        (week) => week.id === selectedWeek[0].id
      );
      if (index > 0) {
        setSelectedWeek([weeks.data[index - 1]]);
      }
    }
    return;
  };

  const selectNextWeek = (weeks: IDataWeeks, selectedWeek: IWeeks[]) => {
    if (weeks) {
      const index = weeks.data.findIndex(
        (week) => week.id === selectedWeek[0].id
      );
      if (index + 1 < weeks.data.length) {
        setSelectedWeek([weeks.data[index + 1]]);
      }
      return;
    }
  };

  const selectDayOfTheWeek = (selectedDay: number, value: number) => {
    setSelectedDay(value);
    console.log(selectedDay);
  };

  const getFullName = (selectedDay: number, weekDays: any) => {
    return weekDays.find((weekDay: any) => weekDay.day === selectedDay)
      .fullName;
  };

  const selectCurrentWeek = (
    weeks: IDataWeeks,
    currentDay: {
      currentWeek: string;
      currentDay: number;
    }
  ) => {
    setSelectedWeek(
      weeks.data.filter((week) => week.id === currentDay.currentWeek)
    );
    console.log(selectedWeek);
  };

  const getSelectedDate = (selectedWeek: IWeeks[], selectedDay: number) => {
    const add = require("date-fns/add");
    const calendarFormat = 'dd.MM.yyyy'
    const formatedStartDate = `${selectedWeek[0].start.slice(6)}-${selectedWeek[0].start.slice(3,5)}-${selectedWeek[0].start.slice(0,2)}`
    const startDate = new Date(formatedStartDate);
    return format(add(startDate, {days: selectedDay}), calendarFormat)
  };

  useEffect(() => {
    dispatch(getCurrentDay());
    dispatch(fetchGroups());
    dispatch(fetchWeeks());
    if (weeks && currentDay.currentWeek.length > 0) {
      selectCurrentWeek(weeks, currentDay);
    }
    console.log(selectedWeek);
  }, []);

  useEffect(() => {
    const selectCurrentWeek = (
      weeks: IDataWeeks,
      currentDay: {
        currentWeek: string;
        currentDay: number;
      }
    ) => {
      setSelectedWeek(
        weeks.data.filter((week) => week.id === currentDay.currentWeek)
      );
      console.log(selectedWeek);
    };
    if (weeks && currentDay.currentWeek.length > 0) {
      selectCurrentWeek(weeks, currentDay);
    }
  }, [dispatch, weeks, currentDay]);

  return (
    <LinearGradient
      colors={["#FEEFF2", "#DDE9FD"]}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      {allGroups.data.length > 0 && <SelectGroups />}
      {selectedGroup.name.length === 0 && <UnselectGroup/>}
      {selectedGroup.name.length > 0 && (
        <View style={styles.sheduleContainer}>
          {selectedWeek && (
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
            <Text style={styles.dateTextHiden}>{getSelectedDate(selectedWeek, selectedDay)}</Text>
            <Text style={styles.dateText}>
              {getFullName(selectedDay, weekDays)}
            </Text>
            <Text style={styles.dateText}>{getSelectedDate(selectedWeek, selectedDay)}</Text>
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
