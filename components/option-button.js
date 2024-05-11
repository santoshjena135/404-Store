import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const OptionButton = (props) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.textAndFeather} onPress={props.onPress}>
                <Text style={styles.buttonText}>{props.buttonText}</Text>
                <AntDesign style={styles.feather} name={props.iconName} size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonText:{
        fontSize: 15,
        fontFamily: 'custom-font'
    },
    buttonContainer:{
        padding: 0,
        borderBottomWidth: 0.2,
        marginHorizontal: 10
    },
    textAndFeather:{
        flexDirection: 'row',
        padding:20,
        height: 75,
        alignItems: 'center'
    },
    feather:{
        marginLeft: 'auto'
    }
});

export default OptionButton;
