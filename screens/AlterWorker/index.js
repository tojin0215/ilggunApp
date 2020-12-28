import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ImageBackground, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { AsyncStorage } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    alignItems: 'center',
    width: "100%", height: "100%", 
  },
  timeArea:{
    marginLeft:wp('4%'),
    marginBottom:hp('1.5%')
  }, 
  timeText:{
    fontSize:wp('5.05%'),
    fontFamily:"NanumSquareB",
  },
  dropdown : {
    flexDirection: 'row', backgroundColor:'white', 
    width:wp('90%'), height:hp('30%'), borderRadius:wp('4.5%'),
    alignItems:"center", justifyContent:"center",
    paddingBottom:hp('23%')
  },
  dropdownWokerArea:{
    marginTop:hp('8%'),
    marginBottom:hp('5%'),
    justifyContent:"center",
    alignItems:"center"
  },
  buttonArea: {
    position:"absolute",
    bottom: hp('5%'),
    justifyContent:"center",
    width: wp('100%'), height: hp('6%'),
  },
  button: {
      backgroundColor: "#67C8BA",
      width:wp('90%'), height: hp('5.5%'),
      justifyContent: 'center', alignItems:"center",
      borderRadius:wp('6%'),
      marginTop:hp('2%'),
  },
  buttonTitle: {
      color: 'white',
      fontFamily:"NanumSquare",
      fontSize:wp('4.8%'),
  },
  dropText:{
    fontSize:wp('8.5%'),
    fontFamily:"NanumSquare",
    color: '#040525',
    justifyContent:"center", alignItems:"center",
    marginTop:hp('0.5%')
  }
});

class AlterWorkerScreen extends Component{

  updateState(){}

