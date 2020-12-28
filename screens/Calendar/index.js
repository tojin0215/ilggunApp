import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View, ImageBackground
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// ----------------------바뀐부분A-------------------------------------
const styles = StyleSheet.create({
  container: {
    paddingRight:wp('10%'),
    paddingLeft:wp('10%'),
    paddingTop:hp('15%'),
    width: "100%", height: "100%",
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
  },
  image:{
    alignItems: 'center',
    width: "100%", height: "100%", 
    backgroundColor:'#67C8BA'
  },
});

const customDayHeaderStylesCallback = dayOfWeek => {
  if(dayOfWeek == 6){
    return {
      textStyle: {
        color: 'blue',
        fontSize:wp('5%'),
        fontFamily:"NanumSquare"
      }
    };
  } else if(dayOfWeek== 7){
    return {
      textStyle: {
        color: 'red',
        fontSize:wp('5%'),
        fontFamily:"NanumSquare"
      }
    };
  } else{
    return {
      
      style:{
        marginBottom:hp('0.5%'), marginTop:hp('0.5%'),
      },
      textStyle: {
      color: '#040525',
      fontSize:wp('5%'),
      fontFamily:"NanumSquare"
    }
  };

  }
}

const customDatesStylesCallback = date => {
  if(date.isoWeekday() == 6){
    return {
      textStyle: {
        color: 'blue',
        fontSize:wp('5%'),
        fontFamily:"NanumSquare"
      }
    };
  } else if(date.isoWeekday() == 7){
    return {
      textStyle: {
        color: 'red',
        fontSize:wp('5%'),
        fontFamily:"NanumSquare"
      }
    };
  } else{
    return {
    textStyle: {
      color: '#040525',
      fontSize:wp('5%'),
      fontFamily:"NanumSquare"
    }
  };

  }
}


const CalendarScreen = ({navigation, route}) => {
  
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  
  const onDateChange = (date) =>{
    setSelectedStartDate(date);
    let splitD = String(date).split(' ');
    let mon = {'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug':8, 'Sept':9, 'Oct':10, 'Nov':11, 'Dec':12 }
    let D= splitD[0]+' '+mon[splitD[1]]+' '+splitD[2]+' '+splitD[3];
    navigation.replace('Work Management',{selecteddate : String(D)});
  }
  useEffect(() => {

    setSelectedStartDate(null);
  }, [])

  return (
    <View style={styles.image}>
    <View style={styles.container}>

      <CalendarPicker
        onDateChange={onDateChange}
        
        previousTitle={'지난달'}
        nextTitle={'다음달'}
        months={['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']}
        weekdays={['일','월','화','수','목','금','토']}
        selectedDayColor={'#67C8BA'}
        todayBackgroundColor={'#67C8BA'}

        monthYearHeaderWrapperStyle={{marginBottom:hp('3%')}}
        previousTitleStyle={{marginBottom:hp('3%'), marginLeft:wp('3%'),fontSize:wp('6%'),fontFamily:"NanumSquare"}}
        nextTitleStyle={{marginBottom:hp('3%'), marginRight:wp('3%'),fontSize:wp('6%'),fontFamily:"NanumSquare"}}
        textStyle={{
          fontFamily:"NanumSquareB",
          color:'#040525',
          fontSize:wp('8%')
        }}

        customDayHeaderStyles={customDayHeaderStylesCallback}
        customDatesStyles={customDatesStylesCallback}
    /> 
    </View>
    </View>
  );


}

export default CalendarScreen;