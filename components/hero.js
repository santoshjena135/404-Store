import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import CTA from './cta';

const { width } = Dimensions.get('window');

const Hero = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.imagePath} style={styles.heroimage} resizeMode='cover'/>
      <View style={styles.ctaContainer}>
        <CTA title={props.ctaText} isHero/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    aspectRatio: 9 / 16,
  },
  heroimage: {
    width: width / 2,
    height: '100%'
  },
  ctaContainer: {
    position: 'absolute',
    top: '75%',
    left: '50%',
    marginLeft: -width / 8, // Half the width of the image
    marginTop: -20, // Adjust this value based on your CTA's height
    zIndex: 2, // Ensure CTA is on top of the image
  },
});

export default Hero;
