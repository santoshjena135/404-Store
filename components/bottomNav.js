import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, EvilIcons } from '@expo/vector-icons'; // Import the icon library you're using

const BottomNav = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/COS_Atelier_Logo.png')} style={styles.logo} />
      </View>

      <TouchableOpacity style={styles.iconContainer}>
        <EvilIcons name="cart" size={24} color="black" />
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

export default BottomNav;
