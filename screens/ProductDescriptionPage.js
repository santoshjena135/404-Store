import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CTA from '../components/cta';
import {pdp_api_url} from '@env';
const windowWidth = Dimensions.get('window').width;

const ProductDescriptionPage = ({ route, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const { prodID } = route.params;

  const [product, setProduct] = useState([]); 
  useEffect(() => {
    const url = pdp_api_url+String(prodID);
    fetch(url)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text>PDP page, pid is {prodID}</Text>
      <CTA title="BACK" onPress={goBack}/>
        <Text>{product.title}</Text>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    width: 100, // Adjust according to your UI requirements
    height: 100, // Adjust according to your UI requirements
  },
  productTileContainer:{
    width: (windowWidth-30)/2,
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    aspectRatio: 1, // Maintain aspect ratio
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
  },
});

export default ProductDescriptionPage;
