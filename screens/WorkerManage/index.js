import React, {useState} from 'react';
import { View, Text, StyleSheet, Button,ImageBackground,TouchableOpacity, Image, Alert,Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    width:'100%', height:'100%',
    alignItems: 'center',
    justifyContent: 'flex-start',    
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),

  },
  worker: {
    flexDirection: 'row', height:hp('10%'), width:wp('90%'),
    justifyContent:"flex-start", alignItems:"center",
    paddingLeft:wp('7%'), 
    marginBottom:hp('2.5%'),
    borderBottomWidth:hp('0.1%'),
    borderBottomColor:'#67C8BA'
  },
  buttonArea: {
    alignItems:"center",
    width: '100%', height: hp('10%'),
    marginTop:hp('3%')
  },
  button: {
    paddingTop:hp('2%'),
    width:wp('90%'), height: hp('10%'),
  },
  imgStyle:{
    ...Platform.select({
      ios:{
        width:wp('90%'),
        height:hp('6.4%')
      },
      android:{
        width:wp('90%'),
        height:hp('5.91%')
      }
    })
  },  
  image:{
    justifyContent: "center",
    width: "100%", height: "100%",
    backgroundColor:'#67C8BA'
  },
  listArea:{
    height:hp('64%'),
    marginTop:hp('7%'),
  },
  userImage:{
    marginRight:wp('3%'),
    width:wp('5.5%'), height:wp('7.0%')
  },
  textTitle:{
      color: '#040525',
      fontSize:wp('4.8%'),
      fontFamily:"NanumSquareB",
  },
  textTitle2:{
    color: '#040525',
    fontSize:wp('3.5%'),
    fontFamily:"NanumSquare",
},
  ContbuttonArea: {
    position:"absolute",
    top:hp('0.5%'),right:wp('22%'),
    justifyContent: 'center', alignItems:"center",
  },
  contractImage:{
    marginTop:hp('0.5%'),
    marginLeft:hp('1.5%'),
    width:wp('25%'), height:hp('9%'),
  },
  deleteArea:{
    position:"absolute",
    top:0,right:wp('5%'),
    justifyContent: 'center', alignItems:"center",
    width:wp('15%'),height:hp('10%')
  },
  deleteTitle:{
    color: '#040525',
    fontSize:wp('4.8%'),
    fontFamily:"NanumSquare",
    justifyContent: 'center', alignItems:"center",
  },
  deleteTitle2:{
    color: 'red',
    fontSize:wp('4.8%'),
    fontFamily:"NanumSquare",
    justifyContent: 'center', alignItems:"center",
  },
  deleteTitlex:{
    color: '#040525',
    fontSize:wp('4.8%'),
    fontFamily:"NanumSquare",
    justifyContent: 'center', alignItems:"center",
    marginTop:hp('3.4%'),
    marginRight:wp('5%')
  }

}); 

const WorkerManageScreen = ({navigation, route}) => {
    const [business, setBusiness] = useState([]);
    const [idid, setIdid] = useState('');
    const [bangCode, setBangCode] = useState('');
    React.useEffect(() => {
      const unsubscribe =
        navigation.addListener('focus', () => {
          AsyncStorage.getItem("bangCode")
            .then((bangCode) => {
              setBangCode(bangCode);
              AsyncStorage.getItem("userData").then((userData) => {
                setIdid(JSON.parse(userData).id)
                fetchData(bangCode)
              });
            })
        });
    return unsubscribe;
  }, []);

  async function deleteWorker(name){
    try {
      Alert.alert(
        "????????? ????????????",
        "???????????? ?????? ?????? ????????? ???????????????. ?????????????????????????",
        [
          {
            text: "?????????",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "???", onPress: () => {
            let today = new Date();
            axios.post('https://??????.kr/api/sendMessage', {              
              type: 3,
              system: 1,
              f: idid,
              t: name,
              message : bangCode + '?????? ' + today.getFullYear() +'??? '+ today.getMonth() +'??? '+ today.getDay() +'??? ?????? ?????????????????????.',              
              time: today.getDate(),
              r:0   
            },
            {  headers:{
              'Content-Type': 'application/json',
            'Accept': 'application/json'}
            })
            .then(res => {
              fetchData(bangCode)              
            });
            axios.post('https://??????.kr/api/deleteWorker', {
              business: bangCode,  
              workername : name,
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then(res => { 
              fetchData(bangCode)
            });            
          }}
        ],
        { cancelable: false }
      );
      
    } catch (e) {
        console.error(e);
        Alert.alert("??????????????? ???????????? ???????????????.")
      }
  }


  async function fetchData(bangCode) { 
        try {
          await axios.post('https://??????.kr/api/selectWorkerByType', {
            business : bangCode,
            type : 2
          },
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
            /*let res = await fetch('https://??????.kr/api/selectWorkerByType', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                business : bangCode,
                type : 2
              }),
            }).then(res => res.json())*/            
            .then(res => {
              setBusiness(res.data)
              console.log(res.data)
              console.log(business)
            });
        } catch (e) {
            console.error(e);
          }
    }
    
    return (
      <View style={styles.image}>
        <View style={styles.container}>

      <View style={styles.buttonArea}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate(('Invite'),{type:2, user_id: idid})}>
            <Image style={styles.imgStyle} source={require('../../img/invite.png')}></Image>
        </TouchableOpacity>
      </View>
      
      <ScrollView>        
      {
          business.map((b, id) => (
          <View style={styles.worker} key={id}>
            <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
            <Text style={styles.textTitle}>{b.workername2}</Text><Text style={styles.textTitle2}>({b.workername.substr(0,4)}{b.workername.length>4?'**':''})</Text>
            <View style={styles.ContbuttonArea}>
              <TouchableOpacity
                style={styles.Contbutton}
                onPress={() => {
                  if(b.state!=0){
                    navigation.navigate(('Contract FormA'),{workername: b.workername, bid:idid })
                  }
                }}>
                  {b.state==0?
                   <Text style={styles.deleteTitlex}>X</Text>:
                <Image style={styles.contractImage} source={require('../../img/contractImg.png')}/>
                  }
              </TouchableOpacity>
            </View>
            <View style={styles.deleteArea}>
              {b.workState == 0?
                <TouchableOpacity
                style={styles.Contbutton}
                 onPress={() => deleteWorker(b.workername)} //???????????????
                >
                <Text style={styles.deleteTitle}>??????</Text>
              </TouchableOpacity>
                : <Text style={styles.deleteTitle2}>??????</Text>
                }
              
            </View>
              
          </View>
          ))
      }
      </ScrollView>
      </View>
      
    </View>
    
    );
};
export default WorkerManageScreen;