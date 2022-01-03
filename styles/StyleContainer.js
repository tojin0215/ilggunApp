
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Style = {
    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'#67C8BA',
    },
    TopArea: {
        width: '100%',
        height:hp('15%'),
        backgroundColor:'#67C8BA',
        justifyContent:"center", alignItems:"center", paddingBottom:hp('1%')
    },
    titleArea:{
        width:wp('90%'),
        height:hp('12%'),
        backgroundColor:'white',
        paddingTop:wp('4%'),
        paddingLeft:wp('7%'),
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
}

export const AddBusinessScreen = {
    style: {
        ...Style,
    },
    radioPeopleNoOverFive: {
        style: {
            fontSize: wp('4%'),
            color: '#040525',
            marginRight:wp('7%'),
            fontFamily:"NanumSquare",
        },
        buttonColor: "#67C8BA",
        selectedButtonColor: "#67C8BA",
    },
    textTitleSub: {
        fontSize: 11,
        marginTop: hp('0.4%')
    },
    radioSignOrStamp: {
        style: {fontSize: wp('4%'), color: '#040525', marginRight:wp('7%'),fontFamily:"NanumSquare"},
        buttonColor: "#67C8BA",
        selectedButtonColor: "#67C8BA"
    }
}