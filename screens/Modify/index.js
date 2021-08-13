import React, {useState} from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, ImageBackground,Image,AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width:'100%', height:'100%',
    alignItems: 'center',
    backgroundColor:'white',    
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
  },
  buttonArea: {
    marginTop:hp('5%'),
    width: '100%',
    height: hp('13%'),
    alignItems: 'center',
  },
  button: {
    backgroundColor:'#E2F2EF',
    width: "75%",
    height: "50%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:wp('5%'),
    marginTop:hp('2.5%'),
  },
  image:{
    alignItems: 'center',
    justifyContent:'flex-start',
    width: "100%", height: "100%",    
    backgroundColor:'#67C8BA'
  },
  buttonTitle:{
    justifyContent:"center",alignItems:"center",
    marginTop:hp('0.5%'),
    fontFamily:"NanumSquareB",
    fontSize:wp('5rem'),
  },
  text1:{
    maxWidth:wp('70%'),
    fontSize:wp('6rem'), 
    fontFamily:"NanumSquareB",
    marginBottom:hp('1%'),
  },
  text2:{
    fontSize:wp('4rem'), 
    fontFamily:"NanumSquare",
  },
  texts:{
    justifyContent:"center",alignItems:"center",
    marginTop:hp('2%'), 
    marginBottom:hp('2%'),
  }
});



const ModifyScreen = ({navigation}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  React.useEffect(() => {
    AsyncStorage.getItem("userData").then((userData) =>{
      setId(id => JSON.parse(userData).id);
      setName(name => JSON.parse(userData).name);

    });
  }, []);
  return (
  <View style={styles.image}>
  <View style={styles.container}>
    <View style={styles.buttonArea}>
      <View style={styles.texts}>
        <Text style={styles.text1} numberOfLines={1} ellipsizeMode='tail'>이름 : {name}</Text>
        <Text  style={styles.text2}>사업장에 초대받으려면</Text>
        <Text  style={styles.text2}>먼저, 이름과 이메일을 사업주에게 알려주세요.</Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Modify Password1')}>
       <Text style={styles.buttonTitle}>비밀번호 수정</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Modify Sign')}>
        <Text style={styles.buttonTitle}>서명 수정</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Modify Name')}>
        <Text style={styles.buttonTitle}>이름 수정</Text>
      </TouchableOpacity>
      
    </View>
    </View>
    </View>
  );
};
export default ModifyScreen;