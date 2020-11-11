import React from "react";
import logo from "../assets/logo.png";
import { StyleSheet, View, Image, Text } from "react-native";
import { Dimensions } from "react-native";

let ScreenWidth = Dimensions.get("window").width;

const NavBar = () => (
  <View style={styles.navBar}>
    <Image style={styles.navLogo} source={logo} />
    <Text style={styles.navText}> Nintendo games db</Text>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#e4000f",
    paddingTop: 16,
    width: ScreenWidth,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  navLogo: {
    scaleX: 0.6,
    scaleY: 0.6,
  },
  navText: {
    color: "#ffff",
    fontSize: 20,
    marginTop: 22,
  },
});

export default NavBar;
