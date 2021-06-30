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

const SignUpScreen = ({ onSignUp, navigation }) => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [path, setPath] = useState('');
  const [savePath, setSavePath] = useState('');
  
  const SignPost = async(str) => {
    try {
        let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        let reg = /^[0-9a-zA-Z]{2,15}$/;
        if(!regEmail.test(email)){
            Alert.alert('이메일 주소가 맞는지 확인해주세요.')
        }
        else if(!reg.test(password)){
            Alert.alert('비밀번호가 영어대소문자, 숫자로만 이루어져있는지 확인해주세요.')
        }
        else if(name=='' || email=='' || password=='' ||repassword==''|| path==''){
            Alert.alert('빈 칸을 채워주세요.');
        }
        else if(password != repassword){
            Alert.alert('비밀번호와 재확인 비밀번호가 다릅니다.\n 다시 확인해주세요.')  
        }
        else{
        await axios.post('http://13.124.141.28:3000/signup', { 
            id:email,
            name:name,
            password: password,
            sign:savePath,
            code:null,
        },{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        }).then((res)=>{
      /*let res = await fetch('http://13.124.141.28:3000/signup', {
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
      
      if(res.data.err!=null){
        Alert.alert('이미 존재하는 ID입니다. \n변경해주세요.')  
      }else{
        navigation.navigate('Sign In')
        Alert.alert('회원가입이 완료되었습니다.')    
      }        
        })
    }
    } catch (e) {
      console.error(e);
    }
    
}
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
                <ScrollView>
                <View style={styles.textArea}>
                    <Text style={styles.titleStyle}>이름</Text>
                    <TextInput 
                        onChangeText={name =>setName(name)}
                        defaultValue={name}
                        style={styles.textStyle} 
                        placeholder={"이름을 입력하세요."}/>
                </View>   

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
                    <Text style={styles.titleStyle}>비밀번호</Text>
                    <TextInput 
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                        style={styles.textStyle}
                        secureTextEntry={true}
                        placeholder={"비밀번호를 입력하세요."}/>
                </View>    

                 <View style={styles.textArea}>
                    <Text style={styles.titleStyle}>비밀번호 확인</Text>
                    <TextInput 
                        onChangeText={repassword => setrePassword(repassword)}
                        defaultValue={repassword}
                        style={styles.textStyle} 
                        secureTextEntry={true}
                        placeholder={"비밀번호를 한번 더 입력하세요."}/>
                </View>    
                <View style={styles.textArea2}>
                    <View style={styles.signBtnArea}>
                    <Text style={styles.titleSignStyle}>서명</Text>
                        <TouchableOpacity
                            style={styles.signBtnArea2}
                            onPress={async()=>{
                                setPath('');
                                setSavePath('')
                            }}>
                            <Text style={styles.signTextStyle}>지우기</Text>
                        </TouchableOpacity> 
                    </View>
                    <View style={styles.sign} onTouchMove={(e) => {
                    setSavePath(savePath+' '+e.nativeEvent.locationX+','+e.nativeEvent.locationY)
                    setPath(path+' L'+e.nativeEvent.locationX+' '+e.nativeEvent.locationY)
                    console.log(savePath)
                    }}
                    ontouchend={(e) => {
                        setSavePath(savePath)
                        setPath(path+' Z')
                        console.log(savePath)
                    }}
                    onTouchStart={(e) => {
                        setSavePath(savePath+' '+e.nativeEvent.locationX+','+e.nativeEvent.locationY)
                        setPath(path+' M'+e.nativeEvent.locationX+' '+e.nativeEvent.locationY)
                        console.log(savePath)
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
    },//상단 바를 제외한 하얀색 전체 컨텐츠 컨테이너입니다.
    image:{
        width: "100%", height: "100%",
        backgroundColor:'#67C8BA'    
    },//배경이미지입니다.
    formArea: {
        width: '100%', height:'95%',
        maxWidth: wp('100rem'),
        paddingTop:hp('2%'),
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft:wp('6rem'),
        paddingRight:wp('6rem'),
    },//상단 바, 하단 푸터를 제외한 입력폼 공간입니다.
    textArea:{
        marginTop:hp('3rem'),
        borderBottomColor:'#D3D6E2', borderBottomWidth:hp('0.2%'),
    },//이름, EMAIL, 비밀번호, 비밀번호 확인의 라벨,텍스트 입력 포함한 폼 박스입니다.
    titleStyle: {
        fontSize: wp('5rem'),
        fontFamily:"NanumSquareB",
    },//텍스트 입력 폼의 타이틀 라벨입니다.
    textStyle:{
        fontSize: wp('4.5rem'),
        fontFamily:"NanumSquare",
        marginTop: wp("1.6rem"),
    },//텍스트 입력 박스입니다.
    titleSignStyle:{
        fontSize: wp('5rem'),
        fontFamily:"NanumSquareB",
        marginTop:hp('1.0%'),
    },//서명 타이틀 라벨입니다.
    textArea2:{
        marginTop:hp('2.5%'),
    },//서명 타이틀 라벨 공간입니다.
    sign : { 
        height: hp('28rem'),
        width: '100%',
        backgroundColor: '#E4E5EA',
    },//서명 입력 폼입니다.
    signBtnArea:{
        height:hp('5%'),
        flexDirection:"row",
    },//서명 지우기 버튼 전체 폼의 공간 입니다.
    signBtnArea2:{
        position:"absolute", top:0,right:0,
        width:wp('20rem'), height:hp('5rem'),
        flexDirection:"row",
    },//서명 지우기 버튼 클릭 공간입니다.
    signTextStyle:{
        width:wp('20rem'), height:hp('5rem'),
        backgroundColor:'#040525',
        color:'white',
        fontSize: wp('4rem'),
        lineHeight: hp('5rem'),
        fontFamily:"NanumSquare",
        textAlign:"center",
        borderRadius: 50,
    },//서명 지우기 버튼의 검은색 배경 이미지가 되는 내부 공간입니다.
  
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
 
export default SignUpScreen;