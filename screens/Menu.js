import React from 'react';
import { View, Text, Button } from 'react-native';

const Menu = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>Menu Details</Text>
      <Button title="Back" onPress={goBack} />
    </View>
  );
};

export default Menu;
