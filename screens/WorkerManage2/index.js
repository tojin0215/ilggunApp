import React, {useState} from 'react';
import { View, Text, StyleSheet, Button,ImageBackground,TouchableOpacity, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 
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
    borderBottomWidth:hp('0.3%'),
    borderBottomColor:'#67C8BA'
  },
  image:{
    justifyContent: "center",
    width: "100%", height: "103%",
  },  
  userImage:{
    marginRight:wp('3%'),
    width:wp('6.5%'), height:wp('8%')
  },
  textTitle:{
      color: '#040525',
      fontSize:wp('5.55%'),
      fontFamily:"NanumSquareB",
  },
  ContbuttonArea: {
    marginLeft:wp('7%'),
    justifyContent: 'center', alignItems:"center",
  },
  contractImage:{
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
  }
});


const WorkerManageScreen2 = ({navigation}) => {
    const [business, setBusiness] = useState([]);
    async function fetchData(bangCode) { 
        try {
            let res = await fetch('http://192.168.43.253:3000/selectWorkerByType', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                business : bangCode,
                type : 1
              }),
            }).then(res => res.json())
            .then(res => setBusiness(res));
        } catch (e) {
            console.error(e);
          }
    }
    

    navigation.addListener('focus', () => {
        AsyncStorage.getItem("bangCode")
        .then((bangCode) => {
          fetchData(bangCode)
        })
      });

    
    return (
      <ImageBackground style={styles.image} source={require('../../img/workMpage.png')}>
      <View style={styles.container}>
        <View style={{marginTop:hp('7%')}}>
      {
          business.map((b, id) => (
            <View style={styles.worker}>
              <Image style={styles.userImage} source={require('../../img/user_mint.png')}/>
              <Text style={styles.textTitle}>{b.workername}</Text>
              
                <View style={styles.ContbuttonArea}>
                <TouchableOpacity
                  style={styles.Contbutton}
                  onPress={() => navigation.navigate('Contract FormB')}>
                  <Image style={styles.contractImage} source={require('../../img/contractImg.png')}/>
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
      </View>
      </View>
      </ImageBackground>
    );
};
export default WorkerManageScreen2;