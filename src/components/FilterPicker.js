import React from "react";
import {View, Text} from "react-native";
import {Picker} from "native-base";

const FilterPicker = (props) => {
    return (  
        <View style={{backgroundColor: 'red', flexDirection: 'row', maxHeight: 50 }}>
        
            <Text style={ {color: 'white',fontSize: 18, flex: 1, alignItems: 'center', textAlignVertical: 'center', paddingLeft: 15, fontWeight: 'bold'}}>Filter on PEGI: </Text>
      
            <View style={{backgroundColor:'white',  flex:1, margin: 5, marginRight:10, justifyContent: 'center', paddingLeft:10}}>
            <Picker 
                style={{ backgroundColor:'green'}}
                mode='dropdown' 
                iosHeader='Filter'
                selectedValue={props.filter}
                onValueChange={(val) => props.updateChange(val)}
                >
                <Picker.Item label='clear filter' value='none' />
                <Picker.Item label='Everyone' value='Everyone'/>
                <Picker.Item label='Everyone 10+' value='Everyone 10+'/>
                <Picker.Item label='Teen' value='Teen'/>
                <Picker.Item label='Mature' value='Mature'/>
                
            </Picker>
             </View>
      </View>
    )
}

export default FilterPicker;