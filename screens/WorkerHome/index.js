import React, { useEffect, useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity,Image,ImageBackground, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
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
  }
});


const WorkerHomeScreen = ({ navigation, route }) => {
  
  const [commute, setCommute] = useState([]);
  const [todo, setTodo] = useState([]);
  const [onlyOne, setOnlyOne] = useState(0);
  const [business, setBusiness] = useState([]);
  const [id,setId] = useState('');
  
  navigation.addListener('focus', () => {
    navigation.setOptions({
          headerTitle: route.params.bname,
    });
    setBusiness(route.params.bname);
    setId(route.params.id);
    let isMounted = true;

    function f(){
      if(isMounted){
          fetchData(route.params.bname, route.params.id);
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
      axios.post('https://www.toojin.tk:3000/selectWorkTodo', {
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
    axios.post('https://www.toojin.tk:3000/selectWorkerEach', {
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
      
  async function fetchData(bangCode,idid) { 
    try {
        /*let res = await fetch('https://www.toojin.tk:3000/selectBusinessByWorker', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //id : idid
          }),
        })*/
        await axios.post('https://www.toojin.tk:3000/selectBusinessByWorker', {id:idid},
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
    async function commuteData(idid) { 
      let err;  
      try {
          await axios.post('https://www.toojin.tk:3000/updateCommute', {bang : route.params.bname, id:idid},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          
            })
            .then(res => err = res.status)
            .then((res) => {
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
  const [clicked2, setClicked2] = useState(-1);
  const [clicked3, setClicked3] = useState(-1);
  const [clicked4, setClicked4] = useState(-1);  
    
  return (
    <View style={styles.image}>
      <View style={styles.container}>
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
                    setCommute(commute=='출근'?'퇴근':'출근');
                    commuteData(route.params.id);
                    commuteChangeImg(commute=='출근'?'퇴근':'출근');
                  }}
                ],
                { cancelable: false }
              );
            }
            else{
              setCommute(commute=='출근'?'퇴근':'출근');
              commuteData(route.params.id);
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
          console.log(route.params.state);
          if(state==2 || route.params.state==2){
            setClicked(0);
            var week = ["Sun",'Mon','Tue',"Wed","Thu","Fri","Sat"]
            var day = new Date().getDay();
            var month = new Date().getMonth() + 1; //To get the Current Month
            var date = new Date().getDate(); //To get the Current Date
            var year = new Date().getFullYear(); //To get the Current Year
            let dt = week[day]+" "+ month+" " +date+" "+ year;
            console.log(dt);
            navigation.navigate('Vacation Request',{date:dt,id:route.params.id}); 
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
        if(state==2|| route.params.state==2){
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