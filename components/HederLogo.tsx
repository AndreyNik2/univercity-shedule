import React from "react";
import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: 50,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sheduleLogo: {
    maxWidth: 30,
    maxHeight: 30,
  },
});

const HederLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.sheduleLogo}
        source={require("../assets/logo.png")}
      />
    </View>
  );
};

export default HederLogo;
