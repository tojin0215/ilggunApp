import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
        <View style={styles.container}>
        {
            business.map((b, id) => (
              <View style={{flexDirection: 'row'}}>
                <Text>{b.workername}</Text>
                <Button
                  title = "계약서"
                  onPress={() => navigation.navigate('Contract FormB')}
                  />
              </View>
            ))
        }
        </View>
    );
};
export default WorkerManageScreen2;