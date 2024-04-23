import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SiteBanner = (props) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>  {props.bannerText} 
        {props.bannerLink?
         (
            <>
                <Text> | </Text>
                <Text style={styles.bannerLink}>{props.bannerLink}</Text>
            </>
        ):null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#333',
    padding: 7,
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
  },
  bannerLink: {
    textDecorationLine: 'underline'
  }
});

export default SiteBanner;
