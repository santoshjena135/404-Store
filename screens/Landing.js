import React, {useState , useEffect} from 'react';
import { View, StyleSheet,ScrollView, Image} from 'react-native';
import Hero from '../components/hero';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';
import Spacer from '../components/spacer';
import * as Font from 'expo-font'; 
import { active_categories_api_url, isSaleKeyword } from '@env';

  const fetchFonts = async () => {
    try {
      await Font.loadAsync({
        'custom-font': require('../assets/fonts/SuisseIntlMono-Regular.ttf')
      });
      console.log('Font loaded successfully');
    } catch (error) {
      console.error('Error loading font:', error);
    }
  };
  
  const Landing = ({navigation}) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      fetch(active_categories_api_url,{
        method: 'GET',
        credentials: 'include'})
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const [fontLoaded, setFontLoaded] = useState(false);
    useEffect(() => {
      fetchFonts().then(() => {
        setFontLoaded(true);
      });
    }, []);
    if (!fontLoaded) {
      // Render a loading indicator or placeholder if font is not loaded yet
      return null;
    }
  var val = 1;

  const openPLP = (categoryName,displayName) => {
    console.log("CatName:",categoryName);
    const encodedCategoryName = encodeURIComponent(categoryName);
    navigation.navigate('PLP', { categoryName: encodedCategoryName, displayName: displayName });
  };

  
  return ( 
        <ScrollView style={styles.scrollView}>
          <View style={styles.heroContainer}>
            <Hero imagePath={require("../assets/landingTiles/need-a-break.jpeg")} ctaText="<Women/>"/>
            <Hero imagePath={require("../assets/landingTiles/nodejs-black.jpeg")} ctaText="<Men/>"/>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.ctaContainer}>
              {categories.length > 0 ? (
                    categories.map(category => (
                      <CTA key={category.categoryName} title={category.displayName} isSale={category.displayName.toLowerCase().includes(isSaleKeyword)} onPress={() => openPLP(category.categoryName, category.displayName)}/>
                    ))
                    ):(
                    <>
                      <CTA title="                             Loading...                                "/>
                    </>
                  )}
            </View>
          </ScrollView>
          <View style={styles.teaserTextContainer}>
            <TeaserText teaserMessage={"()=>{`DISCOVER A UNIQUE COLLECTION OF PRINTED APPAREL THAT CELEBRATES THE SPIRIT OF PROGRAMMING AND TECHNOLOGY`};"}/>
          </View>
          <Spacer/>
          <View style={styles.wideHeroContainer}>
            <Image style={styles.wideHeroImage} source={require("../assets/wideheroimage.webp")}></Image>
          </View>
        </ScrollView>
      
  );
};

const styles = StyleSheet.create({
  heroContainer:{
    flexDirection:'row'
  },
  ctaContainer:{
    flexDirection:'row',
    padding: 30
  },
  wideHeroContainer:{
    alignItems: 'center',
    height: 10
  },
  wideHeroImage:{
    height: 300,
    width: 500
  },
  scrollView:{
    flex: 1
  },
  teaserTextContainer:{
    paddingTop: 5,
    padding: 20
  }
});

export default Landing;
