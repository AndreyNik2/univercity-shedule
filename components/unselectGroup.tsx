import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const UnselectGroup: React.FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Вибиріть групу зі списку</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 33,
        backgroundColor: "#F2F5FD",
        borderRadius: 20,
        alignItems:'center'
  },
  text: {
    fontSize: 16,
    paddingVertical: 24,
  },
});
