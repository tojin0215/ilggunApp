import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, FlatList, ImageBackground } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckboxGroup from 'react-native-checkbox-group'
import axios from 'axios';
import {
  Icon,
  CheckBox,
  Spinner
} from "native-base";

const styles = StyleSheet.create({
  
  image:{
    width:'100%', height:'100%',     
    backgroundColor:'#7085DF'
  },
  container: {
    width: "100%", height: "100%",
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
    paddingTop:hp('5%'),
  },
  dropdown : {
    flexDirection: 'row',
  },
  listArea:{
    width:wp('90%'), height:hp('72%'),
    marginLeft:wp('5%'), marginRight:wp('5%'),
  },
  lineStyle:{
    flexDirection:'row',
    width:wp('87%'), height:hp('8%'),
    alignItems:"center",
    backgroundColor:'#D3DDFF',
    borderRadius:wp('5%'),
    marginBottom:hp('1.5%'),
    paddingLeft:wp('3%'),
  },
  textStyle:{
    fontSize: wp('4.5rem'),
    fontFamily:"NanumSquare",
    color:'#040525',
    paddingRight:wp('2%'),
    paddingLeft:wp('1%'),
    lineHeight:wp('6.5%'),
    flexShrink:1,
  },
  titleStyle:{
    fontSize: wp('5rem'),
    fontFamily:"NanumSquareB",
    color:'#040525',
    marginBottom:hp('3%'),
    marginLeft:wp('5%'), marginRight:wp('5%'),
  },
});


class WorkTodoScreen extends Component{

  updateState(){}

  constructor(props) {
    super(props);
    this.state = {
        checkedId: -1,
        bangCode : null,
        originalTime : null,
        todo:{}, item:'',
        cnt : 0,
        loading: false,
    }

    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode});
        this.fetchData();
      })
  }
  fetchData = async() => { 
    try {
       await axios.post('http://13.124.141.28:3000/selectWorkTodo', {
            bang : this.state.bangCode,
            year : new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
            worker: this.props.route.params.id
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        .then((res) => {
          this.setState({todo:JSON.parse(res.data[0].todo)})
          this.setState({loading:true});
        });
    } catch (e) {
      }
  }


savedData = async(td) => { 
  const err = 0;
    try {
      await axios.post('http://13.124.141.28:3000/addWorkTodoCheck', {
        bang : this.state.bangCode,
        year : new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        todo: td,
        id:this.props.route.params.id
      },
      {  headers:{
        'Content-Type': 'application/json',//'Content-Type': 'application/json',
        'Accept': 'application/json'}
      }).then(res =>{
        err = res.status;
      });
    } catch (e) {
      console.log(e)
      }
    }
    render() {
        
        return (
          <View style={styles.image}>

              
        <View style={styles.container}>
                  <View style={{marginLeft:wp('2%')}}>
                <Text style={styles.titleStyle}>오늘 해야할 일</Text>
              </View>
              

            <View style={styles.listArea}>
              {
                  this.state.todo==undefined?<Text Style={styles.textStyle}>해야할 일이 없습니다.</Text>:<></>
                  
              }
              <FlatList data={Object.keys(this.state.todo)} 
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => 
                    <View style={styles.lineStyle}>
                       <CheckboxGroup
                          callback={(selected) => {
                            if(this.state.loading){
                              let td = { ...this.state.todo };
                              td[item] = this.state.todo[item]==1?0:1
                              this.setState({todo : td})
                              this.savedData(td);
                            }
                          }}
                          iconColor={"#67C8BA"}
                          iconSize={wp('8.5%')}
                          checkedIcon="ios-checkbox-outline"
                          uncheckedIcon="ios-square-outline"
                          checkboxes={[
                            {
                              label: item, 
                              value: 1, 
                              selected: this.state.todo[item]==1?true:false
                              },
                          ]}
                          labelStyle={{
                            color: '#333',
                            fontFamily:"NanumSquare",
                            fontSize:wp('3.6rem'),
                            marginRight:wp('2%'),
                            marginLeft:wp('0.5%'),
                            marginTop:hp('1.5%')
                          }}
                          rowStyle={{
                            flexDirection: 'row'
                          }}
                          rowDirection={"row"}
                      />
                    </View>
                  }/>
            </View>
            </View>  
          </View>
            
        )
    }
}

export default WorkTodoScreen;