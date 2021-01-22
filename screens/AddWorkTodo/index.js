import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, FlatList,ImageBackground, Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AsyncStorage } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
const styles = StyleSheet.create({
  image:{
    width:'100%', height:'101%', paddingTop:hp('5%'),
    alignItems:"center"
  },
  dropdown : {
    flexDirection: 'row',
  },
  textPlusStyle:{
    fontSize: wp('10%'),
    fontFamily:"NanumSquareB",
    color:'white',
  },
  textStyle:{
    fontSize: wp('4.5%'),
    fontFamily:"NanumSquare",
    color:'white',
  },
  inputStyle:{
    paddingLeft:wp('5%'),
    width:wp('65%'),
    height:hp('10%'),
    maxHeight: hp('10%'),
  },
  todoArea:{
    width:wp('90%'),
    height:hp('13%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    paddingBottom:hp('2%'),
    marginTop:hp('1%'),
    borderBottomColor:'#67C8BA',
    borderBottomWidth:hp('0.1%'),
  },
  todoArea2:{
    flexDirection:'row',
    width:wp('80%'),
    height:hp('10%'),
    paddingTop:hp('1.2%'),
    backgroundColor:'#67C8BA',
    borderRadius:wp('5%')
  },
  btnStyle:{
    width:wp('10%'),
    height:wp('10%'),
    marginTop:hp('1%'),
    backgroundColor:'#67C8BA',
    borderRadius:wp('10%'),
    justifyContent:"flex-end", alignItems:"center",
    marginBottom:hp('2%')
  },
  ListArea:{
    width:wp('90%'),
    height:hp('60%'),
    paddingTop:wp('2%'),
    marginBottom:hp('2%'),
  },
  listViewStyle:{
    flexDirection:"row",
    width:wp('87%'), height:hp('8%'),
    marginTop:hp('1%'),
    justifyContent:"center", alignItems:"center",
    paddingBottom:hp('0.3%'),
    paddingRight:wp('1%'),
    backgroundColor:'#E2F2EF',
    borderRadius:wp('4%')
  },
  deleteStyle:{
    backgroundColor:'white', marginLeft:wp('1%'), marginBottom:hp('0.2%'),
    width:wp('6%'),height:wp('6%'),
    backgroundColor:'#E2F2EF',
    borderRadius:wp('2%'),
    justifyContent:"center", alignItems:"center",
  },
  deleteTextStyle:{
    fontSize: wp('5%'),
    fontFamily:"NanumSquare",
    color:'#67C8BA',
  },
  textNameStyle:{
    width:wp('63%'),
    paddingLeft:wp('3%'),
    paddingRight:wp('2%'),
    fontSize: wp('4.2%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    lineHeight:wp('6.5%'),
    flexShrink:1,
  },
  textNameStyle2:{
    width:wp('11%'),
    fontSize: wp('3.8%'),
    fontFamily:"NanumSquare",
    color:'#67C8BA',
  }
});

class AddWorkTodoScreen extends Component{

  updateState(){}

  constructor(props) {
    super(props);
    this.state = {
        dayy: this.props.route.params["date"].split(' ')[0],
        monthh: this.props.route.params["date"].split(' ')[1]*1,
        datee: this.props.route.params["date"].split(' ')[2]*1,
        yearr: this.props.route.params["date"].split(' ')[3]*1,
        bangCode : null,
        originalTime : null,
        workerr: this.props.route.params["worker"],
        todo:{}, item:'',
    }

    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode});
        this.fetchData();
      })
  }
  fetchData = async() => { 
    try {
        /*let res = await fetch('https://www.toojin.tk:3000/selectWorkTodo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang : this.state.bangCode,
            year : this.state.yearr,
            month: this.state.monthh,
            date: this.state.datee,
            worker: this.state.workerr
          }),
        })*/
        axios.post('https://www.toojin.tk:3000/selectWorkTodo',
        {
          bang : this.state.bangCode,
          year : this.state.yearr,
          month: this.state.monthh,
          date: this.state.datee,
          worker: this.state.workerr
          },
          {  headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
          })//.then(res => res.json())
            .then(res => {
                console.log(res.data[0])
                if(res.data[0]!=undefined){
                    this.setState({todo:JSON.parse(res.data[0].todo)})
            }
        });
    } catch (e) {
        console.error(e);
      }
}
savedData = async() => { 
    try {
      if(this.state.item){
        axios.post('https://www.toojin.tk:3000/addWorkTodo', {
            bang : this.state.bangCode,
            year : this.state.yearr,
            month: this.state.monthh,
            date: this.state.datee,
            worker: this.state.workerr,
            todo: this.state.item
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*let res = await fetch('https://www.toojin.tk:3000/addWorkTodo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang : this.state.bangCode,
            year : this.state.yearr,
            month: this.state.monthh,
            date: this.state.datee,
            worker: this.state.workerr,
            todo: this.state.item,
          }),
        }).then(res => res.json())*/
        .then(res => {
            this.setState({item:''})
            this.fetchData();
            console.log("--------------------------");
            //fetchData();
        });
      }
      else{
        Alert.alert('할 일을 입력해주세요.')
      }
    } catch (e) {
        
      }
    }
    deleteData = async(key) => { 
        try {
            axios.post('https://www.toojin.tk:3000/deleteWorkTodo', {
                bang : this.state.bangCode,
                year : this.state.yearr,
                month: this.state.monthh,
                date: this.state.datee,
                worker: this.state.workerr,
                key: key
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            /*let res = await fetch('https://www.toojin.tk:3000/deleteWorkTodo', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bang : this.state.bangCode,
                year : this.state.yearr,
                month: this.state.monthh,
                date: this.state.datee,
                worker: this.state.workerr,
                key: key,
              }),
            }).then(res => res.json())*/
            .then(res => {
                this.fetchData();
            });
        } catch (e) {
            
          }
        }
    item = () => { 
        <Text></Text>
    }
    render() {
        
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
        <ImageBackground style={styles.image} source={require('../../img/page1_1.png')}>
        <View style={styles.todoArea}>
          <View style={styles.todoArea2}>
          <View style={styles.inputStyle}>
            <TextInput 
                onChangeText={item => {
                    this.setState({
                        item: item
                    })
                }
                }
                defaultValue={this.state.item}
                multiline
                numberOfLines={3}
                style={styles.textStyle}
                placeholder={"할 일을 적어주세요."}/>  
          </View>  
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                this.savedData();
              }}>
              <Text style={styles.textPlusStyle}>+</Text>
              
            </TouchableOpacity>
          </View>
        </View>  
          <View style={styles.ListArea}>
            <View style={{paddingLeft:wp('2%'), marginTop:hp('1%')}}>
              <ScrollView>
            {
                //this.state.todo!=undefined?Object.entries(this.state.todo).map(([key, value]) => {
                //    return <Text key={key}>{key}:{value==0?'미완료':'완료'}<Button title="X" onPress={()=>{this.deleteData(key)}}/></Text> 
                //}):<Text style={styles.textStyle}>할 일을 추가해주세요.</Text>
                
            }
            <FlatList data={Object.keys(this.state.todo)} 
                renderItem={({ item }) => 
                    <View style={styles.listViewStyle}>
                    <Text style={styles.textNameStyle}>{item}</Text>
                    <Text style={styles.textNameStyle2}>{this.state.todo[item]==0?'미완료':'완료'}</Text>
                    <TouchableOpacity
                      style={styles.deleteStyle}
                       onPress={()=>{this.deleteData(item)}}
                      >
                        <Text style={styles.deleteTextStyle}>X</Text>
                      </TouchableOpacity>
                    </View>  
                }/>
             </ScrollView>   
             </View>   
            </View>    
            
          </ImageBackground>
        </View>
        { /*<View style={styles.container}>
            
                //this.state.todo!=undefined?Object.entries(this.state.todo).map(([key, value]) => {
                //    return <Text key={key}>{key}:{value==0?'미완료':'완료'}<Button title="X" onPress={()=>{this.deleteData(key)}}/></Text> 
                //}):<Text>할 일을 추가해주세요.</Text>
                
            
            <FlatList data={Object.keys(this.state.todo)} 
                renderItem={({ item }) => 
                    <Text>{item} : {this.state.todo[item]==0?'미완료':'완료'}<Button title="X" onPress={()=>{this.deleteData(item)}}/></Text>
                }/>
            <TextInput 
                onChangeText={item => {
                    this.setState({
                        item: item
                    })
                }
                }
                defaultValue={this.state.item}
                placeholder={"할 일"}/>  
      
            <Button 
                title="추가"
                onPress={() => {
                    this.savedData();
                }}
            />
        </View>*/}
        </TouchableWithoutFeedback>
            
        )
      
    }
}

export default AddWorkTodoScreen;