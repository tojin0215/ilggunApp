import React from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, ImageBackground, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//====================================바뀐부분A======================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
      fontSize:wp('5.9%'),
      fontFamily:"NanumSquare",
  },
  image:{
    alignItems: 'center',
    justifyContent:'flex-start',
    width: "100%", height: "100%", 
  },
  buttonImg:{
    width: wp('75%'),
    height: hp('13%'),
    justifyContent: 'center',
    alignItems: 'center',

  }
});

//====================================바뀐부분A====================================== 
 
const WCalculatingScreen = ({navigation}) => {
  return (
//====================================바뀐부분B======================================
          <ImageBackground style={styles.image} source={require('../../img/page2_1.png')}>
{/* //====================================바뀐부분B====================================== */}
            <View style={styles.buttonArea}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('WCalculating1')}>
{/* //====================================바뀐부분C====================================== */}
                <Image style={styles.buttonImg} source={require('../../img/calculating1_purple.png')}/>  
{/* //====================================바뀐부분C====================================== */}          
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('WCalculating2')}>
{/* //====================================바뀐부분D====================================== */}
                <Image style={styles.buttonImg} source={require('../../img/calculating2_purple.png')}/>
{/* //====================================바뀐부분D====================================== */}
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('WCalculating3')}>
{/* //====================================바뀐부분E====================================== */}
                <Image style={styles.buttonImg} source={require('../../img/calculating3_purple.png')}/>
{/* //====================================바뀐부분E====================================== */}
              </TouchableOpacity>
            </View>
          </ImageBackground>
  );
};
export default WCalculatingScreen;