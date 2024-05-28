import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import {rzp_test_key, create_order_api_url, flush_cart_api_url, save_order_api_url, cart_api_url} from '@env';

const Checkout = ({ navigation, route }) => {

  const {checkoutAmount} = route.params;
  const [orderID,setOrderID] = useState(null);

  const handleWebViewMessage = async (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.type === 'navigateBack') {
      navigation.goBack(); // Navigate back to the cart page
    }
    else if(message.type === 'handlesuccess'){
    // i. store in DB
      try {
        const cart = await fetch(`${cart_api_url}`,{
          method: 'GET',
          credentials: 'include'
        });

        const cartdata = await cart.json();
        const aggregatedPayload = {
          ...message.data,
          cart_items: cartdata,
          cart_amount: checkoutAmount}
        const payload = JSON.stringify(aggregatedPayload);

        const response = await fetch(`${save_order_api_url}`,{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body : payload
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Order details saved in DB');
      } catch (error) {
        console.error('Error saving data in DB : ', error);
      }

    // ii. flush cart
      try {
        const response = await fetch(`${flush_cart_api_url}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Message:', data.message);
      } catch (error) {
        console.error('Error flusing cart:', error);
      }

    // iii. navigate to orders-page
      navigation.goBack();
    }
  };

  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = async () => {
    try {
        const response = await fetch(`${create_order_api_url}?amount=${checkoutAmount}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Order ID from RZP -> ', data);
        setOrderID(data);
      } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  const rzpdom = `
  <!DOCTYPE html>
    <html>
      <head>
        <title>RAZOR-VIEW</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <script>
          window.onload = function (){
              var options = {
                  "key": "${rzp_test_key}", //test-key
                  "amount": "${checkoutAmount*100}",
                  "currency": "INR",
                  "name": "404-store",
                  "description": "Test Transaction",
                  "order_id": "${orderID}",
                  "handler": function (response){
                      const message = JSON.stringify({
                        type: 'handlesuccess',
                        data: {
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_signature: response.razorpay_signature
                        }
                      });
                      window.ReactNativeWebView.postMessage(message);
                  },
                  "notes": {
                      "address": "404 store office address"
                  },
                  "theme": {
                      "color": "#000000",
                      "backdrop_color" : "#ffffff"
                  },
                  "modal": {
                    "ondismiss": function(){
                      const message = JSON.stringify({ type: 'navigateBack' });
                      window.ReactNativeWebView.postMessage(message);
                    }
                  }
              };
              var rzp1 = new Razorpay(options);
              rzp1.on('payment.failed', function (response){
                      alert(response.error.description);
              });

              rzp1.open();
              e.preventDefault();
          };
        </script>
        </body>
    </html>
  `;

  return (
        <View style={styles.container}>
          <WebView 
            originWhitelist={['*']}
            source={{ html: rzpdom }}
            style={{ flex: 1 }}
            onMessage={handleWebViewMessage}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    marginBottom: 30
  },
})

export default Checkout;
