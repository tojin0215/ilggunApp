import React, {useState} from 'react';
import { View, Modal, Text, Button, StyleSheet, ImageBackground, Image,Platform} from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
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
    flexDirection:'row',
    paddingLeft:wp('2%'), 
    height:hp('9%'), width:wp('80%'), 
    backgroundColor:'white',borderRadius:wp('3%'),
    marginBottom:hp('2%'),marginTop:hp('1%'),
    paddingTop:hp('1%'), paddingBottom:hp('1%'),
    borderWidth:wp('0.5%'),
    borderColor:'#DAE9F7'
  },
  readMessageArea:{
    flexDirection:'row',
    paddingLeft:wp('2%'), 
    height:hp('9%'), width:wp('80%'), 
    backgroundColor:'white',borderRadius:wp('3%'),
    marginBottom:hp('2%'),marginTop:hp('1%'),
    paddingTop:hp('1%'), paddingBottom:hp('1%'),
    borderWidth:wp('0.5%'),
    borderColor:'#d3d5e2'
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
    width:wp('29%'), height:hp('5.5%'),
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
    //const unsubscribe =
      navigation.addListener('focus', () => {
        AsyncStorage.getItem("userData").then((userData) =>{
          setId(id => JSON.parse(userData).id);
          fetchData(JSON.parse(userData).id);
        });
      });
  //return unsubscribe;
  }, []);

