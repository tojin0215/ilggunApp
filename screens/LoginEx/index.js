import React, {Component} from 'react';
import { View, Text, Platform, Image, ScrollView, WebView , Button} from 'react-native'

import { StackActions, NavigationActions } from 'react-navigation';

export default class LoginExScreen extends Component{
    static navigationOptions = {
      title: 'login',
    };

  naverLogin = async() => {
    const uri = await this.props.getNaverUri();
    this.props.navigation.push('WebLogin',{
      uri : uri,
      login:this.insertLogin,
      loginFail:this.loginFail,
    })
  }

  insertLogin = () => {
    console.log("SettingScreen insertLogin")
  }

  loginFail = () => {
    console.log("SettingScreen loginFail")
    this.props.navigation.goBack();
    alert("로그인에 실패하였습니다. 잠시 후 다시 시도해주세요.");
  }
  

    render() {
        return (
            <View>
                <Button title={"Facebook Login"} onPress={this.facebookLogin}/>
                <Button title={"Naver Login"} onPress={this.naverLogin}/>
            </View>
          );
      }
}
