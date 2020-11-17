import React from "react";
import { Modal, Text, View } from "react-native";
import { Icon } from "native-base";
import styles from "../styles/ModalStyles";

type ComponentProps = {
  name: String;
  developer: String;
  releasedate: String;
  genre: String;
  msrp: string;
  esrb: String;
};

const Modals = (props: { close: any; detail: ComponentProps }) => {
  return (
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
              onPress={props.close} //send call to App to close the modal when clicked
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

              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Developer: </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text>{props.detail.developer}</Text>
              </View>

              <Text style={styles.filler}></Text>

              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Release date: </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text>{props.detail.releasedate}</Text>
              </View>
              {"\n"}
              <Text style={styles.filler}></Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Genre: </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text>{props.detail.genre}</Text>
              </View>
              {"\n"}
              <Text style={styles.filler}></Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Price: </Text>
              </View>
              <Text style={styles.infoContainer}>{props.detail.msrp}$</Text>
              {"\n"}
              <Text style={styles.filler}></Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>PEGI: </Text>
              </View>
              <Text style={styles.infoContainer}>{props.detail.esrb}</Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Modals;
