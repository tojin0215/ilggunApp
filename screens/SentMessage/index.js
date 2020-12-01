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
  mainContainer: {
    marginTop: 22,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    backgroundColor: '#fff', padding: 20
  },
});
 
const sentMessageScreen = ({ navigation }) => {
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
  const [message, setMessage] = useState('');
  
  async function fetchData() { 
      try {
          let res = await fetch('http://192.168.43.253:3000/selectSentMessage', {
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
  savedData = async() => { 
    try {
        let work = message.split('(')[0];
        let busi = message.split('(')[1].split(')')[0];
        let d = message.split(' ')[1].split('에')[0];
        let dd = d.split('-');
        let res = await fetch('http://192.168.43.253:3000/addWork', {
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
    else{
      setMessage(msg)
      setVisibility2(visible)
    }
  }
    return (
      <View style={styles.container}>
        {
          business.map((b, id) => (

              <Button onPress={() => setModalVisibility(true, b.message, b.time)} key={id} title={String(b.message)}></Button>
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

        <Button
        title="메세지 보내기"
        onPress={() => navigation.navigate('Send Message')}
      />
      </View>
    );
  };
   
export default sentMessageScreen;