import React, {useState, useCallback} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';
import Spacer from '../components/spacer';
import {cart_api_url} from '@env';
import {pdp_api_url} from '@env';
import ProductRow from '../components/product-row-cart';

const Cart = ({ navigation }) => {

  const [cartData,setCartData] = useState([]);
  const [productDetails,setProductDetails] = useState([]);
  const [cartTotal,setCartTotal] = useState(0);
  const [trigger,setTrigger] = useState(0);

  const goBack = () => {
    navigation.goBack();
  };

  const openPDP = (prodId) => {
    navigation.navigate('PDP', { prodID : prodId });
  }

  const openCheckout = (amount,products,cartData) => {
    const filteredCheckoutProducts = products.map(item => ({
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price
    }));
    const combinedData = filteredCheckoutProducts.map(item=>({
      ...item,
      "count" : cartData[item.id]
    }));
    navigation.navigate('Checkout', { checkoutAmount : amount, cart_items : combinedData });
  }

  const fetchCartDetails = async () => {
    try {
      const response = await fetch(cart_api_url,{
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      setCartData(data);
      const productIds = Object.keys(data);

      const productDetailPromises = productIds.map((productId) =>
      fetch(`${pdp_api_url}${productId}`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) => res.json())
    );

    const productDetailsResp = await Promise.all(productDetailPromises);
    setProductDetails(productDetailsResp);

    const cartTotalAmt = productDetailsResp.reduce((total, product) => {
      const productQuantity = data[product.id] || 0;
      return total + product.price * productQuantity;
    }, 0);
    setCartTotal(cartTotalAmt);

    } catch (error) {
      console.log("Error occured when fetching cart details! -> ",error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCartDetails();
    }, [trigger])
  );

  return (
    <View style={styles.container}>
      {productDetails.length==0 ? 
      <>
          <Spacer/>
          <TeaserText teaserMessage="Oops! Your cart is empty!"/>
          <Spacer/>
          <CTA title="Start Shopping" onPress={goBack} />
      </> 
      : 
      <>
        <ScrollView>
          {productDetails.map((product, index) => (
                      <ProductRow setTrigger={setTrigger} key={index} productImage={product.image} productName={product.title} productPrice={product.price} productQty={cartData[product.id]} productId={product.id} onPress={()=>{openPDP(product.id)}}/>
          ))}
        </ScrollView>
        <View style={styles.footerButtons}>
            <CTA cosTheme title={`Pay ₹ ${cartTotal.toFixed(2)}`} onPress={()=>openCheckout(cartTotal.toFixed(2),productDetails,cartData)} />
          </View>
      </>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  footerButtons:{
    marginBottom: 20,
  },
  container:{
    flex: 1,
  }
})

export default Cart;
