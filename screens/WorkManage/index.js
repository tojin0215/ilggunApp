import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image} from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Row } from 'react-native-table-component';
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      alignItems: 'center',
      width: "100%", height: "100%", 
    },
    buttonArea: {
      position:"absolute",
      alignItems:"center",
      bottom: hp('5%'),
      width: '100%', height: hp('6%'),
    },
    button: {
        backgroundColor: "#67C8BA",
        width:wp('80%'), height: hp('6%'),
        justifyContent: 'center', alignItems:"center",
        borderRadius:wp('3%'),
        marginTop:hp('2%'),
    },
    buttonTitle: {
        color: 'white',
        fontFamily:"NanumSquare",
        fontSize:wp('4.8%'),
    },
    calenderArea:{
      backgroundColor:'white',
      flexDirection:'row',
      width:wp('80%'), height:hp('10%'),
      marginTop:wp('5%'),
      borderRadius:wp('5%'),
      paddingLeft:wp('2%'),
      paddingTop:wp('1%'), marginBottom:hp('4%')
    },
    touchArea:{
      flexDirection:'row',
      width:wp('75%'),height:hp('8%'),
      paddingLeft:wp('2%'),
      paddingTop:wp('1%'), 
      alignItems:"center",justifyContent:"center"
    },
    calenderImg:{
      position:"absolute",left:wp('3.9%'),top:hp('1.5%'),
      width:wp('10%'),height:wp('10%'),
    },
    calenderTitle:{
      justifyContent:"center",alignItems:"center",
      marginTop:hp('0.5%'),
      fontFamily:"NanumSquareB",
      fontSize:wp('5.5%'),
    },
    rightImg:{
      //justifyContent: 'center', alignItems: 'flex-end',
      position:"absolute",right:wp('6%'),top:hp('3%'),
      width:wp('5%'),height:wp('5%'),
    },
    workerAera:{
      flexDirection:'row',padding:wp('4%'), height:hp('10%'), width:wp('80%'), 
      backgroundColor:'white',marginBottom:hp('1%'), borderRadius:wp('3%'),
    },
    userImage:{
      position:"absolute",left:wp('3.9%'),top:hp('2.7%'),
      width:wp('5.2%'), height:wp('6.3%')
    },
    werkerTextName:{
      fontFamily:"NanumSquare",
      color:'#040525',
      position:"absolute",left:wp('11%'),top:hp('3%'),
      fontSize: wp('4.8%'), marginRight:wp('4%')
    },
    werkerTextName2:{
      fontFamily:"NanumSquare",
      color:'#040525',
      fontSize: wp('4.2%'),
    },
    werkerTextTime:{
      fontFamily:"NanumSquare",
      color:'#040525',
      fontSize:wp('3.6%'), marginRight:wp('1%')
    },
    listStyle:{
      position:"absolute",
      top:hp('2%'),right:wp('2.5%'),
      width:wp('20%'), height:hp('6%'),
    },
    colStyle:{
      flexDirection:"column", position:"absolute",left:wp('28%'),top:hp('2.3%'),
    },
    buttonStyle:{
      backgroundColor:'#E2F2EF',
      fontFamily:"NanumSquare",
      color:'#040525', fontSize:wp('3.6%'),
      width:wp('18%'), height:hp('6%'), borderRadius:wp('4%'),
      justifyContent:"center", alignItems:"center"
    }
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
              console.log("///////////////////");
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
                    dic[res[i].workername] = (res[i].goto==null?'':res[i].goto)+(res[i].leavee==null?'':res[i].leavee);
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
  return (
    <View style={styles.container}>
    <ImageBackground style={styles.image} source={require('../../img/workMpage.png')}>
      <View style={styles.calenderArea}>
        <TouchableOpacity
          title="Calendar"
          style={styles.touchArea}
          onPress={() => navigation.navigate('Calendar')}>
          <Image style={styles.calenderImg} source={require('../../img/calender.png')}/>
          <Text style={styles.calenderTitle}>{route.params.selecteddate.split(' ')[3]} {route.params.selecteddate.split(' ')[1]} {route.params.selecteddate.split(' ')[2]}({route.params.selecteddate.split(' ')[0]})</Text>
          <Image style={styles.rightImg} source={require('../../img/right.png')}/>
        </TouchableOpacity>
      </View>

      {
          String(route.params.selecteddate).split(' ')[0]==="Mon"?
            business.map((b, id) => (
              <View style={styles.workerAera}>
                <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
                    <Text key={id} style={styles.werkerTextName}>{b.workername} </Text>
                    
                <View style={styles.colStyle}>
                  <View style={{flexDirection:"row", marginBottom:hp('1%')}}>
                    <Text key={id} style={styles.werkerTextTime}>{(b.time!=undefined || b.time!=null)?(b.time.slice(0,2)+":"+b.time.slice(2,4) + " ~ " + b.time.slice(4,6)+":"+b.time.slice(6,8) ):((b.mon!=undefined || b.mon!=null)?b.mon.slice(0,2)+":"+b.mon.slice(2,4)+" - "+b.mon.slice(4,6)+":"+b.mon.slice(6,8):'- -')}</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'출근':(timelog[b.workername].slice(0,1)==''?'출근':timelog[b.workername].slice(0,2)+":"+timelog[b.workername].slice(2,4))}</Text>
                    <Text style={styles.werkerTextTime}>-</Text>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'퇴근':(timelog[b.workername].slice(4,5)==''?'퇴근':timelog[b.workername].slice(4,6)+":"+timelog[b.workername].slice(6,8))}</Text>
                  </View>
                </View>
                <View style={styles.listStyle}>
                 <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Add WorkTodo',{date : route.params.selecteddate, worker:b.workername})}>
                   <Text style={styles.werkerTextName2}>할일추가</Text>
                 </TouchableOpacity>
                </View>
              </View>
            )):(String(route.params.selecteddate).split(' ')[0]==="Tue")?
            business.map((b, id) => (              
              <View style={styles.workerAera}>
                <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
                    <Text key={id} style={styles.werkerTextName}>{b.workername} </Text>
                    
                <View style={styles.colStyle}>
                  <View style={{flexDirection:"row", marginBottom:hp('1%')}}>
                    <Text key={id} style={styles.werkerTextTime}>{(b.time!=undefined || b.time!=null)?(b.time.slice(0,2)+":"+b.time.slice(2,4) + " ~ " + b.time.slice(4,6)+":"+b.time.slice(6,8) ):((b.tue!=undefined || b.tue!=null)?b.tue.slice(0,2)+" : "+b.tue.slice(2,4)+" ~ "+b.tue.slice(4,6)+" : "+b.tue.slice(6,8):'- -')}</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'출근':timelog[b.workername].slice(0,2)+":"+timelog[b.workername].slice(2,4)} ~ {timelog[b.workername]==undefined||timelog[b.workername]==null?'퇴근':timelog[b.workername].slice(4,6)+":"+timelog[b.workername].slice(6,8)}</Text>
                  </View>
                  </View>
                <View style={styles.listStyle}>
                 <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Add WorkTodo',{date : route.params.selecteddate, worker:b.workername})}>
                   <Text style={styles.werkerTextName2}>할일추가</Text>
                 </TouchableOpacity>
                </View>
              </View>
            )):(String(route.params.selecteddate).split(' ')[0]==="Wed")?
            business.map((b, id) => ( 
              <View style={styles.workerAera}>
                <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
                    <Text key={id} style={styles.werkerTextName}>{b.workername} </Text>
                    
                <View style={styles.colStyle}>
                  <View style={{flexDirection:"row", marginBottom:hp('1%')}}>
                    <Text key={id} style={styles.werkerTextTime}>{(b.time!=undefined || b.time!=null)?(b.time.slice(0,2)+":"+b.time.slice(2,4) + " ~ " + b.time.slice(4,6)+":"+b.time.slice(6,8) ):((b.wed!=undefined || b.wed!=null)?b.wed.slice(0,2)+" : "+b.wed.slice(2,4)+" ~ "+b.wed.slice(4,6)+" : "+b.wed.slice(6,8):'- -')}</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'출근':timelog[b.workername].slice(0,2)+":"+timelog[b.workername].slice(2,4)} ~ {timelog[b.workername]==undefined||timelog[b.workername]==null?'퇴근':timelog[b.workername].slice(4,6)+":"+timelog[b.workername].slice(6,8)}</Text>
                  </View>
                  </View>
                <View style={styles.listStyle}>
                 <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Add WorkTodo',{date : route.params.selecteddate, worker:b.workername})}>
                   <Text style={styles.werkerTextName2}>할일추가</Text>
                 </TouchableOpacity>
                </View>
              </View>
            )):(String(route.params.selecteddate).split(' ')[0]==="Thu")?
            business.map((b, id) => (
              <View style={styles.workerAera}>
                <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
                    <Text key={id} style={styles.werkerTextName}>{b.workername} </Text>
                    
                <View style={styles.colStyle}>
                  <View style={{flexDirection:"row", marginBottom:hp('1%')}}>
                    <Text key={id} style={styles.werkerTextTime}>{(b.time!=undefined || b.time!=null)?(b.time.slice(0,2)+":"+b.time.slice(2,4) + " ~ " + b.time.slice(4,6)+":"+b.time.slice(6,8) ):((b.thu!=undefined || b.thu!=null)?b.thu.slice(0,2)+" : "+b.thu.slice(2,4)+" ~ "+b.thu.slice(4,6)+" : "+b.thu.slice(6,8):'- -')}</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'출근':timelog[b.workername].slice(0,2)+":"+timelog[b.workername].slice(2,4)} ~ {timelog[b.workername]==undefined||timelog[b.workername]==null?'퇴근':timelog[b.workername].slice(4,6)+":"+timelog[b.workername].slice(6,8)}</Text>
                  </View>
                  </View>
                <View style={styles.listStyle}>
                 <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Add WorkTodo',{date : route.params.selecteddate, worker:b.workername})}>
                   <Text style={styles.werkerTextName2}>할일추가</Text>
                 </TouchableOpacity>
                </View>
              </View>
            )):(String(route.params.selecteddate).split(' ')[0]==="Fri")?
            business.map((b, id) => (
              <View style={styles.workerAera}>
                <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
                    <Text key={id} style={styles.werkerTextName}>{b.workername} </Text>
                    
                <View style={styles.colStyle}>
                  <View style={{flexDirection:"row", marginBottom:hp('1%')}}>
                    <Text key={id} style={styles.werkerTextTime}>{(b.time!=undefined || b.time!=null)?(b.time.slice(0,2)+":"+b.time.slice(2,4) + " ~ " + b.time.slice(4,6)+":"+b.time.slice(6,8) ):((b.fri!=undefined || b.fri!=null)?b.fri.slice(0,2)+" : "+b.fri.slice(2,4)+" ~ "+b.fri.slice(4,6)+" : "+b.fri.slice(6,8):'- -')}</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'출근':timelog[b.workername].slice(0,2)+":"+timelog[b.workername].slice(2,4)} ~ {timelog[b.workername]==undefined||timelog[b.workername]==null?'퇴근':timelog[b.workername].slice(4,6)+":"+timelog[b.workername].slice(6,8)}</Text>
                  </View>
                  </View>
                <View style={styles.listStyle}>
                 <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Add WorkTodo',{date : route.params.selecteddate, worker:b.workername})}>
                   <Text style={styles.werkerTextName2}>할일추가</Text>
                 </TouchableOpacity>
                </View>
              </View>
            )):(String(route.params.selecteddate).split(' ')[0]==="Sat")?
            business.map((b, id) => (
              <View style={styles.workerAera}>
                <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
                    <Text key={id} style={styles.werkerTextName}>{b.workername} </Text>
                    
                <View style={styles.colStyle}>
                  <View style={{flexDirection:"row", marginBottom:hp('1%')}}>
                    <Text key={id} style={styles.werkerTextTime}>{(b.time!=undefined || b.time!=null)?(b.time.slice(0,2)+":"+b.time.slice(2,4) + " ~ " + b.time.slice(4,6)+":"+b.time.slice(6,8) ):((b.sat!=undefined || b.sat!=null)?b.sat.slice(0,2)+" : "+b.sat.slice(2,4)+" ~ "+b.sat.slice(4,6)+" : "+b.sat.slice(6,8):'- -')}</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'출근':timelog[b.workername].slice(0,2)+":"+timelog[b.workername].slice(2,4)} ~ {timelog[b.workername]==undefined||timelog[b.workername]==null?'퇴근':timelog[b.workername].slice(4,6)+":"+timelog[b.workername].slice(6,8)}</Text>
                  </View>
                  </View>
                <View style={styles.listStyle}>
                 <TouchableOpacity style={styles.buttonStyle} 
                  onPress={() => navigation.navigate('Add WorkTodo',{date : route.params.selecteddate, worker:b.workername})}>
                   <Text style={styles.werkerTextName2}>할일추가</Text>
                 </TouchableOpacity>
                </View>
              </View>
            )):(String(route.params.selecteddate).split(' ')[0]==="Sun")?
            business.map((b, id) => (
              <View style={styles.workerAera}>
                <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
                    <Text key={id} style={styles.werkerTextName}>{b.workername} </Text>
                    
                <View style={styles.colStyle}>
                  <View style={{flexDirection:"row", marginBottom:hp('1%')}}>
                    <Text key={id} style={styles.werkerTextTime}>{(b.time!=undefined || b.time!=null)?(b.time.slice(0,2)+":"+b.time.slice(2,4) + " ~ " + b.time.slice(4,6)+":"+b.time.slice(6,8) ):((b.sun!=undefined || b.sun!=null)?b.sun.slice(0,2)+" : "+b.sun.slice(2,4)+" ~ "+b.sun.slice(4,6)+" : "+b.sun.slice(6,8):'- -')}</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                    <Text key={id} style={styles.werkerTextTime}>{timelog[b.workername]==undefined||timelog[b.workername]==null?'출근':timelog[b.workername].slice(0,2)+":"+timelog[b.workername].slice(2,4)} ~ {timelog[b.workername]==undefined||timelog[b.workername]==null?'퇴근':timelog[b.workername].slice(4,6)+":"+timelog[b.workername].slice(6,8)}</Text>
                  </View>
                  </View>
                <View style={styles.listStyle}>
                 <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Add WorkTodo',{date : route.params.selecteddate, worker:b.workername})}>
                  <Text style={styles.werkerTextName2}>할일추가</Text>
                 </TouchableOpacity>
                </View>
              </View>
            )):business.map((b, id) => (
              <Text key={id}>{b.workername}</Text>
            ))
        }

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('alter worker',{date : route.params.selecteddate})}>
            <Text style={styles.buttonTitle}>근로자 시간 변경</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>

  );
};
export default WorkManageScreen;