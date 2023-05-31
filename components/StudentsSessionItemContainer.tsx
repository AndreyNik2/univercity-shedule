import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IShedule } from "../models/IShedule";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";
import { ISession } from "../models/ISession";

type Props = {
  sessionItem: ISession;
};

export const StudentsSessionItemContainer: React.FunctionComponent<Props> = ({
  sessionItem,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.lessonsContainer,
        { backgroundColor: theme.innerContainerBackground },
      ]}
    >
      <View style={styles.verticalLine}></View>
      <View>
        {sessionItem.tag === "Прак" && (
          <View style={styles.tagContainer}>
            <Text style={[styles.tagText, { backgroundColor: "#B189ED" }]}>
              {sessionItem.tag}
            </Text>
          </View>
        )}
        {sessionItem.tag === "Контр" && (
          <View style={styles.tagContainer}>
            <Text style={[styles.tagText, { backgroundColor: "#FF7F96" }]}>
              {sessionItem.tag}
            </Text>
          </View>
        )}
        {sessionItem.tag === "Залік" && (
          <View style={styles.tagContainer}>
            <Text style={[styles.tagText, { backgroundColor: "#FF7F96" }]}>
              {sessionItem.tag}
            </Text>
          </View>
        )}

        <View style={styles.subjectContainer}>
          <Text style={[styles.subject, { color: theme.textColor }]}>
            {sessionItem.subject}
          </Text>
        </View>
        <View style={styles.teacherContainer}>
          <FontAwesome
            name="graduation-cap"
            size={14}
            color={theme.textColor}
          />
          <Text style={[styles.teacher, { color: theme.textColor }]}>
            {sessionItem.teacher}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <MaterialIcons name="access-time" size={14} color={theme.textColor} />
          <Text style={[styles.time, { color: theme.textColor }]}>
            {sessionItem.start_time}
          </Text>
        </View>
        <View style={styles.classContainer}>
          <MaterialIcons name="place" size={14} color={theme.textColor} />
          <Text style={[styles.class, { color: theme.textColor }]}>
            {sessionItem.class}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lessonsContainer: {
    minHeight: 183,
    marginHorizontal: 0,
    marginBottom:20,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
  },
  verticalLine: {
    width: 5,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 10,
    backgroundColor: "#FF7F96",
    borderRadius: 2,
  },
  tagContainer: {
    alignSelf: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
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
