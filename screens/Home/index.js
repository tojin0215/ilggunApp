import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  container: {
    width: "100%", height: "100%",
    alignItems: 'center',
    justifyContent:"flex-start",   
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
  },
  image:{
    width: "100%", height: "100%",
    backgroundColor:'#67C8BA'
  },
  buttonArea1: {
    flexDirection:"row",
    alignItems: 'center',
    marginTop:hp('10%')
  },
  buttonArea2: {
    flexDirection:"row",
    alignItems: 'center',
    marginTop:hp('1%')
  },
  buttonArea3: {
    flexDirection:"column",
    alignItems: 'flex-end',
    justifyContent: 'flex-end', marginTop:hp('13%'),marginLeft:hp('30%')
  },
  button: {
    width: wp('40%'),
    height: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImg:{
    width: wp('40%'),
    height: wp('40%'),
    
  },
  tinyLogo: {
    width: wp('11%'),
    height:  wp('11%'),
    marginLeft:wp('4%')
  },
  rowArea:{
    flexDirection:'row',
    marginRight:wp('5%')
  },
  titleText:{
    color:'white',
    fontSize:18,
    fontFamily:"NanumSquare",
    marginTop:hp('1.7%')
  },
  settingButton: {
    backgroundColor: "#67C8BA",
    width:wp('20%'), height: hp('5.9%'),
    justifyContent: 'center', alignItems:"center",
    borderRadius:wp('1.7%'),
    marginLeft:wp('2%'),
  },
  settingButtonTitle: {
    color: 'white',
    fontFamily:"NanumSquare",
    fontSize: wp('4.8%'),
  }, 
  button2: {
    marginTop:hp('2%'),
    width: wp('40%'),
    height: wp('11%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addbuttonImg:{
    width: wp('80%'),
    height: hp('7.2%')
  },
});



const HomeScreen = ({ navigation, props }) => {
  useEffect(()=>{ 
    AsyncStorage.getItem("bangCode")
      .then((bangCode) =>{
        navigation.setOptions({
          //headerTitle: bangCode,
          headerLeft: () => (
            <View style={styles.rowArea}>
              <Image
                style={styles.tinyLogo}
                source={
                  require('../../img/logo.png')
                }
              />
              <Text style={styles.titleText}>{bangCode}</Text>
            </View>
          ),
        });
      });
    
  },[])


const [show1,setShow1] = useState(null);
const [show2,setShow2] = useState(null);
const [clicked, setClicked] = useState(-1);
const [clicked2, setClicked2] = useState(-1);
const [clicked3, setClicked3] = useState(-1);
const [clicked4, setClicked4] = useState(-1);

const _handlePressButtonAsync1 = async () => {
  let show1 = await WebBrowser.openBrowserAsync('http://13.124.141.28:9090/');
  setShow1(show1);
};


const _handlePressButtonAsync2 = async () => {
  let show2 = await WebBrowser.openBrowserAsync('https://www.naver.com');
  setShow2(show2);
};

  return (
    <View style={styles.image}>
    <View style={styles.container}>
      <View style={styles.buttonArea1}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked(0);
          var week = ["Sun",'Mon','Tue',"Wed","Thu","Fri","Sat"]
          var day = new Date().getDay();
          var month = new Date().getMonth() + 1; //To get the Current Month
          var date = new Date().getDate(); //To get the Current Date
          var year = new Date().getFullYear(); //To get the Current Year
          let dt = week[day]+" "+ month+" " +date+" "+ year;
          navigation.navigate('Work Management',{selecteddate:dt}); //today
          setTimeout(() => {setClicked(-1)},500);
        }}>

        <Image style={styles.buttonImg} source={clicked==0? require('../../img/workManagement_clicked.png'): require('../../img/workManagement.png')}/>

      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked2(0);
          navigation.navigate('Worker Management');
          setTimeout(() => {setClicked2(-1)},500); }}>
        <Image style={styles.buttonImg} source={clicked2==0? require('../../img/workerManagement_clicked.png'): require('../../img/workerManagement.png')}/>
      </TouchableOpacity>
    </View>

    <View style={styles.buttonArea2}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked3(0);
          navigation.navigate('Calculating'); 
          setTimeout(() => {setClicked3(-1)},500);}}>
        <Image style={styles.buttonImg} source={clicked3==0? require('../../img/calculating_clicked.png'): require('../../img/calculating.png')}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked4(0);
          navigation.navigate('Statement');
          setTimeout(() => {setClicked4(-1)},500);}}>
        <Image style={styles.buttonImg} source={clicked4==0? require('../../img/statement_clicked.png'): require('../../img/statement.png')}/>
      </TouchableOpacity>
      </View>

      <TouchableOpacity 
       style={styles.button2}
       onPress={_handlePressButtonAsync1}>
       <Image style={styles.addbuttonImg} source={require('../../img/addBtn1.png')}/>
      </TouchableOpacity>

      <TouchableOpacity 
       style={styles.button2}
       onPress={_handlePressButtonAsync2}>
       <Image style={styles.addbuttonImg} source={require('../../img/addBtn2.png')}/>
      </TouchableOpacity>     

      <View style={styles.buttonArea3}>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={()=> {
            navigation.navigate('Modify Business'); 
          }}>
          <Text style={styles.settingButtonTitle}>정보 수정</Text>
        </TouchableOpacity>
      </View>
    
    </View>
    </View>
  );
};
 
export default HomeScreen;