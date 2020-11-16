import React, {useState} from 'react';
import { AsyncStorage } from 'react-native';
import {
  View,
  Text, Button,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 
const SelectScreen = ({ onSignIn, navigation }) => {

  return (
    <View style={styles.container}> 
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('Business List')}>
                        <Text style={styles.buttonTitle}>사업주</Text>
                    </TouchableOpacity>

                    <Text>  </Text>
                    <TouchableOpacity 
                      style={styles.button}
                      onPress={() => navigation.navigate('Worker Business List')}>
                      <Text style={styles.buttonTitle}>근로자</Text>
                    </TouchableOpacity>
                </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: wp('10%'),
      paddingRight: wp('10%'),
      justifyContent: 'center',
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
})

export default SelectScreen;