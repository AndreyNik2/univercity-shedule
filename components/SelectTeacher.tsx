import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectTeacher } from "../redux/initial/initialSlice";
import { ThemeContext } from "../context/ThemeContext";
import { ITeachers } from "../models/ITeachers";
import { logOut } from "../redux/auth/operations";

export const SelectTeacher: React.FC = () => {
  const dispatch = useAppDispatch();
  const teacherList = useAppSelector((state) => state.initial.teachrsList);
  const selectedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );

  //   const formatedAllGroup = teacherList.data.map((group: ITeachers) => ({
  //     name: `${group.name} групи`,
  //     code: group.code,
  //   }));
  const theme = useContext(ThemeContext);
  const [isFocus, setIsFocus] = useState(false);

  const onChangeDropdown = (event: { name: string; id: string }) => {
    dispatch(selectTeacher(event));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.middleContainerBackground },
      ]}
    >
      <View style={styles.elementsContainer}>
        <Text style={[styles.dropdownTitle, { color: theme.textColor }]}>
          Розклад занять для
        </Text>
        <View style={styles.containerDrop}>
          <Dropdown
            style={[
              styles.dropdown,
              { backgroundColor: theme.innerContainerBackground },
              isFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={[
              styles.placeholderStyle,
              { color: theme.textColor },
            ]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              { color: theme.textColor },
            ]}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={teacherList.data}
            search
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={!isFocus ? "Оберіть викладача" : "..."}
            searchPlaceholder="пошук..."
            value={selectedTeacher}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              onChangeDropdown(item);
              setIsFocus(false);
            }}
          />
        </View>
      </View>
      {selectedTeacher.id.length === 0 && (
        <TouchableOpacity
          onPress={() => dispatch(logOut())}
          style={styles.buttonContainer}
          activeOpacity={0.7}
        >
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>Увійти</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 21,
    borderRadius: 20,
  },
  elementsContainer: {
    paddingVertical: 20,
  },
  dropdownTitle: {
    fontSize: 16,
    fontFamily: "Exo2-Medium",
    textAlign: "center",
  },
  // selectTitle: {
  //   fontFamily: "Exo2-Medium",
  //   fontSize: 16,
  //   color: "#535252",
  // },
  containerDrop: {
    paddingTop: 16,
    marginHorizontal: 20,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  // label: {
  //   position: "absolute",
  //   backgroundColor: "#E2E5F6",
  //   borderWidth: 0.5,
  //   borderRadius: 5,
  //   borderColor: "blue",
  //   left: 50,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
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
});
