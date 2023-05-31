import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { ThemeContext } from "../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ITeachersShedule } from "../models/ITeachersShedule";
import { IDataWeeks, IWeeks } from "../models/IWeeks";
import { format } from "date-fns";
import {
  fetchTeachers,
  fetchWeeks,
  getCurrentDay,
} from "../redux/initial/operations";
import { getTeachersShedule } from "../servises/api/apiShadule";
import { TeachersSelect } from "../components/TeachersSelect";
import SelectDayOfTheWeek, { weekDays } from "../components/SelectDayOfTheWeek";
import SelectWeeks from "../components/SelectWeeks";
import { TeachersSheduleList } from "../components/TeachersShaduleList";

export const TeachersSheduleScreen: React.FC = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.auth.error);
  const weeks = useAppSelector((state) => state.initial.weeks);
  const teachersList = useAppSelector((state) => state.initial.teachrsList);
  const currentDay = useAppSelector((state) => state.initial.currentDay);
  const selectedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );
  const [shedule, setShedule] = useState<ITeachersShedule[] | []>([]);
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
    dispatch(fetchTeachers());
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
        if (selectedTeacher.id.length > 0) {
          const result = await getTeachersShedule(
            selectedTeacher.id,
            selectedWeek[0].id
          );
          setShedule(result.data);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to upload shedule",
        });
        console.log(`Failed to upload shedule with error(${error})`);
      }
    };
    if (selectedWeek.length > 0 && selectedTeacher.id.length > 0) {
      getData();
    }
  }, [selectedTeacher, selectedWeek]);

  return (
    <LinearGradient
      colors={theme.gradient}
      start={[0, 1]}
      style={styles.linearGradient}
    >
      {Platform.OS === "android" && (
        <StatusBar
          animated={false}
          backgroundColor={theme.statusBarBG}
          barStyle={theme.statusBarColor}
        />
      )}
      <ScrollView style={styles.containerFlex}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.containerFlex}
        >
          {teachersList.data.length > 0 && <TeachersSelect />}
          {selectedTeacher.name.length > 0 && (
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
                <Text style={[styles.dateText, { color: theme.textColor }]}>
                  {getFullName(selectedDay, weekDays)}
                </Text>
                <Text style={[styles.dateText, { color: theme.textColor }]}>
                  {getSelectedDate(selectedWeek, selectedDay)}
                </Text>
              </View>
              <TeachersSheduleList
                shedule={shedule}
                selectedDay={selectedDay}
              />
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  containerFlex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 8,
  },
  buttonContainer: {
    height: 46,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1976D2",
    borderRadius: 14,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
  },
  buttonTitle: {
    fontFamily: "Exo2-Medium",
    fontSize: 18,
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
