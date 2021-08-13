import React, {useState} from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import {
  View,
  Text, Button,ScrollView,
  TextInput,
  TouchableOpacity,ImageBackground,Image,Alert,
  StyleSheet, AsyncStorage
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

const ModifyPasswordScreen2 = ({ onSignUp, navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  React.useEffect(() => {
    AsyncStorage.getItem("userData").then((userData) =>{
      setId(id => JSON.parse(userData).id);
    });
  }, []);
  
  const changePassword = async() => {
    try {
        if(password=='' ||repassword==''){
            Alert.alert('빈 칸을 채워주세요.');
        }
        else if(password != repassword){
            Alert.alert('비밀번호와 재확인 비밀번호가 다릅니다.\n 다시 확인해주세요.')  
        }
        else{
            console.log(id, password)
            await axios.post('http://13.124.141.28:3000/changePassword', { 
                id: id,
                password: password, 
                headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
            }).then((responseData) => {
                console.log(responseData);
                Alert.alert("비밀번호 변경이 완료되었습니다.")
                navigation.navigate("Select Page");
            })
            .catch(function(error) {
                console.log(error)
            });
        }
    } catch (e) {
            console.error(e);
    }
  }
  return (
    <View style={styles.image}>
        <View style={styles.container}>
                <View style={styles.formArea}>
                
                
                <View style={styles.textArea}>
                    <Text style={styles.titleStyle}>새 비밀번호</Text>
                    <TextInput 
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                        style={styles.textStyle}
                        secureTextEntry={true}
                        placeholder={"비밀번호를 입력하세요."}/>
                </View>    

                 <View style={styles.textArea}>
                    <Text style={styles.titleStyle}>새 비밀번호 확인</Text>
                    <TextInput 
                        onChangeText={repassword => setrePassword(repassword)}
                        defaultValue={repassword}
                        style={styles.textStyle} 
                        secureTextEntry={true}
                        placeholder={"비밀번호를 한번 더 입력하세요."}/>
                </View>    
                
                
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>changePassword()}>
                        <Text style={styles.buttonTitle}>수정하기</Text>
                    </TouchableOpacity>
                </View>
                </View> 
                <View style={styles.buttonlogoArea}>
                    <Image style={styles.logobottom} source={require('../../img/logo_bottom.png') }/> 
                </View> 
        </View>
    
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        width: "100%", height: "100%",
        backgroundColor: 'white',
        borderTopRightRadius:wp('13%'),
        borderTopLeftRadius:wp('13%'),    
    },
    image:{
        width: "100%", height: "100%",
        backgroundColor:'#67C8BA'    
    },
    formArea: {
        width: '100%', height:hp('95%'),
        maxWidth: wp('100rem'),
        marginHorizontal: "auto",
        paddingTop:hp('2%'),
        paddingLeft:wp('6%'),
        paddingRight:wp('6%'),
    },
    textArea:{
        marginTop:hp('3%'),
        borderBottomColor:'#D3D6E2', borderBottomWidth:hp('0.2%')
    },
    titleStyle: {
        fontSize: wp('5rem'),
        fontFamily:"NanumSquareB"
    },
    textStyle:{
        fontSize: wp('4rem'),
        fontFamily:"NanumSquare"
    },
    titleSignStyle:{
        fontSize: wp('4.3rem'),
        fontFamily:"NanumSquareB",
        marginTop:hp('1%')
    },
    textArea2:{
        marginTop:hp('1.5%'),
    },
    sign : { 
        height:hp('20rem'), 
        width:"100%" , 
        backgroundColor: '#E4E5EA' 
    },
    signBtnArea:{
        height:hp('4%'),
        flexDirection:"row"
    },
    signBtnArea2:{
        position:"absolute", top:0,right:0,
        width:wp('15%'),height:hp('4%'),
        flexDirection:"row"
    },
    signTextStyle:{
        width:wp('15%'), height:hp('4%'),
        backgroundColor:'#040525',
        color:'white',
        fontSize: wp('3.8rem'),
        fontFamily:"NanumSquare",
        textAlign:"center",
        paddingTop:hp('1.3%'),
        borderRadius:wp('1.5%')
    },
  
    buttonArea: {
        width: '100%',
        height: hp('5.5%'),
        marginTop:hp('3%')
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:wp('5%')
    },
    buttonTitle: {
        color: 'white',
        fontFamily:"NanumSquare",
        fontSize: wp('4.3rem'),
    },

    buttonlogoArea: {
        justifyContent:'flex-end',
        alignItems:"center",
        bottom: hp('3%'),
        width: "100%",
        height: hp('5%'),
    },
    logobottom:{
        width:wp('22%'), height:wp('3%'), 
        justifyContent:"flex-end",
        alignItems:"center",
    },
  })
 
export default ModifyPasswordScreen2;