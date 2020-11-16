import React, {useState, Component} from 'react';
import { AsyncStorage } from 'react-native';
import { View, Button, Alert, Image, StyleSheet, Text } from 'react-native';
import { NavigationContainer, DrawerActions,
          getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingScreen from './screens/Landing';
import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import SelectScreen from './screens/Select'
import PasswordForgetScreen from './screens/PasswordForget';
import PasswordChangeScreen from './screens/PasswordChange';
import HomeScreen from './screens/Home';
import WorkerHomeScreen from './screens/WorkerHome';
import ProfileScreen from './screens/Profile';
import AccountScreen from './screens/Account';
import AdminScreen from './screens/Admin';
import CalculatingScreen from './screens/Calculating';
import ExpenseScreen1 from './screens/Expense1';
import ExpenseScreen2 from './screens/Expense2';
import CalculatingScreen2 from './screens/Calculating2';
import UnemploymentScreen1 from './screens/Unemployment1';
import UnemploymentScreen2 from './screens/Unemployment2';
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
import CalendarScreen from './screens/Calendar';
import VacationRequestScreen from './screens/VacationRequest';
import WorkerStatementScreen from './screens/WorkerStatement';
import WorkerContractformScreen from './screens/WorkerContractform';
import InviteScreen from './screens/Invite';
import SentMessageScreen from './screens/SentMessage';
import ReceivedMessageScreen from './screens/ReceivedMessage'
import SendMessageScreen from './screens/SendMessage';
import WebLoginScreen from './screens/WebLogin'
import LoginExScreen from './screens/LoginEx';

const storeToken = async(user) => {
  try {
     await AsyncStorage.setItem("userData", JSON.stringify(user));
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
const getToken = async() => {
  try {
    let userData = await AsyncStorage.getItem("userData").then((userData) =>{
      return userData;
    });
    //let data = JSON.parse(userData);
    //console.log("여기용"+data);
    //return await AsyncStorage.getItem("userData");;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const Tab = createBottomTabNavigator();
 
const WorkerTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="WorkerManage" component={WorkerManageScreen}
      options={{
        tabBarLabel: '정규직',
      }}  /> 
      <Tab.Screen name="WorkerManage2" component={WorkerManageScreen2} 
      options={{
        tabBarLabel: '알바',
      }}  /> 
    </Tab.Navigator>
  );
};

const ExpenseTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Expense1" component={ExpenseScreen1} 
      options={{
          tabBarLabel: '정규직',
        }}  /> 
      <Tab.Screen name="Expense2" component={ExpenseScreen2} 
      options={{
        tabBarLabel: '알바',
      }}  
      />
    </Tab.Navigator>
  );
};

const UnemploymentTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Unemployment1" component={UnemploymentScreen1} 
      options={{
          tabBarLabel: '실업급여일반',
        }}  /> 
      <Tab.Screen name="Unemployment2" component={UnemploymentScreen2} 
      options={{
        tabBarLabel: '일용근로자',
      }}  
      />
    </Tab.Navigator>
  );
};

const StatementTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Statement1" component={StatementScreen1} 
      options={{
          tabBarLabel: '월별',
        }}  /> 
      <Tab.Screen name="Statement2" component={StatementScreen2} 
      options={{
        tabBarLabel: '근로자별',
      }}  
      />
    </Tab.Navigator>
  );
};

const DocumentTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="WorkerStatement" component={WorkerStatementScreen} 
      options={{
          tabBarLabel: '명세서',
        }}  /> 
      <Tab.Screen name="WorkerContractform" component={WorkerContractformScreen} 
      options={{
        tabBarLabel: '계약서',
      }}  
      />
    </Tab.Navigator>
  );
};

const MessageTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Received Message" component={ReceivedMessageScreen} 
        options={{
          tabBarLabel: '받은 메세지',
        }}  
      />
      <Tab.Screen name="Sent Message" component={SentMessageScreen} 
        options={{
          tabBarLabel: '보낸 메세지',
        }}  /> 
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
 
