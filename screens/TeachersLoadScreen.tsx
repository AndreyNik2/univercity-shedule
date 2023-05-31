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
import { CommonActions } from "@react-navigation/native";
import {
  getTeachersJournalHistory,
  getTeachersLoad,
} from "../servises/api/apiShadule";
import { Feather } from "@expo/vector-icons";
import { ILoad } from "../models/ILoad";

export const TeachersLoadScreen: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [load, setLoad] = useState<null | ILoad>(null);
  const selectedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );

  useEffect(() => {
    const getData = async () => {
      try {
        if (selectedTeacher.id.length > 0) {
          const result = await getTeachersLoad(selectedTeacher.id);
          setLoad(result.data);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to upload teacher's load",
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
      {Platform.OS === "android" && (
        <StatusBar
          animated={false}
          backgroundColor={theme.statusBarBG}
          barStyle={theme.statusBarColor}
        />
      )}
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
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: theme.textColor }]}>
                Погодинна оплата
              </Text>
            </View>
            {load && (
              <View>
                <View
                  style={[
                    styles.headerContainer,
                    { backgroundColor: theme.tableHeaderBGColor },
                  ]}
                >
                  <View style={styles.groupHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Група
                    </Text>
                  </View>
                  <View style={styles.subjectHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Назва навчальної дисципліни
                    </Text>
                  </View>
                  <View style={styles.subjectTypeHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    ></Text>
                  </View>
                  <View style={styles.firstHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      І семестр
                    </Text>
                  </View>
                  <View style={styles.secondHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      ІІ семестр
                    </Text>
                  </View>
                  <View style={styles.totalHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Всього
                    </Text>
                  </View>
                </View>
                {load.payment_type_2.items.map((item) => (
                  <View
                    key={Date.now()}
                    style={[
                      styles.rowContainer,
                      { backgroundColor: theme.tableRowBGColor },
                    ]}
                  >
                    <View style={styles.groupRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.group}
                      </Text>
                    </View>
                    <View style={styles.subjectRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.subject}
                      </Text>
                    </View>
                    <View style={styles.subjectTypeRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.subject_type}
                      </Text>
                    </View>
                    <View style={styles.firstRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.hours_1}
                      </Text>
                    </View>
                    <View style={styles.secondRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.hours_2}
                      </Text>
                    </View>
                    <View style={styles.totalRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.total}
                      </Text>
                    </View>
                  </View>
                ))}
                <View
                  style={[
                    styles.buttonRowContainer,
                    { backgroundColor: theme.tableRowBGColor },
                  ]}
                >
                  <View style={styles.buttomFirstEmptyContainer}></View>
                  <View style={styles.buttomTotalTitleContainer}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      Разом
                    </Text>
                  </View>
                  <View style={styles.buttomTotalDataContainer}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {load?.payment_type_2.total}
                    </Text>
                  </View>
                </View>
              </View>
            )}
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
  titleContainer: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  titleText: {
    fontFamily: "Exo2-SemiBold",
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rowContainer: {
    minHeight: 40,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  groupHeader: {
    height: 58,
    width: 74,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupRow: {
    width: 74,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectHeader: {
    height: 58,
    width: 300,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectRow: {
    width: 300,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectTypeHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectTypeRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  firstHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  firstRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  secondRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderTopRightRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRowContainer: {
    minHeight: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttomFirstEmptyContainer: {
    width: 574,
    padding: 5,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttomTotalTitleContainer: {
    width: 100,
    padding: 5,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttomTotalDataContainer: {
    width: 100,
    padding: 5,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderBottomRightRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Exo2-SemiBold",
    fontSize: 14,
  },
  rowText: {
    fontFamily: "Exo2-Regular",
    fontSize: 12,
  },
});
