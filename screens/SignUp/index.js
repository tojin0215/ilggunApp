import React, {useState} from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import {
  View,
  Text, Button,ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
      let res = await fetch('http://192.168.43.253:3000/signup', {
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
      });
      res = await res;
      
      navigation.navigate('Sign In')
      console.log(res)
      
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
    <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>가입하기</Text>
                </View>
                <View style={styles.formArea}>
                          
                <View style={styles.rowView}>
                    <Text style={styles.marginText}>   이메일    : </Text>
                    <TextInput 
                        onChangeText={email =>setEmail(email)}
                        defaultValue={email}
                        style={styles.textForm} 
                        placeholder={"이메일을 입력하세요."}/>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.marginText}>   이름    : </Text>
                    <TextInput 
                        onChangeText={name =>setName(name)}
                        defaultValue={name}
                        style={styles.textForm} 
                        placeholder={"이름을 입력하세요."}/>
                </View> 
                
                <View style={styles.rowView}>
                    <Text style={styles.marginText}>  비밀번호 : </Text>
                    <TextInput 
                        onChangeText={password => setPassword(password)}
                        defaultValue={password}
                        style={styles.textForm} 
                        placeholder={"비밀번호를 입력하세요"}/>
                </View>    

                 <View style={styles.rowView}>
                    <Text style={styles.marginText}>  비밀번호확인 : </Text>
                    <TextInput 
                        onChangeText={repassword => setrePassword(repassword)}
                        defaultValue={repassword}
                        style={styles.textForm} 
                        placeholder={"비밀번호를 입력하세요"}/>
                </View>    
                <View style={styles.rowView}>
                    <Text style={styles.marginText}>  Sign : </Text>
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
                <Button
                    title="reset"
                    color="#FF3232"
                    onPress={async()=>{
                        setPath('');
                        setSavePath('')
                    }}/> 
                </View>
                </View>  
                
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>SignPost()}>
                        <Text style={styles.buttonTitle}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
    
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: wp('10%'),
      paddingRight: wp('10%'),
      justifyContent: 'center',
  },
  titleArea: {
      width: '100%',
      padding: wp('10%'),
      alignItems: 'center',
  },
  title: {
      fontSize: wp('10%'),
  },
  formArea: {
      width: '100%',
      paddingBottom: wp('10%'),
  },
  textForm: {
      borderWidth: 0.5,
      borderColor: '#888',
      width: '100%',
      height: hp('5%'),
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 5,
  },
  buttonArea: {
      width: '100%',
      height: hp('5%'),
  },
  button: {
      backgroundColor: "#46c3ad",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonTitle: {
      color: 'white',
  },
  sign : { height:150, width:"100%" , backgroundColor: '#faa' },
})
 
export default SignUpScreen;