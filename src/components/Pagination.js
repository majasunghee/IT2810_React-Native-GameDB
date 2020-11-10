import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Pagination = ({ onPress, pageNum }) => {

    console.log("Pagination pagenum"+ pageNum);
    return (
        <Button onPress={onPress}>{pageNum}</Button>
        
    )
}

export default Pagination;