import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

const InviteScreen = ({ navigation, props }) =>  {

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={()=>console.log('hi')}>
          <View style={styles.button}>
            <Text style={styles.content}>제로웹 카카오톡 공유하기</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef01b',
  },
  button: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#556677',
    borderRadius: 5,
  },
  content: {
    fontSize: 24,
    color: 'white',
  }
});
export default InviteScreen;