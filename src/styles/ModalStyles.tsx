import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  filler: {
    lineHeight: 49,
  },
  infoTextContainer: {
    width: 100,
  },
  infoContainer: {
    width: 150,
    height: 19,
  },
  fire: { height: 19 },

  infoText: {
    fontWeight: "bold",
    margin: 0,
  },
  closeBtn: {
    backgroundColor: "red",
    color: "red",
  },
  headText: {
    fontSize: 20,
    marginBottom: 3,
    marginTop: -20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalViews: {
    padding: 35,
    paddingTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 8,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
