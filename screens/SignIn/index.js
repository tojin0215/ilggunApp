import React, {useState} from 'react';
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import {
  ImageBackground,
  View,
  Text, Button, Image, TextInput, 
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { AppLoading, Asset } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Expo from "expo"
import * as Font from 'expo-font'
import * as Network from 'expo-network';
import axios from 'axios';
import { Alert } from 'react-native';

//axios.create({baseURL:'',timeout:1000})

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

  const googleLogin = async() => {
    Alert.alert("준비 중입니다. 조금만 기다려주세요.")
    /*try {
      await Google.logInAsync({
        androidClientId: "215538713502-hrpk6s7lontr7l1vvlb39rgdqe0f41k1.apps.googleusercontent.com",
        iosClientId: "215538713502-tdra6mancl9oukjevu4mhmc0441in4vu.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      }).then((result)=>{
        if (result.type === "success") {
          console.log(result)
          setSignedIn(true);
          setName(result.user.name);
          setPhotoUrl(result.user.photoUrl)
          setId(result.user.email); setPassword(result.user.id)
          fetch('https://www.toojin.tk:3000/signup', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:result.user.email,
            name:result.user.name,
            password: result.user.id,
            sign:''
          }),
        }).then(async(res)=> {
          fetch('https://www.toojin.tk:3000/signin', {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: result.user.email,
              password: result.user.id,
            }),
          }).then((response) => 
            response.json()
          )
          .then((responseData) => {
            console.log("-----------------------------------");
            console.log(responseData);
            storeToken(responseData[0].id);
            
            getToken();

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
        });
        
        } else {
          console.log("cancelled")
        }
    })
    } catch (e) {
      console.log("error", e)
    }*/
  }
  const SignPost = async(str) => {
    /*try {
      await Network.getIpAddressAsync().then((ip)=>{console.log(ip)})
      // now use the ipAddress
     } catch (error) {
       console.log("???"+error)
     }*/
    try {
      let err ;
      await axios.post('https://www.toojin.tk:3000/signin', { id: id,
        password: password, headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
        /*a.then(res => {
          console.log(res);
          console.log(res.data);
        })
        console.log("???")
      let res = await fetch('https://www.toojin.tk:3000/signin', {
        credentials: 'include',
        method: 'POST',
        
        headers: {
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
        }),})
      .then((response) => 
        response.json()
      )*/
      .then((responseData) => {
        err=responseData.data.status;
        //console.log(responseData.data[0]);
        if(responseData.data[0] == undefined){
          Alert.alert("아이디 혹은 비밀번호 정보가 잘못되었습니다. 한번 더 확인해주세요.")
        }else{
          console.log("여기!!")
          console.log(responseData.data[0]);
          storeToken({id:responseData.data[0].id, name:responseData.data[0].name});
          getToken();

          // save token
          //AsyncStorage.setItem("TOKEN", token);

          // get token
          //AsyncStorage.getItem("TOKEN").then(token => {
              // token value could be used
          //});
      
          if(responseData.data[0].id){
            onSignIn();
            navigation.navigate('Select Page');
          }
          else{

          }
        }
      })
      .catch(function(error) {
        console.log("에러")

        console.log(err);
        if (!error.response) {
          // network error
          console.log('hh'+error)
        } else {
          // http status code
          const code = error.response.status
          // response data
          const response = error.response.data
          console.log(code)
          console.log(response)
        }
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
  /*const fetchFonts = () => {
    return Font.loadAsync({
    'NanumSquare': require("../../assets/fonts/NanumSquare_acR.ttf"),
    'NanumSquareB': require("../../assets/fonts/NanumSquare_acB.ttf")
    });
  }
  const [dataLoaded, setDataLoaded] = useState(false);
  if(!dataLoaded){
      return(
        <AppLoading
          startAsync={fetchFonts}
          onFinish={()=>setDataLoaded(true)}
        />
      )
    }*/

    setTimeout(() => {setIsReady(true)},3000);
    console.ignoredYellowBox = [
      'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
    ];
  return (
      <View>
        {isReady?
        <>
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
            onPress={googleLogin}>
            <Image style={styles.googleImg} source={require('../../img/google_icon.png')}/>
            <Text style={styles.buttonGoogleTitle}>구글 로그인</Text></TouchableOpacity>
         
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
      </>
    :
      <View style={styles.containerL}>
        <View style={styles.titleAreaL}>
          <Image style={styles.logoL} source={require('../../img/mainlogo.png')}/>
        </View>
        <View style={styles.textAreaL}>
          <Text style={styles.text1L}>반갑습니다.</Text>
          <Text style={styles.text2L}>오늘도 일꾼과 함께 화이팅해요.</Text>
        </View>
        <View style={styles.buttonlogoAreaL}>
          <Image style={styles.logobottom} source={require('../../img/mainlogowhite.png') }/> 
        </View>
      </View>
  }
     </View>
  //</ImageBackground>

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