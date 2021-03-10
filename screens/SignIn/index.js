import React, {useState} from 'react';
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import {
  ImageBackground,
  View,
  Text, Button, Image, TextInput, 
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import axios from 'axios';
import { Alert } from 'react-native';
//import * as GoogleSignIn from 'expo-google-sign-in'
//axios.create({baseURL:'',timeout:1000})
import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from "expo-crypto";

const SignInScreen = ({ onSignIn, navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn,setSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isReady, setIsReady] = useState(false);


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
      console.log(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  const SignPost = async(str) => {
    try {
      await axios.post('https://www.toojin.tk:3000/signin', { 
        id: id,
        password: password, 
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
      .then((responseData) => {
        console.log(responseData);
        if(responseData.data[0] == undefined || responseData.data[0] == ''){
          Alert.alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")
        }else{
          storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
          getToken();
      
          if(responseData.data[0].id){
            onSignIn();
            navigation.navigate('Select Page');
          }
        }
      })
      .catch(function(error) {
        Alert.alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")

        if (!error.response) {
          // network error
          console.log('hh'+error)
        }
      });
    } catch (e) {
      console.error(e);
    } 
  }



  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      //clientId: '<YOUR_IOS_CLIENT_ID>',
    });
  };

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    try {
      await axios.post('https://www.toojin.tk:3000/signinByCode', { code: user.uid,
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
      .then((responseData) => {
        if(responseData.data[0] == undefined || responseData.data[0] == ''){
          navigation.navigate('Sign Up Google',{code:user.uid, password:user.uid});
        }else{
          storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
          getToken();
      
          if(responseData.data[0].id){
            onSignIn();
            navigation.navigate('Select Page');
          }
        }
      })
      .catch(function(error) {
          Alert.alert('hh'+error)
      });
    } catch (e) {
      Alert.alert(e);
    } 
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  const onpress = () => {
      signInAsync();
  };

  const loginWithApple = async () => {
    const csrf = Math.random().toString(36).substring(2, 15);
    const nonce = Math.random().toString(36).substring(2, 10);
    const hashedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256, nonce);
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ],
      state: csrf,
      nonce: hashedNonce
    });
    const { identityToken, email, state } = appleCredential;
  }
  // This should go in state
  const loginAvailable = AppleAuthentication.isAvailableAsync();

  setTimeout(() => {setIsReady(true)},1500);
  //setIsReady(true);
  initAsync();



  return (
      <>
        {isReady?
        <>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
      <View style={styles.titleArea}>
          <Image style={styles.logo} source={require('../../img/logo.png')}/>
      </View>
      <View style={styles.formArea}>
          <View style={styles.textArea}>
            <Image style={styles.idImg} source={require('../../img/id.png')}/>
            <TextInput 
              onChangeText={id =>setId(id)}
              defaultValue={id}
              style={styles.textForm} 
              placeholder={"아이디를 입력해주세요"}/>
          </View>
          <View style={styles.textArea}>
            <Image style={styles.pwdImg} source={require('../../img/pwd.png')}/>
            <TextInput 
              onChangeText={password => setPassword(password)}
              defaultValue={password}
              style={styles.textForm} 
              secureTextEntry={true}
              placeholder={"비밀번호를 입력해주세요."}/>
          </View>
          
      </View>
      <View style={styles.buttonArea}>
          <TouchableOpacity 
              style={styles.button}
              onPress={SignPost}>
              <Text style={styles.buttonLoginTitle}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button1}
            onPress={onpress}>
            <Image style={styles.googleImg} source={require('../../img/google_icon.png')}/>
            <Text style={styles.buttonGoogleTitle}>구글 로그인</Text>
          </TouchableOpacity>
          {AppleAuthentication.isAvailableAsync()?
          <>
            <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 250, height: 50 }}
          onPress={loginWithApple}
      />

          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.button1}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });

                try {
                  await axios.post('https://www.toojin.tk:3000/signinByCode', { code: credential.user,
                    headers:{
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'}
                  })
                  .then((responseData) => {
                    console.log(credential.user);
                    if(responseData.data[0] == undefined || responseData.data[0] == ''){
                      console.log('-----------------------');
                      navigation.navigate('Sign Up Google',{code: credential.user, password:credential.user});
                    }else{
                      storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
                      getToken();
                  
                      if(responseData.data[0].id){
                        onSignIn();
                        navigation.navigate('Select Page');
                      }
                    }
                  })
                  .catch(function(error) {
                      Alert.alert('hh'+error)
                  });
                } catch (e) {
                  Alert.alert(e);
                } 
                // signed in
              } catch (e) {
                if (e.code === 'ERR_CANCELED') {
                  // handle that the user canceled the sign-in flow
                } else {
                  // handle other errors
                }
              }
            }}
          /></>:null}

          <TouchableOpacity 
            style={styles.button2}
            onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.buttonTitle}>회원가입</Text>
          </TouchableOpacity>

          
      </View>
      <View style={styles.buttonlogoArea}>
        <Image style={styles.logobottom} source={require('../../img/logo_bottom.png') }/> 
      </View>
      
      </View>
      </TouchableWithoutFeedback>
      </>
    :
      <Image style={styles.image} source={require('../../assets/splash.png') }/> 
  }
     </>

  );
};

