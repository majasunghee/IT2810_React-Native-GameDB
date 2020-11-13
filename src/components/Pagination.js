import React from 'react';
import {Button, Icon, Title, Text} from 'native-base';
import {StyleSheet, View } from 'react-native';

//TouchableOpacity.defaultProps = { activeOpacity: 0.5 };

const Pagination = ({ nextButton, prevButton, prevBtnDisabled, nextBtnDisabled }) => {
    
    return (
        <View
            style={styles.buttonContainer}
        >   
            <Button  info iconLeft block style={styles.button}
                disabled={prevBtnDisabled}
                onPress={prevButton} >
                
                <Icon name="ios-arrow-back"/>
                <Text>   Previous </Text> 
            </Button>

            <Button  info iconRight block style={styles.button}
                disabled={nextBtnDisabled}
                onPress={nextButton} >
                <Text>Next  </Text> 
                <Icon name="ios-arrow-forward"/> 
            </Button>
        </View>        
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    button: {
        flex:1,
        alignItems: "center",
    }
  });

export default Pagination;