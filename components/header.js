import React,{useState} from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, EvilIcons } from '@expo/vector-icons'; // Import the icon library you're using
import { useNavigation,} from '@react-navigation/native';

const Header = (props) => {

  const navigation = useNavigation();

  const handleMenuPress = () => {
    props.isMenuOpen ? navigation.goBack() : navigation.navigate('Menu');
  };

  const handleCartPress = () => {
    // Navigate to the cart page when cart button is pressed
    navigation.navigate('Cart');
  };
  const goHome = () => {
    // Navigate to the cart page when cart button is pressed
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleMenuPress}>
        {/* <Feather name={navigation.isFocused("Menu") ? "skip-back" : "menu"} size={24} color="black" /> */}
        {!props.isMenuOpen?<Feather name="menu" size={24} color="black" /> : <Feather name="x" size={24} color="black" />}
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={goHome}>
          <Image source={require('../assets/COS_Atelier_Logo.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.iconContainer}>
        <EvilIcons name="cart" size={24} color="black" onPress={handleCartPress}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc'
  },
  iconContainer: {
    padding: 5,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  }
});

export default Header;
