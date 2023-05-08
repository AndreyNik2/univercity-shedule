import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "../hooks/redux";

const SelectWeeks: React.FC = () => {
  const { allGroups, weeks, currentDay } = useAppSelector(
    (state) => state.initialReduser
  );
  return (
    <View style={styles.selectWeeksContainer}>
      <TouchableOpacity style={styles.selectLeftBtn}>
        <AntDesign name="left" size={12} color="black" />
      </TouchableOpacity>
      <Text>Проміжок</Text>
      <TouchableOpacity style={styles.selectRightBtn}>
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
