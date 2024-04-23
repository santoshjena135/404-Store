import React from 'react';
import { View, Text, Button } from 'react-native';

const Cart = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>Cart Page</Text>
      <Button title="Back" onPress={goBack} />
    </View>
  );
};

export default Cart;
