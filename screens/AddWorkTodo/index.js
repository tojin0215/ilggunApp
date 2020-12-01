import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, FlatList } from 'react-native';
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
        let res = await fetch('http://192.168.43.253:3000/selectWorkTodo', {
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
        }).then(res => res.json())
        .then(res => {
            console.log(res[0])
            if(res[0]!=undefined){
                this.setState({todo:JSON.parse(res[0].todo)})
            }
        });
    } catch (e) {
        console.error(e);
      }
}
savedData = async() => { 
    try {

        let res = await fetch('http://192.168.43.253:3000/addWorkTodo', {
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
        }).then(res => res.json())
        .then(res => {
            this.setState({item:''})
            this.fetchData();
            console.log("--------------------------");
            fetchData();
        });
        
    } catch (e) {
        
      }
    }
    deleteData = async(key) => { 
        try {
    
            let res = await fetch('http://192.168.43.253:3000/deleteWorkTodo', {
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
            }).then(res => res.json())
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
        <View style={styles.container}>
            {
                //this.state.todo!=undefined?Object.entries(this.state.todo).map(([key, value]) => {
                //    return <Text key={key}>{key}:{value==0?'미완료':'완료'}<Button title="X" onPress={()=>{this.deleteData(key)}}/></Text> 
                //}):<Text>할 일을 추가해주세요.</Text>
                
            }
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
        </View>
            
        )
    }
}

export default AddWorkTodoScreen;