import React, {useState , useEffect} from 'react';
import { View, StyleSheet,ScrollView, Button,Text } from 'react-native';
import Header from '../components/header';
import SiteBanner from '../components/sitebanner';
import Hero from '../components/hero';
import CTA from '../components/cta';
import TeaserText from '../components/teasers';
import Spacer from '../components/spacer';
import * as Font from 'expo-font'; 
import { active_categories_api_url } from '@env';

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
  
  const Landing = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      fetch(active_categories_api_url)
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

  
  return ( 
        <ScrollView style={styles.scrollView}>
          <View style={styles.heroContainer}>
            <Hero imagePath={require("../assets/women_hero.jpg")} ctaText="Women"/>
            <Hero imagePath={require("../assets/men_hero.jpg")} ctaText="Men"/>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.ctaContainer}>
              {categories.length > 0 ? (
                    categories.map(category => (
                      <CTA key={category.categoryName} title={category.displayName}/>
                    ))
                    ):(
                    <>
                      <CTA title="                             Loading...                                "/>
                    </>
                  )}
            </View>
          </ScrollView>
          <Spacer/>
          <View style={styles.teaserTextContainer}>
            <TeaserText teaserMessage="NEW IDEAS FOR MODERN DRESSING, PRESENTED THROUGH CREATIVE EXPRESSION AND ARTISANAL TECHNIQUE"/>
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
  scrollView:{
    flex: 1
  },
  teaserTextContainer:{
    paddingTop: 5,
    padding: 20
  }
});

export default Landing;
