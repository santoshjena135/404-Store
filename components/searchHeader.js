import React,{useState} from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation,} from '@react-navigation/native';

const SearchHeader = (props) => {

  const navigation = useNavigation();

  const [text, setText] = useState('');

  const handleChangeText = (inputText) => {
    setText(inputText);
  };

  const handleSubmit = (text) => {
    if(text!=''){
      navigation.navigate('SDP', {searchTerm: text})
      }
    };

  const handleClose = () =>{
    setText('');
    props.setSearchHeaderState(false);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search COS"
        onChangeText={handleChangeText}
        onSubmitEditing={()=> handleSubmit(text)} // When the return key of keyboard is pressed
        returnKeyType="search"
        value={text}/>
      <View style={styles.searchNavContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Feather name="x" size={24} color="black" onPress={handleClose}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <AntDesign name="search1" size={24} color="black" onPress={() => handleSubmit(text)}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.2,
    borderBottomColor: '#ccc',
    height: 65
  },
  iconContainer:{
    marginHorizontal: 5
  },
  searchNavContainer:{
    flexDirection: 'row'
  }
});

export default SearchHeader;
