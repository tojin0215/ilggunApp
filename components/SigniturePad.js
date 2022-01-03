import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from 'react-native-svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    textArea2:{
        marginTop:hp('2rem'),
    },//서명 타이틀 라벨 공간입니다.
    sign : { 
        height: hp('28rem'),
        width: '100%',
        backgroundColor: '#E4E5EA',
    },//서명 입력 폼입니다.
    signBtnArea:{
        height:hp('6rem'),
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
        marginTop:hp('3%'),
    }
})


const SigniturePadComponent = ({path, setPath, savePath, setSavePath, is_erase = true}) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [is_out, setIsOut] = useState(false);

    const handleOnTouchStart = (event) => {
        console.log("start");
        setIsOut(false);
        setX(event.nativeEvent.locationX);
        setY(event.nativeEvent.locationY);

        const loc_x = event.nativeEvent.locationX;
        const loc_y = event.nativeEvent.locationY;

        setSavePath(`${savePath} ${loc_x},${loc_y}`);
        // setSavePath(`${path} M${loc_x} ${loc_y}`);
        setPath(`${path} M${loc_x} ${loc_y}`);
    }

    const handleOnTouchMove = (event) => {
        if (is_out) return;
        else if (
            Math.abs(x - event.nativeEvent.locationX) > 300 ||
            Math.abs(y - event.nativeEvent.locationY) > 200
            ) {
                setIsOut(true);
                setX(0);
                setY(0);
            }
        else {
            setIsOut(false);
            setX(event.nativeEvent.locationX);
            setY(event.nativeEvent.locationY);
            
            const loc_x = event.nativeEvent.locationX;
            const loc_y = event.nativeEvent.locationY;

            setSavePath(`${savePath} ${loc_x},${loc_y}`);
            // setSavePath(`${path} L${loc_x} ${loc_y}`);
            setPath(`${path} L${loc_x} ${loc_y}`);
        }
    }
    const handleOnTouchEnd = (event) => {
        setIsOut(false);
        setX(0);
        setY(0);
    }

    return (
        <View style={styles.textArea2}>
              <View style={styles.signBtnArea}>
                <Text style={styles.titleSignStyle}>서명</Text>
                {is_erase && <TouchableOpacity
                  style={styles.signBtnArea2}
                  onPress={async () => {
                    setIsOut(false);
                    setX(0);
                    setY(0);
                    setPath("");
                    setSavePath("");
                  }}
                >
                  <Text style={styles.signTextStyle}>지우기</Text>
                </TouchableOpacity>}
              </View>
              <View
                style={styles.sign}
                onTouchMove={handleOnTouchMove}
                onTouchEnd={handleOnTouchEnd}
                onTouchStart={handleOnTouchStart}
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
    )
}
export default SigniturePadComponent