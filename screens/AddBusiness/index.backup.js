import React, {useState, useEffect} from 'react';
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
import * as Font from 'expo-font';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import axios from 'axios';
import { WebView } from 'react-native-webview'


const AddBusinessScreen = ({ onSignUp, navigation, route }) => {
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
  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] =useState(null);
  const [result, setResult] = useState(null);
  const [localUri, setLocalUri] = useState('');
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [r, setR] = useState(0);
  const [sign, setSign] = useState(0);
  /*AsyncStorage.getItem("userData").then((userData) =>{
    setId(id => JSON.parse(userData));
  });*/
  navigation.addListener('focus', () => {
    if(route.params != undefined){
      setAddress1(route.params.address1);
      setZipCode(route.params.zipCode);
    }
  });


  useEffect(() => {
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
          alert('???????????????. ??? ????????? ??????????????? ????????? ??? ????????? ???????????????! ');
        }
      }
    })();
  }, []
  );

  const pickImage = async () => {
    console.log(`AddBusiness::pickImage`)
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
  var radio_props = [
    {label: '5??? ??????', value: 0 },
    {label: '5??? ??????', value: 1 }
  ];

  var radio_props2 = [
    {label: '?????? ?????? ??????', value: 0 },
    {label: '??????', value: 1 }
  ];




  const SignPost = async(str) => {
    try {
      let regPlace = /^[0-9a-zA-Z???-??????-??????-???]{1,15}$/;

      if(workplace=='' || businessRegistrationNumber=='' || businessOwner=='' || businessPhoneNumber=='' || address1=='' || address2=='' ||zipCode==''){
        Alert.alert("??? ?????? ???????????????.")
      }else if(!regPlace.test(workplace)){
        Alert.alert("????????? ????????? ??????, ??????????????? ????????? ??? ????????????.")
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
        if(r==0){
          axios.post('http://13.124.141.28:3000/addBusiness',{
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
              Alert.alert('?????? ???????????? ????????? ???????????????. \n??????????????????.')  
              //Alert.alert(res.data.err);
            }else{
              navigation.navigate('Business List');
            }
          })
        }
        if(r==1){
          if(selectedFile==null){
            err=true
            Alert.alert("?????? ????????? ???????????????.")
          }
          else if(selectedFile!==null){
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
              axios.post('http://13.124.141.28:3000/addBusiness',{
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
                  Alert.alert('?????? ???????????? ????????? ???????????????. \n??????????????????.')  
                  //Alert.alert(res.data.err);
                }else{
                  navigation.navigate('Business List');
                }
              })

            }).catch(err => {
                alert(err)
                err=true;
            })
        }
      }
      }
        } catch (e) {
          Alert.alert("????????? ????????? ???????????????. ?????? ????????? ???????????? ????????????."+e)
        }
  
  }
  
  return (
  //================================?????? ????????? ?????? ??? ??????========================================
  
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.TopArea}>
        <View style={styles.titleArea}>
          <Text style={styles.titleStyle}>????????? ??????</Text>
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
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity>
      <View style={styles.textForm}>        
      <View style={styles.textArea}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.titleStyle}>????????? ??????</Text><Text style={{fontSize:11, marginTop: hp('0.4%'),}}> (15??? ??????)</Text>
          </View>
          <TextInput 
            onChangeText={workplace =>setWorkplace(workplace)}
            defaultValue={workplace}
            placeholder={'????????? ????????? ???????????????'}
            style={styles.textStyle}/>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.titleStyle}>????????? ???????????? </Text>
          <TextInput 
            onChangeText={businessRegistrationNumber =>setBusinessRegistrationNumber(businessRegistrationNumber)}
            defaultValue={businessRegistrationNumber}
            placeholder={'????????? ??????????????? ???????????????'}
            keyboardType={"number-pad"}
            style={styles.textStyle}/>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.titleStyle}>????????? ??????</Text>
          <TextInput 
            onChangeText={businessOwner =>setBusinessOwner(businessOwner)}
            defaultValue={businessOwner}
            placeholder={'????????? ????????? ???????????????'}
            style={styles.textStyle}/>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.titleStyle}>????????? ????????????</Text>
          <TextInput 
            onChangeText={businessPhoneNumber =>setBusinessPhoneNumber(businessPhoneNumber)}
            defaultValue={businessPhoneNumber}
            placeholder={'????????? ??????????????? ???????????????'}
            keyboardType={"number-pad"}
            style={styles.textStyle}/>
      </View>
      <View style={{marginTop:hp('3%')}}>
        <Text style={styles.titleStyle}>????????? ??????</Text>
        <View style={styles.addressArea}>
          <View style={{flexDirection:'row'}}>
            <View style={styles.textArea1}>
            <TextInput
              defaultValue={zipCode}
              placeholder={'????????????'}
              style={styles.textStyle}
            />  
            </View>

            <TouchableOpacity 
              style={styles.searchArea}
              onPress={()=>{ navigation.navigate('Map') }}>
              <Text style={styles.textStyle}>???????????? ??????</Text>
            </TouchableOpacity> 
          </View>
          <View style={styles.addtextArea}>
            <TextInput
              defaultValue={address1}
              placeholder={'??????'}
              style={styles.textStyle}
            />
          </View>
          <View style={styles.addtextArea}>
              <TextInput 
                onChangeText={address2 =>setAddress2(address2)}
                defaultValue={address2}
                placeholder={'??????????????? ???????????????'}
                style={styles.textStyle}/>
          </View>
          <View style={{marginTop:hp('3%')}}>
            <RadioForm
              radio_props={radio_props2}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#67C8BA'}
              selectedButtonColor={'#67C8BA'}
              labelStyle={{fontSize: wp('4%'), color: '#040525', marginRight:wp('7%'),fontFamily:"NanumSquare"}}
              animation={true}
              initial={0}
              onPress={(value) => {setR(value), ()=> console.log(r)}}
            />

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
                  <Text style={styles.textStyle}>?????? ?????? ????????????</Text>
                </TouchableOpacity> 
                {selectedFile && <Image contentContainerStyle={{ flex: 1}} source={{ uri: selectedFile }} style={{ width: 200, height: 200, flex:1,marginTop:hp('1%') }} />}

                
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
          <Text style={styles.buttonTitle}>??????</Text>
          </TouchableOpacity>
      </View>
{/* ????????? ????????? ????????? ??????!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* <View style={{ width: "100%", height: 500, marginTop:100 }}>
            <Postcode
              style={{ width: 200, height: 200 }}
              jsOptions={{ animated: true }}
              onSelected={(data) =>{setAddress1(JSON.parse(JSON.stringify(data)).address), setZipCode(JSON.parse( JSON.stringify(data)).zonecode)} }
          />
          </View> */}
      </TouchableOpacity>
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
    fontSize: wp('5rem'),
    fontFamily:"NanumSquareB"
  },
  textStyle:{
      fontSize: wp('4%'),
      fontFamily:"NanumSquare"
  },
  formArea: {
      width: '100%', height:hp('67%'),
      maxWidth: wp('100rem'),
      marginHorizontal: "auto",
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
 
export default AddBusinessScreen;