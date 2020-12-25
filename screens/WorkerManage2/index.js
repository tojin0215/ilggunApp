import React, {useState} from 'react';
import { View, Text, StyleSheet, Button,ImageBackground,TouchableOpacity, Image,ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
const styles = StyleSheet.create({
  container: {
    width:'100%', height:'100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  worker: {
    flexDirection: 'row', height:hp('10%'), width:wp('90%'),
    justifyContent:"flex-start", alignItems:"center",
    paddingLeft:wp('7%'), 
    marginBottom:hp('2.5%'),
    borderBottomWidth:hp('0.1%'),
    borderBottomColor:'#67C8BA'
  },
  image:{
    justifyContent: "center",
    width: "100%", height: "103%",
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
  listArea:{
    marginTop:hp('3%'),
    height:hp('73%')
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
    width:wp('90%'),height:hp('5.91%'),
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

const WorkerManageScreen2 = ({navigation}) => {
    const [business, setBusiness] = useState([]);
    const [idid, setIdid] = useState('');
    React.useEffect(() => {
      const unsubscribe =
        navigation.addListener('focus', () => {
          AsyncStorage.getItem("bangCode")
            .then((bangCode) => {
              
              AsyncStorage.getItem("userData").then((userData) => {
                setIdid(JSON.parse(userData).id)
                fetchData(bangCode)
              });
            })
        });
    return unsubscribe;
  }, []);
    
    async function fetchData(bangCode) { 
        try {
          await axios.post('https://www.toojin.tk:3000/selectWorkerByType', {
            business : bangCode,
                type : 1
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
          })
          /*  let res = await fetch('https://www.toojin.tk:3000/selectWorkerByType', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                business : bangCode,
                type : 1
              }),
            }).then(res => res.json())*/
            .then(res => setBusiness(res.data));
        } catch (e) {
            console.error(e);
          }
    }
    
    return (
      <ImageBackground style={styles.image} source={require('../../img/page1_1.png')}>
      <View style={styles.container}>
      <View style={styles.buttonArea}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate(('Invite'),{type:1})}>
            <Image style={styles.imgStyle} source={require('../../img/invite.png')}></Image>
        </TouchableOpacity>
      </View>
        <View style={styles.listArea}>
        
          <ScrollView>
      {
          business.map((b, id) => (
            <View style={styles.worker}>
              <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
              <Text style={styles.textTitle}>{b.workername}</Text>
              
                <View style={styles.ContbuttonArea}>
                <TouchableOpacity
                  style={styles.Contbutton}
                  onPress={() => navigation.navigate(('Contract FormB'),{workername: b.workername, bid:idid })}>
                  {b.state==0?
                   <Text style={styles.deleteTitlex}>X</Text>:
                   <Image style={styles.contractImage} source={require('../../img/contractImg.png')}/>
                  }
                </TouchableOpacity>
              </View>
              <View style={styles.deleteArea}>
                <TouchableOpacity
                  style={styles.Contbutton}
                  // onPress={() => } //근로자삭제
                  >
                  <Text style={styles.deleteTitle}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
      }
      </ScrollView>
      </View>
      </View>
      </ImageBackground>
    );
};
export default WorkerManageScreen2;