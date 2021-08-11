import React from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, ImageBackground, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {    
    width: "100%", height: "100%",
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  buttonArea: {
    marginTop:hp('5%'),
    width: '100%',
    height: hp('13%'),
    alignItems: 'center',
  },
  button: {
    width: "75%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:wp('5%'),
    marginTop:hp('2.5%')
  },
  buttonTitle: {
      color: '#040525',
      fontSize:wp('5.9rem'),
      fontFamily:"NanumSquare",
  },
  image:{
    alignItems: 'center',
    width: "100%", height: "100%",
    backgroundColor:'#7085DF' 
  },
  buttonImg:{
    width: wp('75%'),
    height: hp('13%'),
    justifyContent: 'center',
    alignItems: 'center',

  }
});

 
const WCalculatingScreen = ({navigation}) => {
  return (
  <View style={styles.image}>
  <View style={styles.container}>
            <View style={styles.buttonArea}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('WCalculating1')}>
                <Image style={styles.buttonImg} source={require('../../img/calculating1_purple.png')}/>       
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('WCalculating2')}>
                <Image style={styles.buttonImg} source={require('../../img/calculating2_purple.png')}/>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('WCalculating3')}>
                <Image style={styles.buttonImg} source={require('../../img/calculating3_purple.png')}/>
              </TouchableOpacity>
              </View>
            </View>
            </View>
  );
};
export default WCalculatingScreen;