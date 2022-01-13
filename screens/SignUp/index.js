import React, { useState } from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

import SigniturePadComponent from "../../components/SigniturePad";

import styles from "./styles";

const SignUpScreen = ({ onSignUp, navigation }) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const [path, setPath] = useState("");
  const [savePath, setSavePath] = useState("");
  const [touchOut, setTouchOut] = useState(false);
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);

  const SignPost = async (str) => {
    try {
      let regEmail =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      let reg = /^[0-9a-zA-Z]{2,15}$/;
      if (!regEmail.test(email)) {
        Alert.alert("이메일 주소가 맞는지 확인해주세요.");
      } else if (!reg.test(password)) {
        Alert.alert(
          "비밀번호가 영어대소문자, 숫자로만 이루어져있는지 확인해주세요."
        );
      } else if (
        name == "" ||
        email == "" ||
        password == "" ||
        repassword == "" ||
        path == ""
      ) {
        Alert.alert("빈 칸을 채워주세요.");
      } else if (password != repassword) {
        Alert.alert(
          "비밀번호와 재확인 비밀번호가 다릅니다.\n 다시 확인해주세요."
        );
      } else {
        await axios
          .post(
            "https://일꾼.kr/api/signup",
            {
              id: email,
              email: email,
              name: name,
              password: password,
              sign: savePath,
              code: null,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            /*let res = await fetch('https://일꾼.kr/api/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:email,
          name:name,
          password: password,
          sign:savePath
        }),
      }); */
            //res = await res;

            if (res.data.err != null) {
              Alert.alert("이미 존재하는 ID입니다. \n변경해주세요.");
            } else {
              navigation.navigate("Sign In");
              Alert.alert("회원가입이 완료되었습니다.");
            }
          });
      }
    } catch (e) {
      console.error(e);
    }
  };
  // emailCheck = (email) =>{
  //   let check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  //   return check.test(email) ? true : false ;
  // }

  // handleSubmit=()=>{
  //     console.log(this.state.Email + '  ' + this.state.Password  + '  ' + this.state.RePassword+ '  ' + this.state.Name  + '  ' + this.state.itemA)
  //       if(this.state.Email == null || this.state.Password == null || this.state.RePassword == null || this.state.Name == null){
  //           Alert.alert('빈칸없이 입력해주세요.')
  //       } else{
  //           if(this.emailCheck(this.state.Email) == false){
  //             Alert.alert('이메일 형식이 유효하지 않습니다.');
  //             this.setState({
  //               Email:null,
  //             })
  //           } else{
  //             if(this.state.Password != this.state.RePassword){
  //               Alert.alert('비밀번호를 다시 확인해주세요.');
  //               this.setState({
  //                   Password:null,
  //                   RePassword:null
  //               })
  //           }
  //           }

  //       }
  // }

  return (
    <View style={styles.image}>
      <View style={styles.container}>
        <View style={styles.formArea}>
          <ScrollView scrollEnabled={false}>
            <View style={styles.textArea}>
              <Text style={styles.titleStyle}>이름</Text>
              <TextInput
                onChangeText={(name) => setName(name)}
                defaultValue={name}
                style={styles.textStyle}
                placeholder={"이름을 입력하세요."}
              />
            </View>

            <View style={styles.textArea}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.titleStyle}>EMAIL</Text>
              </View>
              <TextInput
                onChangeText={(email) => setEmail(email)}
                defaultValue={email}
                style={styles.textStyle}
                placeholder={"이메일을 입력하세요."}
              />
            </View>

            <View style={styles.textArea}>
              <Text style={styles.titleStyle}>비밀번호</Text>
              <TextInput
                onChangeText={(password) => setPassword(password)}
                defaultValue={password}
                style={styles.textStyle}
                secureTextEntry={true}
                placeholder={"비밀번호를 입력하세요."}
              />
            </View>

            <View style={styles.textArea}>
              <Text style={styles.titleStyle}>비밀번호 확인</Text>
              <TextInput
                onChangeText={(repassword) => setrePassword(repassword)}
                defaultValue={repassword}
                style={styles.textStyle}
                secureTextEntry={true}
                placeholder={"비밀번호를 한번 더 입력하세요."}
              />
            </View>
            <SigniturePadComponent 
            path={path}
            setPath={setPath}
            savePath={savePath}
            setSavePath={setSavePath}
            />
            {/* <View style={styles.textArea2}>
              <View style={styles.signBtnArea}>
                <Text style={styles.titleSignStyle}>서명</Text>
                <TouchableOpacity
                  style={styles.signBtnArea2}
                  onPress={async () => {
                    setTouchOut(false);
                    setLocationX(0);
                    setLocationY(0);
                    setPath("");
                    setSavePath("");
                  }}
                >
                  <Text style={styles.signTextStyle}>지우기</Text>
                </TouchableOpacity>
              </View>
              <SigniturePadComponent 
                path={path}
                savePath={savePath}

                setSavePath={setSavePath}
                setPath={setPath}
              />
              <View
                style={styles.sign}
                onTouchMove={(e) => {
                  if (touchOut) return;
                  else if (
                    Math.abs(locationX - e.nativeEvent.locationX) > 300 ||
                    Math.abs(locationY - e.nativeEvent.locationY) > 200
                  ) {
                    setTouchOut(true);
                    setLocationX(0);
                    setLocationY(0);
                  } else {
                    setTouchOut(false);

                    setLocationX(e.nativeEvent.locationX);
                    setLocationY(e.nativeEvent.locationY);
                    setSavePath(
                      savePath +
                        " " +
                        e.nativeEvent.locationX +
                        "," +
                        e.nativeEvent.locationY
                    );
                    setPath(
                      path +
                        " L" +
                        e.nativeEvent.locationX +
                        " " +
                        e.nativeEvent.locationY
                    );
                  }
                }}
                ontouchend={(e) => {
                  // 호출안됨
                  if (touchOut) setTouchOut(false);
                  else {
                    setTouchOut(false);
                    setLocationX(0);
                    setLocationY(0);
                    setSavePath(savePath);
                    setPath(path + " Z");
                  }

                }}
                onTouchStart={(e) => {
                  setTouchOut(false);
                  setLocationX(e.nativeEvent.locationX);
                  setLocationY(e.nativeEvent.locationY);
                  setSavePath(
                    savePath +
                      " " +
                      e.nativeEvent.locationX +
                      "," +
                      e.nativeEvent.locationY
                  );
                  setPath(
                    path +
                      " M" +
                      e.nativeEvent.locationX +
                      " " +
                      e.nativeEvent.locationY
                  );
                }}
              >
                <Svg>
                  <Path d={path} fill="none" stroke="black" />
                </Svg>
              </View>
            </View> */}

            <View style={styles.buttonArea}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => SignPost()}
              >
                <Text style={styles.buttonTitle}>완료</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonlogoArea}>
          <Image
            style={styles.logobottom}
            source={require("../../img/logo_bottom.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
