import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
      marginHorizontal: "auto",
      paddingTop:hp('2%'),
      paddingHorizontal:wp('6rem'),
  },//상단 바, 하단 푸터를 제외한 입력폼 공간입니다.
  textArea:{
      marginTop:hp('2.5rem'),
      borderBottomColor:'#D3D6E2', borderBottomWidth:hp('0.2%'),
  },//이름, EMAIL, 비밀번호, 비밀번호 확인의 라벨,텍스트 입력 포함한 폼 박스입니다.
  titleStyle: {
      fontSize: wp('5rem'),
      fontFamily:"NanumSquareB",
  },//텍스트 입력 폼의 타이틀 라벨입니다.
  textStyle:{
      fontSize: wp('4.5rem'),
      fontFamily:"NanumSquare",
      marginTop: wp("1rem"),
  },//텍스트 입력 박스입니다.
  titleSignStyle:{
      fontSize: wp('5rem'),
      fontFamily:"NanumSquareB",
      marginTop:hp('1.0%'),
  },//서명 타이틀 라벨입니다.
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
  },//완료 버튼 공간입니다. 
  button: {
      backgroundColor: "#46c3ad",
      width: "100%",
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:wp('5%'),
  },//완료 버튼입니다.
  buttonTitle: {
      color: 'white',
      fontFamily:"NanumSquare",
      fontSize: wp('4.3%'),
  },//완료 버튼 폰트입니다.
  buttonlogoArea: {
      justifyContent:'flex-end',
      alignItems:"center",
      bottom: hp('3%'),
      width: "100%",
      height: hp('5%'),
  },//푸터 일꾼 로고 전체 공간입니다.
  logobottom:{
      width:wp('22%'), height:wp('3%'), 
      justifyContent:"flex-end",
      alignItems:"center",
  },//푸터 일꾼 로고 이미지입니다.
})

export default styles;