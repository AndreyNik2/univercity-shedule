import { View, Text, StyleSheet } from "react-native";
import { IShedule } from "../models/IShedule";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  lesson: IShedule[];
};

export const LessonContainerComponent: React.FunctionComponent<Props> = ({
  lesson,
}) => {
  return (
    <View style={styles.lessonsContainer}>
      {lesson[0].tag === "Прак" && (
        <View style={styles.tagContainer}>
          <Text style={[styles.tagText, { backgroundColor: "#B189ED" }]}>
            {lesson[0].tag}
          </Text>
        </View>
      )}
      {lesson[0].tag === "Контр" && (
        <View style={styles.tagContainer}>
          <Text style={[styles.tagText, { backgroundColor: "#FF7F96" }]}>
            {lesson[0].tag}
          </Text>
        </View>
      )}
      {lesson[0].tag === "Лек" && (
        <View style={styles.tagContainer}>
          <Text style={[styles.tagText, { backgroundColor: "#949DFF" }]}>
            {lesson[0].tag}
          </Text>
        </View>
      )}

      <View style={styles.subjectContainer}>
        <Text style={styles.subject}>{lesson[0].subject}</Text>
      </View>
      <View style={styles.teacherContainer}>
        <FontAwesome name="graduation-cap" size={14} color="black" />
        <Text style={styles.teacher}>{lesson[0].teacher}</Text>
      </View>
      <View style={styles.classContainer}>
        <MaterialIcons name="place" size={14} color="black" />
        <Text style={styles.class}>{lesson[0].class}</Text>
      </View>
      <View style={styles.timeContainer}>
        <MaterialIcons name="access-time" size={14} color="black" />
        <Text style={styles.time}>{`${lesson[0].start_time.slice(
          10
        )}-${lesson[0].end_time.slice(10)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lessonsContainer: {
    minHeight: 183,
    marginHorizontal: 22,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#E2E4F6",
  },
  lessonsOption: {},
  tagContainer: {
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  tagText: {
    paddingVertical: 8.5,
    paddingHorizontal: 28.5,
    fontFamily: "Exo2-SemiBold",
    fontSize: 16,
    color: "#ffffff",
    borderRadius: 10,
  },
  subjectContainer: {
    marginTop: 15,
  },
  subject: {
    fontFamily: "Exo2-Medium",
    fontSize: 16,
  },
  teacherContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
  },
  teacher: {
    fontFamily: "Exo2-Regular",
    fontSize: 14,
    marginLeft: 8,
  },
  classContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
  },
  class: { fontFamily: "Exo2-Regular", fontSize: 14, marginLeft: 8 },
  timeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
  },
  time: { fontFamily: "Exo2-Regular", fontSize: 14, marginLeft: 8 },
});
