import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "../hooks/redux";
import { ThemeContext } from "../context/ThemeContext";
import { ISession } from "../models/ISession";
import { StudentsSessionItemContainer } from "./StudentsSessionItemContainer";

type Props = {
  sessionList: ISession[] 
};

export const StudentsSessionList: React.FunctionComponent<Props> = ({
  sessionList,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.middleContainerBackground },
      ]}
    >
      {sessionList.map((item) => (
        <StudentsSessionItemContainer key={ Date.now()} sessionItem={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom:0,
    marginTop: 33,
    backgroundColor: "#F2F5FD",
    borderRadius:20,
  },
  text: {
    fontFamily: "Exo2-Medium",
    fontSize: 16,
    paddingVertical: 24,
  },
  droup: {
    fontFamily: "Exo2-SemiBold",
    fontSize: 18,
  },
});
