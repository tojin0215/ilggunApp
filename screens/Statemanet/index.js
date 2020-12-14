import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height :400,
  },
  dropdown : {
    flexDirection: 'row',
  },
});

class StatementScreen extends Component{

  updateState(){}

  constructor(props) {
    super(props);
    
    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.fetchData(bangCode)
      })
  
    this.state = {
      itemA: '2020년',
      isVisibleA: false,
   
      itemB: '10월',
      isVisibleB: false,

      itemC: null,
      isVisibleC: false,

      workernames: [],
    }
  }
  fetchData = async(bangCode) => { 
    try {
      console.log(bangCode);
        axios.post('https://www.kwonsoryeong.tk:3000/selectWorker', {
            business : bangCode,
            type : 1
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
        /*let res = await fetch('https://www.kwonsoryeong.tk:3000/selectWorker', {
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
            rowall.push({label: res.data[i].workername, value: res.data[i].workername});
          }
          this.setState({workernames: rowall})
        });
    } catch (e) {
        console.error(e);
      }
}

  changeVisibility(state) {
    this.setState({
        isVisibleA: false,
        isVisibleB: false,
        isVisibleC: false,
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
                    {label: '2016년', value: '2016년'},
                    {label: '2017년', value: '2017년'},
                    {label: '2018년', value: '2018년'},
                    {label: '2019년', value: '2019년'},
                    {label: '2020년', value: '2020년'},
                ]}
                defaultValue={this.state.itemA}
                containerStyle={{height: 40, width:100}}
            
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
                  {label: '1월', value: '1월'},
                  {label: '2월', value: '2월'},
                  {label: '3월', value: '3월'},
                  {label: '4월', value: '4월'},
                  {label: '5월', value: '5월'},
                  {label: '6월', value: '6월'},
                  {label: '7월', value: '7월'},
                  {label: '8월', value: '8월'},
                  {label: '9월', value: '9월'},
                  {label: '10월', value: '10월'},
                  {label: '11월', value: '11월'},
                  {label: '12월', value: '12월'},
                ]}
                defaultValue={this.state.itemB}
                containerStyle={{height: 40, width:70}}
            
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
          
        </View>
        <DropDownPicker
                items={workernames}
                defaultValue={this.state.itemC}
                containerStyle={{height: 40, width:120}}
                placeholder="직원이름"
                isVisible={this.state.isVisibleC}
                onOpen={() => this.changeVisibility({
                    isVisibleC: true
                })}
                onClose={() => this.setState({
                    isVisibleC: false
                })}
                onChangeItem={item => this.setState({
                    itemC: item.value
                })}
            />
      </View>
        
    )
  }
}

export default StatementScreen;