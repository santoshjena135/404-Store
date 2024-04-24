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

  const menuItems = [
    { id: 1, label: "My Profile", iconName: "profile" },
    { id: 2, label: "Customer Service", iconName: "customerservice" },
    { id: 3, label: "Store Locator", iconName: "pushpino" },
    { id: 4, label: "Gift Cards", iconName: "gift" },
    { id: 5, label: "Orders & Returns", iconName: "shoppingcart" },
    { id: 6, label: "FAQ", iconName: "questioncircleo" },
    { id: 7, label: "App Settings", iconName: "setting" }
  ];

  return (
    <View style={styles.container}>
      {menuItems.map(item=>(
        <OptionButton key={item.id} buttonText={item.label} iconName={item.iconName}/>
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
