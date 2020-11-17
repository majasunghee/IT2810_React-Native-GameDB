import React from "react";
import { View, Image, Text } from "react-native";
import logo from "../assets/switch_logo.png";
import db from "../assets/nintendo.png";
import styles from '../styles/NavbarStyles';
import { Left } from "native-base";

const NavBar = () => (
  //shows the title and logo of the application
  <View style={styles.navBar}>
    <Image style={styles.navLogo} source={logo} />
    <Left>
    <Image style={styles.dbLogo}source={db} />
    </Left>
  </View>
);

export default NavBar;
