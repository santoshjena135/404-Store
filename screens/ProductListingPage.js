import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CTA from '../components/cta';
import {plp_api_url} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const ProductListingPage = ({ route, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const { categoryName, displayName } = route.params;

  const [products, setProducts] = useState([]); 
  useEffect(() => {
    const fetchPLPData = async () => {
      try{
      //console.log("API HIT ON: ",plp_api_url+categoryName);
      const cachedPLP = await AsyncStorage.getItem(`PLP_${categoryName}`);
      if(cachedPLP!==null){
        //console.log("Serving PLP from cache!");
        setProducts(JSON.parse(cachedPLP));
      }
      else{
        //console.log("Serving PLP from fresh API call!");
        const url = plp_api_url+categoryName;
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        setProducts(data);
        await AsyncStorage.setItem(`PLP_${categoryName}`, JSON.stringify(data));
        }
      }
      catch (error){
        console.error('Error fetching PLP data:', error);
      }
    }
    fetchPLPData();
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
          <View style={styles.priceAndRatingContainer}>
            <Text style={styles.productPrice}>$ {product.price.toFixed(2).replace('.', ',')}</Text>
            <Text style={styles.productRating}>{product.rating.rate.toFixed(1)} ({product.rating.count})</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
    <View style={styles.bottomCTA}>
      <CTA cosTheme title="Back" onPress={goBack}/>
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
    alignSelf: 'flex-start'
  },
  priceAndRatingContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  productPrice: {
    fontSize: 14,
    alignSelf: 'flex-start'
  },
  productRating:{
    fontSize: 14,
    alignSelf: 'flex-end'
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
