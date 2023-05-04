import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

type Props = {
  selectedGroup: string
};

interface WeekDay {
  day: number;
  name: string;
}

const WeekShedule: React.FC<Props> = ({ selectedGroup }) => {
  const [week, setWeek] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number>(3);

  const weekDays: any = [
    { day: 1, name: "ПН" },
    { day: 2, name: "ВТ" },
    { day: 3, name: "СР" },
    { day: 4, name: "ЧТ" },
    { day: 5, name: "ПТ" },
    { day: 6, name: "СБ" },
    ,
  ];

  const onChange = (value: number) => {
    setSelectedDay(value);
  };

  useEffect(() => {}, [selectedDay]);

  return (
    <View style={styles.flexConteiner}>
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
                onPress={() => onChange(day.day)}
                style={touchable}
              >
                <Text style={textStyles}>{day?.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexConteiner: { flex: 1, color: "grey" },
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#f0ffff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  dayContainer: {},
  dayButton: {},
  touchable: {
    backgroundColor: "#fa8987",
    borderRadius: 20,
  },
  selectedTouchable: {
    backgroundColor: "green",
  },
  weekDayText: {
    color: "rgb(20, 21, 24)",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  label: {
    color: "green",
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  selectedLabel: {
    color: "blue",
  },
});

export default WeekShedule;
