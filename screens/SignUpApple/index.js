import React, {useState} from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import {
  View,
  Text, Button,ScrollView,
  TextInput,
  TouchableOpacity,ImageBackground,Image,Alert,
} from 'react-native';
import axios from 'axios';
import styles from './style';

const SignUpAppleScreen = ({ onSignUp, navigation, route }) => {
  const [email, setEmail] = useState(route.params.email);
  const [a_id, setA_id] = useState(route.params.a_id);
  const [name, setName] = useState(route.params.name);
  const [password, setPassword] = useState(route.params.password);
  const [path, setPath] = useState('');
  const [savePath, setSavePath] = useState('');
  const [code, setCode] = useState(route.params.password);

  const SignPost = async(str) => {
    try {
        let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!regEmail.test(email)){
            Alert.alert('이메일 주소가 맞는지 확인해주세요.')
        }else{
            if(path==''){
                Alert.alert('sign을 채워주세요.');
            }
            else{
                await axios.post('http://13.124.141.28:3000/changeApple', { 
                    a_id: a_id,
                    sign: savePath,
                    id : email
                },{
                headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'}
                }).then((res)=>{
                    Alert.alert("이메일과 서명 등록이 완료되었습니다. 다시 로그인해주세요.")
                    navigation.navigate('Sign In')   
                })
    
                /*await axios.post('http://13.124.141.28:3000/signupByCode', { 
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
            })*/
            }
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
                    <View style={{flexDirection:'row'}}>
                    <Text style={styles.titleStyle}>EMAIL</Text>
                </View>
                    <TextInput 
                        onChangeText={email =>setEmail(email)}
                        defaultValue={email}
                        style={styles.textStyle} 
                        placeholder={"이메일을 입력하세요."}/>
                </View>
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
                        setSavePath(savePath+' '+e.nativeEvent.locationX+','+e.nativeEvent.locationY)
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
 
export default SignUpAppleScreen;