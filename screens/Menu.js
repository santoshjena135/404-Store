import React from 'react';
import { View, StyleSheet } from 'react-native';
import OptionButton from '../components/option-button';
import Spacer from '../components/spacer';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';

const Menu = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const menuItems = {
    "My Profile": "profile",
    "Customer Service": "customerservice",
    "Store Locator": "pushpino",
    "Gift Cards": "gift",
    "Orders & Returns": "shoppingcart",
    "FAQ": "questioncircleo",
    "App Settings": "setting"
  };

  return (
    <View style={styles.container}>
      {Object.entries(menuItems).map(([title, iconName]) => (
        <OptionButton buttonText={title} iconName={iconName}/>
      ))}
        <Spacer spacerHeight={70}/>
        <CTA title="Back" cosTheme onPress={goBack} style={styles.customButton}/>
        <Spacer spacerHeight={70}/>
        <TeaserText teaserMessage="Made with ♥ by Santosh Jena"/>
    </View>
  );
};

const styles = StyleSheet.create({
  customButton:{
    backgroundColor: 'red'
  },
  container:{
    // marginTop: 10
  }
})

export default Menu;
