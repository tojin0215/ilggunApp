import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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

  
//-----------------------------------바뀐부분B-----------------------
const [clicked, setClicked] = useState(-1);
const [clicked2, setClicked2] = useState(-1);
const [clicked3, setClicked3] = useState(-1);
const [clicked4, setClicked4] = useState(-1);
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

{/*  --------------------------------바뀐부분C----------------------- */}
        <Image style={styles.buttonImg} source={clicked==0? require('../../img/workManagement_clicked.png'): require('../../img/workManagement.png')}/>
{/*  --------------------------------바뀐부분C----------------------- */}
      </TouchableOpacity>
      
{/*  --------------------------------바뀐부분D----------------------- */}
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
{/*  --------------------------------바뀐부분D----------------------- */}
    </View>
    </View>
    </View>
  );
};
 
export default HomeScreen;