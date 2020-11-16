import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

let ScreenWidth = Dimensions.get("window").width;

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
      transform: 
        [
          {scaleX: 0.6}, 
          {scaleY: 0.6}
        ]
    },
    navText: {
      color: "#ffff",
      fontSize: 26,
      marginTop: 22,
      fontVariant: [ 'small-caps' ],
      fontWeight: 'bold' ,
    }
  });
  
export default styles;  