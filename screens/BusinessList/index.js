import React, { useEffect, useState} from 'react';
import { AsyncStorage } from 'react-native';
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    image:{
      
      justifyContent: "flex-start",
      alignItems:"center",
      width: "100%", height: "100%",
    },
    text: {
      fontSize: wp('15%'),
      textAlign: 'center',
      color: 'white',
      fontFamily:"NanumSquare",
    },
    buttonArea: {
      marginTop:hp('7%'),
      width: '100%',
      height: hp('6%'),
      alignItems: 'center',
    },
    buttonTitle: {
        color: '#040525',
        fontSize:wp('5%'),
        fontFamily:"NanumSquare",
    },
    addbutton: {
      backgroundColor: '#67C8BA',
      position:"absolute",
      alignItems:"center",
      bottom: hp('2%'),
      width: "100%",
      width: wp('15%'),
      height: wp('15%'),
      marginBottom: hp('5%'),
      borderRadius: wp('15%'),
      
    ...Platform.select({
        ios: {
            shadowColor: 'rgba(0,0,0,0.2)',
            shadowOpacity: 1,
            shadowOffset: {height: 2, width: 2},
            shadowRadius: 2,
        },

        android: {
            elevation: 0,
            marginHorizontal:  hp('5%'),
        },
      })
  },

}); 

const BusinessListScreen = ({navigation}) => {
  const [business, setBusiness] = useState([]);
  const [clicked, setClicked] = useState(-1);
  const [id, setId] = useState('');
  
  AsyncStorage.getItem("userData").then((userData) =>{
    setId(JSON.parse(userData));
  });

  React.useEffect(() => {
    console.log("안녕");
          fetchData();
  },[]);
  /*const [password, setPassword] = useState('');
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
  }*/


    ///setId('dd');
    async function fetchData() { 
        try {
          await axios.post('https://www.kwonsoryeong.tk:3000/selectBusiness', {},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
            /*let res = await fetch('https://www.kwonsoryeong.tk:3000/selectBusiness', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                //id : idid
              }),
            }).then(res => res.json())*/
            .then(res => {
              setBusiness(res.data)
              console.log("여기용222");
            });
        } catch (e) {
            console.error(e);
          }
    }
    

    //React.useEffect(() => {
    /*  AsyncStorage.getItem("userData")
      .then((userData) => {
        console.log(JSON.parse(userData))
        fetchData(JSON.parse(userData))
      })*/
      
      /*const unsubscribe =*/ 
      /*navigation.addListener('focus', () => {
          
          console.log("여기용");
      });*/

      //return unsubscribe;
    //});
    /*const fetchFonts = () => {
      return Font.loadAsync({
      'NanumSquare': require("../../assets/fonts/NanumSquare_acR.ttf")
      });
    };
    
    const [dataLoaded, setDataLoaded] = useState(false);
    if(!dataLoaded){
      return(
        <AppLoading
          startAsync={fetchFonts}
          onFinish={()=>setDataLoaded(true)}
        />
      )
    }*/
    
    return (
      <View >
      <ImageBackground style={styles.image} source={require('../../img/page1_1.png')}>

        {
          <View style={styles.buttonArea}>{
            business.map((b, id) => (
              <>
                <TouchableOpacity 
                  key = {id}
                  style={{
                    backgroundColor: clicked==id?"#67C8BA":"#E2F2EF",
                    width: "75%",
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:wp('5%'),
                    marginTop:hp('2.5%')
                  }}
                  onPress={() => {
                    setClicked(id)
                    AsyncStorage.setItem("bangCode", b.bname)
                    .then(() =>{
                      setClicked(-1)
                      navigation.navigate('Home')
                    })
                  }}>
                  <Text style={styles.buttonTitle}>{b.bname}</Text>
                </TouchableOpacity>
                
              </>
            ))}
            </View>

        }
        <TouchableOpacity style={styles.addbutton} onPress={() => navigation.navigate('Add Business')}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </ImageBackground>
      </View>

    );
};
export default BusinessListScreen;