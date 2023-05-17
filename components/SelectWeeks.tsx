import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/redux";
import { IDataWeeks, IWeeks } from "../models/IWeeks";
import { themeContext } from "../config/themeContext";

type Props = {
  selectLastWeek: (weeks: IDataWeeks, selectedWeek: IWeeks[]) => void;
  selectNextWeek: (weeks: IDataWeeks, selectedWeek: IWeeks[]) => void;
  selectedWeek: IWeeks[];
};

const SelectWeeks: React.FC<Props> = ({selectLastWeek, selectNextWeek, selectedWeek}) => {
 
  const { allGroups, weeks, currentDay, selectedGroup } = useAppSelector(
    (state) => state.initialReduser
  );
  const theme = useContext(themeContext);
 
  return (
    <View
      style={[
        styles.selectWeeksContainer,
        { backgroundColor: theme.innerContainerBackground },
      ]}
    >
      <TouchableOpacity
        style={styles.selectLeftBtn}
        onPress={() => {
          if (weeks) {
            selectLastWeek(weeks, selectedWeek);
          }
        }}
      >
        <AntDesign name="left" size={12} color="black" />
      </TouchableOpacity>
      <Text style={[styles.period, {color: theme.textColor}]}>
        {selectedWeek.length > 0 &&
          `${selectedWeek[0].start} - ${selectedWeek[0].end}`}
      </Text>
      <TouchableOpacity
        style={styles.selectRightBtn}
        onPress={() => {
          if (weeks) {
            selectNextWeek(weeks, selectedWeek);
          }
        }}
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
  },
});

export default SelectWeeks;
