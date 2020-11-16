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
    backgroundColor: "#46c3ad",
    width: "70%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
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
  
  return (
    <View style={styles.buttonArea}>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          var week = ["Sun",'Mon','Tue',"Wed","Thu","Fri","Sat"]
          var day = new Date().getDay();
          var month = new Date().getMonth() + 1; //To get the Current Month
          var date = new Date().getDate(); //To get the Current Date
          var year = new Date().getFullYear(); //To get the Current Year
          let dt = week[day]+" "+ month+" " +date+" "+ year;
          navigation.navigate('Work Management',{selecteddate:dt}); //today
        }}>
        <Text style={styles.buttonTitle}>근무 관리</Text>
      </TouchableOpacity>
      <Text></Text><Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Worker Management')}>
        <Text style={styles.buttonTitle}>근로자 관리</Text>
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
        onPress={() => navigation.navigate('Statement')}>
        <Text style={styles.buttonTitle}>명세서 조회</Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default HomeScreen;