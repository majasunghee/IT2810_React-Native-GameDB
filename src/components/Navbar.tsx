import React from "react";
import { View, Image, Text } from "react-native";
import logo from "../assets/switchDB_logoV3.png";
import styles from '../styles/NavbarStyles';

const NavBar = () => (
  <View style={styles.navBar}>
    <Image style={styles.navLogo} source={logo} />
    <Text style={styles.navText}> nintendo games db</Text>
  </View>
);

export default NavBar;
