import React, {useState} from 'react';
import { View, Modal, Text, Button, StyleSheet, ImageBackground, Image,Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Row } from 'react-native-table-component';
import axios from 'axios';
import { Alert } from 'react-native';
const styles = StyleSheet.create({
  
  image:{
    width:'100%', height:'100%', 
    backgroundColor:'#DAE9F7',
  },
  container:{
    width:'100%', height:'100%', 
    paddingTop:hp('5%'), 
    backgroundColor:'white',
    alignItems:"center",    
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
  },
  listArea:{
    width:wp('100%'), height:hp('65%'),
    alignItems:"center",
  },
  sendBtnArea:{
    justifyContent:"flex-end", alignItems:"center",
    width:'100%',
    height:hp('9%'),
    paddingBottom:hp('1%')
  },
  btnImgStyle:{
    ...Platform.select({
      ios:{
        width:wp('50%'),
        height:hp('6.7%')
      },
      android:{
        width:wp('50%'),
        height:hp('6%')
      }
    })
  },
  messageArea:{
    paddingLeft:wp('2%'), 
    height:hp('12%'), width:wp('80%'), 
    backgroundColor:'white',borderRadius:wp('3%'),
    marginBottom:hp('2%'),marginTop:hp('1%'),
    paddingTop:hp('1%'), paddingBottom:hp('1%'),
    borderWidth:wp('0.5%'),
    borderColor:'#DAE9F7',
  },
  titleArea:{
    flexDirection:"row", height:hp('4%'), width:wp('65%'),
    justifyContent:"flex-start",
  },
  userImage:{
    marginLeft:wp('2%'),
    width:wp('3%'), height:wp('3.2%'),
  },
  touchArea:{
    width:wp('70%'), height:hp('11%'), paddingRight:wp('2%'),
    marginLeft:wp('1%'), paddingTop:hp('0.7%')
  },
  textNameStyle:{
    fontSize: wp('4.5%'),
    fontFamily:"NanumSquareB",
    color:'#040525',
    marginTop:hp('0.5%'),
    paddingLeft:wp('0.5%'),
  },
  textStyle: {
    fontSize: wp('4.5%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    marginTop:hp('0.9%'),
    paddingLeft:wp('5%')
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
  },
  modaltextStyle:{
    fontSize: wp('4.5%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    paddingLeft:wp('3%'),
    lineHeight:wp('6.5%'),
  },
  modalBtn:{
    width:wp('80%'), height:hp('5.5%'),
    textAlign:"center",
    fontSize: wp('4.5%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    backgroundColor:'#DAE9F7',
    borderRadius:wp('5%'),
    marginTop:hp('4%'),
    paddingTop:hp('1.2')
  },
  modalBtn2:{
    width:wp('39%'), height:hp('5.5%'),
    textAlign:"center",
    fontSize: wp('4.5%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    backgroundColor:'#DAE9F7',
    borderRadius:wp('5%'),
    marginTop:hp('4%'),
    marginRight:wp('1%'),
    paddingTop:hp('1.2')
  }
});
const sentMessageScreen = ({ navigation }) => {
  const [idid, setIdid] = useState('');
  //setId('dddd');
  //console.log(id);
  React.useEffect(() => {
    const unsubscribe =
      navigation.addListener('focus', () => {
        AsyncStorage.getItem("userData").then((userData) =>{
          setIdid(id => JSON.parse(userData).id);
          fetchData(JSON.parse(userData).id);
        });
      })
  return unsubscribe;
  }, []);
  /*React.useEffect(() => {
    const unsubscribe =
      navigation.addListener('focus', () => {
          fetchData()
      })
  return unsubscribe;
  }, []);*/
//===================================================
  const [business, setBusiness] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [visibility2, setVisibility2] = useState([]);
  const [message, setMessage] = useState('');
  const [index, setIndex] = useState(-1);
  async function fetchData(ididid) { 
      try {
        axios.post('http://13.124.141.28:3000/selectSentMessage', {
          id:ididid
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*  let res = await fetch('http://13.124.141.28:3000/selectSentMessage', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
          }).then(res => res.json())*/
          .then(res => 
            {
              console.log(res.data);
              setBusiness(res.data.reverse());
              console.log("dddd" +business);
            });
      } catch (e) {
          console.error(e);
        }
  }
  savedData = async() => { 
    try {
        let work = message.split('(')[0];
        let busi = message.split('(')[1].split(')')[0];
        let d = message.split(' ')[1].split('에')[0];
        let dd = d.split('-');
        axios.post('http://13.124.141.28:3000/addWork', {
            business : busi,
            workername : work,
            month : dd[1]*1,
            date : dd[2]*1,
            day : 0,
            year : dd[0]*1,
            time : 0,
            subt : 0
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*let res = await fetch('http://13.124.141.28:3000/addWork', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business : busi,
            workername : work,
            month : dd[1]*1,
            date : dd[2]*1,
            day : 0,
            year : dd[0]*1,
            time : 0,
            subt : 0
          }),
        });*/
    } catch (e) {
        console.error(e);
      }
}
  function setModalVisibility(visible, msg ,t, index) {
      setIndex(index);
      setMessage(msg)
      setVisibility(visible)
  }
  function delMessage(i) { 
    Alert.alert(
      "메세지 삭제",
      "메세지를 삭제하시겠습니까?",
      [
        { text: "OK", onPress: () => {
          try {
            axios.post('http://13.124.141.28:3000/delMessage', {
              ind: i
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
          }).then((res) => {
            fetchData(idid);
            setModalVisibility(!visibility,'');
          })} catch (e) {
            console.error(e);
          }
        } },
        {
          text: "Cancel",
          onPress: () => setModalVisibility(!visibility,''),
          style: "cancel"
        }
        
      ]
    );
    
    
  }
    return (
      <View style={styles.image}>
      <View style={styles.container}>
        <View style={styles.listArea}>
        <ScrollView>
        {
          business.map((b, id) => (
            <View style={styles.messageArea}>
              <TouchableOpacity 
                style={styles.touchArea}
                onPress={() => setModalVisibility(true, b.message, b.time, b.ind)} 
              >
                  <View style={styles.titleArea}>
                    <Image style={styles.userImage} source={require('../../img/mm.png')}/>
                    <Text key={id} style={styles.textNameStyle}>{String(b.t)}</Text>
                  </View>
                <Text 
                  key={id} 
                  style={styles.textStyle}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >{String (" : "+ b.message)}</Text>
              </TouchableOpacity>
            </View>
              //<Button onPress={() => setModalVisibility(true, b.message, b.time)} key={id} title={String(b.message)}></Button>
          ))
        }

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visibility}
        >
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.modaltextStyle}>{message}</Text>
              <Text onPress={() => setModalVisibility(!visibility,'')} style={styles.modalBtn}>닫기</Text>
              <Text onPress={async() => {
                    await delMessage(index)
                  }} 
                  style={styles.modalBtn}>메세지 삭제</Text>
            </View>
          </View>
        </Modal>

             {/*} <Button
                color="#000"
                onPress={() => {
                  setModalVisibility(!visibility2,'',1)
                  savedData();
                }}
                title="네"
              />
              <Button
                color="#000"
                onPress={() => setModalVisibility(!visibility2,'',1)}
                title="아니오"
              />*/}
            
        </ScrollView> 
        </View>

        <View style={styles.sendBtnArea}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Send Message')}
          >
          <Image style={styles.btnImgStyle} source={require('../../img/message.png')}></Image>  
          </TouchableOpacity>
        </View>  
          
        </View>
      </View>
    );
  };
   
export default sentMessageScreen;