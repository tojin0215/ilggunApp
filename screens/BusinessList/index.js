import React, { useEffect, useState} from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  buttonArea: {
    width: '100%',
    height: hp('5%'),
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#46c3ad",
    width: "70%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
  addbutton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginBottom: 30,
    borderRadius: 35,
    

    ...Platform.select({
        ios: {
            shadowColor: 'rgba(0,0,0,0.2)',
            shadowOpacity: 1,
            shadowOffset: {height: 2, width: 2},
            shadowRadius: 2,
        },

        android: {
            elevation: 0,
            marginHorizontal: 30,
        },
      })
  },

}); 

const BusinessListScreen = ({navigation}) => {
  const [business, setBusiness] = useState([]);
  //const [idid, setId] = useState('');

  /*const [password, setPassword] = useState('');
  const storeToken = async(user) => {
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  const getToken = async() => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log("나와라라ㅏㅏㅏㅏ"+data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }*/
    ///setId('dd');
    async function fetchData() { 
        try {
            let res = await fetch('http://192.168.43.253:3000/selectBusiness', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                //id : idid
              }),
            }).then(res => res.json())
            .then(res => setBusiness(res));
            
            /*.then((response) => response.json())
            .then((res) => {
                //setBusiness(res);
            })*/
        } catch (e) {
            console.error(e);
          }
    }
    

    //React.useEffect(() => {
    /*  AsyncStorage.getItem("userData")
      .then((userData) => {
        console.log(JSON.parse(userData))
        fetchData(JSON.parse(userData))
      })*/
      
      /*const unsubscribe =*/ navigation.addListener('focus', () => {
          fetchData();
      });

      //return unsubscribe;
    //});
    
    return (
        <View style={styles.container}>
        {
          <View style={styles.buttonArea}>{
            business.map((b, id) => (
              <>
                <Text></Text><Text></Text>
                <TouchableOpacity 
                  key = {id}
                  style={styles.button}
                  onPress={() => {
                    AsyncStorage.setItem("bangCode", b.title)
                    .then(() =>{
                      navigation.navigate('Home')
                    })
                  }}>
                  <Text style={styles.buttonTitle}>{b.title}</Text>
                </TouchableOpacity>
                
              </>
            ))}
            </View>

        }
        <TouchableOpacity style={styles.addbutton} onPress={() => navigation.navigate('Add Business')}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        </View>
    );
};
export default BusinessListScreen;