import React, {useState} from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import {
  View,
  Text,AsyncStorage,
  TextInput,
  TouchableOpacity,Image,Alert,
  StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

const ModifyPasswordScreen1 = ({ onSignUp, navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  React.useEffect(() => {
    AsyncStorage.getItem("userData").then((userData) =>{
      setId(id => JSON.parse(userData).id);
    });
  }, []);
  
  const checkPassword = async(str) => {
    try {
        if(password==''){
            Alert.alert('빈 칸을 채워주세요.');
        }
        else{
            await axios.post('http://13.124.141.28:3000/signin', { 
                id: id,
                password: password, 
                headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
            })
            .then((responseData) => {
                console.log(responseData);
                if(responseData.data[0] == undefined || responseData.data[0] == ''){
                Alert.alert("비밀번호가 잘못되었습니다. 한번 더 확인해주세요.")
                }else{
            
                if(responseData.data[0].id){
                    navigation.navigate('Modify Password2');
                }
                }
            })
            .catch(function(error) {
                Alert.alert("비밀번호가 잘못되었습니다. 한번 더 확인해주세요.")

                if (!error.response) {
                // network error
                console.log('hh'+error)
                }
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
                    <Text style={styles.titleStyle}>비밀번호</Text>
                    <TextInput 
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                        style={styles.textStyle}
                        secureTextEntry={true}
                        placeholder={"기존 비밀번호를 입력하세요."}/>
                </View>    

                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>checkPassword()}>
                        <Text style={styles.buttonTitle}>입력</Text>
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
    image: {
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
    textArea: {
        marginTop:hp('3%'),
        borderBottomColor:'#D3D6E2', borderBottomWidth:hp('0.2%')
    },
    titleStyle: {
        fontSize: wp('5rem'),
        fontFamily:"NanumSquareB"
    },
    textStyle:{
        fontSize: wp('4%'),
        fontFamily:"NanumSquare"
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
 
export default ModifyPasswordScreen1;