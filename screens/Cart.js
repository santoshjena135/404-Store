import React from 'react';
import { View, Text, Button } from 'react-native';
import CTA from '../components/cta';

const Cart = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>Cart is Empty!</Text>
      <CTA title="Back" onPress={goBack} />
    </View>
  );
};

export default Cart;
