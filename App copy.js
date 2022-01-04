import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Import
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
import React, { useState, useRef, useEffect, Component } from 'react';
import { AsyncStorage } from 'react-native';
import { View, Button, Alert, Image, StyleSheet, Text } from 'react-native';
import {
	NavigationContainer,
	DrawerActions,
	getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import * as Font from 'expo-font';

import SignInScreen from './screens/SignIn';
import SignUpScreen from './screens/SignUp';
import SignUpGoogleScreen from './screens/SignUpGoogle';
import SignUpAppleScreen from './screens/SignUpApple';
import SelectScreen from './screens/Select';
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
import MapScreen from './screens/Map';
import MapScreen2 from './screens/Map2';
import CalendarScreen from './screens/Calendar';
import ModifyScreen from './screens/Modify';
import ModifySignScreen from './screens/ModifySign';
import ModifyPasswordScreen1 from './screens/ModifyPassword1';
import ModifyPasswordScreen2 from './screens/ModifyPassword2';
import ModifyNameScreen from './screens/ModifyName';
import ModifyBusinessScreen from './screens/ModifyBusiness';
import VacationRequestScreen from './screens/VacationRequest';
import WorkerStatementScreen from './screens/WorkerStatement';
import WorkerContractformScreen from './screens/WorkerContractform';
import InviteScreen from './screens/Invite';
import SentMessageScreen from './screens/SentMessage';
import ReceivedMessageScreen from './screens/ReceivedMessage';
import SendMessageScreen from './screens/SendMessage';
import AddWorkTodoScreen from './screens/AddWorkTodo';
import WorkTodoScreen from './screens/WorkTodo';
import SplashScreen from './screens/Splash';
import SvgComponent from './screens/Svg';
import QrAuthScreen from './screens/QrAuthScreen';
import { color } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as GoogleSignIn from 'expo-google-sign-in';

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Function
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const storeToken = async (user) => {
	try {
		await AsyncStorage.setItem('userData', JSON.stringify(user));
	} catch (error) {
		console.log('Something went wrong', error);
	}
};
const getToken = async () => {
	try {
		let userData = await AsyncStorage.getItem('userData');
		let data = JSON.parse(userData);
		console.log(data);
		return data;
	} catch (error) {
		console.log('Something went wrong', error);
	}
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Style
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const styles = StyleSheet.create({
	tinyLogo: {
		width: wp('11%'),
		height: wp('11%'),
		marginLeft: wp('4%'),
	},
	logo: {
		width: wp('13.5%'),
		height: wp('13.5%'),
	},
	rowArea: {
		flexDirection: 'row',
		marginRight: wp('5%'),
	},
	userArea: {
		flexDirection: 'row',
		marginRight: wp('2%'),
	},
	userImage: {
		marginTop: hp('0.6%'),
		...Platform.select({
			ios: {
				width: wp('4.8%'),
				height: hp('3.3'),
			},
			android: {
				width: wp('5.2%'),
				height: hp('3.3'),
			},
		}),
	},
	logoutBtnArea: {
		backgroundColor: '#67C8BA',
		marginLeft: wp('1%'),
		marginRight: wp('1.5%'),
		flexDirection: 'row',
	},
	workerlogoutBtnArea: {
		backgroundColor: '#7085DF',
		marginLeft: wp('1%'),
		marginRight: wp('1.5%'),
		flexDirection: 'row',
	},
	logoutText: {
		color: 'white',
		fontSize: 15,
		fontFamily: 'NanumSquare',
		marginTop: hp('1%'),
	},
	logoutImage: {
		marginTop: hp('0.7%'),
		marginLeft: wp('4%'),
		...Platform.select({
			ios: {
				width: wp('5.1%'),
				height: hp('3.1%'),
			},
			android: {
				width: wp('5.5%'),
				height: hp('3.1%'),
			},
		}),
	},
	msgImage: {
		marginTop: hp('0.9%'),
		marginLeft: wp('3%'),
		...Platform.select({
			ios: {
				width: wp('7.5%'),
				height: hp('3.0%'),
			},
			android: {
				width: wp('8%'),
				height: hp('3.0%'),
			},
		}),
	},
	wokrListLeft: {
		backgroundColor: '#67C8BA',
	},
});

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Tab
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const Tab = createBottomTabNavigator();

const WorkerTabs = () => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: '#67C8BA',
				inactiveTintColor: '#D3D6E2',
				labelStyle: {
					fontSize: wp('4.8%'),
					fontFamily: 'NanumSquare',
				},
				tabStyle: {
					marginTop: hp('1%'),
					marginBottom: hp('1%'),
					height: hp('5%'),
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#E2F2EF',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='WorkerManage'
				component={WorkerManageScreen}
				options={{
					tabBarLabel: '정규직',
				}}
			/>
			<Tab.Screen
				name='WorkerManage2'
				component={WorkerManageScreen2}
				options={{
					tabBarLabel: '알바',
				}}
			/>
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
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#E2F2EF',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='Expense1'
				component={ExpenseScreen1}
				options={{
					tabBarLabel: '정규직',
				}}
			/>
			<Tab.Screen
				name='Expense2'
				component={ExpenseScreen2}
				options={{
					tabBarLabel: '알바',
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
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#E2F2EF',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='Unemployment1'
				component={UnemploymentScreen1}
				options={{
					tabBarLabel: '실업급여일반',
				}}
			/>
			<Tab.Screen
				name='Unemployment2'
				component={UnemploymentScreen2}
				options={{
					tabBarLabel: '일용근로자',
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
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#E3E6EE',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='WExpense1'
				component={WExpenseScreen1}
				options={{
					tabBarLabel: '정규직',
				}}
			/>
			<Tab.Screen
				name='WExpense2'
				component={WExpenseScreen2}
				options={{
					tabBarLabel: '알바',
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
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#E3E6EE',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='WUnemployment1'
				component={WUnemploymentScreen1}
				options={{
					tabBarLabel: '실업급여일반',
				}}
			/>
			<Tab.Screen
				name='WUnemployment2'
				component={WUnemploymentScreen2}
				options={{
					tabBarLabel: '일용근로자',
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
					fontFamily: 'NanumSquare',
				},
				tabStyle: {
					marginTop: hp('1%'),
					marginBottom: hp('1%'),
					height: hp('5%'),
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#E2F2EF',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='Statement1'
				component={StatementScreen1}
				options={{
					tabBarLabel: '월별',
				}}
			/>
			<Tab.Screen
				name='Statement2'
				component={StatementScreen2}
				options={{
					tabBarLabel: '근로자별',
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
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#E3E6EE',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='WorkerStatement'
				component={WorkerStatementScreen}
				options={{
					tabBarLabel: '명세서',
				}}
			/>
			<Tab.Screen
				name='WorkerContractform'
				component={WorkerContractformScreen}
				options={{
					tabBarLabel: '계약서',
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
					justifyContent: 'center',
					borderLeftWidth: wp('0.7%'),
					borderLeftColor: '#DAE9F7',
				},
				style: {
					shadowOpacity: 0,
					elevation: 0,
					borderTopColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name='Received Message'
				component={ReceivedMessageScreen}
				options={{
					tabBarLabel: '받은 메세지',
				}}
			/>
			<Tab.Screen
				name='Sent Message'
				component={SentMessageScreen}
				options={{
					tabBarLabel: '보낸 메세지',
				}}
			/>
		</Tab.Navigator>
	);
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Function
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

const App = () => {
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
		</View>
	);
};

export default App;
