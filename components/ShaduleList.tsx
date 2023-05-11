import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const SheduleList: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstLessonContainer}>
        <Text style={styles.text}>1 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
      <View style={styles.secondLessonContainer}>
        <Text style={styles.text}>2 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
      <View style={styles.thirdLessonContainer}>
        <Text style={styles.text}>3 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
      <View style={styles.fourthLessonContainer}>
        <Text style={styles.text}>4 Пара</Text>
        <View style={styles.borderSolid}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstLessonContainer: {
    flexDirection: "row",
    alignItems:'flex-end',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  secondLessonContainer: {
    flexDirection: "row",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  thirdLessonContainer: {
    flexDirection: "row",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  fourthLessonContainer: {
    flexDirection: "row",
    marginTop: 32,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  text: {
    marginLeft: 0,
    marginRight: 4,
  },
  borderSolid: {
    marginLeft: 2,
    marginRight: 20,
    width: 200,
    height: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#000000'
  },
});
