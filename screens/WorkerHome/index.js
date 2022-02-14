import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { AsyncStorage } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Font from "expo-font";
import axios from "axios";

import { getUserData } from "../../utils/storage";
import { postloginHistoryWorker } from "../../api/Api";
import moment from "moment";
const SERVER_URL = "http://13.124.141.28:3000/";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: wp("13%"),
    borderTopLeftRadius: wp("13%"),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  timeText: {
    height: "3%",
    marginTop: hp("5%"),
    marginBottom: hp("0%"),
  },
  textTitle1: {
    fontSize: 15,
    fontFamily: "NanumSquareB",
  },
  textTitle2: {
    marginTop: hp("0.5%"),
    fontSize: 15,
    fontFamily: "NanumSquareB",
  },
  text1: {
    fontSize: 15,
    fontFamily: "NanumSquare",
  },
  text2: {
    marginTop: hp("0.5%"),
    fontSize: 15,
    fontFamily: "NanumSquare",
    color: "#7085DF",
  },

  image: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#7085DF",
  },
  buttonArea1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("10%"),
  },
  buttonArea2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  button: {
    width: wp("40%"),
    height: wp("40%"),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImg: {
    width: wp("40%"),
    height: wp("40%"),
  },
  button2: {
    width: wp("40%"),
    height: wp("23%"),
    justifyContent: "center",
    alignItems: "center",
  },
  todobuttonImg: {
    width: wp("80%"),
    height: hp("7.2%"),
  },
  tinyLogo: {
    width: wp("11%"),
    height: wp("11%"),
    marginLeft: wp("4%"),
  },
  rowArea: {
    flexDirection: "row",
    marginRight: wp("5%"),
  },
  titleText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NanumSquare",
    marginTop: hp("1.7%"),
  },
});

const getDayStr = (date_obj) => {
  switch (date_obj.getDay()) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fir";
    case 6:
      return "sat";
    default:
      return "sun";
  }
};

const getWorkTodos = (business_name, date_obj, worker_id) => {
  console.log("++getWorkTodo++");
  const data = {
    bang: business_name,
    year: date_obj.getFullYear(),
    month: date_obj.getMonth() + 1,
    date: date_obj.getDate(),
    worker: worker_id,
  };
  return axios
    .post(`${SERVER_URL}selectWorkTodo`, data)
    .then((response) => response.data);
};

const getBusinessByWorker = (worker_id) => {
  return axios
    .post(`${SERVER_URL}selectBusinessByWorker`, { id: worker_id })
    .then((response) => response.data[0]);
};

const getWorkerTimelog = (business_name, date_obj, worker_id) => {
  const data = {
    bang: business_name,
    year: date_obj.getFullYear(),
    month: date_obj.getMonth() + 1,
    date: date_obj.getDate(),
    day: getDayStr(date_obj),
    workername: worker_id,
  };
  return axios
    .post(`${SERVER_URL}selectTimelogAsWorker`, data)
    .then((response) => response.data);
};

const getWorker = (business_name, worker_id) => {
  const data = {
    business: business_name,
    workername: worker_id,
  };
  return axios
    .post(`${SERVER_URL}businessWorker`, data)
    .then((response) => response.data[0]);
};

const getWorkerByDay = (business_name, date_obj, worker_id) => {
  const data = {
    business: business_name,
    year: date_obj.getFullYear(),
    month: date_obj.getMonth() + 1,
    date: date_obj.getDate(),
    day: getDayStr(date_obj),
    workername: worker_id,
  };
  return axios.post(`${SERVER_URL}selectWorkerAsDayAsWorker`, data);
};

