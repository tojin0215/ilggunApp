import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity,Image,ImageBackground, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import axios from 'axios';
const styles = StyleSheet.create({
  container: {
    width: "100%", height: "100%",
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
    alignItems: 'center',
    justifyContent:"flex-start",
  },
  timeText :{
    height: "3%",
    marginTop:hp('5%'),
    marginBottom:hp('0%'),
    
  },
  textTitle1:{
    fontSize:15,
    fontFamily:"NanumSquareB",
  },
  textTitle2:{
    marginTop:hp('0.5%'),
    fontSize:15,
    fontFamily:"NanumSquareB",
  },
  text1:{
    fontSize:15,
    fontFamily:"NanumSquare",
  },
  text2:{
    marginTop:hp('0.5%'),
    fontSize:15,
    fontFamily:"NanumSquare",
    color:'#7085DF'
  },

  image:{
    alignItems: 'center',
    width: "100%", height: "100%",    
    backgroundColor:'#7085DF'
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


const WorkerHomeScreen = ({ navigation, route }) => {
  
  const [commute, setCommute] = useState([]);
  const [todo, setTodo] = useState([]);
  const [onlyOne, setOnlyOne] = useState(0);
  const [business, setBusiness] = useState([]);
  const [id,setId] = useState('');
  const [name,setName] = useState('');
  const [time, setTime] = useState('')
  const [timelog, setTimelog] = useState('')

  navigation.addListener('focus', () => {
    navigation.setOptions({
         // headerTitle: route.params.bname,
         headerLeft: () => (
          <View style={styles.rowArea}>
            <Image
              style={styles.tinyLogo}
              source={
                require('../../img/logo_purple.png')
              }
            />
            <Text style={styles.titleText}>{route.params.bname}</Text>
          </View>
        ),
    });
    setBusiness(route.params.bname);
    setId(route.params.id);
    setName(route.params.name);
    let isMounted = true;

    function f(){
      if(isMounted){
          fetchData(route.params.bname, route.params.id, route.params.name);
      }
    }
    f();
    return() => {
      isMounted = false;
    }
  },[]);
  
  const [state, setState] =useState(0);
  const [worktodo, setWorktodo] = useState(0);
  useEffect(() => {
    navigation.addListener('focus', () => {
      axios.post('http://13.124.141.28:3000/selectWorkTodo', {
           bang : route.params.bname,
           year : new Date().getFullYear(),
           month: new Date().getMonth() + 1,
           date: new Date().getDate(),
           worker: route.params.id
       },
       {  headers:{
         'Content-Type': 'application/json',
         'Accept': 'application/json'}
       })
       .then(res => {
         
         if(res.data[0]==undefined){
           setWorktodo(0);
         }
         else{
           let dict = JSON.parse(res.data[0].todo);
           let td = 0;
           for(var key in dict){
             if(dict[key]==0){
               td=1;
               break;
             }
           }
           setWorktodo(td);
         }
    });
    axios.post('http://13.124.141.28:3000/selectWorkerEach', {
      business:route.params.bname,
      workername:route.params.id,
    },
    {headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'}
    })
    .then(res => {
      setState(res.data[0].state);
    });
  },[]);
  }, [navigation]);
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
      
  async function fetchData(bangCode,idid,name) { 
    try {
        /*let res = await fetch('http://13.124.141.28:3000/selectBusinessByWorker', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //id : idid
          }),
        })*/
        await axios.post('http://13.124.141.28:3000/selectBusinessByWorker', {id:idid},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })//.then(res => res.json())
        .then(res => {
            let dic = JSON.parse(res.data[0].bang);
            //console.log(res.data[0].bang+" "+bangCode+ " " +dic[String(bangCode)]+"???");
            
            setCommute(dic[String(route.params.bname)]?'퇴근':'출근');
            commuteChangeImg(dic[String(route.params.bname)]?'퇴근':'출근',1);
            
            //setBusiness(bangCode);
            //console.log("..................//"+business);
        });
        /*.then((response) => response.json())
        .then((res) => {
            setBusiness(res);
        })*/
              let day = '';
              let d = new Date().getDay();
              if(d==0) day = 'sun';
              else if(d==1) day = 'mon';
              else if(d==2) day = 'tue';
              else if(d==3) day = 'wed';
              else if(d==4) day = 'thu';
              else if(d==5) day = 'fri';
              else if(d==6) day = 'sat';

              //console.log(d);
              await axios.post('http://13.124.141.28:3000/selectWorkerAsDayAsWorker', {
                  business: bangCode,
                  year : new Date().getFullYear(),
                  month: new Date().getMonth() + 1,
                  date: new Date().getDate(),
                  day: day,
                  workername: idid,
              },
              {  headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
              })
              .then(async(res) => 
                {
                  let resultData = res.data.ori;
                  console.log(res.data.ori);
                  console.log(res.data.alter);
                  let alter = res.data.alter;
                  if(resultData.length == 0){
                    resultData = res.data.alter
    
                    for(let i=0 ; i<resultData.length ; i++){
                      if(resultData[i].time=='0'){
                        resultData[i] = null
                      }
                    }
                    resultData = resultData.filter(data => data !== null)
                  }
                  else{
                    for(let j=0 ; j<alter.length ; j++){
                      let flag=0;
                      for(let i=0 ; i<resultData.length ; i++){
                        if(alter[j]!=null){
                          if(resultData[i].workername == alter[j].workername){
                            flag=1;
                            if(alter[j].time=='0'){
                              console.log("121221212212")
                              resultData[i] = null
                            }
                            else{
                              resultData[i] = alter[j];
                            }
                            alter[j] = null;
                            break;
                          }
                        }
                      }
                      if(flag==0){
                        resultData.push(alter[j]);
                      }
                    }
                    resultData = resultData.filter(data => data !== null)
                  }
                  //console.log(res);

                  console.log("받아오는 날짜:")
                  console.log(resultData)
                  
                  console.log("-------------------------------------")
                  if(resultData[0] !== undefined){
                   
                    if(resultData[0].time == null){
                      setTime(resultData[0][day])
                    }else{
                      setTime(resultData[0].time)
                    }
                  }
                  else { setTime(undefined) }
                });
              
              await axios.post('http://13.124.141.28:3000/selectTimelogAsWorker', {
                        bang: bangCode,
                        year : new Date().getFullYear(),
                        month: new Date().getMonth() + 1,
                        date: new Date().getDate(),
                        day: day,
                        workername: idid,
                    },
                    {  headers:{
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'}
                    })
                  .then(async(res) => 
                    {
                      let dic={}
                      for(let i=0 ; i<res.data.length ; i++){
                        dic[res.data[i].workername] = (res.data[i].goto==null?'':res.data[i].goto)+(res.data[i].leavee==null?'':res.data[i].leavee);
                      }
                      console.log("-------------------------------------")
                      setTimelog(dic[idid]);
                    
                    });


    } catch (e) {
        console.error(e);
      }
    }
    async function commuteData(idid) { 
      let err;  
      try {
          await axios.post('http://13.124.141.28:3000/updateCommute', {bang : route.params.bname, id:idid},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          
            })
            .then(res => {
              if(res.data.result=="a"){
                Alert.alert("퇴근 완료!\n 오늘도 고생많으셨어요.");
                setCommuteImgSelected(commuteI.commuteImg)
              }else if(res.data.result=="b"){
        
                Alert.alert("출근 완료!");
                setCommuteImgSelected(commuteI.commuteImgChecked)
              }else{
                Alert.alert("e");
              }
            })
            .then((res) => {
              let day = '';
              let d = new Date().getDay();
              if(d==0) day = 'sun';
              else if(d==1) day = 'mon';
              else if(d==2) day = 'tue';
              else if(d==3) day = 'wed';
              else if(d==4) day = 'thu';
              else if(d==5) day = 'fri';
              else if(d==6) day = 'sat';
              axios.post('http://13.124.141.28:3000/selectTimelogAsWorker', {
                        bang: route.params.bname,
                        year : new Date().getFullYear(),
                        month: new Date().getMonth() + 1,
                        date: new Date().getDate(),
                        day: day,
                        workername: idid,
                    },
                    {  headers:{
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'}
                    })
                  .then(async(res) => 
                    {
                      let dic={}
                      for(let i=0 ; i<res.data.length ; i++){
                        dic[res.data[i].workername] = (res.data[i].goto==null?'':res.data[i].goto)+(res.data[i].leavee==null?'':res.data[i].leavee);
                      }
                      console.log("-------------------------------------")
                        setTimelog(dic[idid]);
                    
                    });
            })
      } catch (e) {
            console.log(err);
            console.error(e);
      }
            
    }

        
    //출근퇴근
    const commuteImg = require('../../img/workManagement_purple_clicked.png')
    const commuteImgChecked = require('../../img/workManagement_purple.png')
    const commuteI = {commuteImg, commuteImgChecked}
    const [commuteImgSelected, setCommuteImgSelected] = useState(commuteI.commuteImg)

    const commuteChangeImg =(com,init)=>{
      if(init){
        if(com == '출근'){
          setCommuteImgSelected(commuteI.commuteImgChecked)
        } else{
          setCommuteImgSelected(commuteI.commuteImg)
        }
      }
    }

    
  const [clicked, setClicked] = useState(-1);
  const [clicked2, setClicked2] = useState(-1);
  const [clicked3, setClicked3] = useState(-1);
  const [clicked4, setClicked4] = useState(-1);  
    
  return (
    <View style={styles.image}>
      <View style={styles.container}>
      <View style={styles.timeText}>
        <Text style={styles.textTitle1}>근무 시간   {time==undefined?<Text style={styles.text1}>-- : --  -  -- : --</Text>:<Text style={styles.text1}>{time.substring(0,2)}:{time.substring(2,4)} - {time.substring(4,6)}:{time.substring(6,8)}</Text>}</Text>
        <Text style={styles.textTitle2}>출근/퇴근  {timelog==undefined||time==undefined ?<Text style={styles.text2}>-- : --  -  -- : --</Text>:<Text style={styles.text2}>{timelog.substring(0,2)}:{timelog.substring(2,4)} - {timelog.substring(4,6)}:{timelog.substring(6,8)}</Text>}</Text>
      </View>
      <View style={styles.buttonArea1}>    
      <TouchableOpacity 
        style={styles.button}
        onPress={() => { 
          
          //출근/퇴근기록
          console.log("state???"+route.params.state)
          if(state==2){
            if(commute=='출근' && worktodo==1){
              Alert.alert(
                "퇴근하기",
                "할 일이 남아있습니다. 미완료로 퇴근하시겠습니까?",
                [
                  {
                    text: "아니오",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "네", onPress: () => {
                    navigation.navigate('QrAuth',{
                      bname:route.params.bname,
                      userId:route.params.id,
                      commute:commute
                    });
                    // setCommute(commute=='출근'?'퇴근':'출근');
                    // commuteData(route.params.id);
                    commuteChangeImg(commute=='출근'?'퇴근':'출근');
                  }}
                ],
                { cancelable: false }
              );
            }
            else{
              navigation.navigate('QrAuth',{
                bname:route.params.bname,
                userId:route.params.id,
                commute:commute
              });
              // setCommute(commute=='출근'?'퇴근':'출근');
              // commuteData(route.params.id);
              commuteChangeImg(commute=='출근'?'퇴근':'출근');
            }
          }
          else{
            Alert.alert("[문서함>계약서]를 먼저 작성해주세요.")
          }
        }}>
          <Image style={styles.buttonImg} source={commuteImgSelected}/>
        {/* <Text style={styles.buttonTitle}>{commute}</Text> */}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          console.log('_______________________________________________________ㄴ여깅',route.params.state);
          if(state==2 || route.params.state==2){
            setClicked(0);
            var week = ["Sun",'Mon','Tue',"Wed","Thu","Fri","Sat"]
            var day = new Date().getDay();
            var month = new Date().getMonth() + 1; //To get the Current Month
            var date = new Date().getDate(); //To get the Current Date
            var year = new Date().getFullYear(); //To get the Current Year
            let dt = week[day]+" "+ month+" " +date+" "+ year;
            console.log(dt);
            navigation.navigate('Vacation Request',{date:dt, id:route.params.id, name:route.params.name}); 
            console.log('_______________________________________________________ㄴ여깅',route.params.name);
            setTimeout(() => {setClicked(-1)},500);
          }else{
            Alert.alert("[문서함>계약서]를 먼저 작성해주세요.")
          }
        }}>
        <Image style={styles.buttonImg} source={clicked==0?require('../../img/vacation_clicked.png'):require('../../img/vacation.png')}></Image>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonArea2}>
      <TouchableOpacity 
       style={styles.button}
       onPress={() => {
         setClicked2(0); 
         navigation.navigate('WCalculating')
         setTimeout(() => {setClicked2(-1)},500);
      }}>
      <Image style={styles.buttonImg} source={clicked2==0?require('../../img/calculate_purple_clicked.png'):require('../../img/calculate_purple.png')}/>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          setClicked3(0);
          navigation.navigate('Worker Document',{id:route.params.id});
          setTimeout(() => {setClicked3(-1)},500);
          }}>
        <Image style={styles.buttonImg} source={clicked3==0?require('../../img/document_clicked.png'):require('../../img/document.png')}></Image>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonArea2}>
      <TouchableOpacity 
       style={styles.button2}
       onPress={() => {
         console.log(worktodo);
        if(commute=='퇴근' && (state==2 || route.params.state==2)){
          Alert.alert("출근을 먼저 해주세요.")
        }
        else if(state==2 || route.params.state==2){
          setClicked4(0);
          navigation.navigate('WorkTodo',{id:route.params.id})
          setTimeout(() => {setClicked4(-1)},500);
        }else{
          Alert.alert("[문서함>계약서]를 먼저 작성해주세요.")
        }
       }}>
       <Image style={styles.todobuttonImg} source={clicked4==0?require('../../img/todo.png'):(worktodo==1?require('../../img/todo2.png'):require('../../img/todo.png'))}/>
      </TouchableOpacity>
      </View>
      </View></View>
  );
};
 
export default WorkerHomeScreen;