import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, FlatList, CheckBox } from 'react-native';
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
    }

    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode});
        this.fetchData();
      })
  }
  fetchData = async() => { 
    try {
        let res = await fetch('http://192.168.43.253:3000/selectWorkTodo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang : this.state.bangCode,
            year : new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
            worker: '/'
          }),
        }).then(res => res.json())
        .then(res => {
          console.log(res[0].todo);

          this.setState({todo:JSON.parse(res[0].todo)})
        });
    } catch (e) {
        console.error(e);
      }
}
savedData = async(td) => { 
    try {

        let res = await fetch('http://192.168.43.253:3000/addWorkTodoCheck', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang : this.state.bangCode,
            year : new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
            todo: td,
          }),
        }).then(res => res.json())
        .then(res => {
        });
        
    } catch (e) {
        
      }
    }
    render() {
        
        return (
        <View style={styles.container}>
            {
                this.state.todo==undefined?<Text>할 일을 추가해주세요.</Text>:<></>
                
            }
            <FlatList data={Object.keys(this.state.todo)} 
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => 
                    <Text>{item} 
                        <CheckBox
                            value={this.state.todo[item]?true:false}
                            onValueChange={value => {
                                let td = { ...this.state.todo };
                                console.log("------------------");
                                console.log(this.state.todo)
                                td[item] = this.state.todo[item]==1?0:1
                                console.log(td)
                                this.setState({todo : td})
                                console.log(this.state.todo)
                                console.log("------------------");
                                this.savedData(td);
                            }}
                        />
                        </Text>
                }/>
            
        </View>
            
        )
    }
}

export default WorkTodoScreen;