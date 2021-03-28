import React, { useEffect, useState} from 'react';
import { AsyncStorage } from 'react-native';
import { ScrollView, View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import axios from 'axios';
const styles = StyleSheet.create({
  container: {
    width: "100%", height: "100%",
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
    alignItems:"center",    
  },
  image:{
    justifyContent: "flex-start",
    alignItems:"center",    
    width: "100%", height: "100%",
    backgroundColor:'#67C8BA'
  },
  text: {
    fontSize: wp('15%'),
    textAlign: 'center',
    color: 'white',
    fontFamily:"NanumSquare",
  },
  btnArea:{
    width: '100%',
    height: hp('70%'),
    alignItems:"center",
    marginTop:hp('7%'),
    paddingBottom:hp('3%')
  },
  buttonArea: {
    width: wp('100%'),
    height: '100%',
    alignItems:"center",
    justifyContent:"flex-start",
  },
  buttonTitle: {
      color: '#040525',
      fontSize:wp('5%'),
      fontFamily:"NanumSquare",
  },
  AddbtnArea:{
    width: '100%',
    height: hp('15%'),
    paddingTop:hp('3%'),
    alignItems:"center",
  },
  addbutton: {
    backgroundColor: '#67C8BA',
    position:"absolute",
    alignItems:"center",
    bottom: hp('2%'),
    width: "100%",
    width: wp('15%'),
    height: wp('15%'),
    marginBottom: hp('5%'),
    borderRadius: wp('15%'),
    
  ...Platform.select({
      ios: {
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowOpacity: 1,
          shadowOffset: {height: 2, width: 2},
          shadowRadius: 2,
      },

      android: {
          elevation: 0,
          marginHorizontal:  hp('5%'),
      },
    })
},

}); 

const BusinessListScreen = ({navigation}) => {
  const [business, setBusiness] = useState([]);
  const [clicked, setClicked] = useState(-1);
  const [id, setId] = useState('');
 
  React.useEffect(() => {
    let toggle = false;
    navigation.addListener('focus', () => {
      AsyncStorage.getItem("userData").then((userData) =>{
        setId(JSON.parse(userData).id);
        fetchData(JSON.parse(userData).id);
      });
    });
  }, []);

    async function fetchData(idid) { 
        try {
          await axios.post('https://www.toojin.cf:3000/selectBusiness', {id:idid},
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
            .then(res => {
              setBusiness(res.data)
              console.log("여기용222");
            });
        } catch (e) {
            console.error(e);
          }
    }
    
    return (
      <View style={styles.image}>
    <View style={styles.container}>


      <View style={styles.btnArea}>
      <ScrollView>
        {
          <View style={styles.buttonArea}>{
            business.map((b, id) => (
              <>
                <TouchableOpacity 
                  key = {id}
                  style={{
                    backgroundColor: clicked==id?"#67C8BA":"#E2F2EF",
                    width: "75%",
                    height: hp('6%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:wp('5%'),
                    marginTop:hp('2.5%')
                  }}
                  onPress={() => {
                    setClicked(id)
                    AsyncStorage.setItem("bangCode", b.bname)
                    .then(() =>{
                      setClicked(-1)
                      navigation.navigate('Home')
                    })
                  }}>
                  <Text style={styles.buttonTitle}>{b.bname}</Text>
                </TouchableOpacity>
                
              </>
            ))}
            </View>

        }
        </ScrollView>
      </View>

        <View style={styles.AddbtnArea}>
          <TouchableOpacity style={styles.addbutton} onPress={() => navigation.navigate('Add Business')}>
              <Text style={styles.text}>+</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

    );
};
export default BusinessListScreen;