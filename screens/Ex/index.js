import React, { Component } from 'react';
import { Button, Linking, View, StyleSheet } from 'react-native';

import Constants from 'expo-constants';

export default class ExScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Open URL with ReactNative.Linking"
          onPress={this._handleOpenWithLinking}
          style={styles.button}
        />
      </View>
    );
  }

  _handleOpenWithLinking = () => {
    console.log(`${Expo.Constants.linkingUri}`);
    Linking.openURL('exp://192.168.43.253:19000');
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  button: {
    marginVertical: 10,
  },
});