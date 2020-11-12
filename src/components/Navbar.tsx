import React from "react";
import {Container, Text, Item, Input, Icon, Button, Header} from "native-base";
import { StyleSheet, View, Image } from "react-native";
import { Dimensions } from "react-native";
import logo from "../assets/switchDB_logoV3.png";

let ScreenWidth = Dimensions.get("window").width;

const NavBar = () => (
  <View >
    <View style={styles.navBar}>
      <Image style={styles.navLogo} source={logo} />
      <Text style={styles.navText}> nintendo games db</Text>
    </View>
    <Header searchBar style={styles.searchBar}>
      <Item>
        <Icon name="ios-search" />
        <Input placeholder="Search" />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Header>

  </View>
);

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "red",
    paddingTop: 16,
    width: ScreenWidth,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",

  },
  navLogo: {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}]
  },
  navText: {
    color: "#ffff",
    fontSize: 26,
    marginTop: 22,
    fontVariant: [ 'small-caps' ],
    fontWeight: 'bold' ,
  },
  searchBar: {
    backgroundColor: "red",
  },
});

export default NavBar;
