import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectGrous from "../components/SelectGroup";
import WeekShedule from "../components/WeekShedule";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchGroups, fetchWeeks, getCurrentDay } from "../redux/initial/operations";

const SheduleScreen = () => {
  const [dropdownValue, setDropdownValue] = useState('');
  const [shedule, setShedule] = useState([])


  const selectDropdownValue = (value:string) => {
    setDropdownValue(value)
  }


  const dispatch = useAppDispatch();
  const { allGroups, weeks, currentDay } = useAppSelector(state => state.initialReduser)
  
  useEffect(() => {
    dispatch(fetchWeeks())
    dispatch(fetchGroups())
    dispatch(getCurrentDay())

  },[])

  return (
    <View style={styles.container}>
      <SelectGrous selectDropdownValue={selectDropdownValue} />
      <WeekShedule selectedGroup={dropdownValue} />
      <View>
        <Text>{JSON.stringify(allGroups, null, 2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SheduleScreen;
