import React from "react";
import { AsyncStorage } from "react-native";
import { Text, Image, TouchableOpacity, Alert } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import axios from "axios";

import styles from "./styles";

const SERVER_URL = "https://일꾼.kr/api";

export default class AuthGoogleComponent extends React.Component {
  state = { user: null };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    console.log('AuthGoogleComponent::componentDidMount');
    this.initAsync();
  }

  initAsync = async () => {
    console.log('AuthGoogleComponent::initAsync');
    await GoogleSignIn.initAsync({});

    console.log('AuthGoogleComponent::_syncUserWithStateAsync');
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    console.log('AuthGoogleComponent::signInSilentlyAsync');
    const user = await GoogleSignIn.signInSilentlyAsync();
    
    console.log('AuthGoogleComponent::_getSignInByCode');
    await this._getSignInByCode(user);
  };

  signInAsync = async () => {
    console.log('AuthGoogleComponent::signInAsync');
    try {

      console.log('AuthGoogleComponent::askForPlayServicesAsync');
      await GoogleSignIn.askForPlayServicesAsync();
      
      console.log('AuthGoogleComponent::signInAsync');
      const { type, user } = await GoogleSignIn.signInAsync();


      if (type === "success") {
        console.log('AuthGoogleComponent::_syncUserWithStateAsync');
        this._syncUserWithStateAsync();
      } else {
        console.log(`AuthGoogleComponent::signInAsync::type !== "success"::${type}`);
        console.log(`AuthGoogleComponent::signInAsync::type !== "success"::${user}`);
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
      alert(message);
    }
  };

  onPress = () => {
    this.signInAsync();
  };

  _getSignInByCode = async (user) => {
    await axios
      .post(`${SERVER_URL}/signinByCode`, { code: user.uid }, AXIOS_CONFIG)
      .then((res) => {
        console.log(`AuthGoogleComponent::_getSignInByCode::${res}`);
        if (!res || res.data[0] === undefined || res.data[0] === "") {
          console.log(`AuthGoogleComponent::_getSignInByCode::${res}`);
          this._postSignUpByCode(user);

        } else {
          const user_data = {
            id: res.data[0].id,
            name: res.data[0].name,
          };
          console.log(`AuthGoogleComponent::_getSignInByCode::user_data::${user_data}`);
          AsyncStorage.setItem("userData", JSON.stringify(user_data));

          if (user_data.id) {
            console.log(`AuthGoogleComponent::_getSignInByCode::onSignIn`);
            this.props.onSignIn();
            console.log(`AuthGoogleComponent::_getSignInByCode::navigate`);
            this.props.navigation.navigate("Select Page");
          }
        }
      })
      .catch(error => {
        console.log(`AuthGoogleComponent::_getSignInByCode::error::${error}`);
      });
  };

  _postSignUpByCode = async (user) => {
    await axios
      .post(
        `${SERVER_URL}/signupByCode`,
        {
          id: user.email,
          email: user.email,
          name: user.displayName,
          password: user.uid,
          sign: "",
          code: user.uid,
        },
        AXIOS_CONFIG
      )
      .then((res) => {
        if (res.data.err != null) {
          Alert.alert("다른 방식으로 동일한 이메일이 가입되어있습니다.");
        } else {
          this.props.navigation.navigate("Sign Up Google", { email: user.email });
          Alert.alert("회원가입이 완료되었습니다. 서명을 등록해주세요.");
        }
      });
  };

  render() {
    return (
      <TouchableOpacity style={styles.button1} onPress={this.onPress}>
        <Image
          style={styles.googleImg}
          source={require("../../img/google_icon.png")}
        />
        <Text style={styles.buttonGoogleTitle}>구글 로그인</Text>
      </TouchableOpacity>
    );
  }
}
