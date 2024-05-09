import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.skeleton}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60, // Adjust according to the size of your price text
    height: 20, // Adjust according to the size of your price text
    backgroundColor: '#f0f0f0', // Adjust to your desired background color
    borderRadius: 4, // Adjust as needed
  },
  skeleton: {
    flex: 1,
    borderRadius: 4, // Adjust to match container
    backgroundColor: '#dbdbdb', // Adjust to your desired skeleton color
  },
});

export default SkeletonLoading;
