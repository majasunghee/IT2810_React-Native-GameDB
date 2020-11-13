import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";

type ComponentProps = {
  name: String;
  developer: String;
  releasedate: String;
  genre: String;
  msrp: string;
};

type SendCloseModal = {
  closes: (ev?: NativeSyntheticEvent<NativeTouchEvent>) => void;
};

const Modals = (props: { close: SendCloseModal; detail: ComponentProps }) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.headText}>{props.detail.name}</Text>
            <Text>Developer: {props.detail.developer}</Text>
            <Text>Release date: {props.detail.releasedate}</Text>
            <Text>Genre: {props.detail.genre}</Text>
            <Text>price: {props.detail.msrp}</Text>
            <Button onPress={props.close} title="Close"></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headText: {
    fontSize: 20,
    marginBottom: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Modals;
