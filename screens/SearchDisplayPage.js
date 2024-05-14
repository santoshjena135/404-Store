import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CTA from '../components/cta';
import {search_api_url} from '@env';

const windowWidth = Dimensions.get('window').width;

const SearchDisplayPage = ({ route, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const { searchTerm } = route.params || '';

  const [products, setProducts] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
   
  useEffect(() => {
    const fetchPLPData = async () => {
      try{
        if(searchTerm){
          const url = search_api_url+searchTerm;
          const response = await fetch(url);
          const data = await response.json();
          setProducts(data);
          setResultMessage(`We found ${data.length} results for '${searchTerm}'`)
        }
      }
      catch (error){
        console.error('Error fetching PLP data:', error);
        setResultMessage(`We found nothing related to '${searchTerm}'`);
        setProducts([]);
      }
    }
    fetchPLPData();
  }, [searchTerm]);

  const openPDP = (prodID) => {
    navigation.navigate('PDP', { prodID: prodID });
  };

  return (
    <>
    <View style={styles.filterContainer}>
      <Text>{resultMessage}</Text> 
    </View>
    <ScrollView>
    <View style={styles.container}>
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
    aspectRatio: 3/4,
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

export default SearchDisplayPage;
