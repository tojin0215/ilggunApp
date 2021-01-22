import React, {useState} from 'react';
import { Alert, AsyncStorage } from 'react-native';
import {
  View,
  Text, Button,
  TextInput,
  TouchableOpacity,
  StyleSheet, ScrollView, Image,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//========================================바뀐부분A========================================
import * as Font from 'expo-font';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import axios from 'axios';
//========================================바뀐부분A========================================


const AddBusinessScreen = ({ onSignUp, navigation, route }) => {
  //=============================================바뀐부분B========================================
  const [workplace, setWorkplace] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [businessOwner, setBusinessOwner] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [radioIndex, setRadioIndex] = useState('');
  //=============================================바뀐부분B========================================
  const [id, setId] = useState('');
  /*AsyncStorage.getItem("userData").then((userData) =>{
    setId(id => JSON.parse(userData));
  });*/
  navigation.addListener('focus', () => {
    if(route.params != undefined){
      setAddress1(route.params.address1);
      setZipCode(route.params.zipCode);
    }
  });
  React.useEffect(() => {
    AsyncStorage.getItem("userData").then((userData) =>{
      setId(id => JSON.parse(userData).id);
    });
  }, []);
  
  //=============================================바뀐부분C========================================
  var radio_props = [
    {label: '5인 이하', value: 0 },
    {label: '5인 이상', value: 1 }
  ];

  //=============================================바뀐부분C========================================
  const SignPost = async(str) => {
    try {
      
      if(workplace=='' || businessRegistrationNumber=='' || businessOwner=='' || businessPhoneNumber=='' || address1=='' || address2=='' ||zipCode==''){
        Alert.alert("빈 칸을 채워주세요.")
      }else{
        /*let res = await fetch('https://www.toojin.tk:3000/addBusiness', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : '',
            name : businessOwner,
            bname: workplace,
            bnumber:businessRegistrationNumber,
            bphone:businessPhoneNumber,
            baddress: address1+ ' '+address2 +"("+ zipCode +")",
          }),
        });
        res = await res;*/
        await axios.post('https://www.toojin.tk:3000/addBusiness',{
          id : id,
          name : businessOwner,
          bname: workplace,
          bnumber:businessRegistrationNumber,
          bphone:businessPhoneNumber,
          baddress: address1+ ' '+address2 +"("+ zipCode +")",
        },
        {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
        }).then((res)=> {
          if(res.data.err!=null){
            Alert.alert('이미 존재하는 사업장 이름입니다. \n변경해주세요.')  
          }else{
            console.log(res); console.log('안녕하세용'); navigation.navigate('Business List');
          }
        })
        
      }
    } catch (e) {
      Alert.alert("사업장 이름이 중복됩니다. 지점 이름을 포함해서 써주세요.")
    }
  }
  return (
  //================================여기 아래는 거의 다 바뀜========================================
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.TopArea}>
        <View style={styles.titleArea}>
          <Text style={styles.titleStyle}>사업장 정보</Text>
          <View style={styles.radioArea}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#67C8BA'}
              selectedButtonColor={'#67C8BA'}
              labelStyle={{fontSize: wp('4%'), color: '#040525', marginRight:wp('7%'),fontFamily:"NanumSquare"}}
              animation={true}
              onPress={(index, value) => {
                setRadioIndex(index),
                setRadioValue(value)
              }}
            />
           </View>
          </View>
      </View> 

      <View style={styles.formArea}>
      <ScrollView>
      <View style={styles.textForm}>        
      <View style={styles.textArea}>
        <Text style={styles.titleStyle}>사업장 이름</Text>
          <TextInput 
            onChangeText={workplace =>setWorkplace(workplace)}
            defaultValue={workplace}
            placeholder={'사업장 이름을 입력하세요'}
            style={styles.textStyle}/>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.titleStyle}>사업장 등록번호 </Text>
          <TextInput 
            onChangeText={businessRegistrationNumber =>setBusinessRegistrationNumber(businessRegistrationNumber)}
            defaultValue={businessRegistrationNumber}
            placeholder={'사업장 등록번호를 입력하세요'}
            keyboardType={"number-pad"}
            style={styles.textStyle}/>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.titleStyle}>사업주 이름</Text>
          <TextInput 
            onChangeText={businessOwner =>setBusinessOwner(businessOwner)}
            defaultValue={businessOwner}
            placeholder={'사업주 이름을 입력하세요'}
            style={styles.textStyle}/>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.titleStyle}>사업장 전화번호</Text>
          <TextInput 
            onChangeText={businessPhoneNumber =>setBusinessPhoneNumber(businessPhoneNumber)}
            defaultValue={businessPhoneNumber}
            placeholder={'사업장 전화번호를 입력하세요'}
            keyboardType={"number-pad"}
            style={styles.textStyle}/>
      </View>
      <View style={{marginTop:hp('3%')}}>
        <Text style={styles.titleStyle}>사업장 주소</Text>
        <View style={styles.addressArea}>
          <View style={{flexDirection:'row'}}>
            <View style={styles.textArea1}>
            <TextInput
              defaultValue={zipCode}
              placeholder={'우편번호'}
              style={styles.textStyle}
            />  
            </View>

            <TouchableOpacity 
              style={styles.searchArea}
              onPress={()=>{ navigation.navigate('Map') }}>
              <Text style={styles.textStyle}>우편번호 찾기</Text>
            </TouchableOpacity> 
          </View>
          <View style={styles.addtextArea}>
            <TextInput
              defaultValue={address1}
              placeholder={'주소'}
              style={styles.textStyle}
            />
          </View>
          <View style={styles.addtextArea}>
              <TextInput 
                onChangeText={address2 =>setAddress2(address2)}
                defaultValue={address2}
                placeholder={'상세주소를 입력하세요'}
                style={styles.textStyle}/>
          </View>
          </View>
      </View>
      </View>

      
      <View style={styles.buttonArea}>
          <TouchableOpacity 
            style={styles.button}
            onPress={SignPost}>
          <Text style={styles.buttonTitle}>완료</Text>
          </TouchableOpacity>
      </View>
{/* 여기가 검색창 나오는 부분!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* <View style={{ width: "100%", height: 500, marginTop:100 }}>
            <Postcode
              style={{ width: 200, height: 200 }}
              jsOptions={{ animated: true }}
              onSelected={(data) =>{setAddress1(JSON.parse(JSON.stringify(data)).address), setZipCode(JSON.parse( JSON.stringify(data)).zonecode)} }
          />
          </View> */}
    </ScrollView>
    
    </View>

    <View style={styles.buttonlogoArea}>
      <Image style={styles.logobottom} source={require('../../img/logo_bottom.png') }/> 
    </View>
    </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    width:'100%', height:'100%',
    backgroundColor:'#67C8BA',
  },
  TopArea: {
      width: '100%', height:hp('15%'),
      backgroundColor:'#67C8BA',
      justifyContent:"center", alignItems:"center", paddingBottom:hp('1%')
  },
  titleArea:{
    width:wp('90%'), height:hp('12%'),
    backgroundColor:'white',
    paddingTop:wp('4%'), paddingLeft:wp('7%'),
    borderRadius:wp('4%')
  },
  radioArea:{
    marginTop:hp('1.2%'),
    alignItems:"center"
  },
  titleStyle: {
    fontSize: wp('4.3%'),
    fontFamily:"NanumSquareB"
  },
  textStyle:{
      fontSize: wp('4%'),
      fontFamily:"NanumSquare"
  },
  formArea: {
      width: '100%', height:hp('67%'),
      borderTopRightRadius:wp('13%'),
      borderTopLeftRadius:wp('13%'),
      backgroundColor:'white',
      paddingTop:hp('3%')
  },
  textForm: {
      width: '100%', 
      paddingLeft: wp('6%'),
      paddingRight: wp('6%'),
  },
  textArea:{
    marginTop:hp('3%'),
    borderBottomColor:'#D3D6E2', 
    borderBottomWidth:hp('0.2%'),
  },
  textArea1:{
    marginTop:wp('1%'),
    width:wp('40%'),
    borderBottomColor:'#D3D6E2', 
    borderBottomWidth:hp('0.2%'),
  },
  addtextArea:{
    marginTop:hp('1.8%'),
    borderBottomColor:'#D3D6E2', 
    borderBottomWidth:hp('0.2%'),
  },
  addressArea:{
    paddingLeft:wp('3%'),
    paddingRight:wp('3%'),
    paddingTop:hp('1%'),
    marginBottom:hp('5%')
  },
  searchArea:{
    marginLeft:wp('2%'),
    width:wp('25%'), height:hp('5%'), 
    backgroundColor:'#67C8BA', 
    alignItems:"center", 
    justifyContent:"center",
    borderRadius:wp('2%')
  },  
  buttonArea: {
    width: '100%', height:hp('6%'),
    paddingLeft: wp('6%'),
    paddingRight: wp('6%'),
    marginBottom: hp('4%')
  },
  button: {
      backgroundColor: "#67C8BA",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:wp('5%')
  },
  buttonTitle: {
      color: 'white',
      fontSize: wp('4.3%'),
      fontFamily:"NanumSquareB"
  },
  buttonlogoArea: {
    justifyContent:'flex-end',
    alignItems:"center",
    width: "100%",
    height: hp('7%'),
    paddingBottom:hp('3%'),
    backgroundColor:'white'
  },
  logobottom:{
      width:wp('22%'), height:wp('3%'), 
      justifyContent:"flex-end",
      alignItems:"center",
  },
})
 
export default AddBusinessScreen;