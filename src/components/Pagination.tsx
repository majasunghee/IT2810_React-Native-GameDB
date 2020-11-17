import React from "react";
import { Button, Icon } from "native-base";
import { View, Text } from "react-native";
import styles from '../styles/PaginationStyles';

const Pagination = (props: {
  nextButton: any;
  prevButton: any;
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  pageNum: number;
}) => {
  return (
    //Changes page number value when previous or next button is clicked on
    <View style={styles.buttonContainer}>
      <Button
        info
        iconLeft
        block
        style={styles.button}
        disabled={props.prevBtnDisabled}
        onPress={props.prevButton}
      >
        <Icon name="ios-arrow-back" />
        <Text style={styles.textStyling}> Prev </Text>
      </Button>

      <Button
        info
        iconRight
        block
        style={styles.button}
        disabled={props.nextBtnDisabled}
        onPress={props.nextButton}
      >
        <Text style={styles.textStyling}>Next </Text>
        <Icon name="ios-arrow-forward" />
      </Button>
    </View>
  );
};



export default Pagination;
