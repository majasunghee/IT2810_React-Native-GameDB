import React from "react";
import { Text } from "react-native";
import { ListItem } from "native-base";
import styles from '../styles/ListRenderStyles';

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
  //Adds each mapped item on games to a ListItem component
  <ListItem
    noIndent
    style={styles.listItem}
    key={props.index}
    onPress={props.handleClick}
  >
    <Text style={{ lineHeight: 26 }}>
      <Text style={styles.titleText}>{props.game.name}</Text>
      {"\n"}
      <Text style={styles.text}>Price:</Text>
      {" " + props.game.msrp + " $"}
      {"\n"}
      <Text style={styles.text}>By:</Text>
      {" " + props.game.developer}
      {"\n"}
      <Text style={styles.text}>Publisher:</Text>
      {" " + props.game.publisher}
    </Text>
  </ListItem>
);

export default ListRender;
