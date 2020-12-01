import React, {useState} from 'react';
import { View, Modal, Text, Button, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
const ReceivedMessageScreen = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe =
      navigation.addListener('focus', () => {
          fetchData()
      })
  return unsubscribe;
  }, [navigation, this.fetchData]);
//===================================================
  const [business, setBusiness] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [visibility2, setVisibility2] = useState([]);
  const [visibility3, setVisibility3] = useState([]);
  const [message, setMessage] = useState('');
  async function fetchData() { 
      try {
          let res = await fetch('http://192.168.43.253:3000/selectReceivedMessage', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
          }).then(res => res.json())
          .then(res => 
            {
              console.log(res);
              setBusiness(res);
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

  savedData = async() => { 
    try {
      

        let week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        let work = message.split('(')[0];
        let busi = message.split('(')[1].split(')')[0];
        let d = message.split(' ')[1].split('에')[0];
        let dayOfWeek = week[new Date(d).getDay()];
        console.log(dayOfWeek);
        let dd = d.split('-');

        let ori = 0;
      let res = await fetch('http://192.168.43.253:3000/selectWorkerEach', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business: busi,
          workername: work
         }),
      }).then(res => res.json())
      .then(res => {
        ori = res[0].eachtime.split('/');
        console.log("오리"+ori);
      });
      console.log("<<<<<<<<<<<<<<<<<<<<<<<"+-ori[new Date(d).getDay()]);
        res = await fetch('http://192.168.43.253:3000/addWork', {
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
        });
    } catch (e) {
        console.error(e);
      }
    }
    addBang= async() => { 
      try {
          let busi = message.split('(')[1].split(')')[0];
         console.log("pppppppppppppp "+busi);
        let res = await fetch('http://192.168.43.253:3000/addBang', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang: busi
          }),
        }).then(res => res.json())
        .then(res => {
          console.log(res)
        });
        res = await fetch('http://192.168.43.253:3000/addBang', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang: busi
          }),
        }).then(res => res.json())
        .then(res => {
          console.log(res)
        });
        res = await fetch('http://192.168.43.253:3000/alterState', {
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
        }).then(res => res.json())
        .then(res => {
          console.log(res)
        });
      } catch (e) {
          console.error(e);
        }
    }
    return (
      <View style={styles.container}>
        
        {
          business.map((b, id) => (

              <Button onPress={() => setModalVisibility(true, b.message, b.type)} key={id} title={String(b.f+" : "+ b.message)}></Button>
          ))
        }

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visibility}
        >
          <View style={styles.modalContainer}>
            <View>
              <Text>{message}</Text>
              <Button
                color="#000"
                onPress={() => setModalVisibility(!visibility,'')}
                title="Hide Modal"
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visibility2}
        >
          <View style={styles.modalContainer}>
            <View>
              <Text>{message}</Text>
              <Button
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
              />
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
              <Text>{message}</Text>
              <Button
                color="#000"
                onPress={() => {
                  setModalVisibility(!visibility3,'',1)
                  addBang();
                }}
                title="네"
              />
              <Button
                color="#000"
                onPress={() => setModalVisibility(!visibility3,'',1)}
                title="아니오"
              />
              </View>
          </View>
        </Modal>
        <Text></Text>
        <Button
        title="메세지 보내기"
        onPress={() => navigation.navigate('Send Message')}
      />
      </View>
    );
  };
   
export default ReceivedMessageScreen;