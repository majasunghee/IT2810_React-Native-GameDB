import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

TouchableOpacity.defaultProps = { activeOpacity: 0.5 };

const Pagination = ({ nextButton, prevButton, prevBtnDisabled, nextBtnDisabled }) => {
    return (
        <View
            style={styles.buttonContainer}
        >   
            <TouchableOpacity
                disabled={prevBtnDisabled}
                onPress={prevButton} style={[styles.appButton]}>
                <Text style={styles.appButtonText}>Prev</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                disabled={nextBtnDisabled}
                onPress={nextButton} style={[styles.appButton]}>
                <Text style={styles.appButtonText}>Next</Text>
            </TouchableOpacity>
        </View>        
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    appButton: {
        elevation: 8,
        backgroundColor: "#FF0000",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 200
    
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
  });

export default Pagination;