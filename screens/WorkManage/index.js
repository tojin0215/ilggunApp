import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create(
{
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    width: '100%',
    height: hp('5%'),
  },
  button: {
      backgroundColor: "#46c3ad",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
});

const WorkManageScreen = ({navigation, route}) => {
  const [date, setDate] = useState([]);
  React.useEffect(() => {
    console.log("나와줘..! "+route.params.selecteddate) 
    const unsubscribe =
       navigation.addListener('focus', () => {
        console.log("얼마나 반복되는지 보자,,,")
        AsyncStorage.getItem("bangCode")
        .then((bangCode) => {
          fetchData(bangCode, route.params.selecteddate)
        })
    });
  return unsubscribe;
}, [navigation, route.params.selecteddate, this.fetchData]);
//===================================================
  const [business, setBusiness] = useState([]);
  const [timelog, setTimelog] = useState({});
  async function fetchData(bangCode, date) { 
      try {
          let d = String(date).split(' ');
          console.log(d);
          await fetch('http://192.168.43.253:3000/selectWorkerAsDay', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              business: bangCode,
              year : d[3]*1,
              month: d[1]*1,
              date: d[2]*1,
              day: d[0],
            }),
          }).then(res => res.json())
          .then(res => 
            {
              console.log(res);
              setBusiness(res);
              fetch('http://192.168.43.253:3000/selectTimelog', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  bang: bangCode,
                  year : d[3]*1,
                  month: d[1]*1,
                  date: d[2]*1,
                  day: d[0],
                }),
              }).then(res => res.json())
              .then(res => 
                {
                  let dic={}
                  for(let i=0 ; i<res.length ; i++){
                    dic[res[i].workername] = (res[i].goto==null?'-':res[i].goto)+(res[i].leave==null?'-':res[i].leave);
                  }
                  setTimelog(dic);
                  
                });
            });

          
        }catch (e) {
          console.error(e);
        }

  }
  
  navigation.addListener('focus', () => {
    console.log("얼마나 반복되는지 보자,,,")
  });

  //==============================================

  /*React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDate(route.params.selecteddate);
    });
    return unsubscribe;
  }, [navigation]);*/
  console.log(route.params.selecteddate);
  return (
    <View style={styles.container}>
      <Button
        title="Calendar"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Text></Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold'  }}>{route.params.selecteddate.split(' ')[3]} {route.params.selecteddate.split(' ')[1]} {route.params.selecteddate.split(' ')[2]}({route.params.selecteddate.split(' ')[0]})</Text>
      <Text></Text><Text></Text>
      {
          String(route.params.selecteddate).split(' ')[0]==="Mon"?
            business.map((b, id) => (
              <Text key={id}>{b.workername} {b.time!==null?b.time:b.mon} {timelog[b.workername]==null?'- -':timelog[b.workername]}</Text>
            )):(String(route.params.selecteddate).split(' ')[0]==="Tue")?
            business.map((b, id) => (              
              <Text key={id}>{b.workername} {b.time!=null?b.time:b.tue} {timelog[b.workername]==null?'- -':timelog[b.workername]}</Text>
            )):(String(route.params.selecteddate).split(' ')[0]==="Wed")?
            business.map((b, id) => ( 
              <Text key={id}>{b.workername} {b.time!=null?b.time:b.wed} {timelog[b.workername]==null?'- -':timelog[b.workername]}</Text>
            )):(String(route.params.selecteddate).split(' ')[0]==="Thu")?
            business.map((b, id) => (
              <Text key={id}>{b.workername} {b.time!=null?b.time:b.thu} {timelog[b.workername]==null?'- -':timelog[b.workername]}</Text>
            )):(String(route.params.selecteddate).split(' ')[0]==="Fri")?
            business.map((b, id) => (
              <Text key={id}>{b.workername} {b.time!=null?b.time:b.fri} {timelog[b.workername]==null?'- -':timelog[b.workername]}</Text>
            )):(String(route.params.selecteddate).split(' ')[0]==="Sat")?
            business.map((b, id) => (
              <Text key={id}>{b.workername} {b.time!=null?b.time:b.sat} {timelog[b.workername]==null?'- -':timelog[b.workername]}</Text>
            )):(String(route.params.selecteddate).split(' ')[0]==="Sun")?
            business.map((b, id) => (
              <Text key={id}>{b.workername} {b.time!=null?b.time:b.sun} {timelog[b.workername]==null?'- -':timelog[b.workername]}</Text>              
            )):business.map((b, id) => (
              <Text key={id}>{b.workername}</Text>
            ))
        }
        <Text></Text>
        <Text></Text><Text></Text>
        <View style={styles.buttonArea}>
        <Button
        title="근로자 시간 변경"
        onPress={() => navigation.navigate('alter worker',{date : route.params.selecteddate})}
      /></View>
    </View>
  );
};
export default WorkManageScreen;