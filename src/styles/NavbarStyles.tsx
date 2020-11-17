import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

let ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    navBar: {
      backgroundColor: "red",
      paddingTop: 20,
      paddingLeft: 4,
      width: ScreenWidth,
      flexWrap: "wrap",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    navLogo: {
      transform: 
        [
          {scaleX: 0.6}, 
          {scaleY: 0.6}
        ]
    },
    dbLogo: {
      paddingLeft: 10,
      transform: 
        [
          {scaleX: 0.8}, 
          {scaleY: 0.8}
        ]
    }
  });
  
export default styles;  