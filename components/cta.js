import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CTA = (props) => {
  return (
    <View style={styles.container}>
      {!props.isSale ? (
        props.isHero ? (
          <TouchableOpacity style={styles.buttonHero} onPress={props.onPress}>
            <Text style={styles.buttonTextHero}>{props.title}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={props.cosTheme ? styles.cosThemeButton : styles.button} onPress={props.onPress}>
            <Text style={props.cosTheme ? styles.cosThemeButtonText :styles.buttonText}>{props.title}</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity style={styles.buttonSale} onPress={props.onPress}>
          <Text style={styles.buttonTextSale}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 5
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSale: {
    backgroundColor: '#7C0002',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 5
  },
  buttonTextSale: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonHero: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 5
  },
  buttonTextHero: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  cosThemeButton:{
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  cosThemeButtonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default CTA;
