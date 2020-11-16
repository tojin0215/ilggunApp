import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    width: '100%',
    height: hp('5%'),
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#46cccd",
    width: "70%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
});
const WorkerHomeScreen = ({ navigation, props }) => {
    const [business, setBusiness] = useState([]);
    const [commute, setCommute] = useState([]);
  useEffect(()=>{ 
    AsyncStorage.getItem("bangCode")
      .then((bangCode) =>{
        navigation.setOptions({
          headerTitle: bangCode,
        });
        setBusiness(bangCode);
      });
      fetchData();
  },[business, setBusiness])
  
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
  return (
    <View style={styles.buttonArea}>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => { //출근/퇴근기록
            setCommute(commute=='출근'?'퇴근':'출근')
            commuteData();
        }}>
        <Text style={styles.buttonTitle}>{commute}</Text>
      </TouchableOpacity>
      <Text></Text><Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
            var week = ["Sun",'Mon','Tue',"Wed","Thu","Fri","Sat"]
            var day = new Date().getDay();
            var month = new Date().getMonth() + 1; //To get the Current Month
            var date = new Date().getDate(); //To get the Current Date
            var year = new Date().getFullYear(); //To get the Current Year
            let dt = week[day]+" "+ month+" " +date+" "+ year;
            console.log(dt);
            navigation.navigate(('Vacation Request'),{date:dt})
        }}>
        <Text style={styles.buttonTitle}>휴가 요청</Text>
      </TouchableOpacity>
      <Text></Text><Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Calculating')}>
        <Text style={styles.buttonTitle}>계산하기</Text>
      </TouchableOpacity>
      <Text></Text><Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Worker Document')}>
        <Text style={styles.buttonTitle}>문서함</Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default WorkerHomeScreen;