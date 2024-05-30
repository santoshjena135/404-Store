import React, {useState} from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const OrderRow = ({order}) => {

    return (
        <View style={styles.rowContainer}>
            <View style={styles.countAmountContainer}>
                <Text>{order.cart_items.length==1 ? '1 item': order.cart_items.length+' items'}</Text>
                <Text style={styles.amountContainer}>₹ {order.amount.toFixed(2)}</Text>
            </View>
            <View style={styles.imageStatusContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.productImageContainer}>
                        <Image style={styles.productImage} source={ {uri: order.cart_items[0].image} }></Image>
                    </View>
                    {order.cart_items[1] ?
                    <>
                        <View style={styles.productImageContainerTop}>
                            <Image style={styles.productImage} source={ {uri: order.cart_items[1].image} }></Image>
                        </View>
                    </> :
                    null}
                </View>
                <View style={styles.statusContainer}>
                    <View style={styles.progressBarContainer}>
                        {order.status==='confirmed'? <ProgressBar progress={0.1} color={MD3Colors.error0}/> : null}
                        {order.status==='shipped'? <ProgressBar progress={0.4} color={MD3Colors.error0} /> : null}
                        {order.status==='outfordel'? <ProgressBar progress={0.7} color={MD3Colors.error0} /> : null}
                        {order.status==='delivered'? <ProgressBar progress={1} color={MD3Colors.error0} /> : null}
                    </View>
                    <View style={styles.statusTextContainer}>
                        <Text>--- Confirmed</Text>
                        <Text>--- Shipped</Text>
                        <Text>--- Out for delivery</Text>
                        <Text>--- Delivered</Text>
                    </View>

                </View>
            </View>

            <View style={styles.additionalCountContainer}>
                {order.cart_items.length>=3 ? 
                    <Text>+ {order.cart_items.length-2} {(order.cart_items.length-2)==1 ?'item':'items'}</Text> 
                        :
                    null
                }
            </View>
                {/* <Text>Status : {order.status}</Text>
                <Text>Placed on: {order.order_timestamp}</Text>
                <Text>Order_ID : {order.razorpay_order_id}</Text>
                <Text>Payment_ID : {order.razorpay_payment_id}</Text> */}

        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer:{
        padding: 15,
        borderWidth: 0.2,
        paddingBottom: 10,
        margin: 10,
        borderRadius: 10
    },
    countAmountContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    amountContainer:{
        padding: 5,
        fontSize: 15
    },
    imageContainer:{
        flexDirection: 'row',
    },
    additionalCountContainer:{
        marginTop: 30,
        marginLeft: 30
    },
    productImageContainer:{
        padding: 3,
        borderWidth: 0.2,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    productImageContainerTop:{
        position: 'absolute',
        marginLeft: 25,
        marginTop: 25,
        padding: 3,
        borderWidth: 0.2,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    productImage: {
        width: '100%',
        objectFit: 'cover',
        borderRadius: 8,
        height: 200,
        aspectRatio: 3.5/5, // Maintain aspect ratio
    },
    imageStatusContainer:{
        flexDirection: 'row',
        marginTop: 20,
    },
    statusContainer:{
        justifyContent: 'center',
        height: 200,
        width: 300,
        marginLeft: 70,
    },
    progressBarContainer:{
        width: 200,
        transform: [{ rotate: '90deg' }],
        transformOrigin: 'left center',
    },
    statusTextContainer:{
        height: '100%',
        width: 150,
        justifyContent: 'space-between',
        marginLeft: 0,
    }

});

export default OrderRow;
