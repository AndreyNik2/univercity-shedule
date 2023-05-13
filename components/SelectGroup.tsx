import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectGroup } from "../redux/initial/initialSlice";

const SelectGroups: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allGroups, weeks, currentDay, selectedGroup } = useAppSelector(
    (state) => state.initialReduser
  );

  const formatedAllGroup = allGroups.data.map(group => ({ name: `${group.name} групи`, code: group.code }))

  const [isFocus, setIsFocus] = useState(false);

  const onChangeDropdown = (event: { name: string; code: string }) => {
    dispatch(selectGroup(event));
  };


  return (
    <View style={styles.container}>
      <View style={styles.elementsContainer}>
        <Text>Розклад занять для</Text>
        <View style={styles.containerDrop}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={formatedAllGroup}
            search
            maxHeight={300}
            labelField="name"
            valueField="code"
            placeholder={!isFocus ? "Оберіть групу" : "..."}
            searchPlaceholder="пошук..."
            value={selectedGroup}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              onChangeDropdown(item);
              setIsFocus(false);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 93,
    marginHorizontal: 21,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#F2F5FD",
  },
  elementsContainer: {
    paddingVertical: 20,
  },
  selectTitle: {
    fontFamily: "Exo2-Medium",
    fontSize: 16,
    color: "#535252",
  },
  containerDrop: {
    paddingTop: 16,
  },
  dropdown: {
    height: 50,
    width: 200,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#E2E5F6",
  },
  label: {
    position: "absolute",
    backgroundColor: "#E2E5F6",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "blue",
    left: 50,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 16,
  },
});

export default SelectGroups;