const styles = StyleSheet.create({
  image:{
    //flex: 1,
    //resizeMode: "cover",
    justifyContent: "flex-start",
    width: "100%", height: "100%",
    //paddingLeft: wp('10%'),
    //paddingRight: wp('10%'),
  },  
  logo:{
    justifyContent: "center",alignItems:"center",
    width: wp('30%'), height: wp('30%'),
    marginTop:hp('20%')
  }, 
  container: {
      width: "100%", height: "100%",
      backgroundColor: 'white',
      paddingLeft: wp('10%'),
      paddingRight: wp('10%'),
      paddingBottom: wp('15%'),
      justifyContent: 'center',
  },
  titleArea: {
      width: '100%',
      padding: wp('5%'),
      marginBottom: wp('13%'),
      alignItems: 'center',
  },
  formArea: {
      width: '100%',
      paddingBottom: wp('7%'),
      marginTop:hp('1.8%'),
      marginBottom:  hp('0.5%'),
  },
  textArea:{
    flexDirection:"row",
    borderBottomWidth: wp('0.3%'),
    borderBottomColor:'#67C8BA',
  },
  idImg:{
    width:wp('16%'), height:wp('5%'),
    marginLeft:wp('1.3%'), marginTop:hp('3.5%'), marginRight:wp('8%'),
  },
  
  pwdImg:{
    width:wp('18%'), height:wp('4.3%'),
    marginLeft:wp('1.2%'), marginTop:hp('3.9%'), marginRight:wp('6%'),
  },
  textForm: {
      width: '60%',
      height: hp('6%'),
      paddingLeft: wp('1.2%'),
      paddingRight: wp('1.2%'),
      marginTop:  hp('2%'),
      fontSize: wp('4%'), fontFamily:"NanumSquare",
      color:'#040525',
  },
  buttonArea: {
      width: '100%',
      height: hp('17%'),
      marginBottom: hp('15%'),
      backgroundColor:'white'
  },
  button: {
      backgroundColor: "#67C8BA",
      width: "100%",
      height: hp('6%'),
      marginBottom:wp('3%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: wp('6%'),
  },
  button1: {
    flexDirection:'row',
    backgroundColor: "#f4f4f4",
    width: "100%",
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%'),
    marginBottom:wp('3%')
  },
  googleImg:{
    position:"absolute", top:hp('1%'), left:wp('5%'),
    width:wp('7%'), height:wp('7%')
  },
  button2: {
      backgroundColor: "white",
      width: "100%",
      height: hp('6%'),
      justifyContent: 'center',
      alignItems:'flex-end' ,
      paddingRight: wp('5%')
  },
  buttonLoginTitle:{
    color: 'white', fontSize: wp('4.8%'),
    fontFamily:"NanumSquare",
  },
  buttonGoogleTitle: {
      color: '#040525', fontSize: wp('4.5%'),
      fontFamily:"NanumSquare",
  },
  buttonTitle: {
      color: '#040525', fontSize: wp('4.2%'),
      fontFamily:"NanumSquare",
  },
  buttonlogoArea: {
    justifyContent:'flex-end',
    alignItems:"center",
    bottom: hp('2%'),
    width: "100%",
    height: hp('5%'),
  },
  logobottom:{
    width:wp('22%'), height:wp('3%'), 
    justifyContent:"flex-end",
    alignItems:"center",
  },
  containerL: {
    backgroundColor:"#67C8BA",
    width: "100%", height: "100%",
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    paddingBottom: wp('15%'),
    justifyContent: 'center',
  },
  titleAreaL: {
      width: '100%',
      padding: wp('10%'),
      marginBottom: wp('5%'),
      alignItems: 'center',
  },
  textAreaL:{
    marginLeft:wp('5%'),
    marginBottom:wp('30%')
  },
  text1L:{
    color: 'white', fontSize: wp('7%'),
    fontFamily:"NanumSquare",
    marginBottom:wp('2%')
  },
  text2L:{
    color: 'white', fontSize: wp('5.7%'),
    fontFamily:"NanumSquare"
  },
  logoL:{
    justifyContent: "center",
    width: wp('32%'), height: wp('30%'),
  }, 
  buttonlogoAreaL:{
    position:'absolute',
    bottom:hp('3%'), left:0, right:0, justifyContent:"center", alignItems:"center"
  }
})

export default SignInScreen;