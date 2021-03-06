import React, { useState, useRef, useEffect, Component } from 'react';
import { AsyncStorage } from 'react-native';
import { View, Button, Alert, Image, StyleSheet, Text } from 'react-native';
import {
  NavigationContainer, DrawerActions,
  getFocusedRouteNameFromRoute
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import * as Font from 'expo-font';

import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import SignUpGoogleScreen from './screens/SignUpGoogle';
import SignUpAppleScreen from './screens/SignUpApple';
import SelectScreen from './screens/Select'
import PasswordForgetScreen from './screens/PasswordForget';
import PasswordChangeScreen from './screens/PasswordChange';
import HomeScreen from './screens/Home';
import WorkerHomeScreen from './screens/WorkerHome';
import CalculatingScreen from './screens/Calculating';
import ExpenseScreen1 from './screens/Expense1';
import ExpenseScreen2 from './screens/Expense2';
import CalculatingScreen2 from './screens/Calculating2';
import UnemploymentScreen1 from './screens/Unemployment1';
import UnemploymentScreen2 from './screens/Unemployment2';

import WCalculatingScreen from './screens/WCalculating';
import WExpenseScreen1 from './screens/WExpense1';
import WExpenseScreen2 from './screens/WExpense2';
import WCalculatingScreen2 from './screens/WCalculating2';
import WUnemploymentScreen1 from './screens/WUnemployment1';
import WUnemploymentScreen2 from './screens/WUnemployment2';

import StatementScreen from './screens/Statemanet';
import StatementScreen1 from './screens/Statemanet1';
import StatementScreen2 from './screens/Statemanet2';
import WorkManageScreen from './screens/WorkManage';
import AlterWorkerScreen from './screens/AlterWorker';
import WorkerManageScreen from './screens/WorkerManage';
import WorkerManageScreen2 from './screens/WorkerManage2';
import ContractformScreen from './screens/Contractform';
import ContractformAScreen from './screens/ContractformA';
import ContractformBScreen from './screens/ContractformB';
import BusinessListScreen from './screens/BusinessList';
import WorkerBusinessListScreen from './screens/WorkerBusinessList';
import AddBusinessScreen from './screens/AddBusiness';
import MapScreen from './screens/Map'
import MapScreen2 from './screens/Map2'
import CalendarScreen from './screens/Calendar';
import ModifyScreen from './screens/Modify';
import ModifySignScreen from './screens/ModifySign';
import ModifyPasswordScreen1 from './screens/ModifyPassword1';
import ModifyPasswordScreen2 from './screens/ModifyPassword2';
import ModifyNameScreen from './screens/ModifyName';
import ModifyBusinessScreen from './screens/ModifyBusiness'
import VacationRequestScreen from './screens/VacationRequest';
import WorkerStatementScreen from './screens/WorkerStatement';
import WorkerContractformScreen from './screens/WorkerContractform';
import InviteScreen from './screens/Invite';
import SentMessageScreen from './screens/SentMessage';
import ReceivedMessageScreen from './screens/ReceivedMessage'
import SendMessageScreen from './screens/SendMessage';
import AddWorkTodoScreen from './screens/AddWorkTodo'
import WorkTodoScreen from './screens/WorkTodo'
import SplashScreen from './screens/Splash';
import QrAuthScreen from './screens/QrAuthScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as GoogleSignIn from 'expo-google-sign-in';
import { getUserData, putUserData } from './utils/storage';

const storeToken = async (user) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(user));
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
const getToken = async () => {
  try {
    let userData = await AsyncStorage.getItem("userData");
    let data = JSON.parse(userData);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: wp('11%'),
    height: wp('11%'),
    marginLeft: wp('4%')
  },
  logo: {
    width: wp('13.5%'),
    height: wp('13.5%'),
  },
  rowArea: {
    flexDirection: 'row',
    marginRight: wp('5%')
  },
  userArea: {
    flexDirection: 'row', marginRight: wp('2%')
  },
  userImage: {
    marginTop: hp('0.6%'),
    ...Platform.select({
      ios: {
        width: wp('4.8%'),
        height: hp('3.3')
      },
      android: {
        width: wp('5.2%'),
        height: hp('3.3')
      }
    })
  },
  logoutBtnArea: {
    backgroundColor: '#67C8BA',
    marginLeft: wp('1%'),
    marginRight: wp('1.5%'),
    flexDirection: 'row'
  },
  workerlogoutBtnArea: {
    backgroundColor: '#7085DF',
    marginLeft: wp('1%'),
    marginRight: wp('1.5%'),
    flexDirection: 'row'

  },
  logoutText: {
    color: 'white',
    fontSize: 15,
    fontFamily: "NanumSquare",
    marginTop: hp('1%')
  },
  logoutImage: {
    marginTop: hp('0.7%'), marginLeft: wp('4%'),
    ...Platform.select({
      ios: {
        width: wp('5.1%'),
        height: hp('3.1%')
      },
      android: {
        width: wp('5.5%'),
        height: hp('3.1%')
      }
    })
  },
  msgImage: {
    marginTop: hp('0.9%'), marginLeft: wp('3%'),
    ...Platform.select({
      ios: {
        width: wp('7.5%'),
        height: hp('3.0%')
      },
      android: {
        width: wp('8%'),
        height: hp('3.0%')
      }
    })
  },
  wokrListLeft: {
    backgroundColor: '#67C8BA',

  }
});
const Tab = createBottomTabNavigator();

const WorkerTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#67C8BA',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          fontFamily: "NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#E2F2EF',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}
    >
      <Tab.Screen name="WorkerManage" component={WorkerManageScreen}
        options={{
          tabBarLabel: '?????????',
        }} />
      <Tab.Screen name="WorkerManage2" component={WorkerManageScreen2}
        options={{
          tabBarLabel: '???????????????',
        }} />
    </Tab.Navigator>
  );
};

const ExpenseTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#67C8BA',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          //fontFamily:"NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#E2F2EF',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}>
      <Tab.Screen name="Expense1" component={ExpenseScreen1}
        options={{
          tabBarLabel: '?????????',
        }} />
      <Tab.Screen name="Expense2" component={ExpenseScreen2}
        options={{
          tabBarLabel: '???????????????',
        }}
      />
    </Tab.Navigator>
  );
};

const UnemploymentTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#67C8BA',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          //fontFamily:"NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#E2F2EF',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}>
      <Tab.Screen name="Unemployment1" component={UnemploymentScreen1}
        options={{
          tabBarLabel: '??????????????????',
        }} />
      <Tab.Screen name="Unemployment2" component={UnemploymentScreen2}
        options={{
          tabBarLabel: '???????????????',
        }}
      />
    </Tab.Navigator>
  );
};

const WExpenseTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7085DF',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          //fontFamily:"NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#E3E6EE',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}
    >
      <Tab.Screen name="WExpense1" component={WExpenseScreen1}
        options={{
          tabBarLabel: '?????????',
        }} />
      <Tab.Screen name="WExpense2" component={WExpenseScreen2}
        options={{
          tabBarLabel: '???????????????',
        }}
      />
    </Tab.Navigator>
  );
};

const WUnemploymentTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7085DF',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          //fontFamily:"NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#E3E6EE',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}>
      <Tab.Screen name="WUnemployment1" component={WUnemploymentScreen1}
        options={{
          tabBarLabel: '??????????????????',
        }} />
      <Tab.Screen name="WUnemployment2" component={WUnemploymentScreen2}
        options={{
          tabBarLabel: '???????????????',
        }}
      />
    </Tab.Navigator>
  );
};

const StatementTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#67C8BA',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          fontFamily: "NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#E2F2EF',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}>
      <Tab.Screen name="Statement1" component={StatementScreen1}
        options={{
          tabBarLabel: '??????',
        }} />
      <Tab.Screen name="Statement2" component={StatementScreen2}
        options={{
          tabBarLabel: '????????????',
        }}
      />
    </Tab.Navigator>
  );
};

const DocumentTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7085DF',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          //fontFamily:"NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#E3E6EE',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}>
      <Tab.Screen name="WorkerStatement" component={WorkerStatementScreen}
        options={{
          tabBarLabel: '?????????',
        }} />
      <Tab.Screen name="WorkerContractform" component={WorkerContractformScreen}
        options={{
          tabBarLabel: '?????????',
        }}
      />
    </Tab.Navigator>
  );
};

const MessageTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#92B9E4',
        inactiveTintColor: '#D3D6E2',
        labelStyle: {
          fontSize: wp('4.8%'),
          //fontFamily:"NanumSquare"
        },
        tabStyle: {
          marginTop: hp('1%'),
          marginBottom: hp('1%'),
          height: hp('5%'),
          justifyContent: "center",
          borderLeftWidth: wp('0.7%'),
          borderLeftColor: '#DAE9F7',
        },
        style: {
          shadowOpacity: 0, elevation: 0, borderTopColor: 'white',
        }
      }}>
      <Tab.Screen name="Received Message" component={ReceivedMessageScreen}
        options={{
          tabBarLabel: '?????? ?????????',
        }}
      />
      <Tab.Screen name="Sent Message" component={SentMessageScreen}
        options={{
          tabBarLabel: '?????? ?????????',
        }} />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [id, setId] = useState('');
  const [realId, setRearId] = useState('')
  const [bang, setBang] = useState('');

  // load new messages ===========================================================================
  const [count, setCount] = useState(0);
  const savedCallback = useRef();

  function callback() {
    try {
      const SERVER_URL = 'https://??????.kr/api/'
      axios.post(
        `${SERVER_URL}selectReceivedNewMessage`, { t: realId },
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }}
        ).then(res => setCount((res.data[0] === undefined)? 0 : 1));
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    savedCallback.current = callback;
  });

  // load fonts ===========================================================================
  const [dataLoaded, setDataLoaded] = useState(false);
  const fetchFonts = () => {
    return Font.loadAsync({
      'NanumSquare': require("./assets/fonts/NanumSquare_acR.ttf"),
      'NanumSquareB': require("./assets/fonts/NanumSquare_acB.ttf")
    }).then(() => { setDataLoaded(true); })
  }

  // load user data ===========================================================================

  useEffect(() => {
    fetchFonts();

    function tick() {
      savedCallback.current();
    }
    tick();

    getUserData()
    .then(user_data => {
      setId(id => user_data.name);
      setRearId(realId => user_data.id)
    })

    getUserData()
    .then(user_data => {
      setIsAuthenticated(true);
      setId(id => user_data.name);
      setRearId(realId => user_data.id)
    })

    // AsyncStorage.getItem("userData").then((userData) => {
    //   if (JSON.parse(userData) != null) {
    //     if (JSON.parse(userData) != "") {
    //       setIsAuthenticated(true);
    //       setId(id => JSON.parse(userData).name);
    //       setRearId(realId => JSON.parse(userData).id)
    //     }
    //   }
    // }
    // );
    let i = setInterval(tick, 4000);
    return () => clearInterval(i);
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    // TODO implement real sign in mechanism
    getUserData()
    .then(user_data => {
      setId(id => user_data.name);
      setRearId(realId => user_data.id)
    })
    // AsyncStorage.getItem("userData").then((userData) => {
    //   setId(id => JSON.parse(userData).name);
    //   setRearId(realId => JSON.parse(userData).id)
    // });
  };

  const handleSignOut = () => {
    // TODO implement real sign out mechanism
    setIsAuthenticated(false);
    storeToken('');
    setId(id => '');
    setRearId(realId => '')
    AsyncStorage.setItem("bangCode", '');
    GoogleSignIn.signOutAsync();


    //setId('');
  };

  const handleSignUp = () => {
    // TODO implement real sign up mechanism
    setIsAuthenticated(true);
    //setId(getToken());
    console.log(JSON.parse(getToken()));
  };
  //===========================================================================
  


  //============================================================================
  /*React.useEffect(() => {
    let a = AsyncStorage.getItem("userData").then((userData) =>{
      setId(id => JSON.parse(userData).name);
    });
    return a;
  }, []);*/

  return (
    <NavigationContainer>
      {!dataLoaded ?
        <RootStack.Screen
          name="Splash" component={SplashScreen}
        />
        : <RootStack.Navigator
          screenOptions={{
            headerTintColor: 'white', // ?????????
            headerStyle: { backgroundColor: '#67C8BA', shadowOpacity: 0, elevation: 0, }, //??????
            headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
          }}
        >
          {isAuthenticated ? (
            <>
              <RootStack.Screen
                name="Select Page" component={SelectScreen}
                options={({ route, navigation }) => ({

                  title: "",
                  headerTitle: getFocusedRouteNameFromRoute(route),
                  headerRight: () => (
                    <View style={styles.rowArea}>
                      <TouchableOpacity onPress={() => navigation.navigate('Modify')} style={styles.userArea}>
                        <Text style={styles.logoutText}>{id} </Text>
                        <Image style={styles.userImage} source={require('./img/user1.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Message List')} style={styles.logoutBtn}>
                        <Image style={styles.msgImage} source={count ? require('./img/msg2.png') : require('./img/msg.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtnArea}>
                        <Image style={styles.logoutImage} source={require('./img/logout.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <RootStack.Screen
                name="Business List" component={BusinessListScreen}
                options={({ route, navigation }) => ({
                  title: "",
                  //headerTitle: getFocusedRouteNameFromRoute(route),
                  headerRight: () => (
                    <View style={styles.rowArea}>
                      <TouchableOpacity onPress={() => navigation.navigate('Modify')} style={styles.userArea}>
                        <Text style={styles.logoutText}>{id} </Text>
                        <Image style={styles.userImage} source={require('./img/user1.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Message List')} style={styles.logoutBtn}>
                        <Image style={styles.msgImage} source={count ? require('./img/msg2.png') : require('./img/msg.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtnArea}>
                        <Image style={styles.logoutImage} source={require('./img/logout.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <RootStack.Screen
                name="Worker Business List" component={WorkerBusinessListScreen}
                options={({ route, navigation }) => ({
                  title: "",
                  headerTitle: getFocusedRouteNameFromRoute(route),
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, },
                  headerRight: () => (
                    <View style={styles.rowArea}>
                      <TouchableOpacity onPress={() => navigation.navigate('Modify')} style={styles.userArea}>
                        <Text style={styles.logoutText}>{id} </Text>
                        <Image style={styles.userImage} source={require('./img/user1.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Message List')} style={styles.logoutBtn}>
                        <Image style={styles.msgImage} source={count ? require('./img/msg2.png') : require('./img/msg.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSignOut} style={styles.workerlogoutBtnArea}>
                        <Image style={styles.logoutImage} source={require('./img/logout.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <RootStack.Screen
                name="Add Business" component={AddBusinessScreen}
                options={({ route, navigation }) => ({
                  headerTitle: "????????? ????????????",
                })}
              />
              <RootStack.Screen
                name="Map" component={MapScreen}
              />
              <RootStack.Screen
                name="Map2" component={MapScreen2}
              />
              <RootStack.Screen
                name="Home"
                component={HomeScreen}//HomeDrawer} 
                options={({ route, navigation }) => ({
                  headerTitle: "",
                  //headerTitle: getFocusedRouteNameFromRoute(route),
                  headerLeft: () => (
                    <Image
                      style={styles.tinyLogo}
                      source={
                        require('./img/logo.png')
                      }
                    />
                    /*<Button
                      onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      title="Menu"
                    />*/
                  ),
                  headerRight: () => (
                    <View style={styles.rowArea}>
                      <TouchableOpacity onPress={() => navigation.navigate('Modify')} style={styles.userArea}>
                        <Text style={styles.logoutText}>{id} </Text>
                        <Image style={styles.userImage} source={require('./img/user1.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Message List')} style={styles.logoutBtn}>
                        <Image style={styles.msgImage} source={count ? require('./img/msg2.png') : require('./img/msg.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtnArea}>
                        <Image style={styles.logoutImage} source={require('./img/logout.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <RootStack.Screen
                name="Worker Home"
                component={WorkerHomeScreen}//HomeDrawer} 
                // component={QrAuthScreen}//HomeDrawer} 
                options={({ route, navigation }) => ({
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, },
                  headerTitle: "",
                  //headerTitle: getFocusedRouteNameFromRoute(route),
                  headerLeft: () => (
                    <Image
                      style={styles.tinyLogo}
                      source={
                        require('./img/logo_purple.png')
                      }
                    />
                    /*<Button
                      onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      title="Menu"
                    />*/
                  ),
                  headerRight: () => (
                    <View style={styles.rowArea}>
                      <TouchableOpacity onPress={() => navigation.navigate('Modify')} style={styles.userArea}>
                        <Text style={styles.logoutText}>{id} </Text>
                        <Image style={styles.userImage} source={require('./img/user1.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Message List')} style={styles.worker}>
                        <Image style={styles.msgImage} source={count ? require('./img/msg2.png') : require('./img/msg.png')}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleSignOut} style={styles.workerlogoutBtnArea}>
                        <Image style={styles.logoutImage} source={require('./img/logout.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  ),
                })}
              />
              <RootStack.Screen
                options={{
                  title: "?????? ??????",
                }}
                name="Modify" component={ModifyScreen}
              />
              <RootStack.Screen
                options={{
                  title: "???????????? ??????",
                }}
                name="Modify Password1" component={ModifyPasswordScreen1}
              />
              <RootStack.Screen
                options={{
                  title: "???????????? ??????",
                }}
                name="Modify Password2" component={ModifyPasswordScreen2}
              />
              <RootStack.Screen
                options={{
                  title: "?????? ??????",
                }}
                name="Modify Sign" component={ModifySignScreen}
              />
              <RootStack.Screen
                name="Modify Name"
                options={{ title: "?????? ??????" }}
              >
                {(props) => (
                  <ModifyNameScreen {...props} onSignIn={handleSignIn} />
                )}
              </RootStack.Screen>

              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                }}
                name="Modify Business" component={ModifyBusinessScreen}
              />
              <RootStack.Screen
                options={{
                  title: "??????",
                }}
                name="Calendar" component={CalendarScreen}
              />
              <RootStack.Screen
                options={{
                  title: "?????? ??????",
                }}
                name="Work Management" component={WorkManageScreen}
              />
              <RootStack.Screen
                options={{
                  title: "?????????",
                }}
                name="Contract Form" component={ContractformScreen}//WorkerManageScreen} 
              />
              <RootStack.Screen
                options={{
                  title: "?????????",
                }}
                name="Contract FormA" component={ContractformAScreen}//WorkerManageScreen} 
              />
              <RootStack.Screen
                options={{
                  title: "?????????",
                }}
                name="Contract FormB" component={ContractformBScreen}//WorkerManageScreen} 
              />
              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                }}
                name="Worker Management" component={WorkerTabs}//WorkerManageScreen} 
              />
              <RootStack.Screen
                options={{
                  title: "????????????",
                }}
                name="Calculating" component={CalculatingScreen}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                }}
                name="Calculating1" component={ExpenseTabs}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                }}
                name="Calculating2" component={CalculatingScreen2}
              />
              <RootStack.Screen
                options={{
                  title: "???????????? ??????",
                }}
                name="Calculating3" component={UnemploymentTabs}
              />
              <RootStack.Screen
                options={{
                  title: "????????????",
                  headerTintColor: 'white', // ?????????
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name="WCalculating" component={WCalculatingScreen}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                  headerTintColor: 'white', // ?????????
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name="WCalculating1" component={WExpenseTabs}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                  headerTintColor: 'white', // ?????????
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name="WCalculating2" component={WCalculatingScreen2}
              />
              <RootStack.Screen
                options={{
                  title: "???????????? ??????",
                  headerTintColor: 'white', // ?????????
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name="WCalculating3" component={WUnemploymentTabs}
              />
              <RootStack.Screen
                options={{
                  title: "?????? ??????",
                  headerTintColor: '#7085DF', // ?????????
                  headerStyle: { backgroundColor: 'white', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name="Vacation Request" component={VacationRequestScreen}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                }}
                name="Statement" component={StatementTabs}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ?????? ??????",
                }}
                name='alter worker' component={AlterWorkerScreen}
              />

              <RootStack.Screen
                options={{
                  title: "?????????",
                  headerTintColor: 'white', // ?????????
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name='Worker Document' component={DocumentTabs}
              />
              <RootStack.Screen
                options={{
                  title: "????????????",
                }}
                name='Invite' component={InviteScreen}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ??????",
                  headerTintColor: '#92B9E4', // ?????????
                  headerStyle: { backgroundColor: '#DAE9F7', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name='Message List' component={MessageTabs}
              />
              <RootStack.Screen
                options={{
                  title: "????????? ?????????",
                  headerTintColor: '#92B9E4', // ?????????
                  headerStyle: { backgroundColor: '#DAE9F7', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name='Send Message' component={SendMessageScreen}
              />

              <RootStack.Screen
                options={{
                  title: "??? ??? ??????",
                }}
                name='Add WorkTodo' component={AddWorkTodoScreen}
              />
              <RootStack.Screen
                options={{
                  title: "??? ???",
                  headerTintColor: 'white', // ?????????
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name='WorkTodo' component={WorkTodoScreen}
              />
              <RootStack.Screen
                options={{
                  title: "???????????????",
                  headerTintColor: 'white', // ?????????
                  headerStyle: { backgroundColor: '#7085DF', shadowOpacity: 0, elevation: 0, }, //??????
                  headerTitleStyle: { fontFamily: "NanumSquare", fontSize: wp('5.5%') }
                }}
                name="QrAuth" component={QrAuthScreen}
              />
            </>
          ) : (
            <>
              <RootStack.Screen
                name="Sign In"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <SignInScreen {...props} onSignIn={handleSignIn} />
                )}
              </RootStack.Screen>


              <RootStack.Screen name="Sign Up"
                options={{
                  title: "????????????",

                }}
              >
                {(props) => (
                  <SignUpScreen {...props} onSignUp={handleSignUp} />
                )}
              </RootStack.Screen>

              <RootStack.Screen name="Sign Up Google"
                options={{
                  title: "????????????",

                }}
              >
                {(props) => (
                  <SignUpGoogleScreen {...props} onSignUp={handleSignUp} />
                )}
              </RootStack.Screen>

              <RootStack.Screen name="Sign Up Apple"
                options={{
                  title: "????????????",

                }}
              >
                {(props) => (
                  <SignUpAppleScreen {...props} onSignUp={handleSignUp} />
                )}
              </RootStack.Screen>


              <RootStack.Screen
                name="Password Forget"
                component={PasswordForgetScreen}
              />

            </>
          )}
        </RootStack.Navigator>
      }
    </NavigationContainer>
  );
};

export default App;