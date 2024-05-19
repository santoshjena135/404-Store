import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, EvilIcons, AntDesign } from '@expo/vector-icons'; // Import the icon library you're using
import { useNavigation,} from '@react-navigation/native';
import SearchHeader from './searchHeader';
const windowWidth = Dimensions.get('window').width;

const Header = (props) => {

  const navigation = useNavigation();

  const handleMenuPress = () => {
    props.isMenuOpen ? navigation.goBack() : navigation.navigate('Menu');
  };

  const handleCartPress = () => {
    // Navigate to the cart page when cart button is pressed
    navigation.navigate('Cart');
  };

  const handleSearchPress = () => {
    // Navigate to the cart page when cart button is pressed
    props.setSearchHeaderState(true);
    navigation.navigate('SDP');
  };

  const goHome = () => {
    // Navigate to the cart page when cart button is pressed
    navigation.navigate('Landing');
  };

  return (
    <>
    {props.isSearchHeader ? 
      <SearchHeader setSearchHeaderState={props.setSearchHeaderState}/> 
      :
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleMenuPress}>
          {!props.isMenuOpen?<Feather name="menu" size={24} color="black" /> : <Feather name="x" size={24} color="black" />}
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={goHome}>
            <Image source={require('../assets/COS_Atelier_Logo.png')} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.cartSearchContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <EvilIcons name="cart" size={24} color="black" onPress={handleCartPress}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AntDesign name="search1" size={24} color="black" onPress={handleSearchPress}/>
          </TouchableOpacity>
        </View>
    </View>}

    </>
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
    position: 'absolute',
    marginLeft: (windowWidth/2)-50,
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  cartSearchContainer:{
    flexDirection: 'row'
  }
});

export default Header;
