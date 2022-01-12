import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import {
  ImageBackground,
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import axios from "axios";
import { Alert } from "react-native";
//import * as GoogleSignIn from 'expo-google-sign-in'
//axios.create({baseURL:'',timeout:1000})
import * as GoogleSignIn from "expo-google-sign-in";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";

import styles from "./styles";
import { postSignIn, postSignInByCode, postSignUpByCode } from "../../api/Api2";
import { putUserData } from "../../utils/storage";

const SignInScreen = ({ onSignIn, navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isReady, setIsReady] = useState(false);

  const [is_apple_available, setIsAppleAvailable] = useState(false);

  useEffect(() => {
    GoogleSignIn.initAsync({});

    AppleAuthentication
    .isAvailableAsync()
    .then(result => setIsAppleAvailable(result))
  }, [])

  const SignPost = async (str) => {
    try {
      postSignIn(id, password)
        .then((user_data) => {
          if (user_data === null) {
            Alert.alert(
              "아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요."
            );
          } else {
            putUserData(user_data);
            if (user_data.id) {
              onSignIn();
              navigation.navigate("Select Page");
            }
          }
        })
        .catch((e) => {
          Alert.alert(
            "아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요."
          );
          if (!error.response) {
            console.log(`SignInScreen::SignPost::${error}`);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  const initAsync = async () => {
    await GoogleSignIn.initAsync({});
  };

  const _handleSignInByCode = (
    login_type, user_code, user_id, user_email, user_name, user_pw, user_sign,
    ) => {
    try {
      postSignInByCode(user_code)
        .then((user_data) => {
          if (user_data !== null) {
            putUserData(user_data);
            if (user_data.id) {
              onSignIn();
              navigation.navigate("Select Page");
            }
          } else {
            postSignUpByCode(
              user_id,
              user_email,
              user_name,
              user_pw,
              user_sign,
              user_code
            ).then((result) => {
              if (result.data.err !== null) {
                Alert.alert("다른 방식으로 동일한 이메일이 가입되어있습니다.");
              } else {
                if (login_type === "apple") {
                  Alert.alert(
                    "회원가입이 완료되었습니다. 이메일과 서명을 등록해주세요."
                  );
                  navigation.navigate("Sign Up Apple", { id: user_id });
                } else if (login_type === "google") {
                  navigation.navigate("Sign Up Google", { email: user.email });
                  Alert.alert("회원가입이 완료되었습니다. 서명을 등록해주세요.");
                } else {console.error("postSignInByCode::ERROR")}

              }
            });
          }
        })
        .catch(function (error) {
          console.log(
            `SignInScreen::_syncUserWithStateAsync::postSignInByCode::${error}`
          );
        });
    } catch (e) {
      Alert.alert(e);
    }
  };

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    try {
      postSignInByCode(user.uid)
        .then((user_data) => {
          if (user_data !== null) {
            putUserData(user_data);
            if (user_data.id) {
              onSignIn();
              navigation.navigate("Select Page");
            }
          } else {
            postSignUpByCode(
              user.email,
              user.email,
              user.displayName,
              user.uid,
              "",
              user.uid
            ).then((result) => {
              if (result.data.err !== null) {
                Alert.alert("다른 방식으로 동일한 이메일이 가입되어있습니다.");
              } else {
                navigation.navigate("Sign Up Google", { email: user.email });
                Alert.alert("회원가입이 완료되었습니다. 서명을 등록해주세요.");
              }
            });
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
        .catch(function (error) {
          console.log(
            `SignInScreen::_syncUserWithStateAsync::postSignInByCode::${error}`
          );
        });
    } catch (e) {
      Alert.alert(e);
    }
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
  };

  const handleOnPressGoogleSignIn = () => {
    try {
      const handleCatch = (e) => console.error(e);
      const convertUserToUserData = user => {return {user_code: user.uid, user_id: user.email, user_email: user.email, user_name: user.displayName, user_pw: user.uid, user_sign: "", }}
      const handleSignInSilentlyAsync = (user) => _handleSignInByCode(...convertUserToUserData(user), login_type="google")
      const handleSignInAsync = ({type}) => type === "success"? GoogleSignIn.signInSilentlyAsync().then(handleSignInSilentlyAsync).catch(handleCatch): null
      const handleAskForPlayServicesAsync = result => result? GoogleSignIn.signInAsync().then(handleSignInAsync).catch(handleCatch): null
      GoogleSignIn.askForPlayServicesAsync().then(handleAskForPlayServicesAsync).catch(handleCatch)
      // .then(result => {
      //   if (result) {
      //     GoogleSignIn.signInAsync()
      //     .then(({ type }) => {
      //       if (type === "success") {
      //         GoogleSignIn.signInSilentlyAsync()
      //         .then(user => {
      //           const user_data = {
      //             user_code: user.uid,
      //             user_id: user.email,
      //             user_email: user.email,
      //             user_name: user.displayName,
      //             user_pw: user.uid,
      //             user_sign: "",
      //           }
      //           _handleSignInByCode(...user_data, login_type="google")
      //         })
      //       }
      //     })
          // const { type, user } = await GoogleSignIn.signInAsync();
          // if (type === "success") {
          //   const user = await GoogleSignIn.signInSilentlyAsync();

          //   _syncUserWithStateAsync();
          // }
        // }
      // })
    } catch (e) {
      const {message} = e;
      alert("login: Error:" + message);
    }
  }

  setTimeout(() => {
    setIsReady(true);
  }, 1500);
  //setIsReady(true);
  // initAsync();

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
          .then((user_data) => {
            if (user_data !== null) {
              putUserData(user_data);
              if (user_data.id) {
                onSignIn();
                navigation.navigate("Select Page");
              }
            } else {
              const c = credential;
              postSignUpByCode(
                c.email,
                "",
                c.fullName.givenName,
                c.user,
                "",
                c.user
              );
              if (res.data.err != null) {
                Alert.alert("다른 방식으로 동일한 이메일이 가입되어있습니다.");
              } else {
                console.log(
                  "-------------------------------------------------"
                );
                console.log("AppleLoginGo!!");
                Alert.alert(
                  "회원가입이 완료되었습니다. 이메일과 서명을 등록해주세요."
                );
                navigation.navigate("Sign Up Apple", { id: credential.email });
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
          .catch(function (error) {
            Alert.alert("hh" + error);
          });
      } catch (e) {
        Alert.alert(e);
      }
      // signed in
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  const handleOnPressSignUp = () => {
    console.log("SignUp");
    navigation.navigate("Sign Up");
  };

  return (
    <>
      {isReady ? (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.titleArea}>
                <Image
                  style={styles.logo}
                  source={require("../../img/logo.png")}
                />
              </View>
              <View style={styles.formArea}>
                <View style={styles.textArea}>
                  <Image
                    style={styles.idImg}
                    source={require("../../img/id.png")}
                  />
                  <TextInput
                    onChangeText={(id) => setId(id)}
                    defaultValue={id}
                    style={styles.textForm}
                    placeholder={"아이디를 입력해주세요"}
                  />
                </View>
                <View style={styles.textArea}>
                  <Image
                    style={styles.pwdImg}
                    source={require("../../img/pwd.png")}
                  />
                  <TextInput
                    onChangeText={(password) => setPassword(password)}
                    defaultValue={password}
                    style={styles.textForm}
                    secureTextEntry={true}
                    placeholder={"비밀번호를 입력해주세요."}
                  />
                </View>
              </View>
              <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.button} onPress={SignPost}>
                  <Text style={styles.buttonLoginTitle}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={handleOnPressGoogleSignIn}>
                  <Image
                    style={styles.googleImg}
                    source={require("../../img/google_icon.png")}
                  />
                  <Text style={styles.buttonGoogleTitle}>구글 로그인</Text>
                </TouchableOpacity>
                {is_apple_available? null:null}
                {is_apple_available ? (
                  <>
                    <AppleAuthentication.AppleAuthenticationButton
                      buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                          .SIGN_IN
                      }
                      buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                      }
                      cornerRadius={5}
                      style={styles.button1}
                      onPress={handleOnPressAppleAuthentication}
                    />
                  </>
                ) : null}

                <TouchableOpacity
                  style={styles.button2}
                  onPress={handleOnPressSignUp}
                >
                  <Text
                    style={styles.buttonTitle}
                    onPress={handleOnPressSignUp}
                  >
                    회원가입
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonlogoArea}>
                <Image
                  style={styles.logobottom}
                  source={require("../../img/logo_bottom.png")}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </>
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/splash.png")}
        />
      )}
    </>
  );
};

export default SignInScreen;
