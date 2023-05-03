import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getGroups } from "../servises/api/apiTimetable";


interface IGroup {
    code: string,
    name: string,
}

const SelectGrous: React.FC = () => {
  const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [groups, setGroups] = useState<IGroup[]>([]);

    useEffect(() => {
        async function getData() {
            try {
              const result: { data: [] } = await getGroups();
              const data: [] = result.data;
              setGroups(data);
            } catch (error) {}
        };
        getData();
        
  }, [])

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Обрана група
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerDrop}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={groups}
          search
          maxHeight={300}
          labelField="name"
          valueField="code"
          placeholder={!isFocus ? "Оберіть групу" : "..."}
          searchPlaceholder="пошук..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.name);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  containerDrop: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: 200,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
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

export default SelectGrous;
