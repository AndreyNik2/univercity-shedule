import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "../hooks/redux";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IStackScreenProp } from "../models/StackScreenProps";
import {
  IJournalHistory,
  IJournalHistoryItem,
} from "../models/IJournalHistoty";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getTeachersJournalHistory } from "../servises/api/apiShadule";

export const TeachersJournal: React.FC<IStackScreenProp> = ({ route }) => {
  const { journalParam } = route.params;
  const theme = useContext(ThemeContext);
  const [journalHistory, setJournalHistoty] = useState<null | IJournalHistory>(
    null
  );

  useEffect(() => {
    const getData = async () => {
      console.log(journalParam);
      try {
        if (journalParam) {
          const result = await getTeachersJournalHistory(journalParam.item.id);
          setJournalHistoty(result.data);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to upload journal history",
        });
      }
    };
    getData();
  }, []);

  return (
    <LinearGradient
      colors={theme.gradient}
      // colors={["#FEEFF2", "#000"]}
      start={[0, 1]}
      style={styles.container}
    >
      <StatusBar
        animated={false}
        backgroundColor={theme.statusBarBG}
        barStyle={theme.statusBarColor}
      />
      <ScrollView
        horizontal={true}
        alwaysBounceVertical={true}
        style={styles.container}
      >
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <View style={styles.tableContainer}>
              {journalHistory && (
                <View style={styles.tableHeaderContainer}>
                  <View
                    style={[
                      styles.numberHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text>№ з/п</Text>
                  </View>
                  <View
                    style={[
                      styles.dateHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      Дата
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.hoursHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      Кількість годин
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.topicHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      Зміст
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.sourceHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      Перелік джерел / ДЗ
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.teacherHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      Викладач
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.typeHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      Тип заняття
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      T
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.noteHeader,
                      { backgroundColor: theme.tableHeaderBGColor },
                    ]}
                  >
                    <Text
                      style={[styles.textHeader, { color: theme.textColor }]}
                    >
                      Примітка
                    </Text>
                  </View>
                </View>
              )}
              {journalHistory &&
                journalHistory.items.map((item) => (
                  <View
                    style={[
                      styles.tableRowContainer,
                      { backgroundColor: theme.tableRowBGColor },
                    ]}
                    key={item.number}
                  >
                    <View
                      style={[
                        styles.numberRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.number}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.dateRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.date}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.hoursRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.hours}({item.program_hours})
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.topicRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.topic}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.sourceRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.sources}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.teacherRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.teacher ? item.teacher : ""}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.typeRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.original_type}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.tRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.public_type}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.noteRow,
                        { backgroundColor: theme.tableRowBGColor },
                      ]}
                    >
                      <Text
                        style={[styles.textRow, { color: theme.textColor }]}
                      >
                        {item.payment_group
                          ? `Об'єднано з ${item.payment_group} групою`
                          : ""}
                      </Text>
                    </View>
                  </View>
                ))}
              {journalHistory && (
                <View style={styles.bottomRowContainer}>
                  <View
                    style={[
                      styles.botomRowTotalTitle,
                      { backgroundColor: theme.tableRowBGColor },
                    ]}
                  >
                    <Text style={[styles.textRow, { color: theme.textColor }]}>
                      Разом
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.botomRowTotal,
                      { backgroundColor: theme.tableRowBGColor },
                    ]}
                  >
                    <Text style={[styles.textRow, { color: theme.textColor }]}>
                      За розкладом - {journalHistory.totals.schedule} /
                      Аудиторні - {journalHistory.totals.class} / СРС -{" "}
                      {journalHistory.totals.srs} / Разом за програмою{" "}
                      {journalHistory.totals.program}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.botomFlex,
                      { backgroundColor: theme.tableRowBGColor },
                    ]}
                  ></View>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    marginVertical: 50,
  },
  tableHeaderContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
  },
  tableRowContainer: {
    minHeight: 40,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  numberHeader: {
    height: 58,
    width: 74,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  numberRow: {
    padding: 5,
    width: 74,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateHeader: {
    height: 58,
    width: 141,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateRow: {
    padding: 5,
    width: 141,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hoursHeader: {
    height: 58,
    width: 93,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hoursRow: {
    padding: 5,
    width: 93,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topicHeader: {
    height: 58,
    width: 200,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topicRow: {
    padding: 5,
    width: 200,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topicHeaderText: {},
  sourceHeader: {
    height: 58,
    width: 200,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sourceRow: {
    padding: 5,
    width: 200,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teacherHeader: {
    height: 58,
    width: 150,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teacherRow: {
    padding: 5,
    width: 150,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  typeHeader: {
    height: 58,
    width: 150,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  typeRow: {
    padding: 5,
    width: 150,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tRow: {
    padding: 5,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noteHeader: {
    height: 58,
    width: 200,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderTopRightRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noteRow: {
    padding: 5,
    width: 200,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomRowContainer: {
    minHeight: 40,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  botomRowTotalTitle: {
    padding: 5,
    width: 74,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  botomRowTotal: {
    padding: 5,
    width: 434,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botomFlex: {
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderBottomRightRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {

  },
  textRow: {

  },
});
