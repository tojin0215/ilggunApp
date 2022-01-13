import React, {useState} from 'react';
import { AsyncStorage } from 'react-native';
import {
  View,
  Text, Image, TextInput, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import axios from 'axios';
import { Alert } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';

import AuthGoogleComponent from "./component.google.login";
import AuthAppleComponent from "./component.apple.login";

import styles from './styles';

const SERVER_URL = 'https://일꾼.kr/api';


const SignInScreen = ({ onSignIn, navigation }) => {
  const [user_input_id, setUserInputId] = useState('');
  const [user_input_pw, setUserInputPw] = useState('');
  const [is_ready, setIsReady] = useState(false);


  const _getSignIn = async() => {
    await axios.post(`${SERVER_URL}/signin`, {
      id: user_input_id,
      password: user_input_pw, 
    })
    .then(res => {
      if(!res || res.data[0] == undefined || res.data[0] == ''){
        Alert.alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")
      } else {
        
        const user_data = {
          id: res.data[0].id,
          name: res.data[0].name
        };

        AsyncStorage.setItem("userData", JSON.stringify(user_data));
    
        if(res.data[0].id){
          onSignIn();
          navigation.navigate('Select Page');
        }
      }
    })
    .catch(error => {
      Alert.alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.");
      if (!error.response) {
        console.log('network Error'+error)
      }
    })
  }

  const initAsync = async () => {
    console.log('SignInScreen::initAsync')
    await GoogleSignIn.initAsync({});
    setIsReady(true)
  };

  initAsync();
  setTimeout(() => {setIsReady(true)},1500);

  return (
    <>
    {!is_ready?
    <Image style={styles.image} source={require('../../assets/splash.png') }/>
    :
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
                onChangeText={input_id => setUserInputId(input_id)}
                defaultValue={user_input_id}
                style={styles.textForm} 
                placeholder={"아이디를 입력해주세요"}/>
            </View>
            <View style={styles.textArea}>
              <Image style={styles.pwdImg} source={require('../../img/pwd.png')}/>
              <TextInput 
                onChangeText={input_pw => setUserInputPw(input_pw)}
                defaultValue={user_input_pw}
                style={styles.textForm} 
                secureTextEntry={true}
                placeholder={"비밀번호를 입력해주세요."}/>
            </View>
          </View>

          <View style={styles.buttonArea}>
            <TouchableOpacity 
              style={styles.button}
              onPress={_getSignIn}>
              <Text style={styles.buttonLoginTitle}>로그인</Text>
            </TouchableOpacity>
            <AuthGoogleComponent onSignIn={onSignIn} navigation={navigation} />
            <AuthAppleComponent onSignIn={onSignIn} navigation={navigation} />
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
    }

    </>
  )
}

export default SignInScreen;