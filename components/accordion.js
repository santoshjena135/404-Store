import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Accordion = (props) => {

    const [showText,setShowText] = useState(false);

    const toggleAccordion = ()=>{
        setShowText(!showText);
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.textAndFeather} onPress={toggleAccordion}>
                {showText ? <Text style={styles.buttonTextOpened}>{props.accordionLabel}</Text>: <Text style={styles.buttonText}>{props.accordionLabel}</Text>}
                <Text style={styles.feather}>{!showText ? <AntDesign name="down-square-o" size={24} color="black" /> : <AntDesign name="up-square-o" size={24} color="black" />}</Text>
            </TouchableOpacity>
            {showText && <Text style={styles.accordionText}>{props.accordionText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonText:{
        fontSize: 15,
        fontFamily: 'custom-font'
    },
    buttonTextOpened:{
        fontSize: 18,
        fontFamily: 'custom-font',
    },
    buttonContainer:{
        padding: 0,
        borderBottomWidth: 0.2,
        marginHorizontal: 0
    },
    textAndFeather:{
        flexDirection: 'row',
        padding:5,
        height: 60,
        alignItems: 'center'
    },
    accordionText:{
        flexDirection: 'row',
        padding:5,
        marginBottom: 10,
        alignItems: 'center'
    },
    feather:{
        marginLeft: 'auto'
    }
});

export default Accordion;
