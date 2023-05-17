import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { IShedule } from "../models/IShedule";
import { LessonContainerComponent } from "./LessonContainer";
import { themeContext } from "../config/themeContext";

type Props = {
  shedule: IShedule[] | [];
  selectedDay: number;
};

export const SheduleList: React.FunctionComponent<Props> = ({
  shedule,
  selectedDay,
}) => {
  const theme = useContext(themeContext);
  const selectLessonsOfTheDay = shedule.filter(
    (lesson) => lesson.dayOfWeek === selectedDay + 1
  );

  const firstLesson = selectLessonsOfTheDay.filter(
    (lesson) => lesson.number === 1
  );

  const secondLesson = selectLessonsOfTheDay.filter(
    (lesson) => lesson.number === 2
  );

  const thirdLesson = selectLessonsOfTheDay.filter(
    (lesson) => lesson.number === 3
  );

  const fourthLesson = selectLessonsOfTheDay.filter(
    (lesson) => lesson.number === 4
  );

  return (
    <View style={styles.container}>
      <View style={styles.firstLessonContainer}>
        <Text style={[styles.text, { color: theme.textColor }]}>1 Пара</Text>
        <View
          style={[styles.borderSolid, { borderColor: theme.textColor }]}
        ></View>
      </View>
      {firstLesson.length > 0 && (
        <LessonContainerComponent lesson={firstLesson} />
      )}
      <View style={styles.secondLessonContainer}>
        <Text style={[styles.text, { color: theme.textColor }]}>2 Пара</Text>
        <View
          style={[styles.borderSolid, { borderColor: theme.textColor }]}
        ></View>
      </View>
      {secondLesson.length > 0 && (
        <LessonContainerComponent lesson={secondLesson} />
      )}
      <View style={styles.thirdLessonContainer}>
        <Text style={[styles.text, , { color: theme.textColor }]}>3 Пара</Text>
        <View
          style={[styles.borderSolid, { borderColor: theme.textColor }]}
        ></View>
      </View>
      {thirdLesson.length > 0 && (
        <LessonContainerComponent lesson={thirdLesson} />
      )}
      <View style={styles.fourthLessonContainer}>
        <Text style={[styles.text, , { color: theme.textColor }]}>4 Пара</Text>
        <View
          style={[styles.borderSolid, { borderColor: theme.textColor }]}
        ></View>
      </View>
      {fourthLesson.length > 0 && (
        <LessonContainerComponent lesson={fourthLesson} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstLessonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  secondLessonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  thirdLessonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  fourthLessonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    marginLeft: 0,
    marginRight: 4,
  },
  borderSolid: {
    flex: 1,
    marginLeft: 2,
    height: 10,
    borderBottomWidth: 1,
    borderColor: "#000000",
    ...Platform.select({
      android: {
        borderStyle: "dashed",
      },
      ios: { borderStyle: "solid" },
      default: { borderStyle: "solid" },
    }),
  },
});
