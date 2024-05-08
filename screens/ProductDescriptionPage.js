import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CTA from '../components/cta';
import {pdp_api_url} from '@env';
import Spacer from '../components/spacer';
import Accordion from '../components/accordion';

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
      <Image style={styles.productImage} source={{uri : product.image}}></Image>
      <View style={styles.details}>
        <Text style={styles.titleTextStyle}>{product.title}</Text>
        <Spacer/>
        <Text style={styles.priceTextStyle}>$ {product.price}</Text>
        <Spacer/>
      <Accordion accordionLabel="Product Details" accordionText={product.description} />
      <Accordion accordionLabel="Materials" accordionText={product.description} />
      <Accordion accordionLabel="Care Guide" accordionText={product.description} />
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'custom-font'
  },
  priceTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'custom-font'
  },
  descriptionTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'custom-font'
  },
});

export default ProductDescriptionPage;
