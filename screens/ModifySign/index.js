import React, {useState} from 'react';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import {
  View,
  Text, Button,ScrollView,
  TextInput,
  TouchableOpacity,ImageBackground,Image,Alert,
  StyleSheet,AsyncStorage
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import { WebView } from 'react-native-webview'

const ModifySignScreen = ({ onSignUp, navigation, route }) => {
  const [id, setId] = useState('');
  const [path, setPath] = useState('');
  const [savePath, setSavePath] = useState('');
    const [sign, setSign] = useState('');
  React.useEffect(() => {
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
  }, []);

  const changeSign = async() => {
    try {
        if(path==''){
            Alert.alert('sign을 채워주세요.');
        }
        else{
            await axios.post('http://13.124.141.28:3000/changeSign', { 
                    id: id,
                    sign: savePath,
            },{
            headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
            }).then((res)=>{
                Alert.alert("서명 변경이 완료되었습니다.")
                navigation.navigate("Select Page");        
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
                    <Text style={styles.titleSignStyle}>현재 등록된 서명</Text>
                    <View style={{ width:'100%', height:hp('15%'), }}>
                    <WebView
                        originWhitelist={['*']}
                        automaticallyAdjustContentInsets={false}
                        source={{ html: `<!DOCTYPE html>
                        <html>
                        <body>
                        <svg viewBox = "0 0 500 500" style="position:absolute; height:400px; width:400px; " xmlns="http://www.w3.org/2000/svg">
                                <polyline points="${String(sign)}"
                                style="fill:none;stroke:black;stroke-width:3" />
                            </svg>
                        </body>
                        </html>`
                        }}
                    />
                    </View>
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
                        onPress={()=>changeSign()}>
                        <Text style={styles.buttonTitle}>수정하기</Text>
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
 
export default ModifySignScreen;