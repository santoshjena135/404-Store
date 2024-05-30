import React, {useState, useCallback} from 'react';
import { View, ScrollView, StyleSheet,Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';
import Spacer from '../components/spacer';
import {orders_api_url} from '@env';
import OrderRow from '../components/order-row';

const Orders = ({ navigation }) => {

  const [ordersDetails,setOrdersDetails] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const goBack = () => {
    navigation.goBack();
  };

  const openPDP = (prodId) => {
    navigation.navigate('PDP', { prodID : prodId });
  }

  const openCheckout = (amount) => {
    navigation.navigate('Checkout', { checkoutAmount : amount });
  }

  const fetchOrdersDetails = async () => {
    try {
      const response = await fetch(orders_api_url,{
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      console.log(JSON.stringify(data,null,2));
      setOrdersDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error occured when fetching cart details! -> ",error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrdersDetails();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? <View style={{padding:50, width: '100%', alignItems: 'center'}}><Text>Fetching Your Orders ...</Text></View> : 
      <>
      {ordersDetails.length==0 ? 
      <>
          <Spacer/>
          <TeaserText teaserMessage="You do not have any active orders!"/>
          <Spacer/>
          <CTA title="Start Shopping" onPress={goBack} />
      </> 
      : 
      <>
        <ScrollView>
            {ordersDetails.map((item, index)=>(
              <OrderRow key={index} order={item}/>
            ))
            }
        </ScrollView>
      </>
        }
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  footerButtons:{
    marginBottom: 20,
  },
  container:{
    flex: 1,
  }
})

export default Orders;
