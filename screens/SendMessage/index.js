import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text, Button,
  TextInput,
  TouchableOpacity,ImageBackground,Image,
  StyleSheet, TouchableWithoutFeedback, Keyboard,Platform,ScrollView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AsyncStorage } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

const SendMessageScreen = ({ onSignUp, navigation }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [press, setPress] = useState(false);
  const [items, setItem] = useState([]);
  const [idid, setIdid] = useState('');
  const [namename, setNamename] = useState('');
  const [afterClick, setAfterClick] = useState(false);
  React.useEffect(() => {
      AsyncStorage.getItem("userData").then((userData) =>{
          setIdid(id => JSON.parse(userData).id);
          setNamename(name => JSON.parse(userData).name);
      })
  }, []);

  const SignPost = async() => {
    try {
      console.log("!!!!!!!!!!!!!!!!!!!")
      axios.post('http://13.124.141.28:3000/sendMessage', {
          f: idid,
          f_name:namename,
          message : password,
          t: id,
          t_name:name,
          r:0,
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
      }).then((res) => {
      /*let res = await fetch('http://13.124.141.28:3000/sendMessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message : password,
          t: id,
        }),
      });*/
        
        navigation.navigate('Message List')
        console.log(res.data)
        })
    } catch (e) {
      console.error(e);
    }
  }
  const search = async(search_name) => {
    setAfterClick(false)
    axios.post('http://13.124.141.28:3000/searchId', {name : search_name},
    {  headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'}
    })
    .then(res => {
      console.log(res)
      let arr=[]
      for(let i=0; i<res.data.length ;i++){
        arr.push({id: res.data[i].id, name: res.data[i].name});
      }
      setItem(arr);
    });
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.image}>
    <View style={styles.container}>
      <View style={styles.formArea}>
        <View style={styles.titleArea}> 
          <View style={styles.imgArea}>
            <Image style={styles.toimg} source={require('../../img/toMsg.png')}></Image>
          </View>
          <View style={styles.textInputArea}>
          <TextInput 
            onChangeText={name => {setName(name); search(name);} }
            defaultValue={name}
            autoFocus={true}
            style={styles.textStyle} 
            placeholder={'이름 입력하세요.'}/>
          </View>
          </View> 
          {afterClick==false && name.length>0 && <View style={styles.searchInputArea}>
            <View style={styles.searchStyle} >
            {//keywords.map(({ id, text }) => {
              //return (
              <ScrollView>
                {items.map((i, name) => (
                  <Text style={styles.searchItemStyle} onPress={()=>{setName(i.name); setId(i.id); setAfterClick(true)}}>{i.name}({i.id})</Text>
                ))}
              </ScrollView>
            //)
            }</View>
            </View>}
         
        <View style={styles.msgArea}>
          <TextInput 
            onChangeText={password => setPassword(password)}
            defaultValue={password}
            multiline
            numberOfLines={20}
            style={styles.textLineStyle} 
            placeholder={"내용을 입력하세요."}/>
        </View>
      </View>
    <View style={styles.sendBtnArea}>
      
      <TouchableOpacity
        onPress={() => {
          if(!press){
            setPress(true)
            SignPost()
          }
        }}
      >
      <Image style={styles.btnImgStyle} source={require('../../img/message.png')}></Image>  
      </TouchableOpacity>
    </View>  
    </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image:{
    width:'100%', height:'100%', 
    backgroundColor:'#DAE9F7',
  },
  container:{
    width:'100%', height:'100%', 
    paddingTop:hp('5%'), 
    backgroundColor:'white',
    alignItems:"center",    
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),

  },
  formArea: {
    width: wp('90%'),height:hp('70%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    paddingBottom: hp('2.5%'),
    paddingTop:hp('2.5%'),
  },
  titleArea:{
    width:'100%', height:hp('7%'),
    flexDirection:"row", 
  },
  msgArea:{
    height:hp('55%'),zIndex: 0,
  },
  textStyle: {
    fontSize: wp('4.2%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    width:wp('40%'),
  },
  searchStyle: {
    fontSize: wp('4.2%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    width:wp('50%'),
    
  },
  searchItemStyle: {
    marginTop:hp('0.4%'),
    marginBottom:hp('0.4%')
  },
  textLineStyle:{
    fontSize: wp('4.2%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    lineHeight:wp('6.5%'),
    borderRadius:wp('2%'),
    borderWidth:wp('0.3%'),
    borderColor:'#DAE9F7',
    marginTop:hp('1%'),
    padding:wp('5%'),
    maxHeight: hp('50%'),
  },
  sendBtnArea:{
    justifyContent:"flex-end", alignItems:"center",
    width:'100%',
    height:hp('9%'),
    paddingBottom:hp('1%'),
  },
  btnImgStyle:{
    ...Platform.select({
      ios:{
        width:wp('50%'),
        height:hp('6.7%')
      },
      android:{
        width:wp('50%'),
        height:hp('6%')
      }
    })
  },
  imgArea:{
    width:wp('30%'),
    height:hp('8%'),
    justifyContent:"center", marginRight:wp('2%')
  },
  toimg:{
    ...Platform.select({
      ios:{
        width:wp('26%'),
        height:hp('6.2%')
      },
      android:{
        width:wp('28.2%'),
        height:hp('6.2%')
      }
    })
  },
   textInputArea:{
    borderColor:'#DAE9F7',
    borderWidth:wp('0.3%'),
    borderRadius:wp('2.5%'),
    marginTop:hp('0.9%'),
    width:wp('47%'),
    height:hp('6.2%'),
    justifyContent:"center", alignItems:'flex-start',
    paddingLeft:wp('3%')
   },
   searchInputArea:{
    borderColor:'#DAE9F7',
    borderWidth:wp('0.3%'),
    borderRadius:wp('2.5%'),
    width:wp('55%'),
    height:hp('10%'),
    justifyContent:"center", alignItems:'center',
    paddingLeft:wp('1%'), marginLeft:hp('19%'),marginTop:hp('10%'),
    zIndex: 2,position: 'absolute',
    backgroundColor:'#ffffff'
   }
})
 
export default SendMessageScreen;