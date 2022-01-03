import React, {useState, useEffect} from 'react';
import { Alert, StyleSheet, AsyncStorage } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView, Image,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import { WebView } from 'react-native-webview'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import {AddBusinessScreen as Style} from "../../styles/StyleContainer";
import {convertSignToHtml} from "../../api/Util";
import {getSelectSign} from "../../api/Api";

const styles = StyleSheet.create(Style.style)
const SELECT_SIGN = 0;
const SELECT_STAMP_IMG = 1;
const SELECT_UNDER_FIVE = 0;
const SELECT_OVER_FIVE = 1;
const REGEX_NAME_TEST = /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{1,15}$/;

const PROPS_RADIO_PEOPLE_OVER_FIVE = [
    {label: '5인 이하', value: SELECT_UNDER_FIVE },
    {label: '5인 초과', value: SELECT_OVER_FIVE }
];
const PROPS_RADIO_SIGN_OR_STAMP = [
    {label: '기존 서명 사용', value: SELECT_SIGN },
    {label: '도장', value: SELECT_STAMP_IMG }
  ];


const AddBusinessScreen = ({navigation, route}) => {
    const [workplace, setWorkplace] = useState('');
    const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
    const [businessOwner, setBusinessOwner] = useState('');
    const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [radioIndex, setRadioIndex] = useState('');

    
    const [id, setId] = useState('');
    const [selectedFile, setSelectedFile] =useState(null);
    const [result, setResult] = useState(null);
    const [r, setR] = useState(0);
    const [sign, setSign] = useState(0);


    useEffect(() => {
        try {
            AsyncStorage.getItem("userData").then((userData) =>{
                const user_data = JSON.parse(userData);
    
                setId(id => user_data.id);
    
                getSelectSign(user_data.id, user_data.id)
                .then((res)=>{
                    setSign(res.data[0].sign)        
                })
            });
        } catch (e) {
            console.error(e)
        }
        

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);



    navigation.addListener('focus', () => {
        if(route.params != undefined){
            setAddress1(route.params.address1);
            setZipCode(route.params.zipCode);
        }
    });

    const pickImage = async () => {
        try {
            const image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            })
            setResult(image);
            if (!image.cancelled) {setSelectedFile(image.uri)}
        } catch (e) {
            Alert.alert(e)
        }
    };


    const isBlank = () => (
        workplace == ''
        || businessRegistrationNumber == ''
        || businessOwner == ''
        || businessPhoneNumber == ''
        || address1 == ''
        || address2 == ''
        || zipCode == ''
    )
    const isWorkplaceCorrect = () => (
        REGEX_NAME_TEST.test(workplace)
    )
    const isSelectedFile = () => (selectedFile !== null)

    const addBusiness = () => {
        postAddBusiness(
            id,
            businessOwner,
            workplace,
            businessRegistrationNumber,
            businessPhoneNumber,
            zipCode,
            address1,
            address2,
            r,
            radioIndex
        )
        .then((res)=> {
            if(res.data.err!=null){
                Alert.alert('이미 존재하는 사업장 이름입니다. \n변경해주세요.');
            } else {
                navigation.navigate('Business List');
            }
        })
        .catch(err => {
            Alert.alert(err);
        })
    }
    const handleAddNewBusiness = async() => {
        try {
            if (isBlank()) {
                Alert.alert("빈 칸을 채워주세요.")
            } else if (!isWorkplaceCorrect()) {
                Alert.alert("사업장 이름에 공백, 특수기호는 들어갈 수 없습니다.");
            } else if (r === SELECT_SIGN) {
                addBusiness();
            } else if (r === SELECT_STAMP_IMG && !isSelectedFile()) {
                Alert.alert("도장 사진을 넣어주세요.");
            } else if (r === SELECT_STAMP_IMG && isSelectedFile()) {
                postUploadStamp(result, workplace)
                .then(async(res) => {addBusiness()})
                .catch(err => {Alert.alert(err)})
            }
        } catch (e) {
            Alert.alert("사업장 이름이 중복됩니다. 지점 이름을 포함해서 써주세요."+e)
        }
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <View style={styles.TopArea}>
            <View style={styles.titleArea}><Text style={styles.titleStyle}>사업장 정보</Text>
            <View style={styles.radioArea}>
                <RadioForm
                    radio_props={PROPS_RADIO_PEOPLE_OVER_FIVE}
                    initial={0}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={Style.radioPeopleNoOverFive.buttonColor}
                    selectedButtonColor={Style.radioPeopleNoOverFive.selectedButtonColor}
                    labelStyle={Style.radioPeopleNoOverFive.style}
                    animation={true}
                    onPress={(index, value) => {setRadioIndex(index)}}
                />
            </View>
        </View>
    </View>

    <View style={styles.formArea}><ScrollView style={{flex: 1}}><TouchableOpacity>
        <View style={styles.textForm}>
            <View style={styles.textArea}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.titleStyle}>사업장 이름</Text><Text style={Style.textTitleSub}> (15자 이내)</Text>
                </View>
                <TextInput 
                    onChangeText={setWorkplace}
                    defaultValue={workplace}
                    placeholder={'사업장 이름을 입력하세요'}
                    style={styles.textStyle}/>
                </View>
            <View style={styles.textArea}>
                <Text style={styles.titleStyle}>사업장 등록번호 </Text>
                    <TextInput 
                    onChangeText={setBusinessRegistrationNumber}
                    defaultValue={businessRegistrationNumber}
                    placeholder={'사업장 등록번호를 입력하세요'}
                    keyboardType={"number-pad"}
                    style={styles.textStyle}/>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.titleStyle}>사업주 이름</Text>
                    <TextInput 
                    onChangeText={setBusinessOwner}
                    defaultValue={businessOwner}
                    placeholder={'사업주 이름을 입력하세요'}
                    style={styles.textStyle}/>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.titleStyle}>사업장 전화번호</Text>
                    <TextInput 
                    onChangeText={setBusinessPhoneNumber}
                    defaultValue={businessPhoneNumber}
                    placeholder={'사업장 전화번호를 입력하세요'}
                    keyboardType={"number-pad"}
                    style={styles.textStyle}/>
            </View>
            <View style={{marginTop:hp('3%')}}><Text style={styles.titleStyle}>사업장 주소</Text>
                <View style={styles.addressArea}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.textArea1}>
                            <TextInput
                                defaultValue={zipCode}
                                placeholder={'우편번호'}
                                style={styles.textStyle}
                                editable={false}/>
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
                            editable={false}/>
                    </View>
                    <View style={styles.addtextArea}>
                        <TextInput 
                            onChangeText={setAddress2}
                            defaultValue={address2}
                            placeholder={'상세주소를 입력하세요'}
                            style={styles.textStyle}/>
                    </View>
                    <View style={{marginTop:hp('3%')}}>
                        <RadioForm
                            radio_props={PROPS_RADIO_SIGN_OR_STAMP}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={Style.radioSignOrStamp.buttonColor}
                            selectedButtonColor={Style.radioSignOrStamp.selectedButtonColor}
                            labelStyle={Style.radioSignOrStamp.style}
                            animation={true}
                            initial={0}
                            onPress={setR} />

                        {r === SELECT_SIGN && 
                            <View style={{ width:'100%', height:hp('15%'), }}>
                            <WebView
                                originWhitelist={['*']}
                                automaticallyAdjustContentInsets={false}
                                source={{ html: convertSignToHtml(sign) }}
                            />
                            </View>
                        }
                        {r === SELECT_STAMP_IMG && 
                            <View style={{ width: 200}}>
                                <TouchableOpacity 
                                    style={styles.searchArea2}
                                    onPress={pickImage}>
                                    <Text style={styles.textStyle}>도장 사진 가져오기</Text>
                                </TouchableOpacity>
                                {selectedFile &&
                                    <Image contentContainerStyle={{ flex: 1}} source={{ uri: selectedFile }} style={{ width: 200, height: 200, flex:1,marginTop:hp('1%') }} />}
                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
    
        <View style={styles.buttonArea}>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleAddNewBusiness}>
                <Text style={styles.buttonTitle}>완료</Text>
            </TouchableOpacity>
        </View>
    
    </TouchableOpacity></ScrollView></View>

    {/* <View style={styles.buttonlogoArea}>
        <Image style={styles.logobottom} source={require('../../img/logo_bottom.png') }/> 
    </View> */}
    </View></TouchableWithoutFeedback>);
}

export default AddBusinessScreen;