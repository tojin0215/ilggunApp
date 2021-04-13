import React, {useState} from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import {
  View,
  Text, Button,ScrollView,
  TextInput,
  TouchableOpacity,ImageBackground,Image,Alert,
  StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

const SignUpGoogleScreen = ({ onSignUp, navigation, route }) => {
  const [email, setEmail] = useState(route.params.email);
  const [name, setName] = useState(route.params.name);
  const [password, setPassword] = useState(route.params.password);
  const [path, setPath] = useState('');
  const [savePath, setSavePath] = useState('');
  const [code, setCode] = useState(route.params.password);

  const SignPost = async(str) => {
    try {
        if(path==''){
            Alert.alert('sign을 채워주세요.');
        }
        else{
            await axios.post('http://13.124.141.28:3000/signupByCode', { 
                    id: email,
                    name: name,
                    password: password,
                    sign: savePath,
                    code: code,
                },{
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
                }).then((res)=>{
            if(res.data.err!=null){
                Alert.alert('이미 존재하는 ID입니다. \n변경해주세요.')  
            }else{
                navigation.navigate('Sign In')
                Alert.alert('회원가입이 완료되었습니다.')    
            }        
        })
    }
    } catch (e) {
        console.log(e);
    }
    
}

  return (
    <View style={styles.image}>
        <View style={styles.container}>
                <View style={styles.formArea}>
                <ScrollView>
                <View style={styles.textArea}>
                    <Text style={styles.titleSignStyle}>서명</Text>
                    <View style={styles.sign} onTouchMove={(e) => {
                    console.log('touchMove',e.nativeEvent.locationX, e.nativeEvent.locationY) 
                    setSavePath(savePath+' '+e.nativeEvent.locationX+','+e.nativeEvent.locationY)
                    setPath(path+' L'+e.nativeEvent.locationX+' '+e.nativeEvent.locationY)
                    console.log(path)
                    }}
                    ontouchend={(e) => {
                        console.log('touchMove',e.nativeEvent.locationX, e.nativeEvent.locationY) 
                        setSavePath(savePath)
                        setPath(path+' Z')
                        console.log(path)
                    }}
                    onTouchStart={(e) => {
                        console.log('touchMove',e.nativeEvent.locationX, e.nativeEvent.locationY) 
                        setSavePath(savePath+e.nativeEvent.locationX+','+e.nativeEvent.locationY)
                        setPath(path+' M'+e.nativeEvent.locationX+' '+e.nativeEvent.locationY)
                        console.log(path)
                    }}
                >
                <Svg>
                <Path
                    d={path}
                    fill="none"
                    stroke="black"
                />
                </Svg>

                </View>

                <TouchableOpacity
                    style={styles.signBtnArea}
                    onPress={async()=>{
                        setPath('');
                        setSavePath('')
                    }}>
                    <Text style={styles.signTextStyle}>지우기</Text>
                    </TouchableOpacity> 
                </View> 
                
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>SignPost()}>
                        <Text style={styles.buttonTitle}>완료</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
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
        width: '100%', height:'95%',
        paddingTop:hp('2%'),
        paddingLeft:wp('6%'),
        paddingRight:wp('6%'),
    },
    textArea:{
        marginTop:hp('3%'),
        borderBottomColor:'#D3D6E2', borderBottomWidth:hp('0.2%')
    },
    titleStyle: {
        fontSize: wp('4.3%'),
        fontFamily:"NanumSquareB"
    },
    textStyle:{
        fontSize: wp('4%'),
        fontFamily:"NanumSquare"
    },
    titleSignStyle:{
        fontSize: wp('4.3%'),
        fontFamily:"NanumSquareB",
        marginBottom:hp('1%')
    },
    sign : { 
        height:hp('40%'), 
        width:"100%" , 
        backgroundColor: '#E4E5EA' 
    },
    signBtnArea:{
        backgroundColor:'#E4E5EA',
        height:hp('6%'),
        justifyContent:"center", alignItems:"center"
    },
    signTextStyle:{
        position:"absolute",
        bottom:hp('0.8%'),right:hp('0.8%'),
        width:wp('15%'), height:hp('5%'),
        backgroundColor:'#040525',
        color:'white',
        fontSize: wp('3.8%'),
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
        fontSize: wp('4.3%'),
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
 
export default SignUpGoogleScreen;