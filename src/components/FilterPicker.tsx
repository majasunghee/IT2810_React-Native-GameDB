import React from "react";
import { View, Text } from "react-native";
import { Picker } from "native-base";
import styles from "../styles/FilterPickerStyles";

const FilterPicker = (props: { updateChange: any; filter: String }) => {
  return (
    <View
      style={{ backgroundColor: "red", flexDirection: "row", maxHeight: 50 }}
    >
      <Text style={styles.text}>Filter on PEGI: </Text>

      <View style={styles.box}>
        <Picker
          style={{ backgroundColor: "white" }}
          mode="dropdown"
          iosHeader="Filter"
          selectedValue={props.filter}
          onValueChange={props.updateChange}
        >
          <Picker.Item label="clear filter" value="none" />
          <Picker.Item label="Everyone" value="Everyone" />
          <Picker.Item label="Everyone 10+" value="Everyone 10+" />
          <Picker.Item label="Teen" value="Teen" />
          <Picker.Item label="Mature" value="Mature" />
        </Picker>
      </View>
    </View>
  );
};

export default FilterPicker;
