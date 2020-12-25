import React, {useState} from 'react';
import { View, Modal, Text, Button, StyleSheet, ImageBackground, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import axios from 'axios';
const styles = StyleSheet.create({
  image:{
    width:'100%', height:'104%', paddingTop:hp('5%'), backgroundColor:'white',
    alignItems:"center"
  },
  listArea:{
    alignItems:"center",
    width:wp('100%'), height:hp('65%')
  },
  sendBtnArea:{
    justifyContent:"flex-end", alignItems:"center",
    width:'100%',
    height:hp('9%'),
    paddingBottom:hp('1%')
  },
  btnImgStyle:{
    width:wp('50%'),
    height:hp('6%')
  },
  messageArea:{
    flexDirection:'row',
    paddingLeft:wp('2%'), 
    height:hp('9%'), width:wp('80%'), 
    backgroundColor:'white',borderRadius:wp('3%'),
    marginBottom:hp('2%'),marginTop:hp('1%'),
    paddingTop:hp('1%'), paddingBottom:hp('1%'),
    borderWidth:wp('0.5%'),
    borderColor:'#DAE9F7'
  },
  userImage:{
    marginLeft:wp('2%'),
    width:wp('4.8%'), height:wp('5.7%'), marginTop:hp('1.6%'),
  },
  touchArea:{
    width:wp('70%'), height:hp('7%'),
    paddingTop:hp('2%'), paddingRight:wp('2%'),
    marginLeft:wp('1%'),
  },
  textStyle: {
    fontSize: wp('4.5%'),
    fontFamily:"NanumSquare",
    color:'#040525',
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
 
const ReceivedMessageScreen = ({ navigation, route }) => {
  const [id, setId] = useState('');
  //setId('dddd');
  //console.log(id);
  React.useEffect(() => {
    const unsubscribe =
      navigation.addListener('focus', () => {
        AsyncStorage.getItem("userData").then((userData) =>{
          setId(id => JSON.parse(userData).id);
          fetchData(JSON.parse(userData).id);
        });
      })
  return unsubscribe;
  }, []);

//===================================================
  const [business, setBusiness] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [visibility2, setVisibility2] = useState([]);
  const [visibility3, setVisibility3] = useState([]);
  const [message, setMessage] = useState('');
  async function fetchData(idid) { 
      try {
        axios.post('https://www.toojin.tk:3000/selectReceivedMessage', {
          t:idid
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
          /*let res = await fetch('https://www.toojin.tk:3000/selectReceivedMessage', {
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
              setBusiness(res.data);
              console.log("dddd" +business);
            });
      } catch (e) {
          console.error(e);
        }
  }
function setModalVisibility(visible, msg ,t) {
    if(!t){
      setMessage(msg)
      setVisibility(visible)
    }
    else if(t==2){
      setMessage(msg)
      setVisibility2(visible)
    }
    else if(t==1){
      setMessage(msg)
      setVisibility3(visible)
    }
  }

  async function savedData() { 
    try {
        let week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let work = message.split('(')[0];
        let busi = message.split('(')[1].split(')')[0];
        let d = message.split(' ')[1].split('에')[0];
        let dayOfWeek = week[new Date(d).getDay()];
        console.log(dayOfWeek);
        let dd = d.split('-');

        let ori = 0;
        axios.post('https://www.toojin.tk:3000/selectWorkerEach', {
          business: busi,
          workername: work
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
      /*let res = await fetch('https://www.toojin.tk:3000/selectWorkerEach', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business: busi,
          workername: work
         }),
      }).then(res => res.json())*/
      .then(res => {
        console.log(res)
        ori = res.data[0].eachtime.split('/');
        //console.log("오리"+ori);
      
      console.log("<<<<<<<<<<<<<<<<<<<<<<<"+-ori[new Date(d).getDay()]);
      axios.post('https://www.toojin.tk:3000/addWork', {
        business : busi,
        workername : work,
        month : dd[1]*1,
        date : dd[2]*1,
        day : dayOfWeek,
        year : dd[0]*1,
        time : 0,
        subt : -ori[new Date(d).getDay()]
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*res = await fetch('https://www.toojin.tk:3000/addWork', {
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
            day : dayOfWeek,
            year : dd[0]*1,
            time : 0,
            subt : -ori[new Date(d).getDay()]
          }),
        });*/
        });
    } catch (e) {
        console.error(e);
      }
    }
    addBang= async() => { 
      try {
          let busi = message.split('(')[1].split(')')[0];
         console.log("pppppppppppppp "+busi);

        axios.post('https://www.toojin.tk:3000/addBang', {
          bang: busi,
          id: id
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*let res = await fetch('https://www.toojin.tk:3000/addBang', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang: busi
          }),
        }).then(res => res.json())*/
   /*중복?     .then(res => {
          console.log(res)
        });
        axios.post('https://www.toojin.tk:3000/addBang', {
          bang: busi
        },
        {  headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
        })*/
        /*res = await fetch('https://www.toojin.tk:3000/addBang', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang: busi
          }),
        }).then(res => res.json())*/
        .then(res => {
          console.log(res)
        });
        axios.post('https://www.toojin.tk:3000/alterState', {
            bang: busi,
            type : 1,
            id : id
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*res = await fetch('https://www.toojin.tk:3000/alterState', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang: busi,
            type : 1,
            id : '/'
          }),
        }).then(res => res.json())*/
        .then(res => {
          console.log(res.data)
        });
      } catch (e) {
          console.error(e);
        }
    }
    return (
      <View>
        <ImageBackground style={styles.image} source={require('../../img/pageMsg.png')}>
        <View style={styles.listArea}>
        <ScrollView>
        
        {
          business.map((b, id) => (
          <View style={styles.messageArea}>
              
              <Image style={styles.userImage} source={require('../../img/user_blue.png')}/>
              <TouchableOpacity 
                style={styles.touchArea}
                onPress={() => setModalVisibility(true, b.message, b.type)} 
              >
                <Text 
                  key={id} 
                  style={styles.modaltextStyle}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >{String(b.f+" : "+ b.message)}</Text>
              </TouchableOpacity>
            </View>
          ))
        }

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visibility}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modaltextStyle}>{message}</Text>
                <Text onPress={() => setModalVisibility(!visibility,'')} style={styles.modalBtn}>닫기</Text>
            </View>
        </Modal>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visibility2}
        >

          <View style={styles.modalContainer}>
          <View>
              <Text style={styles.modaltextStyle}>{message}</Text>
              <View style={{flexDirection:"row"}}>
                <Text
                  style={styles.modalBtn2}
                  onPress={() => {
                    setModalVisibility(!visibility2,'',2)
                    savedData();
                  }}
                >네</Text>
                <Text
                  style={styles.modalBtn2}
                  onPress={() => setModalVisibility(!visibility2,'',2)}
                >아니오</Text>
              </View>
              </View>
          </View>
        </Modal>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visibility3}
        >
          <View style={styles.modalContainer}>
            <View>

              <Text style={styles.modaltextStyle}>{message}</Text>
              <View style={{flexDirection:"row"}}>
                <Text
                  style={styles.modalBtn2}
                  onPress={() => {
                    setModalVisibility(!visibility3,'',1)
                    addBang();
                  }}
                >네</Text>
                <Text
                  style={styles.modalBtn2}
                  onPress={() => setModalVisibility(!visibility3,'',1)}
                >아니오</Text>
              </View>
              </View>
          </View>
        </Modal></ScrollView> 
      </View>

      <View style={styles.sendBtnArea}>
      
        <TouchableOpacity
          onPress={() => navigation.navigate('Send Message')}
        >
        <Image style={styles.btnImgStyle} source={require('../../img/message.png')}></Image>  
        </TouchableOpacity>
      </View>  
        
      </ImageBackground>
      </View>
    );
  };
   
export default ReceivedMessageScreen;