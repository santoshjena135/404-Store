import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductRow = (props) => {
    return (
        <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.photoAndTextContainer} onPress={props.onPress}>
                <Image style={styles.productImage} source={{uri: props.productImage}} resizeMode='cover'/>
                <View style={styles.nameAndPriceFlexContainer}>
                    <View style={styles.nameInfoFlexContainer}>
                        <Text style={styles.buttonText}>{props.productName}</Text>
                    </View>
                    <View style={styles.priceInfoFlexContainer}>
                        <Text style={styles.buttonText}>${props.productPrice.toFixed(2).replace('.',',')}</Text>
                        <Text style={styles.buttonText}>x{props.productQty}</Text>
                        <Text style={styles.buttonText}>${(props.productPrice*props.productQty).toFixed(2).replace('.',',')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer:{
        padding: 0,
        borderBottomWidth: 0.2,
        marginHorizontal: 15
    },
    photoAndTextContainer:{
        flexDirection: 'row',
        padding:20,
        height: 180,
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 15,
        fontFamily: 'custom-font'
    },
    productImage:{
        aspectRatio: 3/4,
        width: 120,
    },
    nameAndPriceFlexContainer:{
        justifyContent: 'center',
        width: '60%',
        marginLeft: 25,
        alignSelf: 'flex-start'
    },
    priceInfoFlexContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    },


});

export default ProductRow;