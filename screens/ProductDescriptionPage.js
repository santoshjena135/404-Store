import React, {useEffect, useState} from 'react';
import { Alert, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CTA from '../components/cta';
import {pdp_api_url} from '@env';
import Spacer from '../components/spacer';
import Accordion from '../components/accordion';
import SkeletonLoading from '../components/skeletonLoading';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cart_api_url} from '@env';

const windowWidth = Dimensions.get('window').width;

const ProductDescriptionPage = ({ route, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const addToBag = async (prodID,prodTitle) =>{
    const payload = { productID: prodID, updateType:"add" };
    const response = await fetch(cart_api_url, {
                                                      method: 'POST',
                                                      credentials: 'include',
                                                      headers: {
                                                        'Content-Type': 'application/json'
                                                      },
                                                      body: JSON.stringify(payload)
                                                    })

    if(response.status == 200)
    {
      Alert.alert(`'${prodTitle}' added to bag!`);
    }
    else{
      Alert.alert("Something went wrong when adding to bag!");
    }
  }

  const { prodID } = route.params;

  const [product, setProduct] = useState([]); 
  useEffect(() => {
    const fetchProductData = async () => {
      try{
        const cachedProduct = await AsyncStorage.getItem(`product_${prodID}`);
        if(cachedProduct!==null){
          //console.log("Serving PDP from cache!");
          setProduct(JSON.parse(cachedProduct));
        }
        else{
          //console.log("Serving PDP from fresh API call!");
          const url = pdp_api_url+String(prodID);
          const response = await fetch(url,{
            method: 'GET',
            credentials: 'include'
          });
          const data = await response.json();
          setProduct(data);
          await AsyncStorage.setItem(`product_${prodID}`, JSON.stringify(data));
        }
        } catch(error){
          console.error('Error fetching product data:', error);
        }
      }
      fetchProductData();
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
      <CTA title="Add to Bag" onPress={()=>addToBag(product.id, product.title)}/>
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
