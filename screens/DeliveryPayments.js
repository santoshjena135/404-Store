import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';
import Spacer from '../components/spacer';

const DeliveryPayments = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Spacer/>
      <TeaserText teaserMessage="Due to additional health and safety measures to protect our logistics teams, your delivery may take a little longer. Please note, that we might not be able to deliver to all areas. You will be notified about the same during checkout. We deliver all days, except bank holidays."/>
      <CTA cosTheme title="Back" onPress={goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 15
  }
})

export default DeliveryPayments;
