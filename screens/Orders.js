import React, {useState, useCallback} from 'react';
import { View, ScrollView, StyleSheet,Text,Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';
import Spacer from '../components/spacer';
import {orders_api_url} from '@env';
import OrderRow from '../components/order-row';
import OrderPopup from '../components/popup';

const Orders = ({ navigation }) => {

  const [ordersDetails,setOrdersDetails] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdPopup,setSelectedIdPopup] = useState('');

  const toggleModal = (order,type) => {
    if(type==="close"){
      setModalVisible(!modalVisible);
    }
    else if (type==="open"){
      setSelectedIdPopup(order);
      setModalVisible(!modalVisible);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

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
      console.log("Error occured when fetching orders details! -> ",error);
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
              <OrderRow key={index} order={item} onPress={()=>toggleModal(item,"open")}/>
            ))
            }
            <OrderPopup visible={modalVisible} onClose={()=>toggleModal(null,"close")} selectedOrder={selectedIdPopup} />
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
