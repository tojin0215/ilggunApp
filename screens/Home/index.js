import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

//========================바뀐부분 스타일====================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    justifyContent:"flex-start",
    alignItems: 'center',
    width: "100%", height: "100%",
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
  button: {
    width: wp('40%'),
    height: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImg:{
    width: wp('40%'),
    height: wp('40%'),
    
  }
});



const HomeScreen = ({ navigation, props }) => {
  useEffect(()=>{ 
    AsyncStorage.getItem("bangCode")
      .then((bangCode) =>{
        navigation.setOptions({
          headerTitle: bangCode,
        });
      });
    
  },[])

  
//-----------------------------------바뀐부분B-----------------------
const [clicked, setClicked] = useState(-1);

  // //근무관리
  // const workManageImg = require('../../img/workManagement.png')
  // const workManageImgChecked = require('../../img/workManagement_clicked.png')
  // const workManageI = {workManageImg, workManageImgChecked}
  // const [workManageImgSelected, setworkManageSelected] = useState(workManageI.workManageImg)
  
  // const workManagechangeImg =()=>{
  //   setworkManageSelected(workManageI.workManageImgChecked)
  //   setworkerManageSelected(workerManageI.workerManageImg)
  //   setcalculatingSelected(calculatingI.calculatingImg)
  //   setstatementSelected(statementI.statementImg)
  // }

  // //근로자관리
  // const workerManageImg = require('../../img/workerManagement.png')
  // const workerManageImgChecked = require('../../img/workerManagement_clicked.png')
  // const workerManageI = {workerManageImg, workerManageImgChecked}
  // const [workerManageImgSelected, setworkerManageSelected] = useState(workerManageI.workerManageImg)
  
  // const workerManagechangeImg =()=>{
  //   setworkManageSelected(workManageI.workManageImg)
  //   setworkerManageSelected(workerManageI.workerManageImgChecked)
  //   setcalculatingSelected(calculatingI.calculatingImg)
  //   setstatementSelected(statementI.statementImg)
  // }
  
  // //계산하기
  // const calculatingImg = require('../../img/calculating.png')
  // const calculatingImgChecked = require('../../img/calculating_clicked.png')
  // const calculatingI = {calculatingImg, calculatingImgChecked}
  // const [calculatingImgSelected, setcalculatingSelected] = useState(calculatingI.calculatingImg)
  
  // const calculatingchangeImg =()=>{
  //   setworkManageSelected(workManageI.workManageImg)
  //   setworkerManageSelected(workerManageI.workerManageImg)
  //   setcalculatingSelected(calculatingI.calculatingImgChecked)
  //   setstatementSelected(statementI.statementImg)
  // }

  // //명세서조회
  // const statementImg = require('../../img/statement.png')
  // const statementImgChecked = require('../../img/statement_clicked.png')
  // const statementI = {statementImg, statementImgChecked}
  // const [statementgImgSelected, setstatementSelected] = useState(statementI.statementImg)
  
  // const statementchangeImg =()=>{
  //   setworkManageSelected(workManageI.workManageImg)
  //   setworkerManageSelected(workerManageI.workerManageImg)
  //   setcalculatingSelected(calculatingI.calculatingImg)
  //   setstatementSelected(statementI.statementImgChecked)
  // }

//-----------------------------------바뀐부분B-----------------------


  return (
    <ImageBackground style={styles.image} source={require('../../img/page1_1.png')}>
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
          setClicked(-1);
        }}>

{/*  --------------------------------바뀐부분C----------------------- */}
        <Image style={styles.buttonImg} source={clicked==0? require('../../img/workManagement_clicked.png'): require('../../img/workManagement.png')}/>
{/*  --------------------------------바뀐부분C----------------------- */}
      </TouchableOpacity>
      
{/*  --------------------------------바뀐부분D----------------------- */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked(0);
          navigation.navigate('Worker Management');
          setClicked(-1); }}>
        <Image style={styles.buttonImg} source={clicked==0? require('../../img/workerManagement_clicked.png'): require('../../img/workerManagement.png')}/>
      </TouchableOpacity>
    </View>

    <View style={styles.buttonArea2}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked(0);
          navigation.navigate('Calculating'); 
          setClicked(-1);}}>
        <Image style={styles.buttonImg} source={clicked==0? require('../../img/calculating_clicked.png'): require('../../img/calculating.png')}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked(0);
          navigation.navigate('Statement');
          setClicked(-1);}}>
        <Image style={styles.buttonImg} source={clicked==0? require('../../img/statement_clicked.png'): require('../../img/statement.png')}/>
      </TouchableOpacity>
{/*  --------------------------------바뀐부분D----------------------- */}
    </View>
    </ImageBackground>
  );
};
 
export default HomeScreen;