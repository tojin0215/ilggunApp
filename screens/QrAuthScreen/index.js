import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import JWT from 'expo-jwt';

function QrAuthScreen({ navigation, route }) {
  const { bname, userId } = route.params;
  let { commute } = route.params;
//   const { setCommute } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [commuted, setCommute] = useState(commute);
  const key = 'abc'

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function commuteData() { 
    let err;  
    try {
        await axios.post('http://13.124.141.28:3000/updateCommute', {bang : bname, id:userId},
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        
          })
          .then(res => {
            if(res.data.result=="a"){
              Alert.alert("퇴근 완료!\n 오늘도 고생많으셨어요.");
            }else if(res.data.result=="b"){
              Alert.alert("출근 완료!");
            }else{
              Alert.alert("e");
            }
          })
    } catch (e) {
          console.log(err);
          console.error(e);
    }
          
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
        // alert(JSON.stringify(JWT.decode(data, key)));
        // Alert.alert(`${commuted}합니다`)
        setCommute(commuted=='출근'?'퇴근':'출근');
        commuteData()
    } catch(e) {
        alert(e);
        // console.error(e);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  };

  if (hasPermission === null) {
    return <Text>카메라 접근 권한을 허가바랍니다.</Text>;
  }
  if (hasPermission === false) {
    return <Text>카메라를 찾지 못했습니다.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'탭 시 다시 스캔'} onPress={() => setScanned(false)} />}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

export default QrAuthScreen;