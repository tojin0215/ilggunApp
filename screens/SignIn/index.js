import React, {useState} from 'react';
import { AsyncStorage } from 'react-native';
import {
  ImageBackground,
  View,
  Text, Button,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { AppLoading, Asset, Font } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 
const SignInScreen = ({ onSignIn, navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const storeToken = async(user) => {
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  const getToken = async() => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log("나와라라ㅏㅏㅏㅏ"+data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  const googleLogin = async() => {
    
  }
  const SignPost = async(str) => {
    try {
      let res = await fetch('http://192.168.43.253:3000/signin', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      }).then((response) => 
        response.json()
      )
      .then((responseData) => {
        
        console.log(responseData.headers);
        storeToken(responseData[0].id);
        
        getToken();

        // save token
        //AsyncStorage.setItem("TOKEN", token);

        // get token
        //AsyncStorage.getItem("TOKEN").then(token => {
            // token value could be used
        //});
        console.log("주목~!");
        console.log(responseData);
        if(responseData[0].id){
          onSignIn();
         
          navigation.navigate('Select Page');
        }
        else{

        }
      })
      .catch((error)=>{
        console.log('Error fetching man',error);
      });
      
      //res = await res;
      //onSignIn();
      //navigation.navigate({onSignIn})
      //console.log(res)
      //console.log("떠나요~")
      
    } catch (e) {
      console.error(e);
    }
  }
  return (
    
      <ImageBackground style={styles.image} source={require('../../11.png')} style={styles.image}>
        <View style={styles.titleArea}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>일꾼</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        onChangeText={id =>setId(id)}
                        defaultValue={id}
                        style={styles.textForm} 
                        placeholder={"ID"}/>
                    <TextInput 
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                        style={styles.textForm} 
                        placeholder={"Password"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={SignPost}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>

                    <Text>  </Text>
                    <TouchableOpacity 
                      style={styles.button}
                      onPress={googleLogin}>
                      <Text style={styles.buttonTitle}>구글 로그인</Text>
                    </TouchableOpacity>
                   
                    <Text>  </Text>
                    <TouchableOpacity 
                      style={styles.button}
                      onPress={() => navigation.navigate('Sign Up')}>
                      <Text style={styles.buttonTitle}>회원가입</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
    
  );
};
 
const styles = StyleSheet.create({
  image:{
    //flex: 1,
    //resizeMode: "cover",
    justifyContent: "center",
    width: "100%", height: "100%",
    //paddingLeft: wp('10%'),
    //paddingRight: wp('10%'),
  },
  container: {
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
      fontSize: wp('15%'),
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

export default SignInScreen;