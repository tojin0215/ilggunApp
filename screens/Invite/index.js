import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, FlatList, ImageBackground, Image, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import axios from 'axios';

const styles = StyleSheet.create({
  image: {
    width:'100%', height:'100%',    
    backgroundColor:'#67C8BA',
  },
  container: {
    width: "100%", height: "100%",
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
    paddingTop:hp('5%'), 
    alignItems:"center"
  },
  dropdown : {
    flexDirection: 'row',
  },
  searchArea:{
    width:wp('75%'), height:hp('8%'),
    paddingTop:hp('2%'), 
    borderBottomWidth:hp('0.3%'), borderBottomColor:'#D3D6E2',
    paddingLeft:wp('1%'),
    flexDirection:"row"
  },
  searchbutton:{ 
    width:wp('10%'),
    height:wp('10%'),  
    marginTop:hp('0.5%'),
  },
  searchImage:{ 
    width:wp('8%'),
    height:wp('8%'),   
  },
  textInputStyle:{
    width:wp('60%'), height:hp('6%'),
    fontSize: wp('4.7%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    paddingLeft:wp('5%'),
  },
  listArea:{ 
    width:wp('70%'), height:hp('70%'),
    marginTop:hp('1%'),
  },
  listStyle:{
    flexDirection:"row",
    width:wp('70%'), height:hp('7%'),
    borderBottomWidth:hp('0.1%'), borderBottomColor:'#D3D6E2',
    marginTop:hp('2%'),
  },
  textStyle:{
    paddingTop:hp('2%'),
    paddingLeft:wp('5%'),
    marginLeft:wp('5%'),
    width:wp('38%'), height:hp('6%'),
    fontSize: wp('4.6%'),
    fontFamily:"NanumSquareB",
    color:'#040525',
  },
  button:{
    width:wp('25%'), height:hp('7%'),
    marginTop:hp('1%')
  },
  inviteImage:{ 
    width:wp('20%'),
    height:hp('5%'),  
    borderRadius:wp('3%') 
  },
});

class InviteScreen extends Component{

  updateState(){}

  constructor(props) {
    super(props);
    this.state = {
        bangCode : null, id:'',
        workerList: [], item:''
    }

    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode});
        this.fetchData();
      })
      AsyncStorage.getItem("userData").then((userData) =>{
        this.setState({id:JSON.parse(userData).id});
      });
  }
  fetchData = async(name) => { 
    try {
      if(name!=''){
      axios.post('https://www.toojin.tk:3000/selectId', {id : name},
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*let res = await fetch('https://www.toojin.tk:3000/selectId', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : name
          }),
        }).then(res => res.json())*/
        .then(res => {
          console.log(res)
          let arr=[]
          for(let i=0; i<res.data.length ;i++){
            arr.push({id: res.data[i].id, name: res.data[i].name});
          }
          this.setState({workerList : arr});
           
        });
      }else{
        Alert.alert("1글자 이상 입력해주세요.")
      }
    } catch (e) {
        console.error(e);
      }
    }
    sendInviteMessage = async(name) => { 
      try {
        axios.post('https://www.toojin.tk:3000/selectWorkerEach', {
          business: this.state.bangCode,
          workername:name,
        },
        {  headers:{
          'Content-Type': 'application/json',
        'Accept': 'application/json'}
        })
        .then(res => {
          console.log("LLLLLLLLLLLLLLLLLL")
          if(res.data[0]==undefined){
            axios.post('https://www.toojin.tk:3000/sendMessage', {
              type: 1,
              system:1,
                f: this.state.id,
                t : name,
                message : '('+this.state.bangCode + ')님이 '+ this.state.bangCode+' 사업장에 '+name+"님을 초대합니다.\n승낙하시겠습니까?",
                r:0
            },
            {  headers:{
              'Content-Type': 'application/json',
            'Accept': 'application/json'}
            })
            .then(res => {
            });
            console.log(this.state.bangCode, name, this.props.route.params.type)
            axios.post('https://www.toojin.tk:3000/addWorker', {
              business: this.state.bangCode,
              workername : name,
              type : this.props.route.params.type,
              state: 0
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then(res => {
              this.props.navigation.navigate('Worker Management')
            });
          }else{
            Alert.alert("이미 근무하고 있는 근로자입니다.")
          }

        });
        /**/
      } catch (e) {
        console.error(e);
      }
    }
    render() {
        
        return (
          <View style={styles.image}>
          <View style={styles.container}>

          <View style={styles.searchArea}>
            <TextInput 
                onChangeText={item => {
                    this.setState({
                        item: item
                    })
                }
                }
                defaultValue={this.state.item}
                style={styles.textInputStyle}
                placeholder={"아이디를 검색하세요."}/>  
      
            <TouchableOpacity
              style={styles.searchbutton}
              onPress={() => {
                this.fetchData(this.state.item);
                this.setState({item:''})
            }}>

              <Image style={styles.searchImage} source={require('../../img/searchBtn.png')}/>
            </TouchableOpacity>
            
          </View>
          <View style={styles.listArea}> 
          <ScrollView>
            {
                //this.state.todo!=undefined?Object.entries(this.state.todo).map(([key, value]) => {
                //    return <Text key={key}>{key}:{value==0?'미완료':'완료'}<Button title="X" onPress={()=>{this.deleteData(key)}}/></Text> 
                //}):<Text>할 일을 추가해주세요.</Text>
                
            }
            <FlatList data={this.state.workerList} 
                renderItem={({ item }) => 
                <View style={styles.listStyle}>
                <Text style={styles.textStyle}>{item.name}({item.id})</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{console.log(item.id+'<<<<<<<<<<<<<,'); this.sendInviteMessage(item.id); }}
                >
                  <Image style={styles.inviteImage} source={require('../../img/inviteBtn.png')}/>
                </TouchableOpacity>
              </View>
            }/>
        </ScrollView>
      </View>      
    </View>
    </View>
            
        )
    }
}

export default InviteScreen;