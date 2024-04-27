import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CTA from '../components/cta';
import {plp_api_url} from '@env';
const windowWidth = Dimensions.get('window').width;

const ProductListingPage = ({ route, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const { categoryName, displayName } = route.params;

  const [products, setProducts] = useState([]); 
  useEffect(() => {
    console.log("API HIT ON: ",plp_api_url+categoryName)
    fetch(plp_api_url+categoryName)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const openPDP = (prodID) => {
    navigation.navigate('PDP', { prodID: prodID });
  };

  return (
    <>
    <View style={styles.filterContainer}>
      <Text>{displayName}</Text>
      <Text>{products.length} Items</Text>
    </View>
    <ScrollView>
    <View style={styles.container}>
      {/* Render JSON data */}
      {products.map((product, index) => (
      <TouchableOpacity key={index} style={styles.productTileContainer} onPress={() => openPDP(product.id)}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
    <View style={styles.bottomCTA}>
      <CTA title="Back" onPress={goBack}/>
    </View>
    </>
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
    width: 100,
    height: 100,
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
    aspectRatio: 3/4, // Maintain Image aspect ratio
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
  filterContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 5,
    marginHorizontal: 20
  },
  bottomCTA:{
    paddingBottom: 20
  }
});

export default ProductListingPage;
