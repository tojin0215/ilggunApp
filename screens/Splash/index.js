import React from 'react';
import { Image, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 
const SplashScreen = () => {
  return (
    <Image style={styles.container} source={require('../../assets/splash.png') }/> 
  );
};
 
export default SplashScreen;