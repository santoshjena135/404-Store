import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CTA from '../components/cta';
import {pdp_api_url} from '@env';
import Spacer from '../components/spacer';
import Accordion from '../components/accordion';
import SkeletonLoading from '../components/skeletonLoading';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const ProductDescriptionPage = ({ route, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const addToBag = () =>{
    console.log("ATB Called!");
  }

  const { prodID } = route.params;

  const [product, setProduct] = useState([]); 
  useEffect(() => {
    const url = pdp_api_url+String(prodID);
    fetch(url)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const openDeliveryPaymentsPage = ()=>{
    navigation.navigate('DeliveryPayments');
  }

  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      {product.image? <Image style={styles.productImage} source={{uri : product.image}}></Image> : <Image style={styles.productImage} source={require('../assets/loading.gif')}></Image>}
      <View style={styles.details}>
        <Text style={styles.titleTextStyle}>{product.title ? `${product.title}`: <SkeletonLoading/>}</Text>
        <Spacer/>
        <View style={styles.priceAndRatingContainer}>
          <Text style={styles.priceTextStyle}>{product.price ? `$ ${product.price.toFixed(2).replace('.', ',')}`: <SkeletonLoading/>}</Text>
          {product.rating ? <View style={{flexDirection:'row'}}>
                              <AntDesign name="staro" size={13} color="black" />
                              <Text style={styles.ratingTextStyle}>{product.rating.rate.toFixed(1)} ({product.rating.count})</Text>
                            </View>
        : null}</View>
        <Spacer/>
        <Accordion accordionLabel="Product Details" accordionText={product.description} />
        {(product.material) ? <Accordion accordionLabel="Material" accordionText={product.material} /> : ''}
        {(product.careguide) ? <Accordion accordionLabel="Care Guide" accordionText={product.careguide} /> : ''}
        <Spacer/>
        <CTA title="Delivery & Payments" onPress={()=>openDeliveryPaymentsPage()}></CTA>
      </View>
    </View>
    </ScrollView>
    <View style={styles.footerButtons}>
      <CTA title="Back" onPress={goBack}/>
      <CTA title="Add to Bag" onPress={addToBag}/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 0,
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
    alignSelf: 'flex-end'
  },
  productImage: {
    width: '100%',
    aspectRatio: 3/4,
    marginBottom: 10,
  },
  details:{
    marginHorizontal: 15,
    marginVertical: 10,
  },
  footerButtons:{
    flexDirection: 'row',
    padding: 15,
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'custom-font'
  },
  priceAndRatingContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  priceTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'custom-font'
  },
  ratingTextStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'custom-font',
    marginLeft: 5
  },
  descriptionTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'custom-font'
  },
});

export default ProductDescriptionPage;
