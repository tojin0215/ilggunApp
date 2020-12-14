import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity,Image,ImageBackground, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import axios from 'axios';
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
  },
  button2: {
    width: wp('40%'),
    height: wp('23%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  todobuttonImg:{
    width: wp('80%'),
    height: hp('7.2%')
  }
});


const WorkerHomeScreen = ({ navigation, route }) => {
  
  const [commute, setCommute] = useState([]);
  const [todo, setTodo] = useState([]);
  const [onlyOne, setOnlyOne] = useState(0);
  const [business, setBusiness] = useState([]);
  navigation.addListener('focus', () => {
    navigation.setOptions({
          headerTitle: route.params.bname,
    });
    setBusiness(route.params.bname);

    let isMounted = true;
    function f(){
      if(isMounted){
        fetchData(route.params.bname);    
      }
    }
    f();
    return() =>{
      isMounted = false;
    }
  },[]);
  
    //fetchData();
    /*function useAsync(asyncFn, onSuccess) {
      useEffect(() => {
        let isMounted = true;
        AsyncStorage.getItem("bangCode").then(data => {
          if (isMounted) {
            setBusiness(bangCode);
            navigation.setOptions({
              headerTitle: bangCode,
            });
            console.log(".................."+business);
          }
        });
        return () => { isMounted = false };
      }, []);
    }*/
      
  async function fetchData(bangCode) { 
    try {
        /*let res = await fetch('https://www.kwonsoryeong.tk:3000/selectBusinessByWorker', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //id : idid
          }),
        })*/
        await axios.post('https://www.kwonsoryeong.tk:3000/selectBusinessByWorker', {},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })//.then(res => res.json())
        .then(res => {
            let dic = JSON.parse(res.data[0].bang);
            //console.log(res.data[0].bang+" "+bangCode+ " " +dic[String(bangCode)]+"???");
            
            setCommute(dic[String(route.params.bname)]?'출근':'퇴근');
            commuteChangeImg(dic[String(route.params.bname)]?'출근':'퇴근',1);
            
            //setBusiness(bangCode);
            //console.log("..................//"+business);
        });
        /*.then((response) => response.json())
        .then((res) => {
            setBusiness(res);
        })*/
    } catch (e) {
        console.error(e);
      }
    }
    async function commuteData() { 
      let err;  
      try {
          console.log("되고있니?");
          await axios.post('https://www.kwonsoryeong.tk:3000/updateCommute', {bang : route.params.bname},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          
          /*
            let res = await fetch('https://www.kwonsoryeong.tk:3000/updateCommute', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bang : business
              }),*/
            }).then(res => err = res.status)
            //.then(res => {
                
            //});
            //.then((response) => response.json())
            .then((res) => {
                //setBusiness(res);
            })
        } catch (e) {
            console.log(err);
            console.error(e);
          }
          
        }

        
    //출근퇴근
    const commuteImg = require('../../img/workManagement_purple.png')
    const commuteImgChecked = require('../../img/workManagement_purple_clicked.png')
    const commuteI = {commuteImg, commuteImgChecked}
    const [commuteImgSelected, setCommuteImgSelected] = useState(commuteI.commuteImg)

    const commuteChangeImg =(com,init)=>{
      if(init){
        if(com == '출근'){
          setCommuteImgSelected(commuteI.commuteImgChecked)
        } else{
          setCommuteImgSelected(commuteI.commuteImg)
        }
      }else{
        if(com == '출근'){
          Alert.alert("출근 완료!");
          setCommuteImgSelected(commuteI.commuteImgChecked)
        } else{
          Alert.alert("퇴근 완료!\n 오늘도 고생많으셨어요.");
          setCommuteImgSelected(commuteI.commuteImg)
        }
      }
    }

    
  const [clicked, setClicked] = useState(-1);
   
    
  return (
    <ImageBackground style={styles.image} source={require('../../img/page2_1.png')}>
    <View style={styles.buttonArea1}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => { //출근/퇴근기록
            setCommute(commute=='출근'?'퇴근':'출근')
            commuteData();
            commuteChangeImg(commute=='출근'?'퇴근':'출근');
        }}>
          <Image style={styles.buttonImg} source={commuteImgSelected}/>
        {/* <Text style={styles.buttonTitle}>{commute}</Text> */}
      </TouchableOpacity>
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
            console.log(dt);
            navigation.navigate(('Vacation Request'),{date:dt})
            setTimeout(() => {setClicked(-1)},500);
          }}>
        <Image style={styles.buttonImg} source={clicked==0?require('../../img/vacation_clicked.png'):require('../../img/vacation.png')}></Image>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonArea2}>
      <TouchableOpacity 
       style={styles.button}
       onPress={() => {
         setClicked(0); 
         navigation.navigate('WCalculating')
         setTimeout(() => {setClicked(-1)},500);
      }}>
      <Image style={styles.buttonImg} source={clicked==0?require('../../img/calculate_purple_clicked.png'):require('../../img/calculate_purple.png')}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked(0);
          navigation.navigate('Worker Document')
          setTimeout(() => {setClicked(-1)},500);
          }}>
        <Image style={styles.buttonImg} source={clicked==0?require('../../img/document_clicked.png'):require('../../img/document.png')}></Image>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonArea2}>
      <TouchableOpacity 
       style={styles.button2}
       onPress={() => navigation.navigate('WorkTodo')}>
       <Image style={styles.todobuttonImg} source={clicked==0?require('../../img/todo.png'):require('../../img/todo.png')}/>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
 
export default WorkerHomeScreen;