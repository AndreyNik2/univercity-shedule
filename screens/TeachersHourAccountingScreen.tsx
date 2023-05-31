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
import { getHourAccounting } from "../servises/api/apiShadule";
import { Feather } from "@expo/vector-icons";
import { ILoad } from "../models/ILoad";
import { IHourAccounting, IHourItem } from "../models/IHourAccounting";

export const TeachersHourAccountingScreen: React.FC = () => {
  const theme = useContext(ThemeContext);
  const [hours, setHours] = useState<null | IHourAccounting>(null);
  const selectedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );

  const getDefferense = (hour: IHourItem) => {
    if (Number(hour.fact) - Number(hour.plan) >= 0) {
      return <Feather name="check-square" size={24} color="black" />;
    }
    if (Number(hour.plan) - Number(hour.fact) < 0) {
      return Number(hour.plan) - Number(hour.fact) < 0;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (selectedTeacher.id.length > 0) {
          const result = await getHourAccounting(selectedTeacher.id);
          setHours(result.data);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Failed to upload teacher's hour accounting",
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
                Облік годин навчальної роботи
              </Text>
            </View>
            {hours && (
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
                  <View style={styles.septemberHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Вересень
                    </Text>
                  </View>
                  <View style={styles.octoberHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Жовтень
                    </Text>
                  </View>
                  <View style={styles.novemberHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Листопад
                    </Text>
                  </View>
                  <View style={styles.decemberHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Грудень
                    </Text>
                  </View>
                  <View style={styles.januaryHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Січень
                    </Text>
                  </View>
                  <View style={styles.februaryHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Лютий
                    </Text>
                  </View>
                  <View style={styles.marchHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Березень
                    </Text>
                  </View>
                  <View style={styles.aprilHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Квітень
                    </Text>
                  </View>
                  <View style={styles.mayHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Травень
                    </Text>
                  </View>
                  <View style={styles.juneHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Червень
                    </Text>
                  </View>
                  <View style={styles.julyHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Липень
                    </Text>
                  </View>
                  <View style={styles.totalHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Всього
                    </Text>
                  </View>
                  <View style={styles.planHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      План
                    </Text>
                  </View>
                  <View style={styles.defferenceHeader}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Різниця
                    </Text>
                  </View>
                </View>
                {hours.items.map((item) => (
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
                    <View style={styles.septemberRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_9}
                      </Text>
                    </View>
                    <View style={styles.octoberRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_10}
                      </Text>
                    </View>
                    <View style={styles.novemberRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_11}
                      </Text>
                    </View>
                    <View style={styles.decemberRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_12}
                      </Text>
                    </View>
                    <View style={styles.januaryRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_1}
                      </Text>
                    </View>
                    <View style={styles.februaryRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_2}
                      </Text>
                    </View>
                    <View style={styles.marchRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_3}
                      </Text>
                    </View>
                    <View style={styles.aprilRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_4}
                      </Text>
                    </View>
                    <View style={styles.mayRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_5}
                      </Text>
                    </View>
                    <View style={styles.juneRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_6}
                      </Text>
                    </View>
                    <View style={styles.julyRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.m_7}
                      </Text>
                    </View>
                    <View style={styles.totalRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.fact}
                      </Text>
                    </View>
                    <View style={styles.planRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {item.plan}
                      </Text>
                    </View>
                    <View style={styles.defferenceRow}>
                      <Text
                        style={[styles.rowText, { color: theme.textColor }]}
                      >
                        {getDefferense(item)}
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
                  <View style={styles.totalsBottom}>
                    <Text
                      style={[styles.headerText, { color: theme.textColor }]}
                    >
                      Разом
                    </Text>
                  </View>
                  <View style={styles.septemberBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_9}
                    </Text>
                  </View>
                  <View style={styles.octoberBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_10}
                    </Text>
                  </View>
                  <View style={styles.novemberBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_11}
                    </Text>
                  </View>
                  <View style={styles.decemberBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_12}
                    </Text>
                  </View>
                  <View style={styles.januaryBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_1}
                    </Text>
                  </View>
                  <View style={styles.februaryBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_2}
                    </Text>
                  </View>
                  <View style={styles.marchBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_3}
                    </Text>
                  </View>
                  <View style={styles.aprilBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_4}
                    </Text>
                  </View>
                  <View style={styles.mayBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_5}
                    </Text>
                  </View>
                  <View style={styles.juneBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_6}
                    </Text>
                  </View>
                  <View style={styles.julyBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.m_7}
                    </Text>
                  </View>
                  <View style={styles.totalBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.fact}
                    </Text>
                  </View>
                  <View style={styles.planBottom}>
                    <Text style={[styles.rowText, { color: theme.textColor }]}>
                      {hours.totals.plan}
                    </Text>
                  </View>
                  <View style={styles.defferenceBottom}>
                    <Text
                      style={[styles.rowText, { color: theme.textColor }]}
                    ></Text>
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
  subjectHeader: {
    height: 58,
    width: 300,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  septemberHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  octoberHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  novemberHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  decemberHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  januaryHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  februaryHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  marchHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  aprilHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mayHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  juneHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  julyHeader: {
    height: 58,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  planHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defferenceHeader: {
    height: 58,
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderTopRightRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  groupRow: {
    width: 74,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectRow: {
    width: 300,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  septemberRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  octoberRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  novemberRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  decemberRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  januaryRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  februaryRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  marchRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  aprilRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mayRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  juneRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  julyRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  planRow: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defferenceRow: {
    hwidth: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalsBottom: {
    width: 374,
    paddingRight:20,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: 'flex-end',
    borderBottomLeftRadius:20,
  },
  septemberBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  octoberBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  novemberBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  decemberBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  januaryBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  februaryBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  marchBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  aprilBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mayBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  juneBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  julyBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  planBottom: {
    width: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defferenceBottom: {
    hwidth: 100,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius:20,
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
