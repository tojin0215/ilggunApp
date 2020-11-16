import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  worker: {
    flexDirection: 'row'
  },
  buttonArea: {
    width: '100%',
    height: hp('5%'),
  },
  button: {
      backgroundColor: "#46c3ad",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
});

const WorkerManageScreen = ({navigation}) => {
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
                type : 2
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
        <View style={styles.container}>
        {
            business.map((b, id) => (
            <View style={styles.worker}  key={id}>
              <Text>{b.workername}</Text>
              <Button
                title = "계약서"
                onPress={() => navigation.navigate('Contract FormA')}
                />
            </View>
            ))
        }
        <View style={styles.buttonArea}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Invite')}>
            <Text style={styles.buttonTitle}>초대하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};
export default WorkerManageScreen;