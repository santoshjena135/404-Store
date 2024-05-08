import React from 'react';
import { View, Text, Button } from 'react-native';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';
import Spacer from '../components/spacer'

const Cart = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Spacer/>
      <TeaserText teaserMessage="Oops! Your cart is empty!"/>
      <CTA cosTheme title="Back" onPress={goBack} />
    </View>
  );
};

export default Cart;
