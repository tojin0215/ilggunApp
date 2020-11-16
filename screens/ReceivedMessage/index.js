import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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

    return (
      <View style={styles.container}>
        {
          business.map((b, id) => (
              <Text key={id}>{b.f} | {b.message}</Text>
          ))
        }
        <Button
        title="메세지 보내기"
        onPress={() => navigation.navigate('Send Message')}
      />
      </View>
    );
  };
   
export default ReceivedMessageScreen;