//===================================================
  const [business, setBusiness] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [visibility2, setVisibility2] = useState([]);
  const [visibility3, setVisibility3] = useState([]);
  const [message, setMessage] = useState('');
  const [index, setIndex] = useState(-1);
  const [to, setTo] = useState('');
  async function fetchData(idid) { 
      try {
        await axios.post('https://??????.kr/api/selectReceivedMessage', {
          t:idid, ft:0
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
          /*let res = await fetch('https://??????.kr/api/selectReceivedMessage', {
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
function setModalVisibility(visible, msg ,t, index, r) {
    setIndex(index);
    if(!t||r==1||t==3){
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
  async function savedData(t) { 
    let busi = message.split('(')[1].split(')')[0];
    axios.post('https://??????.kr/api/selectBusinessByName', {
            bname: busi
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
          .then(async(res) => {
            if(res.data[0] === undefined){
              await setModalVisibility(!visibility,'')
              console.log("??? ?????? ???????????? ???????????? ????????????.")
              alert("??? ?????? ???????????? ???????????? ????????????.")
            }else{
            
              try {
                  let week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                  let work = message.split('(')[0];
                  busi = message.split('(')[1].split(')')[0];
                  let d = message.split(')?????? ')[1].split('???')[0];
                  let dayOfWeek = week[new Date(d).getDay()];
                  console.log(dayOfWeek);
                  let dd = d.split('-');
                  console.log(work+"/"+busi+"/"+d+"/"+dayOfWeek+"/"+dd)
                  let ori = 0;
                  axios.post('https://??????.kr/api/selectWorkerEach', {
                    business: busi,
                    workername: work
                  },
                  {  headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
                  })
                /*let res = await fetch('https://??????.kr/api/selectWorkerEach', {
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
                  console.log("??????"+ori);
                console.log(d)
                console.log(new Date(d).getDay());
                console.log("<<<<<<<<<<<<<<<<<<<<<<<"+-ori[new Date(d).getDay()]);


                let oris=''
                if (t == 1) {
                  oris = -ori[new Date(d).getDay()]
                }else{
                  oris = 0
                }
                axios.post('https://??????.kr/api/addWork', {
                  business : busi,
                  workername : work,
                  month : dd[1]*1,
                  date : dd[2]*1,
                  day : dayOfWeek,
                  year : dd[0]*1,
                  time : 0,
                  subt : oris
                  },
                  {  headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
                  })
                  });
              
                  if (t == 2) {
                    try {
                      axios.post('https://??????.kr/api/sendMessage', {
                        f: id,
                        message :"<"+busi+">?????? "+to+"?????? ?????? ?????? ??????("+d+")??? ?????????????????????.",
                        t: to,
                        r:0,
                        system:1,
                        type:3
                      },
                      {  headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'}
                    }).then((res) => {
                    })} catch (e) {
                      console.error(e);
                    }
                    
                  } else if(t == 3){
                    try {
                      axios.post('https://??????.kr/api/sendMessage', {
                        f: id,
                        message :"<"+busi+">?????? "+to+"?????? ?????? ?????? ??????("+d+")??? ?????????????????????.",
                        t: to,
                        r:0,
                        system:1,
                        type:3
                      },
                      {  headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'}
                    }).then((res) => {
                    })} catch (e) {
                      console.error(e);
                    }
                  }

                } catch (e) {
                  console.error(e);
                }
            }
          }); 
    }

    async function alterRead() {
      try {
        axios.post('https://??????.kr/api/alterReadMessage', {
          ind:index,
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        .then(res => 
          {
              fetchData(id);
              //console.log(res.data);
          });
      } catch (e) {
          console.error(e);
      }
    }

    async function addBang(){ 
      try {
          let busi = message.split('(')[1].split(')')[0];
          axios.post('https://??????.kr/api/selectBusinessByName', {
            bname: busi
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
          .then(async(res) => {
            if(res.data[0] === undefined){
              await setModalVisibility(!visibility,'')
              console.log("??? ?????? ???????????? ???????????? ????????????.")
              alert("??? ?????? ???????????? ???????????? ????????????.")
            }else{
              axios.post('https://??????.kr/api/addBang', {
                bang: busi,
                id: id
              },
              {  headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
              })
              .then(res => {
                console.log(res)
              });
              axios.post('https://??????.kr/api/alterState', {
                  bang: busi,
                  type : 1,
                  id : id
              },
              {  headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
              })
              .then(res => {
                console.log(res.data)
              });
              axios.post('https://??????.kr/api/selectBusinessByName', {
                bname : busi
                },
                {  headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'}
                })
                .then(res => {
                  console.log("<"+busi+"> ????????? '"+id+"'??? ????????? ???????????????");
                  try {
                    axios.post('https://??????.kr/api/sendMessage', {
                      f: id,
                      message :"<"+busi+"> ????????? '"+id+"'??? ????????? ???????????????. ?????????????????? ??????????????????.",
                      t: res.data[0].id,
                      r:0,
                      system:1,
                      type:3
                    },
                    {  headers:{
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'}
                  }).then((res) => {
                  })} catch (e) {
                    console.error(e);
                  }
            });
          }
        });
      } catch (e) {
          console.error(e);
        }

    }

    function massageX(i) { 
      let busi = message.split('(')[1].split(')')[0];
      if(i == 2){
        try {
          axios.post('https://??????.kr/api/sendMessage', {
            f: id,
            message :"<"+busi+">?????? "+to+"?????? ?????? ????????? ?????????????????????.",
            t: to,
            r:0,
            system:1,
            type:3
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        }).then((res) => {
        })} catch (e) {
          console.error(e);
        }
      }else if(i == 3){
        
        axios.post('https://??????.kr/api/selectBusinessByName', {
          bname : busi
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
          .then(res => {
            try {
              axios.post('https://??????.kr/api/sendMessage', {
                f: id,
                message :"<"+busi+"> ????????? '"+id+"'?????? ????????? ??????????????????.",
                t: res.data[0].id,
                r:0,
                system:1,
                type:3
              },
              {  headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
            }).then((res) => {
            })} catch (e) {
              console.error(e);
            }
          });

      }
    }
    function delMessage(i) { 
      Alert.alert(
        "????????? ??????",
        "???????????? ?????????????????????????",
        [
          { text: "OK", onPress: () => {
            try {
              axios.post('https://??????.kr/api/delMessage', {
                ind: i
              },
              {  headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
            }).then((res) => {
              fetchData(id);
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
          <View style={b.r?styles.readMessageArea:styles.messageArea}>
              <Image style={styles.userImage} source={require('../../img/user_blue.png')}/>
              <TouchableOpacity 
                style={styles.touchArea}
                onPress={() => {
                    setModalVisibility(true, b.message, b.type, b.ind, b.r)
                    setTo(b.t);
                  }
                } 
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
                <Text onPress={() => {
                    setModalVisibility(!visibility,'');
                    alterRead();
                  }} 
                  style={styles.modalBtn}>??????</Text>
                <Text onPress={async() => {
                  console.log("indexxxxxxxxx : " +index)
                    await delMessage(index)
                  }} 
                  style={styles.modalBtn}>????????? ??????</Text>
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
                    savedData(2);
                    alterRead();

                  }}
                  >??????</Text>
                  <Text
                    style={styles.modalBtn2}
                    onPress={() => {
                      setModalVisibility(!visibility2,'',2)
                      savedData(3);
                      alterRead();
  
                    }}
                  >??????</Text>
                <Text
                  style={styles.modalBtn2}
                  onPress={() => {
                    setModalVisibility(!visibility2,'',2)
                    alterRead();
                    massageX(2);
                  }}
                >?????????</Text>
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
                    alterRead();
                  }}
                >???</Text>
                <Text
                  style={styles.modalBtn2}
                  onPress={() => {
                    setModalVisibility(!visibility3,'',1);
                    massageX(3);
                    alterRead();
                  }}
                >?????????</Text>
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
        
      </View>
      </View>
    );
  };
   
export default ReceivedMessageScreen;