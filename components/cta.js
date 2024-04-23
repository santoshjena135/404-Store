import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CTA = (props) => {
  return (
    <>
      {!props.isSale ? (
        props.isHero ? (
          <TouchableOpacity style={styles.buttonHero}>
            <Text style={styles.buttonTextHero}>{props.title}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{props.title}</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity style={styles.buttonSale}>
          <Text style={styles.buttonTextSale}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </>
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
});

export default CTA;