  constructor(props) {
    super(props);
    console.log("매개변수 : ");
    console.log(this.props.route.params["date"].split(' '));
    this.state = {
        dayy: this.props.route.params["date"].split(' ')[0],
        monthh: this.props.route.params["date"].split(' ')[1]*1,
        datee: this.props.route.params["date"].split(' ')[2]*1,
        yearr: this.props.route.params["date"].split(' ')[3]*1,
      itemA: '9', //'2020년',
      isVisibleA: false,
   
      itemB: '00',//'10월',
      isVisibleB: false,

      itemAA: '18', //'2020년',
      isVisibleAA: false,
   
      itemBB: '00',//'10월',
      isVisibleBB: false,

      itemC: null,
      isVisibleC: false,

      bangCode : null,
      originalTime : null,
      workernames: [],
    }

    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode})
        this.fetchData(bangCode)
      })
  }
  fetchData = async(bangCode) => { 
    try {
         console.log(bangCode);
          axios.post('https://www.toojin.tk:3000/selectWorker', {
            business : bangCode,
            type : 1
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
        /*let res = await fetch('https://www.toojin.tk:3000/selectWorker', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business : bangCode,
            type : 1
          }),
        }).then(res => res.json())*/
        .then(res => {
          let rowall = []
          for (let i = 0; i < res.data.length; i++) {
            rowall.push({label: res.data[i].workername, value: res.data[i]});
          }
          this.setState({workernames: rowall})
        });
    } catch (e) {
        console.error(e);
      }
}
savedData = async(bangCode, worker, month, date, day, year, time) => { 
    try {
      if(this.state.itemC){
        console.log(bangCode, this.state.originalTime, time);
        
        let s = this.state.originalTime;
        if(s==null) s="00000000";
        console.log("SSS : "+s);
        let st = (s[0]+s[1])*1;
        let sm = (s[2]+s[3])*1;
        let et = (s[4]+s[5])*1;
        let em = (s[6]+s[7])*1;
        let subTime = (((et-st)*60) + (em-sm));
        let s2 = time.split('');
        let st2 = (s2[0]+s2[1])*1;
        let sm2 = (s2[2]+s2[3])*1;
        let et2 = (s2[4]+s2[5])*1;
        let em2 = (s2[6]+s2[7])*1;
        let subTime2 = (((et2-st2)*60) + (em2-sm2));
        let subt = (subTime2-subTime)/60;
        console.log("subttttt "+subt);
        axios.post('https://www.toojin.tk:3000/addWork', {
            business : bangCode,
            workername : worker,
            month : month,
            date : date,
            day :day,
            year : year,
            time : time,
            subt : subt
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        }).then(res => {this.props.navigation.navigate('Work Management');})
        
        /*let res = await fetch('https://www.toojin.tk:3000/addWork', {
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
            time : time,
            subt : subt
          }),
        });*/
      }else{
        Alert.alert("직원을 선택해주세요.")
      }
    } catch (e) {
        console.error(e);
      }
}

  changeVisibility(state) {
    this.setState({
        isVisibleA: false,
        isVisibleB: false,
        isVisibleAA: false,
        isVisibleBB: false,
        isVisibleC: false,
        ...state
    });
  }
  
  render() {
    const state = this.state;
    const {workernames} = this.state
    
    return (
      <ImageBackground style={styles.image} source={require('../../img/page1_1.png')}>
        <View style={styles.container}>
          <View style={styles.dropdownWokerArea}>
            <DropDownPicker
                items={workernames}
                defaultValue=''//{this.state.itemC}
                containerStyle={{height:hp('8%'), width:wp('90%'), }}
                style={{
                  borderTopLeftRadius: wp('4.5%'), borderTopRightRadius: wp('4.5%'),
                  borderBottomLeftRadius: wp('4.5%'), borderBottomRightRadius: wp('4.5%'), 
                  backgroundColor:'#67C8BA',
                }}
                placeholder="직원을 선택하세요."
               
                dropDownStyle={{backgroundColor: 'white', 
                      borderBottomLeftRadius: wp('4.5%'), borderBottomRightRadius: wp('4.5%'),
                      borderTopLeftRadius: wp('4.5%'), borderTopRightRadius: wp('4.5%'), 
                      borderColor:'#67C8BA', borderWidth:wp('0.5%')}}
                itemStyle={{justifyContent: 'center'}}
                labelStyle={{
                  height:hp('4%'),
                  textAlign: 'center',
                  color:'black',
                  fontFamily:"NanumSquare",
                  fontSize: wp('5.3%'),
                  paddingTop:hp('0.3%')
                }}
                isVisible={this.state.isVisibleC}
                onOpen={() => this.changeVisibility({
                    isVisibleC: true
                })}
                onClose={() => this.setState({
                    isVisibleC: false
                })}
                onChangeItem={item => {
                    console.log("==================================")
                    console.log(item.value)
                    console.log(item.value[this.props.route.params["date"].split(' ')[0].toLowerCase()]);
                    this.setState({
                        itemC: item.value.workername,
                        originalTime: item.value[this.props.route.params["date"].split(' ')[0].toLowerCase()]
                    })
                }}
            />
            </View>
            <View style={styles.timeArea}>
            <Text style={styles.timeText}>시간</Text>
          </View>
          <View style={styles.dropdownBox}>
            <View style={styles.dropdown}>
          <DropDownPicker
                items={[
                    {label: '0', value: '0'},
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
                ]}
                defaultValue={this.state.itemA}
                containerStyle={{height: hp('7%'), width:wp('17%'), marginRight:wp('2%')}}
                dropDownStyle={{backgroundColor: 'white', 
                      borderBottomLeftRadius: wp('4.5%'), borderBottomRightRadius: wp('4.5%'),
                     borderColor:"#E2F2EF",borderWidth:wp('0.5%')}}
                itemStyle={{justifyContent: 'center'}}
                
                placeholder="09"

                style={{
                  borderBottomColor:"#E2F2EF",borderBottomWidth:hp('0.5%'),
                  borderRightWidth:0, borderLeftWidth:0, borderTopWidth:0,
                  borderBottomLeftRadius:0, borderBottomRightRadius:0
                }}

                labelStyle={{
                  height:hp('3%'),
                  fontSize: wp('4.8%'),
                  fontFamily:"NanumSquare",
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
          
            <DropDownPicker
                items={[
                    {label: '00', value: '00'},
                    {label: '05', value: '05'},
                    {label: '10', value: '10'},
                    {label: '15', value: '15'},
                    {label: '20', value: '20'},
                    {label: '25', value: '25'},
                    {label: '30', value: '30'},
                    {label: '35', value: '35'},
                    {label: '40', value: '40'},
                    {label: '45', value: '45'},
                    {label: '50', value: '50'},
                    {label: '55', value: '55'},
                ]}
                defaultValue={this.state.itemB}
                containerStyle={{height: hp('7%'), width:wp('17%')}}
                dropDownStyle={{backgroundColor: 'white', 
                      borderBottomLeftRadius: wp('4.5%'), borderBottomRightRadius: wp('4.5%'),
                      borderColor:"#E2F2EF",borderWidth:wp('0.5%')}}
                itemStyle={{justifyContent: 'center'}}
                placeholder="00"

                style={{
                  borderBottomColor:"#E2F2EF",borderBottomWidth:hp('0.5%'),
                  borderRightWidth:0, borderLeftWidth:0, borderTopWidth:0,
                  borderBottomLeftRadius:0, borderBottomRightRadius:0
                }}

                labelStyle={{
                  height:hp('3%'),
                  fontSize: wp('4.8%'),
                  fontFamily:"NanumSquare",
                }}
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
            <Text style={styles.dropText}> : </Text>
            <DropDownPicker
                items={[
                    {label: '0', value: '0'},
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
                ]}
                defaultValue={this.state.itemAA}
                containerStyle={{height: hp('7%'), width:wp('17%'), marginRight:wp('2%')}}
                
                dropDownStyle={{backgroundColor: 'white', 
                      borderBottomLeftRadius: wp('4.5%'), borderBottomRightRadius: wp('4.5%'),
                      borderColor:"#E2F2EF",borderWidth:wp('0.5%')}}
                itemStyle={{justifyContent: 'center'}}
                placeholder="16"
                
                style={{
                  borderBottomColor:"#E2F2EF",borderBottomWidth:hp('0.5%'),
                  borderRightWidth:0, borderLeftWidth:0, borderTopWidth:0,
                  borderBottomLeftRadius:0, borderBottomRightRadius:0
                }}

                labelStyle={{
                  height:hp('3%'),
                  fontSize: wp('4.8%'),
                  fontFamily:"NanumSquare",
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
          
            <DropDownPicker
                items={[
                    {label: '00', value: '00'},
                    {label: '05', value: '05'},
                    {label: '10', value: '10'},
                    {label: '15', value: '15'},
                    {label: '20', value: '20'},
                    {label: '25', value: '25'},
                    {label: '30', value: '30'},
                    {label: '35', value: '35'},
                    {label: '40', value: '40'},
                    {label: '45', value: '45'},
                    {label: '50', value: '50'},
                    {label: '55', value: '55'},
                ]}
                defaultValue={this.state.itemBB}
                containerStyle={{height: hp('7%'), width:wp('17%'), marginRight:wp('2%')}}
                
                dropDownStyle={{backgroundColor: 'white', 
                      borderBottomLeftRadius: wp('4.5%'), borderBottomRightRadius: wp('4.5%'),
                      borderColor:"#E2F2EF",borderWidth:wp('0.5%')}}
                itemStyle={{justifyContent: 'center'}}
                
                style={{
                  borderBottomColor:"#E2F2EF",borderBottomWidth:hp('0.5%'),
                  borderRightWidth:0, borderLeftWidth:0, borderTopWidth:0,
                  borderBottomLeftRadius:0, borderBottomRightRadius:0
                }}
                
                labelStyle={{
                  height:hp('3%'),
                  fontSize: wp('4.8%'),
                  fontFamily:"NanumSquare",
                }}

                isVisible={this.state.isVisibleBB}
                onOpen={() => this.changeVisibility({
                    isVisibleBB: true
                })}
                onClose={() => this.setState({
                    isVisibleBB: false
                })}
                onChangeItem={item => this.setState({
                    itemBB: item.value
                })}
            />
        </View>
        </View>
        <View style={styles.buttonArea}>
            <TouchableOpacity 
            style={styles.button}
                onPress={() => {
                    this.savedData(this.state.bangCode,this.state.itemC,this.state.monthh,this.state.datee,this.state.dayy, this.state.yearr,(this.state.itemA.length<2?'0'+this.state.itemA:this.state.itemA)+(this.state.itemB.length<2?'0'+this.state.itemB:this.state.itemB) + (this.state.itemAA.length<2?'0'+this.state.itemAA:this.state.itemAA)+(this.state.itemBB.length<2?'0'+this.state.itemBB:this.state.itemBB)) 
                }}>
                <Text style={styles.buttonTitle}>변경 완료</Text>
             </TouchableOpacity>     
        </View>
      </View>
      </ImageBackground>
    
    )
  }
}

export default AlterWorkerScreen;