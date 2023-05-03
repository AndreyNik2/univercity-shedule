import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

type Props = {
  date: Date;
};

interface WeekDay {
  day: number;
  name: string;
}

const WeekShedule: React.FC = () => {
  const [week, setWeek] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const weekDays = [
    { day: 1, name: "ПН" },
    { day: 2, name: "ВТ" },
    { day: 3, name: "СР" },
    { day: 4, name: "ЧТ" },
    { day: 5, name: "ПТ" },
    { day: 6, name: "СБ" },
    ,
  ];

  useEffect(() => {}, []);

  return (
    <View style={styles.flexConteiner}>
      <View style={styles.container}>
        {weekDays.map((day) => {
          const textStyles = {};
          return (
            <View key={day?.day} style={styles.dayContainer}>
              <TouchableOpacity>
                <Text style={styles.weekDayText}>{day?.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexConteiner: { flex: 1, color: "grey", paddingHorizontal: 5, paddingVertical: 20 },
  container: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  dayContainer: { backgroundColor: "grey", borderRadius: 20 },
  dayButton: {},
  weekDayText: { color: "rgb(20, 21, 24)" , paddingHorizontal: 15, paddingVertical:10 },
});

export default WeekShedule;
