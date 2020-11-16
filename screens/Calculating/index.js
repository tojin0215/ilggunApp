import React from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
 
const CalculatingScreen = ({navigation}) => {
  return (
    <View style={styles.buttonArea}>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Calculating1')}>
        <Text style={styles.buttonTitle}>인건비 계산</Text>
      </TouchableOpacity>
      <Text></Text><Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Calculating2')}>
        <Text style={styles.buttonTitle}>퇴직금 계산</Text>
      </TouchableOpacity>
      <Text></Text><Text></Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Calculating3')}>
        <Text style={styles.buttonTitle}>실업급여 계산</Text>
      </TouchableOpacity>
      <Text></Text><Text></Text>
    </View>
  );
};
export default CalculatingScreen;