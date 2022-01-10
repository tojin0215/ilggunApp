import React, {useState} from 'react';
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import {
  ImageBackground,
  View,
  Text, Button, Image, TextInput, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import axios from 'axios';
import { Alert } from 'react-native';
//import * as GoogleSignIn from 'expo-google-sign-in'
//axios.create({baseURL:'',timeout:1000})
import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from "expo-crypto";

import styles from './styles';
import { postSignIn, postSignInByCode, postSignUpByCode } from '../../api/Api2';
import { putUserData } from '../../utils/storage';

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
      postSignIn(id, password)
      .then(user_data => {
        if (user_data === null) {Alert.alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")}
        else {
          putUserData(user_data);
          if (user_data.id) {
            onSignIn();
            navigation.navigate('Select Page');
          }
        }
      })
      .catch(e => {
        Alert.alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.");
        if (!error.response) {
          console.log(`SignInScreen::SignPost::${error}`)
        }
      })
    } catch (e) {
      console.error(e);
    } 
  }



  const initAsync = async () => {
    await GoogleSignIn.initAsync({});
  };

  const _syncUserWithStateAsync = async () => {
    
    const user = await GoogleSignIn.signInSilentlyAsync();
    try {
      postSignInByCode(user.uid)
      .then(user_data => {
        if (user_data !== null) {
          putUserData(user_data);
          if(user_data.id){
            onSignIn();
            navigation.navigate('Select Page');
          }
        }
        else {
          postSignUpByCode(user.email, user.email, user.displayName, user.uid, '', user.uid)
          .then(result => {
            if(result.data.err !== null){
              Alert.alert('다른 방식으로 동일한 이메일이 가입되어있습니다.')  
            }else{
              navigation.navigate('Sign Up Google',{email:user.email});
              Alert.alert('회원가입이 완료되었습니다. 서명을 등록해주세요.')    
            }
          })
        }
      })
      
      // const axios_config = { 
      //   code: user.uid,
      //   headers:{
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'}
      // }
      // await axios.post('http://13.124.141.28:3000/signinByCode', axios_config)
      // .then((responseData) => {
        
      //   if(responseData.data[0] == undefined || responseData.data[0] == ''){
      //     axios.post('http://13.124.141.28:3000/signupByCode', { 
      //       id: user.email,
      //       email:user.email,
      //       name: user.displayName,
      //       password: user.uid,
      //       sign: '',
      //       code: user.uid,
      //     },{
      //     headers:{
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json'
      //     }
      //     }).then((res)=>{
      //       if(res.data.err!=null){
      //         Alert.alert('다른 방식으로 동일한 이메일이 가입되어있습니다.')  
      //       }else{
      //         navigation.navigate('Sign Up Google',{email:user.email});
      //         Alert.alert('회원가입이 완료되었습니다. 서명을 등록해주세요.')    
      //       }
      //     }); 
          
      //   }else{
      //     storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
      //     getToken();
      
      //     if(responseData.data[0].id){
      //       onSignIn();
      //       navigation.navigate('Select Page');
      //     }
      //   }
      // })
      .catch(function(error) {
        console.log(`SignInScreen::_syncUserWithStateAsync::postSignInByCode::${error}`)
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
      // alert('login: type:' + type);
      // alert('login: user:' + user);


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
  // This should go in state
  const loginAvailable = AppleAuthentication.isAvailableAsync();

  setTimeout(() => {setIsReady(true)},1500);
  //setIsReady(true);
  initAsync();


  const handleOnPressAppleAuthentication = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(credential);
      try {
        postSignInByCode(credential.user)
        .then(user_data => {
          if (user_data !== null) {
            putUserData(user_data);
            if(user_data.id){
              onSignIn();
              navigation.navigate('Select Page');
            }
          }
          else {
            const c = credential;
            postSignUpByCode(c.email, '', c.fullName.givenName, c.user, '', c.user)
            if(res.data.err!=null){
                Alert.alert('다른 방식으로 동일한 이메일이 가입되어있습니다.')  
            }else{
              console.log('-------------------------------------------------');
              console.log('AppleLoginGo!!')
              Alert.alert('회원가입이 완료되었습니다. 이메일과 서명을 등록해주세요.')   
              navigation.navigate('Sign Up Apple',{id:credential.email}); 
            }
          }
        })
        // .then((responseData) => {
        //   if(responseData.data[0] == undefined || responseData.data[0] == ''){
        //     console.log('aaaa-------------------------------------------------');
        //     axios.post('http://13.124.141.28:3000/signupByCode', { 
        //         id:credential.email,
        //         email:'',
        //         name: credential.fullName.givenName,
        //         password: credential.user,
        //         sign: '',
        //         code: credential.user,
        //     },{
        //         headers:{
        //           'Content-Type': 'application/json',
        //           'Accept': 'application/json'
        //         }
        //     }).then((res)=>{
        //       if(res.data.err!=null){
        //           Alert.alert('다른 방식으로 동일한 이메일이 가입되어있습니다.')  
        //       }else{
        //         console.log('-------------------------------------------------');
        //         console.log('AppleLoginGo!!')
        //         Alert.alert('회원가입이 완료되었습니다. 이메일과 서명을 등록해주세요.')   
        //         navigation.navigate('Sign Up Apple',{id:credential.email}); 
                
        //       }
        //     });      

            
        //   }else{
        //     storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
        //     getToken();
        
        //     if(responseData.data[0].id){
        //       onSignIn();
        //       navigation.navigate('Select Page');
        //     }
        //   }
        // })
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
  }


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
            style={styles.button1}
            onPress={handleOnPressAppleAuthentication}
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

export default SignInScreen;