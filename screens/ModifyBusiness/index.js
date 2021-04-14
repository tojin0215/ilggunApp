import React, {useState} from 'react';
import { Alert, AsyncStorage } from 'react-native';
import {
  View, Input,
  Text, Button,
  TextInput,
  TouchableOpacity,
  StyleSheet, ScrollView, Image,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//========================================바뀐부분A========================================
import * as Font from 'expo-font';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import axios from 'axios';
import { WebView } from 'react-native-webview'

const ModifyBusinessScreen = ({ onSignUp, navigation, route }) => {
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
  const [radioIndex, setRadioIndex] = useState(-1);
  //=============================================바뀐부분B========================================
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] =useState(null);
  const [result, setResult] = useState(null);
  const [localUri, setLocalUri] = useState('');
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [r, setR] = useState(-1);
  const [bangCode, setBangCode] = useState('');
  const [sign, setSign] = useState(0);
  /*AsyncStorage.getItem("userData").then((userData) =>{
    setId(id => JSON.parse(userData));
  });*/

  React.useEffect(() => {
    
    navigation.addListener('focus', () => {
        AsyncStorage.getItem("bangCode")
        .then((bangCode) =>{
            setBangCode(bangCode);
            navigation.setOptions({
                //headerTitle: bangCode,
                headerRight: () => (
                    <View>
                        <Text style={styles.delBusiness} onPress={()=>{delB(bangCode)}}>{'사업장삭제'}</Text>
                    </View>
                ),
              });
            axios.post("http://13.124.141.28:3000/selectBusinessByName",
            { bname: bangCode },
            {
                method: 'POST',
                headers: {
                    Accept: 
                    'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(async(res) => {
                setRadioIndex(res.data[0].fivep)
                setId(res.data[0].id)
                setBusinessOwner(res.data[0].name)
                setWorkplace(res.data[0].bname)
                setBusinessRegistrationNumber(res.data[0].bnumber);
                setBusinessPhoneNumber(res.data[0].bphone)
                if(route.params != undefined){
                    setAddress1(route.params.address1);
                    setAddress2("");
                    setZipCode(route.params.zipCode);
                }
                else{
                    setAddress1(res.data[0].baddress.split('  ')[0]) 
                    let addr2 = res.data[0].baddress.split('  ')[1]
                    setAddress2(addr2.split('(')[0]) 
                    let addr3 = addr2.split('(')[1]
                    setZipCode(addr3.split(')')[0])
                }
                setR(res.data[0].stamp);
            }).catch(err => {
                
            })
        });
    });
    AsyncStorage.getItem("userData").then((userData) =>{
      setId(id => JSON.parse(userData).id);
      axios.post('http://13.124.141.28:3000/selectSign', { 
            id: JSON.parse(userData).id,
            id2: JSON.parse(userData).id,
        },{
        headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
        }).then((res)=>{
            setSign(res.data[0].sign)        
        })
    });
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    setResult(result);
    let localUri1 = result.uri;
    let filename1 = localUri1.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type1 = match ? `image/${match[1]}` : `image`;

    setLocalUri(result.uri);
    setFilename(filename1);
    setType(type1);

    if (!result.cancelled) {
      setSelectedFile(result.uri);
    }
  };
  //=============================================바뀐부분C========================================
  var radio_props = [
    {label: '5인 이하', value: 0 },
    {label: '5인 이상', value: 1 }
  ];

  var radio_props2 = [
    {label: '기존 서명 사용', value: 0 },
    {label: '도장', value: 1 }
  ];
  //=============================================바뀐부분C========================================

    const delB = async(bc) => {
        Alert.alert(
            "사업장 삭제",
            "사업장을 삭제하면 복구할 수 없습니다. 그래도 삭제하시겠습니까?",
            [
              { text: "OK", onPress: () => {
                axios.post('http://13.124.141.28:3000/delBusiness', { 
                    bang: bc,
                },{
                headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'}
                }).then((res)=>{
                    navigation.navigate('Business List');
                })
              } },
              {
                text: "Cancel",
                //onPress: () => setModalVisibility(!visibility,''),
                style: "cancel"
              }
              
            ]
          );
        
    }


  const SignPost = async(str) => {
    try {
      let regPlace = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{1,15}$/;

      if(workplace=='' || businessRegistrationNumber=='' || businessOwner=='' || businessPhoneNumber=='' || address1=='' || address2=='' ||zipCode==''){
        Alert.alert("빈 칸을 채워주세요.")
      }else if(!regPlace.test(workplace)){
        Alert.alert("사업장 이름에 공백, 특수기호는 들어갈 수 없습니다.")
      }else{
        /*let res = await fetch('http://13.124.141.28:3000/addBusiness', {
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
        let err = false;
        if(r==0 || (r==1 && selectedFile===null)){
            axios.post('http://13.124.141.28:3000/updateBusiness',{
                id : id,
                name : businessOwner,
                bname: workplace,
                bnumber:businessRegistrationNumber,
                bphone:businessPhoneNumber,
                baddress: address1+ '  '+address2 +"("+ zipCode +")",
                stamp: r,
                fivep: radioIndex
            },
            {  headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
            }).then((res)=> {
                if(res.data.err!=null){
                Alert.alert('이미 존재하는 사업장 이름입니다. \n변경해주세요.')  
                //Alert.alert(res.data.err);
                }else{
                navigation.navigate('Home');
                }
            })
        }
        if(r==1){
          if(selectedFile!==null){
            const formData = new FormData();
            formData.append('file', {
              selectedFile,
              name: `image`,
              type: `image/jpg`,
            });
          
            axios.post("http://13.124.141.28:3000/uploadStamp", {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                file: result.base64,
                bname: workplace
              }),
            }).then(async(res) => {
                axios.post('http://13.124.141.28:3000/updateBusiness',{
                    id : id,
                    name : businessOwner,
                    bname: workplace,
                    bnumber:businessRegistrationNumber,
                    bphone:businessPhoneNumber,
                    baddress: address1+ '  '+address2 +"("+ zipCode +")",
                    stamp: r,
                    fivep: radioIndex
                },
                {  headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
                }).then((res)=> {
                    if(res.data.err!=null){
                    Alert.alert('이미 존재하는 사업장 이름입니다. \n변경해주세요.')  
                    //Alert.alert(res.data.err);
                    }else{
                    navigation.navigate('Home');
                    }
                })
            }).catch(err => {
                alert(err)
            })
        }
      }
      }
        } catch (e) {
          Alert.alert("사업장 이름이 중복됩니다. 지점 이름을 포함해서 써주세요."+e)
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
            {radioIndex>=0 && <RadioForm
              radio_props={radio_props}
              initial={radioIndex}
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
            />}
           </View>
          </View>
      </View> 

      <View style={styles.formArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
      <View style={styles.textForm}>        
      <View style={styles.textArea2}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.titleStyle}>사업장 이름</Text><Text style={{fontSize:11, marginTop: hp('0.4%'),}}> (15자 이내)</Text>
          </View>
          <Text style={styles.textStyle}>{workplace}</Text> 
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
              onPress={()=>{ navigation.navigate('Map2') }}>
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
          <View style={{marginTop:hp('3%')}}>
            {r>=0 && <RadioForm
              radio_props={radio_props2}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#67C8BA'}
              selectedButtonColor={'#67C8BA'}
              labelStyle={{fontSize: wp('4%'), color: '#040525', marginRight:wp('7%'),fontFamily:"NanumSquare"}}
              animation={true}
              initial={r}
              onPress={(value) => {setR(value), ()=> console.log(r)}}
            />}

            {r==0 && 
              <View style={{ width:'100%', height:hp('15%'), }}>
              <WebView
                  originWhitelist={['*']}
                  automaticallyAdjustContentInsets={false}
                  source={{ html: `<!DOCTYPE html>
                  <html>
                  <body>
                  <svg viewBox = "0 0 500 500" style="position:absolute; height:500px; width: 500px; " xmlns="http://www.w3.org/2000/svg">
                          <polyline points="${String(sign)}"
                          style="fill:none;stroke:black;stroke-width:3" />
                      </svg>
                  </body>
                  </html>`
                  }}
              />
              </View>
            }
            {r==1 && 
              <View style={{ width: 200}}>
                <TouchableOpacity 
                  style={styles.searchArea2}
                  onPress={pickImage}>
                  <Text style={styles.textStyle}>도장 사진 가져오기</Text>
                </TouchableOpacity> 
                <Image contentContainerStyle={{ flex: 1}} source={{ uri: selectedFile?selectedFile:`http://13.124.141.28:3000/${workplace}.png` }} style={{ width: 200, height: 200, flex:1,marginTop:hp('1%') }} />

                
              </View>
            }
          </View>
          </View>
      </View>
      </View>

      
      <View style={styles.buttonArea}>
          <TouchableOpacity 
            style={styles.button}
            onPress={SignPost}>
          <Text style={styles.buttonTitle}>수정하기</Text>
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
  delBusiness:{
      marginRight:hp('1%'),
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
      paddingTop:hp('3%'),
      flexGrow: 1,
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
  textArea2:{
    marginTop:hp('3%'),
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
  searchArea2:{
    width:wp('53%'), height:hp('5%'), 
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
 
export default ModifyBusinessScreen;