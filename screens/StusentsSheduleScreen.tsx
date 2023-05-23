import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
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
import { getShedule } from "../servises/api/apiShadule";
import { IGroups } from "../models/IGroups";
import { IShedule } from "../models/IShedule";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../context/ThemeContext";

const SheduleScreen = () => {
  const dispatch = useAppDispatch();
  const  allGroups  = useAppSelector(
    (state) => state.initial.allGroups
  );
  const weeks = useAppSelector(
    (state) => state.initial.weeks
  );
  const currentDay = useAppSelector(
    (state) => state.initial.currentDay
  );
  const selectedGroup = useAppSelector(
    (state) => state.initial.selectedGroup
  );
  const [shedule, setShedule] = useState<IShedule[] | []>([]);
  const [selectedWeek, setSelectedWeek] = useState<IWeeks[] | []>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const theme = useContext(ThemeContext);

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
  };

  const getSelectedDate = (selectedWeek: IWeeks[], selectedDay: number) => {
    if (selectedWeek.length > 0) {
      const calendarFormat = "dd.MM.yyyy";
      const formatedStartDate = `${selectedWeek[0].start.slice(
        6
      )}-${selectedWeek[0].start.slice(3, 5)}-${selectedWeek[0].start.slice(
        0,
        2
      )}`;
      const startDate: Date = new Date(formatedStartDate);
      const currentDate = startDate.setDate(startDate.getDate() + selectedDay);
      return format(currentDate, calendarFormat);
    }
  };

  useEffect(() => {
    dispatch(getCurrentDay());
    dispatch(fetchGroups());
    dispatch(fetchWeeks());
    if (weeks && currentDay.currentWeek.length > 0) {
      selectCurrentWeek(weeks, currentDay);
    }
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
    };
    if (weeks && currentDay.currentWeek.length > 0) {
      selectCurrentWeek(weeks, currentDay);
    }
  }, [dispatch, weeks, currentDay]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (selectedGroup.code.length > 0) {
          const result = await getShedule(
            selectedGroup.code,
            selectedWeek[0].id
          );
          setShedule(result.data);
        }
      } catch (error) {
        console.log("somthing went wrong");
      }
    };
    if (selectedWeek.length > 0 && selectedGroup.code.length > 0) {
      getData();
    }
  }, [selectedGroup, selectedWeek]);

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
      <ScrollView style={styles.scroll}>
        {allGroups.data.length > 0 && <SelectGroups />}
        {selectedGroup.name.length === 0 && <UnselectGroup />}
        {selectedGroup.name.length > 0 && (
          <View
            style={[
              styles.sheduleContainer,
              { backgroundColor: theme.middleContainerBackground },
            ]}
          >
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
              <Text style={styles.dateTextHiden}>
                {getSelectedDate(selectedWeek, selectedDay)}
              </Text>
              <Text style={styles.dateText}>
                {getFullName(selectedDay, weekDays)}
              </Text>
              <Text style={styles.dateText}>
                {getSelectedDate(selectedWeek, selectedDay)}
              </Text>
            </View>
            <SheduleList shedule={shedule} selectedDay={selectedDay} />
          </View>
        )}
      </ScrollView>
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
