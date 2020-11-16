import React, {useState} from 'react';

import {
  View,
  Text, Button,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SendMessageScreen = ({ onSignUp, navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const SignPost = async() => {
    try {
      let res = await fetch('http://192.168.43.253:3000/sendMessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message : password,
          t: id,
        }),
      });
      res = await res;
      
      navigation.navigate('Message List')
      console.log(res)
      
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <View style={styles.container}>
                <View style={styles.formArea}>
                    <TextInput 
                        onChangeText={id =>setId(id)}
                        defaultValue={id}
                        style={styles.textForm} 
                        placeholder={"To."}/>
                    <TextInput 
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                        style={styles.textForm} 
                        placeholder={"Message"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        /*onPress={onSignUp}*/
                        onPress={SignPost}>
                        <Text style={styles.buttonTitle}>보내기</Text>
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
 
export default SendMessageScreen;