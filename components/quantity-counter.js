import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {cart_api_url} from '@env';

const QuantityCounter = (props) => {

    const updateQty = (id,type) =>{
        const updateBag = async (prodID,type) =>{
            const payload = { productID: prodID, updateType:type };
            const response = await fetch(cart_api_url, {
                                                              method: 'POST',
                                                              credentials: 'include',
                                                              headers: {
                                                                'Content-Type': 'application/json'
                                                              },
                                                              body: JSON.stringify(payload)
                                                            })
        
            if(response.status == 200)
            {
              console.log(`ID: '${prodID}' ${type==='add'?'added to':'removed from'} bag!`);
            }
            else{
              console.log("Something went wrong when adding to bag!");
            }
          }
        if(type==="add")
        {
            updateBag(id,type);
            props.setQuantity((props.quantity)+1);
            if(props.setTrigger){props.setTrigger(Date.now());}
        }
        else if(type==="remove")
        {
            if(props.quantity==1)
            {
                Alert.alert(
                    'You sure you want to remove the product from bag?',
                    '',
                    [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed')
                    },
                    {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => {
                            updateBag(id,type);
                            props.setQuantity(0);
                            if(props.setTrigger){props.setTrigger(Date.now());}
                        },
                    },
                    ],
                    { cancelable: false }
                );
            }
            else{
                updateBag(id,type);
                props.setQuantity((props.quantity)-1);
                if(props.setTrigger){props.setTrigger(Date.now());}
            }        
        } 
    }

    return (
        <View style={styles.container}>
            <View style={styles.components}>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>updateQty(props.productId,"add")}>
                    <Text style={styles.button}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.countContainer}>
                    <Text>{props.quantity}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>updateQty(props.productId,"remove")}>
                    <Text style={styles.button}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        fontSize: 20,
        fontFamily: 'custom-font',
        color: 'white'
    },
    container:{
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
    },
    components:{
        flexDirection: 'row',
        backgroundColor: 'black'
    },
    buttonContainer:{
        padding:5,
        height: 40,
        width: 40,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    countContainer:{
        padding:10,
        height: 40,
        width: 50,
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderBlockColor: 'black',
        borderRadius: 4
    },
    feather:{
        marginLeft: 'auto'
    }
});

export default QuantityCounter;
