import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IShedule } from "../models/IShedule";

type Props = {
  shedule: IShedule[] | [];
  selectedDay: number;
};

export const SheduleList: React.FunctionComponent<Props> = ({
  shedule,
  selectedDay,
}) => {
  const selectLessonsOfTheDay = shedule.filter(
    (lesson) => lesson.dayOfWeek === selectedDay + 1
  );

  const firstLesson = selectLessonsOfTheDay.filter(
    (lesson) => lesson.number === 1
  );

  const secondLesson = selectLessonsOfTheDay.filter(
    (lesson) => lesson.number === 2
  );

  const thirdLesson =  selectLessonsOfTheDay.filter((lesson) => lesson.number === 3)
  

  const fourthLesson = selectLessonsOfTheDay.filter((lesson) => lesson.number === 4);
  

  return (
    <View style={styles.container}>
      <View style={styles.firstLessonContainer}>
        <Text style={styles.text}>1 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
      {firstLesson.length > 0 && (
        <View style={styles.lessonsContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{firstLesson[0].tag}</Text>
          </View>
          <View>
            <Text>{firstLesson[0].subject}</Text>
          </View>
          <View>
            <Text>{firstLesson[0].teacher}</Text>
          </View>
          <View>
            <Text>{firstLesson[0].class}</Text>
          </View>
          <View>
            <Text>{`${firstLesson[0].start_time.slice(
              10
            )}-${firstLesson[0].end_time.slice(10)}`}</Text>
          </View>
        </View>
      )}
      <View style={styles.secondLessonContainer}>
        <Text style={styles.text}>2 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
      {secondLesson.length > 0 && (
        <View style={styles.lessonsContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{secondLesson[0].tag}</Text>
          </View>
          <View>
            <Text>{secondLesson[0].subject}</Text>
          </View>
          <View>
            <Text>{secondLesson[0].teacher}</Text>
          </View>
          <View>
            <Text>{secondLesson[0].class}</Text>
          </View>
          <View>
            <Text>{`${secondLesson[0].start_time.slice(
              10
            )}-${secondLesson[0].end_time.slice(10)}`}</Text>
          </View>
        </View>
      )}
      <View style={styles.thirdLessonContainer}>
        <Text style={styles.text}>3 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
      {thirdLesson.length > 0 && (
        <View style={styles.lessonsContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{thirdLesson[0].tag}</Text>
          </View>
          <View>
            <Text>{thirdLesson[0].subject}</Text>
          </View>
          <View>
            <Text>{thirdLesson[0].teacher}</Text>
          </View>
          <View>
            <Text>{thirdLesson[0].class}</Text>
          </View>
          <View>
            <Text>{`${thirdLesson[0].start_time.slice(
              10
            )}-${thirdLesson[0].end_time.slice(10)}`}</Text>
          </View>
        </View>
      )}
      <View style={styles.fourthLessonContainer}>
        <Text style={styles.text}>4 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
      {fourthLesson.length > 0 && (
        <View style={styles.lessonsContainer}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{fourthLesson[0].tag}</Text>
          </View>
          <View>
            <Text>{fourthLesson[0].subject}</Text>
          </View>
          <View>
            <Text>{fourthLesson[0].teacher}</Text>
          </View>
          <View>
            <Text>{fourthLesson[0].class}</Text>
          </View>
          <View>
            <Text>{`${fourthLesson[0].start_time.slice(
              10
            )}-${fourthLesson[0].end_time.slice(10)}`}</Text>
          </View>
        </View>
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
  },
  secondLessonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  thirdLessonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
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
    borderStyle: "dashed",
    borderBottomWidth: 1,
    borderColor: "#000000",
  },
  lessonsContainer: {
    height: 183,
    marginHorizontal: 22,
    borderRadius: 20,
    backgroundColor: "#E2E4F6",
  },
  lessonsOption: {},
  tagContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: "#B189ED",    
  },
  tagText: {
    paddingVertical: 8.5,
    paddingHorizontal: 28.5,
    fontFamily: "Exo2-SemiBold",
    fontSize: 16,
    color: "#ffffff",
  },
});
