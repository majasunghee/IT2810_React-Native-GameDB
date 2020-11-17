import React from "react";
import { StyleSheet } from "react-native";
import { Text, ListItem } from "native-base";

type ComponentProps = {
  name: String;
  developer: String;
  releasedate: String;
  genre: String;
  msrp: number;
  publisher: String;
};

const ListRender = (props: {
  handleClick: any;
  game: ComponentProps;
  index: number;
}) => (
  <ListItem
    noIndent
    style={styles.listItem}
    key={props.index}
    onPress={props.handleClick}
  >
    <Text style={{ lineHeight: 26 }}>
      <Text style={styles.titleText}>{props.game.name}</Text>
      {"\n"}
      <Text style={{ fontWeight: "bold" }}>Price:</Text>
      {" " + props.game.msrp + " $"}
      {"\n"}
      <Text style={{ fontWeight: "bold" }}>By:</Text>
      {" " + props.game.developer}
      {"\n"}
      <Text style={{ fontWeight: "bold" }}>Publisher:</Text>
      {" " + props.game.publisher}
    </Text>
  </ListItem>
);

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "uppercase",
  },
  listItem: {
    backgroundColor: "white",
    elevation: 5,
    margin: 6,
    padding: 5,
  },
});

export default ListRender;