const App = () => {
/*----------------------------------------------------
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  //===========================================*/
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [id, setId] = useState('');
  const [bang, setBang] = useState('');
  //setId('dddd');
  //console.log(id);
  const handleSignIn = () => {
    // TODO implement real sign in mechanism
    setIsAuthenticated(true);
    AsyncStorage.getItem("userData").then((userData) =>{
      setId(id => JSON.parse(userData));
    });
  };

  const handleSignOut = () => {
    // TODO implement real sign out mechanism
    setIsAuthenticated(false);
    storeToken('');
    AsyncStorage.setItem("bangCode",'');
    //setId('');
    

  };
  
  const handleSignUp = () => {
    // TODO implement real sign up mechanism
    setIsAuthenticated(true);
    //setId(getToken());
    console.log(JSON.parse(getToken()));
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>
      {isAuthenticated ? (
        <>
        <RootStack.Screen 
          name="Select Page" component={SelectScreen} 
          options={({ route, navigation }) => ({
            title:"선택해주세요",
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <Text>{id}  </Text>
                <Button onPress={() => navigation.navigate('Message List')} title="MSG" />
                <Button onPress={handleSignOut} title="logout" />
              </View>
            ),
          })}
          />
          <RootStack.Screen 
          name="Business List" component={BusinessListScreen} 
          options={({ route, navigation }) => ({
            title:"사업장 목록",
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <Text>{id}  </Text>
                <Button onPress={() => navigation.navigate('Message List')} title="MSG" />
                <Button onPress={handleSignOut} title="logout" />
              </View>
            ),
          })}
          />
          <RootStack.Screen 
          name="Worker Business List" component={WorkerBusinessListScreen} 
          options={({ route, navigation }) => ({
            title:"사업장 목록",
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <Text>{id}  </Text>
                <Button onPress={() => navigation.navigate('Message List')} title="MSG" />
                <Button onPress={handleSignOut} title="logout" />
              </View>
            ),
          })}
          />
          <RootStack.Screen 
          name="Add Business" component={AddBusinessScreen} 
          />
          <RootStack.Screen 
            name="Home" 
            component={HomeScreen}//HomeDrawer} 
            options={({ route, navigation }) => ({
              headerTitle : "",
              //headerTitle: getFocusedRouteNameFromRoute(route),
              headerLeft: () => (
                <Image
                  style={styles.tinyLogo}
                  source={
                    require('./11.png')
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
                <View style={{flexDirection: 'row'}}>
                  <Text>{id}  </Text>
                  <Button onPress={() => navigation.navigate('Message List')} title="MSG" />
                  <Button onPress={handleSignOut} title="logout" />
                </View>
              ),
            })}
          />
          <RootStack.Screen 
            name="Worker Home" 
            component={WorkerHomeScreen}//HomeDrawer} 
            options={({ route, navigation }) => ({
              headerTitle : "",
              //headerTitle: getFocusedRouteNameFromRoute(route),
              headerLeft: () => (
                <Image
                  style={styles.tinyLogo}
                  source={
                    require('./logo.png')
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
                <View style={{flexDirection: 'row'}}>
                  <Text>{id}  </Text>
                  <Button onPress={() => navigation.navigate('Message List')} title="MSG" />
                  <Button onPress={handleSignOut} title="logout" />
                </View>
              ),
            })}
          />
          <RootStack.Screen 
          options={{
            title:"달력",
          }}
            name="Calendar" component={CalendarScreen}
          />
          <RootStack.Screen 
          options={{
            title:"근로 관리",
          }}
          name="Work Management" component={WorkManageScreen} 
          />
          <RootStack.Screen 
          options={{
            title:"계약서",
          }}
          name="Contract Form" component={ContractformScreen}//WorkerManageScreen} 
          />
          <RootStack.Screen 
          options={{
            title:"계약서",
          }}
          name="Contract FormA" component={ContractformAScreen}//WorkerManageScreen} 
          />
          <RootStack.Screen 
          options={{
            title:"계약서",
          }}
          name="Contract FormB" component={ContractformBScreen}//WorkerManageScreen} 
          />
          <RootStack.Screen 
          options={{
            title:"근무자 관리",
          }}
          name="Worker Management" component={WorkerTabs}//WorkerManageScreen} 
          />
          <RootStack.Screen 
            options={{
              title:"계산하기",
            }}
            name="Calculating" component={CalculatingScreen}
          />
          <RootStack.Screen 
            options={{
              title:"인건비 계산",
            }}
            name="Calculating1" component={ExpenseTabs}
          />
          <RootStack.Screen 
            options={{
              title:"퇴직금 계산",
            }}
            name="Calculating2" component={CalculatingScreen2}
          />
          <RootStack.Screen 
            options={{
              title:"실업급여 계산",
            }}
            name="Calculating3" component={UnemploymentTabs}
          />
          <RootStack.Screen 
            options={{
              title:"휴가 요청",
            }}
            name="Vacation Request" component={VacationRequestScreen}
          />
          <RootStack.Screen 
            options={{
              title:"명세서 조회",
            }}
            name="Statement" component={StatementTabs}
          />
          <RootStack.Screen 
            options={{
              title:"근로자 시간 변경",
            }}
            name='alter worker' component={AlterWorkerScreen}
          />
          
          <RootStack.Screen 
            options={{
              title:"문서함",
            }}
            name='Worker Document' component={DocumentTabs}
          />
          <RootStack.Screen 
            options={{
              title:"초대하기",
            }}
            name='Invite' component={InviteScreen}
          />
          <RootStack.Screen 
            options={{
              title:"메세지 목록",
            }}
            name='Message List' component={MessageTabs}
          />
          <RootStack.Screen 
            options={{
              title:"메세지 보내기",
            }}
            name='Send Message' component={SendMessageScreen}
          />
        </>
        ) : (
        <>
        <RootStack.Screen 
        name="Sign In"
        options={{
          title:"로그인",
          animationTypeForReplace: 'pop',
        }}
        >
          {(props) => (
            <SignInScreen {...props} onSignIn={handleSignIn} />
          )}
        </RootStack.Screen>
        <RootStack.Screen name="Sign Up"
          options={{
            title:"가입하기",
          }}
        >
              {(props) => (
                <SignUpScreen {...props} onSignUp={handleSignUp} />
              )}
        </RootStack.Screen>
        <RootStack.Screen
          name="Password Forget"
          component={PasswordForgetScreen}
        />
        
        </>
        )}
        </RootStack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;