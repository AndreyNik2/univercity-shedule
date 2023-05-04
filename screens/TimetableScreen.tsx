import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectGrous from "../components/SelectGroup";
import WeekShedule from "../components/WeekShedule";

const TimetableScreen = () => {
  const [dropdownValue, setDropdownValue] = useState('');


  const selectDropdownValue = (value:string) => {
    setDropdownValue(value)
  }


  return (
    <View style={styles.container}>
      <SelectGrous selectDropdownValue={selectDropdownValue} />
      <WeekShedule selectedGroup={dropdownValue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TimetableScreen;
