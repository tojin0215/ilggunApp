import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { AsyncStorage } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height :1000,
  },
  dropdown : {
    flexDirection: 'row',
  },
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
      itemA: null, //'2020년',
      isVisibleA: false,
   
      itemB: null,//'10월',
      isVisibleB: false,

      itemAA: null, //'2020년',
      isVisibleAA: false,
   
      itemBB: null,//'10월',
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
        let res = await fetch('http://192.168.43.253:3000/selectWorker', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business : bangCode,
            type : 1
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
        console.log(bangCode, this.state.originalTime, time);
        let s = this.state.originalTime.split('');
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
            time : time,
            subt : subt
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
        isVisibleBB: false,
        isVisibleC: false,
        ...state
    });
  }
  
  render() {
    const state = this.state;
    const {workernames} = this.state
    
    return (
      <View style={styles.container}>
        <DropDownPicker
                items={workernames}
                defaultValue=''//{this.state.itemC}
                containerStyle={{height: 40, width:120}}
                placeholder="직원이름"
                isVisible={this.state.isVisibleC}
                onOpen={() => this.changeVisibility({
                    isVisibleC: true
                })}
                onClose={() => this.setState({
                    isVisibleC: false
                })}
                onChangeItem={item => {
                    console.log(item);
                    //console.log(item.label);
                        //console.log(item.value);
                    console.log("///");

                    this.setState({
                        itemC: item.value.workername,
                        originalTime: item.value["tue"]
                    })
                }}
            />
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
                containerStyle={{height: 40, width:70}}
            
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
                containerStyle={{height: 40, width:100}}
            
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
            <Text> : </Text>
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
                containerStyle={{height: 40, width:70}}
            
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
                containerStyle={{height: 40, width:100}}
            
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
            <Button 
                title="완료"
                onPress={() => {
                    this.savedData(this.state.bangCode,this.state.itemC,this.state.monthh,this.state.datee,this.state.dayy, this.state.yearr,(this.state.itemA<10?'0'+this.state.itemA:this.state.itemA)+(this.state.itemB<10?'0'+this.state.itemB:this.state.itemB) + (this.state.itemAA<10?'0'+this.state.itemAA:this.state.itemAA)+(this.state.itemBB<10?'0'+this.state.itemBB:this.state.itemBB)) 
                    this.props.navigation.navigate('Work Management');
                }}
                //onPress={() => this.props.navigation.navigate('Work Management')}
            />
      </View>
        
    )
  }
}

export default AlterWorkerScreen;