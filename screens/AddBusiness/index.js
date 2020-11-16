import React, {useState} from 'react';
import { AsyncStorage } from 'react-native';
import {
  View,
  Text, Button,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AddBusinessScreen = ({ onSignUp, navigation }) => {
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [id, setId] = useState('');
  /*AsyncStorage.getItem("userData").then((userData) =>{
    setId(id => JSON.parse(userData));
  });*/
  const SignPost = async(str) => {
    try {
      

      let res = await fetch('http://192.168.43.253:3000/addBusiness', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id : '',
          title: title,
          introduction: introduction,
        }),
      });
      res = await res;
      
      navigation.navigate('Business List')
      console.log(res)
      
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>사업장 추가하기</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        onChangeText={title =>setTitle(title)}
                        defaultValue={title}
                        style={styles.textForm} 
                        placeholder={"Title"}/>
                    <TextInput 
                        onChangeText={introduction => setIntroduction(introduction)}
                        defaultValue={introduction}
                        style={styles.textForm} 
                        placeholder={"Introduction"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        /*onPress={onSignUp}*/
                        onPress={SignPost}>
                        <Text style={styles.buttonTitle}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
    
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: wp('10%'),
      paddingRight: wp('10%'),
      justifyContent: 'center',
  },
  titleArea: {
      width: '100%',
      padding: wp('10%'),
      alignItems: 'center',
  },
  title: {
      fontSize: wp('10%'),
  },
  formArea: {
      width: '100%',
      paddingBottom: wp('10%'),
  },
  textForm: {
      borderWidth: 0.5,
      borderColor: '#888',
      width: '100%',
      height: hp('5%'),
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
  },
  buttonArea: {
      width: '100%',
      height: hp('5%'),
  },
  button: {
      backgroundColor: "#46c3ad",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
})
 
export default AddBusinessScreen;