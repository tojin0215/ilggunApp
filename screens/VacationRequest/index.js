import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { AsyncStorage } from 'react-native';
//=========================바뀐부분A===========================================
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { abs } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
//=========================바뀐부분A===========================================

//=========================바뀐부분B===========================================
const styles = StyleSheet.create({
  container: {
    width:'100%', height:'100%',
    backgroundColor:'white', padding:wp('5%')
  },
  textArea:{
    marginTop:hp('5%'),
    marginBottom:hp('2%')
  },
  
  textStyle:{
    fontSize:wp('4.5%'),
    fontFamily:"NanumSquareB",
    color: '#040525',
    marginTop:wp('1%'),
    marginBottom:wp('1.5%'),
    marginLeft:wp('2%'),
  },  
  textInputStyle:{
    fontSize:wp('4.5%'),
    fontFamily:"NanumSquareB",
    color: '#040525',
    paddingBottom:hp('1%'), paddingLeft:wp('2%'),
    borderBottomWidth:hp('0.5%'),
    borderBottomColor:'#7085DF'
  },
  pickerArea:{
    flexDirection: 'row',
    marginBottom:hp('2%'),
    width:wp('80%'), height:hp('7%'),
    justifyContent:"center",alignItems:"center",
    marginRight:wp('2%'), marginLeft:wp('3%'),
  },
  textinputArea:{
    width:wp('80%'), height:hp('7%'),
    marginLeft:wp('2%'),
  },

  buttonArea:{
    justifyContent:"flex-end", alignItems:"center",
    height:hp('7%'), marginTop:hp('35%')
  },
  button:{
    backgroundColor:'#7085DF',
    width:wp('80%'), height:hp('6%'),
    justifyContent:"center", alignItems:"center",
    borderRadius:wp('6%')
  }
});


class VacationRequestScreen extends Component{

  updateState(){}

