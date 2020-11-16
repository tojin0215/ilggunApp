import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
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
            f: 'system',
            t : 'a',
            message : '('+this.state.bangCode+')님이 '+this.state.itemA+"-"+this.state.itemB+"-"+this.state.itemAA+'에 휴가를 요청합니다.\n"'+ this.state.comment+'"',
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
            <View style={styles.dropdown}>
          <DropDownPicker
                items={[
                    {label: '2016', value: '2016'},
                        {label: '2017', value: '2017'},
                        {label: '2018', value: '2018'},
                        {label: '2019', value: '2019'},
                        {label: '2020', value: '2020'},
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
                style={styles.textForm} 
                placeholder={"Message"}/>          
        </View>
            <Button 
                title="완료"
                onPress={() => {
                    this.fetchData() 
                    this.props.navigation.navigate('Worker Home');
                }}
                //onPress={() => this.props.navigation.navigate('Work Management')}
            />
      </View>
        
    )
  }
}

export default VacationRequestScreen;