const WorkerHomeScreen = ({ navigation, route }) => {
  const [commute, setCommute] = useState([]);
  const [time, setTime] = useState("");
  const [timelog, setTimelog] = useState("");

  useEffect(() => {
    getUserData().then((user_data) => {
      postloginHistoryWorker(
        user_data.name,
        moment().format("YYYY-MM-DD a h:mm:ss"),
        route.params.bname
      );
    });
  }, []);

  navigation.addListener(
    "focus",
    () => {
      navigation.setOptions({
        headerLeft: () => (
          <View style={styles.rowArea}>
            <Image
              style={styles.tinyLogo}
              source={require("../../img/logo_purple.png")}
            />
            <Text style={styles.titleText}>{route.params.bname}</Text>
          </View>
        ),
      });
      let isMounted = true;

      function f() {
        if (isMounted) {
          fetchData(route.params.bname, route.params.id);
        }
      }
      f();
      return () => {
        isMounted = false;
      };
    },
    []
  );

  const [state, setState] = useState(0);
  const [worktodo, setWorktodo] = useState(0);
  useEffect(() => {
    navigation.addListener(
      "focus",
      () => {
        getWorkTodos(route.params.bname, new Date(), route.params.id).then(
          (todos) => {
            if (todos[0] === undefined) {
              setWorktodo(0);
            } else {
              let dict = JSON.parse(todos[0].todo);
              let td = 0;
              for (var key in dict) {
                if (dict[key] == 0) {
                  td = 1;
                  break;
                }
              }
              setWorktodo(td);
            }
          }
        );
        getWorker(route.params.bname, route.params.id).then((worker) =>
          setState(worker.state)
        );
      },
      []
    );
  }, [navigation]);

  async function fetchData(bangCode, idid) {
    try {
      await getBusinessByWorker(idid).then((business) => {
        let dic = JSON.parse(business.bang);

        setCommute(dic[String(route.params.bname)] ? "퇴근" : "출근");
        commuteChangeImg(dic[String(route.params.bname)] ? "퇴근" : "출근", 1);
      });

      await getWorkerByDay(bangCode, new Date(), idid).then(async (res) => {
        let resultData = res.data.ori;
        let alter = res.data.alter;
        console.log(res.data.ori);
        console.log(res.data.alter);

        if (resultData.length == 0) {
          resultData = res.data.alter;

          for (let i = 0; i < resultData.length; i++) {
            if (resultData[i].time == "0") {
              resultData[i] = null;
            }
          }
          resultData = resultData.filter((data) => data !== null);
        } else {
          for (let j = 0; j < alter.length; j++) {
            let flag = 0;
            for (let i = 0; i < resultData.length; i++) {
              if (alter[j] != null) {
                if (resultData[i].workername == alter[j].workername) {
                  flag = 1;
                  if (alter[j].time == "0") {
                    console.log("++++++++++++ alter[j].time=='0' ++++++++++");
                    resultData[i] = null;
                  } else {
                    resultData[i] = alter[j];
                  }
                  alter[j] = null;
                  break;
                }
              }
            }
            if (flag == 0) {
              resultData.push(alter[j]);
            }
          }
          resultData = resultData.filter((data) => data !== null);
        }

        console.log("받아오는 날짜:");
        console.log(resultData);

        console.log("-------------------------------------");

        if (resultData[0] !== undefined) {
          const worker = resultData[0];
          setTime(
            worker.time == null ? worker[getDayStr(new Date())] : worker.time
          );
        } else {
          setTime(undefined);
        }
      });

      await getWorkerTimelog(bangCode, new Date(), idid).then(
        async (timelogs) => {
          setTimelog(
            (timelogs[0].goto ? timelogs[0].goto : "----") +
              (timelogs[0].leavee ? timelogs[0].leavee : "----")
          );
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  //출근퇴근
  const commuteImg = require("../../img/workManagement_purple_clicked.png");
  const commuteImgChecked = require("../../img/workManagement_purple.png");
  const commuteI = { commuteImg, commuteImgChecked };
  const [commuteImgSelected, setCommuteImgSelected] = useState(
    commuteI.commuteImg
  );

  const commuteChangeImg = (com, init) => {
    if (init) {
      if (com == "출근") {
        setCommuteImgSelected(commuteI.commuteImgChecked);
      } else {
        setCommuteImgSelected(commuteI.commuteImg);
      }
    }
  };

  const [clicked, setClicked] = useState(-1);
  const [clicked2, setClicked2] = useState(-1);
  const [clicked3, setClicked3] = useState(-1);
  const [clicked4, setClicked4] = useState(-1);

  const viewWorkTime = () =>
    `${time.substring(0, 2)}:${time.substring(2, 4)}` +
    ` - ${time.substring(4, 6)}:${time.substring(6, 8)}`;
  const viewInOutTime = () =>
    `${timelog.substring(0, 2)}:${timelog.substring(2, 4)}` +
    ` - ${timelog.substring(4, 6)}:${timelog.substring(6, 8)}`;

  const handleOnPressInOut = () => {
    console.log("출퇴 기록:", route.params.state);

    if (state !== 2) {
      Alert.alert("[문서함>계약서]를 먼저 작성해주세요.");
    } else {
      if (commute !== "출근" || worktodo !== 1) {
        navigation.navigate("QrAuth", {
          bname: route.params.bname,
          userId: route.params.id,
          commute: commute,
        });
        commuteChangeImg(commute == "출근" ? "퇴근" : "출근");
      } else {
        Alert.alert(
          "퇴근하기",
          "할 일이 남아있습니다. 미완료로 퇴근하시겠습니까?",
          [
            {
              text: "아니오",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "네",
              onPress: () => {
                navigation.navigate("QrAuth", {
                  bname: route.params.bname,
                  userId: route.params.id,
                  commute: commute,
                });
                commuteChangeImg(commute == "출근" ? "퇴근" : "출근");
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  };
  return (
    <View style={styles.image}>
      <View style={styles.container}>
        <View style={styles.timeText}>
          <Text style={styles.textTitle1}>
            근무 시간{" "}
            <Text style={styles.text1}>
              {time == undefined ? "-- : --  -  -- : --" : viewWorkTime()}
            </Text>
          </Text>
          <Text style={styles.textTitle2}>
            출근/퇴근{" "}
            <Text style={styles.text2}>
              {timelog == undefined ? "-- : --  -  -- : --" : viewInOutTime()}
            </Text>
          </Text>
        </View>
        <View style={styles.buttonArea1}>
          <TouchableOpacity style={styles.button} onPress={handleOnPressInOut}>
            <Image style={styles.buttonImg} source={commuteImgSelected} />
            {/* <Text style={styles.buttonTitle}>{commute}</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(route.params.state);
              if (state == 2 || route.params.state == 2) {
                setClicked(0);
                var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                var day = new Date().getDay();
                var month = new Date().getMonth() + 1; //To get the Current Month
                var date = new Date().getDate(); //To get the Current Date
                var year = new Date().getFullYear(); //To get the Current Year
                let dt = week[day] + " " + month + " " + date + " " + year;
                console.log(dt);
                navigation.navigate("Vacation Request", {
                  date: dt,
                  id: route.params.id,
                });
                setTimeout(() => {
                  setClicked(-1);
                }, 500);
              } else {
                Alert.alert("[문서함>계약서]를 먼저 작성해주세요.");
              }
            }}
          >
            <Image
              style={styles.buttonImg}
              source={
                clicked == 0
                  ? require("../../img/vacation_clicked.png")
                  : require("../../img/vacation.png")
              }
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonArea2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setClicked2(0);
              navigation.navigate("WCalculating");
              setTimeout(() => {
                setClicked2(-1);
              }, 500);
            }}
          >
            <Image
              style={styles.buttonImg}
              source={
                clicked2 == 0
                  ? require("../../img/calculate_purple_clicked.png")
                  : require("../../img/calculate_purple.png")
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setClicked3(0);
              navigation.navigate("Worker Document", { id: route.params.id });
              setTimeout(() => {
                setClicked3(-1);
              }, 500);
            }}
          >
            <Image
              style={styles.buttonImg}
              source={
                clicked3 == 0
                  ? require("../../img/document_clicked.png")
                  : require("../../img/document.png")
              }
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonArea2}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              console.log(worktodo);
              if (
                commute == "퇴근" &&
                (state == 2 || route.params.state == 2)
              ) {
                Alert.alert("출근을 먼저 해주세요.");
              } else if (state == 2 || route.params.state == 2) {
                setClicked4(0);
                navigation.navigate("WorkTodo", { id: route.params.id });
                setTimeout(() => {
                  setClicked4(-1);
                }, 500);
              } else {
                Alert.alert("[문서함>계약서]를 먼저 작성해주세요.");
              }
            }}
          >
            <Image
              style={styles.todobuttonImg}
              source={
                clicked4 == 0
                  ? require("../../img/todo.png")
                  : worktodo == 1
                  ? require("../../img/todo2.png")
                  : require("../../img/todo.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WorkerHomeScreen;