  constructor(props) {
    super(props);
    console.log("매개변수 : ");
    this.state = {
        bangCode:'',
      itemA: null, //'2020년',
      isVisibleA: false,
   
      itemB: null,//'10월',
      isVisibleB: false,

      itemAA: null, //'2020년',
      isVisibleAA: false,

      bangCode : null,
      originalTime : null,
      workernames: [],
      comment: '',
    }

    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode})
        
      })
  }
  fetchData = async() => { 
    try {
        let res = await fetch('http://192.168.43.253:3000/sendMessage', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 2,
            f: 'system',
            t : 'a',
            message : '('+this.state.bangCode + ')님이 '+ this.state.itemA+"-"+this.state.itemB+"-"+this.state.itemAA+'에 휴가를 요청합니다.\n"'+ this.state.comment+'"\n승인하시겠습니까?"',
            time : this.state.itemA+"-"+this.state.itemB+"-"+this.state.itemAA
          }),
        }).then(res => res.json())
        .then(res => {
          let rowall = []
          for (let i = 0; i < res.length; i++) {
            rowall.push({label: res[i].workername, value: res[i]});
          }
          this.setState({workernames: rowall})
        });
    } catch (e) {
        console.error(e);
      }
}
savedData = async(bangCode, worker, month, date, day, year, time) => { 
    try {
        let res = await fetch('http://192.168.43.253:3000/addWork', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business : bangCode,
            workername : worker,
            month : month,
            date : date,
            day :day,
            year : year,
          }),
        });
    } catch (e) {
        console.error(e);
      }
}

  changeVisibility(state) {
    this.setState({
        isVisibleA: false,
        isVisibleB: false,
        isVisibleAA: false,
        ...state
    });
  }
  
  render() {
    const state = this.state;
    const {workernames} = this.state
    
    return (
      <View style={styles.container}>
        <View style={styles.textArea}>
          <Text style={styles.textStyle}>날짜를 선택해주세요.</Text>
        </View>
          <View style={styles.pickerArea}>
          <DropDownPicker
                items={[
                    {label: '2020', value: '2020'},
                    {label: '2021', value: '2021'},
                ]}
                defaultValue={this.state.itemA}
                containerStyle={{height:hp('7%'), width:wp('25%'),}}
                style={{
                  borderTopWidth:hp('0.5%'), borderBottomWidth:hp('0.5%'),
                  borderTopLeftRadius:0, borderTopRightRadius:0, borderBottomLeftRadius:0, borderBottomRightRadius:0,
                  borderTopColor:'#7085DF', borderBottomColor:'#7085DF',
                  borderRightWidth:0, borderLeftWidth:0,
                }}
                placeholder="2020"

                dropDownStyle={{backgroundColor: 'white',}}
                itemStyle={{justifyContent: 'center'}}
                labelStyle={{
                  height:hp('4%'),
                  textAlign: 'center',
                  color:'#040525',
                  fontFamily:"NanumSquare",
                  marginTop:hp('1%'),
                  fontSize: wp('4.8%'),
                }}
                isVisible={this.state.isVisibleA}
                onOpen={() => this.changeVisibility({
                    isVisibleA: true
                })}
                onClose={() => this.setState({
                    isVisibleA: false
                })}
                onChangeItem={item => {
                  this.setState({
                    itemA: item.value
                })
                console.log(item.label, item.value);
              }}
              
            />
            <Text style={styles.textStyle}>년</Text>
            <DropDownPicker
                items={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                    {label: '3', value: '3'},
                    {label: '4', value: '4'},
                    {label: '5', value: '5'},
                    {label: '6', value: '6'},
                    {label: '7', value: '7'},
                    {label: '8', value: '8'},
                    {label: '9', value: '9'},
                    {label: '10', value: '10'},
                    {label: '11', value: '11'},
                    {label: '12', value: '12'},
                ]}
                defaultValue={this.state.itemB}
                containerStyle={{height:hp('7%'), width:wp('18%'), marginLeft:wp('3%')}}
                style={{
                  borderTopWidth:hp('0.5%'), borderBottomWidth:hp('0.5%'),
                  borderRightWidth:0, borderLeftWidth:0,
                  borderTopLeftRadius:0, borderTopRightRadius:0, borderBottomLeftRadius:0, borderBottomRightRadius:0,
                  borderTopColor:'#7085DF', borderBottomColor:'#7085DF',
                }}
                placeholder="12"

                dropDownStyle={{backgroundColor: 'white',}}
                itemStyle={{justifyContent: 'center'}}
                labelStyle={{
                  height:hp('4%'),
                  textAlign: 'center',
                  color:'#040525',
                  fontFamily:"NanumSquare",
                  marginTop:hp('1%'),
                  fontSize: wp('4.8%'),
                }}
                isVisible={this.state.isVisibleB}
                onOpen={() => this.changeVisibility({
                    isVisibleB: true
                })}
                onClose={() => this.setState({
                    isVisibleB: false
                })}
                onChangeItem={item => this.setState({
                    itemB: item.value
                })}
            />
            <Text style={styles.textStyle}>월</Text>
            <DropDownPicker
                items={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                    {label: '3', value: '3'},
                    {label: '4', value: '4'},
                    {label: '5', value: '5'},
                    {label: '6', value: '6'},
                    {label: '7', value: '7'},
                    {label: '8', value: '8'},
                    {label: '9', value: '9'},
                    {label: '10', value: '10'},
                    {label: '11', value: '11'},
                    {label: '12', value: '12'},
                    {label: '13', value: '13'},
                    {label: '14', value: '14'},
                    {label: '15', value: '15'},
                    {label: '16', value: '16'},
                    {label: '17', value: '17'},
                    {label: '18', value: '18'},
                    {label: '19', value: '19'},
                    {label: '20', value: '20'},
                    {label: '21', value: '21'},
                    {label: '22', value: '22'},
                    {label: '23', value: '23'},
                    {label: '24', value: '24'},
                    {label: '25', value: '25'},
                    {label: '26', value: '26'},
                    {label: '27', value: '27'},
                    {label: '28', value: '28'},
                    {label: '29', value: '29'},
                    {label: '30', value: '30'},
                    {label: '31', value: '31'},
                ]}
                defaultValue={this.state.itemAA}
                containerStyle={{height:hp('7%'), width:wp('18%'), marginLeft:wp('3%') }}
                style={{
                  borderTopWidth:hp('0.5%'), borderBottomWidth:hp('0.5%'),
                  borderRightWidth:0, borderLeftWidth:0,
                  borderTopLeftRadius:0, borderTopRightRadius:0, borderBottomLeftRadius:0, borderBottomRightRadius:0,
                  borderTopColor:'#7085DF', borderBottomColor:'#7085DF', 
                }}
                placeholder="25"

                dropDownStyle={{backgroundColor: 'white',}}
                itemStyle={{justifyContent: 'center'}}
                labelStyle={{
                  height:hp('4%'),
                  textAlign: 'center',
                  color:'#040525',
                  fontFamily:"NanumSquare",
                  marginTop:hp('1%'),
                  fontSize: wp('4.8%'),
                }}
                isVisible={this.state.isVisibleAA}
                onOpen={() => this.changeVisibility({
                    isVisibleAA: true
                })}
                onClose={() => this.setState({
                    isVisibleAA: false
                })}
                onChangeItem={item => {
                  this.setState({
                    itemAA: item.value
                })
                console.log(item.label, item.value);
              }}
              
            />
            <Text style={styles.textStyle}>일</Text>
          </View>
          <View style={styles.textArea}>
          <Text style={styles.textStyle}>휴가 신청 이유</Text>
        </View>
        <View style={styles.textinputArea}>
        <TextInput 
                onChangeText={item => {
                    console.log(item);
                    this.setState({
                        comment: item
                    })
                    console.log(this.state.comment)
                    console.log('///')
                }
                }
                defaultValue={this.state.comment}
                style={styles.textInputStyle} 
                //underlineColorAndroid='#7085DF'
                placeholder={"휴가 신청 사유를 입력하세요."}/>         
        </View>
        <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.fetchData() 
                this.props.navigation.navigate('Worker Home');
              }}>
                <Text style={styles.textStyle}>완료</Text>

            </TouchableOpacity>
          </View>
      </View>
        
    )
  }
}

export default VacationRequestScreen;