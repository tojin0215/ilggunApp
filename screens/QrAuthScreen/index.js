import React, { useState, useEffect, Component } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { Camera } from 'expo-camera';

const QrAuthScreen = ({ navigation, route }) => {
  const { bname, userId } = route.params;
  let { commute } = route.params;
  //   const { setCommute } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [commuted, setCommute] = useState(commute);
  const key = "abc";

  useEffect(() => {
    (async () => {
      const { status_not } = await Camera.requestPermissionsAsync();
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function commuteData(idid) {
    let err;
    try {
      await axios
        .post(
          "https://일꾼.kr/api/updateCommute",
          { bang: route.params.bname, id: idid },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.result == "a") {
            Alert.alert("퇴근 완료!\n 오늘도 고생많으셨어요.");
          } else if (res.data.result == "b") {
            Alert.alert("출근 완료!");
          } else {
            Alert.alert("e");
          }
        })
        .then((res) => {
          let day = "";
          let d = new Date().getDay();
          if (d == 0) day = "sun";
          else if (d == 1) day = "mon";
          else if (d == 2) day = "tue";
          else if (d == 3) day = "wed";
          else if (d == 4) day = "thu";
          else if (d == 5) day = "fri";
          else if (d == 6) day = "sat";
          axios
            .post(
              "https://일꾼.kr/api/selectTimelogAsWorker",
              {
                bang: route.params.bname,
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                date: new Date().getDate(),
                day: day,
                workername: idid,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            )
            .then(async (res) => {
              setTimelog(
                ((res.data[0].goto)? res.data[0].goto : '----')
                + ((res.data[0].leavee)? res.data[0].leavee : '----')
              )
              // let dic = {};
              // for (let i = 0; i < res.data.length; i++) {
              //   dic[res.data[i].workername] =
              //     (res.data[i].goto == null ? "" : res.data[i].goto) +
              //     (res.data[i].leavee == null ? "" : res.data[i].leavee);
              // }
              // console.log("-------------------------------------");
              // setTimelog(dic[idid]);
            });
        });
    } catch (e) {
      console.log(err);
      console.error(e);
    }
  }

  // async function commuteData() {
  //   let err;
  //   try {
  //     await axios
  //       .post(
  //         "https://일꾼.kr/api/updateCommute",
  //         { bang: bname, id: userId },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.result == "a") {
  //           Alert.alert("퇴근 완료!\n 오늘도 고생많으셨어요.");
  //         } else if (res.data.result == "b") {
  //           Alert.alert("출근 완료!");
  //         } else {
  //           Alert.alert("e");
  //         }
  //       });
  //   } catch (e) {
  //     console.log(err);
  //     console.error(e);
  //   }
  // }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    try {
      console.log(userId)
      if (data !== userId)Alert.alert("본인이 아닙니다.")
      else {
        setCommute(commuted == "출근" ? "퇴근" : "출근");
        commuteData(userId);
      }
      // Alert.alert(`${commuted}합니다`)
    } catch (e) {
      Alert.alert("올바른 QR이 아닙니다.")
      // alert(e);
      console.error(e);
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
      {scanned && (
        <Button title={"탭 시 다시 스캔"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default QrAuthScreen;
