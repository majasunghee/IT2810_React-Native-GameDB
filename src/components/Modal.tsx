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
import { Right, Icon } from "native-base";

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
            <View style={{ flexDirection: "row-reverse" }}>
              <Icon
                name="close"
                style={{
                  fontSize: 35,
                  marginRight: 20,
                  marginTop: 2,
                }}
                onPress={props.close}
              />
            </View>
            <View style={styles.modalViews}>
              <Text>
                <View style={{ width: 220 }}>
                  <Text style={styles.headText}>{props.detail.name}</Text>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderColor: "#00c3e3",
                    }}
                  />
                </View>
                {"\n"}
                {"\n"}

                <View style={styles.en}>
                  <Text style={styles.infoText}>Developer: </Text>
                </View>
                <View style={styles.to}>
                  <Text>{props.detail.developer}</Text>
                </View>

                <Text style={styles.filler}></Text>

                <View style={styles.tre}>
                  <Text style={styles.infoText}>Release date: </Text>
                </View>
                <View style={styles.fire}>
                  <Text>{props.detail.releasedate}</Text>
                </View>

                <Text style={styles.filler}></Text>
                <View style={styles.en}>
                  <Text style={styles.infoText}>Genre: </Text>
                </View>
                <View style={styles.to}>
                  <Text> {props.detail.genre}</Text>
                </View>

                <Text style={styles.filler}></Text>
                <View style={styles.en}>
                  <Text style={styles.infoText}>Price: </Text>
                </View>
                <Text style={styles.to}> {props.detail.msrp}$</Text>
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filler: {
    lineHeight: 44,
  },
  en: {
    width: 100,
  },
  to: {
    width: 150,
    height: 19,
    lineHeight: 50,
  },
  tre: {
    width: 102,
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

export default Modals;
