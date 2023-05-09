import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/redux";
import { IDataWeeks } from "../models/IWeeks";

type Props = {
  selectLastWeek: (value: string) => void;
  selectNextWeek: (value: string) => void;
  selectedWeek: string;
};

const SelectWeeks: React.FC<Props> = ({selectLastWeek, selectNextWeek, selectedWeek}) => {
  const {  weeks } = useAppSelector(
    (state) => state.initialReduser
  );

  const currentWeekPeriod = (weeks:IDataWeeks, selectedWeek:string) => {
    const week=  weeks.data.filter((week) => week.id === selectedWeek);
    return `${week[0].start} - ${week[0].end}`
  };

  useEffect(() => {
    if(!selectedWeek) {
      return
    }
  },[selectedWeek])

  
     

  return (
    <View style={styles.selectWeeksContainer}>
      <TouchableOpacity
        style={styles.selectLeftBtn}
        onPress={() => selectLastWeek(selectedWeek)}
      >
        <AntDesign name="left" size={12} color="black" />
      </TouchableOpacity>
      <Text>{currentWeekPeriod(weeks, selectedWeek)}</Text>
      <TouchableOpacity
        style={styles.selectRightBtn}
        onPress={() => selectNextWeek(selectedWeek)}
      >
        <AntDesign name="right" size={12} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectWeeksContainer: {
        height: 41,
      marginTop:23,
    marginHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#E2E5F6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectLeftBtn: {
    marginLeft: 20,
    paddingVertical: 10.5,
    paddingLeft: 12,
    paddingRight: 28,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  selectRightBtn: {
    marginRight: 20,
    paddingVertical: 10.5,
    paddingRight: 12,
    paddingLeft: 28,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  period: {
    fontFamily: "Exo2-Regular",
    fontSize: 12,
    marginBottom: 12,
  },
});

export default SelectWeeks;
