import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TeaserText = (props) => {
  return (
      <Text style={styles.textStyle}>{props.teaserMessage}</Text>
  );
};

const styles = StyleSheet.create({
  textStyle:{
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'custom-font'
  }
});

export default TeaserText;
