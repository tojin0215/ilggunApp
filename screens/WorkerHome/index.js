import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity,Image,ImageBackground } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

const WorkerHomeScreen = ({ navigation, props }) => {
  const [business, setBusiness] = useState([]);
  const [commute, setCommute] = useState([]);
  const [todo, setTodo] = useState([]);
    
  useEffect(()=>{ 
    AsyncStorage.getItem("bangCode")
      .then((bangCode) =>{
        navigation.setOptions({
          headerTitle: bangCode,
        });
        setBusiness(bangCode);
      });
      fetchData();
      
  },[business, setBusiness, todo, setTodo])
  
  async function fetchData() { 
    try {
        let res = await fetch('http://192.168.43.253:3000/selectBusinessByWorker', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //id : idid
          }),
        }).then(res => res.json())
        .then(res => {
            let dic = JSON.parse(res[0].bang);
            console.log(business+ " " +dic[String(business)]+"???");
            setCommute(dic[String(business)]?'출근':'퇴근');
        });
        /*.then((response) => response.json())
        .then((res) => {
            //setBusiness(res);
        })*/
    } catch (e) {
        console.error(e);
      }
    }
    async function commuteData() { 
        try {
            let res = await fetch('http://192.168.43.253:3000/updateCommute', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bang : business
              }),
            })//.then(res => res.json())
            //.then(res => {
                
            //});
            /*.then((response) => response.json())
            .then((res) => {
                //setBusiness(res);
            })*/
        } catch (e) {
            console.error(e);
          }
        }

        
    //출근퇴근
    const commuteImg = require('../../img/workManagement_purple.png')
    const commuteImgChecked = require('../../img/workManagement_purple_clicked.png')
    const commuteI = {commuteImg, commuteImgChecked}
    const [commuteImgSelected, setCommuteImgSelected] = useState(commuteI.commuteImg)

    const commuteChangeImg =(com)=>{
      if(com == '출근'){
        setCommuteImgSelected(commuteI.commuteImgChecked)
      } else{
        setCommuteImgSelected(commuteI.commuteImg)
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
        <Text style={styles.buttonTitle}>{commute}</Text>
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
        style={styles.button}
        onPress={() => navigation.navigate('WorkTodo')}>
        <Text style={styles.buttonTitle}>오늘 할 일</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
 
export default WorkerHomeScreen;