import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../hooks/redux";

type Props = {
  selectDayOfTheWeek: (selectedDay: number, value: number) => void;
  selectedDay: number;
};

interface WeekDay {
  day: number,
  name: string,
  fullName: string
}

export const weekDays: any =
  // : Array<{ day: number; name: string; fullName: string } | undefined>
  [
    { day: 0, name: "ПН", fullName: "Понеділок" },
    { day: 1, name: "ВТ", fullName: "Вівторок" },
    { day: 2, name: "СР", fullName: "Середа" },
    { day: 3, name: "ЧТ", fullName: "Четвер" },
    { day: 4, name: "ПТ", fullName: "П'ятниця" },
    { day: 5, name: "СБ", fullName: "Субота" },
    ,
  ];

const SelectDayOfTheWeek: React.FC<Props> = ({
  selectDayOfTheWeek,
  selectedDay,
}) => {


  const getFullName = (selectedDay: number, weekDays: any) => {
    return weekDays.find((weekDay: any) => weekDay.day === selectedDay).fullName

  }

  useEffect(() => {}, [selectedDay]);

  return (
    <View style={styles.container}>
      {weekDays.map((day: any) => {
        const textStyles = [styles.label];
        const touchable = [styles.touchable];
        if (day.day === selectedDay) {
          textStyles.push(styles.selectedLabel);
          touchable.push(styles.selectedTouchable);
        }
        return (
          <View key={day?.day} style={styles.dayContainer}>
            <TouchableOpacity
              onPress={() => {
                selectDayOfTheWeek(selectedDay, day.day);
              }}
              style={touchable}
            >
              <Text style={textStyles}>{day?.name}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {/* <View style={styles.selectedDayContainer}>
        <Text style={styles.dateTextHiden}>Вибрана дата</Text>
        <Text style={styles.dateText}>
          {getFullName(selectedDay, weekDays)}
        </Text>
        <Text style={styles.dateText}>Вибрана дата</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: "#E2E5F6",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  selectWeekContainer: {},
  dayContainer: {},
  dayButton: {},
  touchable: {
    backgroundColor: "transparent",
    borderRadius: 13,
  },
  selectedTouchable: {
    backgroundColor: "#ffffff",
    borderRadius: 13,
  },
  weekDayText: {
    color: "rgb(20, 21, 24)",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label: {
    color: "#535252",
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  selectedLabel: {
    color: "#535252",
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  // selectedDayContainer: {
  //   marginTop: 48,
  //   paddingHorizontal: 20,
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // dateText: {
  //   fontFamily: "Exo2-Regular",
  //   fontSize: 14,
  //   color: "#000000",
  // },
  // dateTextHiden: {
  //   fontFamily: "Exo2-Regular",
  //   fontSize: 14,
  //   color: "transparent",
  // },
});

export default SelectDayOfTheWeek;
