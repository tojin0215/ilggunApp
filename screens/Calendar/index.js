import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});

const CalendarScreen = ({navigation, route}) => {
  
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  
  const onDateChange = (date) =>{
    //console.log(date);
    setSelectedStartDate(date);
    //navigation.navigate()
    let splitD = String(date).split(' ');
    let mon = {'Jan':1, 'Feb':2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7, 'Aug':8, 'Sept':9, 'Oct':10, 'Nov':11, 'Dec':12 }
    let D= splitD[0]+' '+mon[splitD[1]]+' '+splitD[2]+' '+splitD[3];
    navigation.navigate('Work Management',{selecteddate : String(D)});
  }
  
  useEffect(() => {

    setSelectedStartDate(null);
  }, [])

  return (
    <View style={styles.container}>
      
      <CalendarPicker
        onDateChange={onDateChange}
      />

    </View>
  );


}

/*
export default function CalendarScreen {




  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>
    );
  }
}

*/

export default CalendarScreen;