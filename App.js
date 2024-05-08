import { View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import Menu from './screens/Menu';
import Cart from './screens/Cart';
import Header from './components/header';
import SiteBanner from './components/sitebanner';
import PLP from './screens/ProductListingPage';
import PDP from './screens/ProductDescriptionPage';
import DeliveryPayments from './screens/DeliveryPayments';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
<NavigationContainer style={{ backgroundColor: 'white' }}>
  <View style={styles.navContainer}>
  <StatusBar barStyle="dark-content" />
    <SiteBanner style={styles.sitebanner} bannerText="COS ATELIER SEASON" bannerLink="SALE 20% OFF"/>
    <Header/>
  </View>
  <Stack.Navigator screenOptions={{ headerShown: false,
                                    contentStyle: { backgroundColor: 'white'},
                                  }}>

    <Stack.Screen
      name="Landing"
      component={Landing}
    />
    <Stack.Screen 
      name="Menu" 
      component={Menu}
      options={{gestureDirection:'horizontal'}}
    />
    <Stack.Screen 
      name="Cart" 
      component={Cart}
      options={{gestureDirection:'vertical'}}
    />
    <Stack.Screen 
      name="PLP" 
      component={PLP}
      options={{gestureDirection:'horizontal'}}
    />
    <Stack.Screen 
      name="PDP" 
      component={PDP}
      options={{gestureDirection:'horizontal'}}
    />
    <Stack.Screen 
      name="DeliveryPayments" 
      component={DeliveryPayments}
      options={{gestureDirection:'vertical'}}
    />
  </Stack.Navigator>
</NavigationContainer>

  );
};

const styles = StyleSheet.create({
  navContainer:{
      marginTop:60
  },
  heroContainer:{
    flexDirection:'row'
  },
  ctaContainer:{
    flexDirection:'row',
    padding: 30
  },
  scrollView:{
    flex: 1
  },
  teaserTextContainer:{
    paddingTop: 5,
    padding: 20
  }
});

export default App;
