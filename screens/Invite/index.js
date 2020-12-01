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

class InviteScreen extends Component{

  updateState(){}

  constructor(props) {
    super(props);
    this.state = {
        bangCode : null,
        workerList: [], item:''
    }

    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode});
        this.fetchData();
      })
  }
  fetchData = async(name) => { 
    try {
        let res = await fetch('http://192.168.43.253:3000/selectId', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : name
          }),
        }).then(res => res.json())
        .then(res => {
          let arr=[]
          for(let i=0; i<res.length ;i++){
            arr.push(res[i].id)
          }
          this.setState({workerList : arr});
           
        });
    } catch (e) {
        console.error(e);
      }
    }
    sendInviteMessage = async(name) => { 
      try {
        let res = await fetch('http://192.168.43.253:3000/sendMessage', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 1,
            f: 'system',
            t : name,
            message : '('+this.state.bangCode + ')님이 '+ this.state.bangCode+' 사업장에 '+name+"님을 초대합니다.\n승낙하시겠습니까?",
          }),
        }).then(res => res.json())
        .then(res => {
        });
        console.log(this.state.bangCode, name, this.props.route.params.type)
        res = await fetch('http://192.168.43.253:3000/addWorker', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business: this.state.bangCode,
            workername : name,
            type : this.props.route.params.type,
            state: 0
          }),
        }).then(res => res.json())
        .then(res => {
          this.props.navigation.navigate('Worker Management')
        });
      } catch (e) {
        console.error(e);
      }
    }
    render() {
        
        return (
        <View style={styles.container}>
            <TextInput 
                onChangeText={item => {
                    this.setState({
                        item: item
                    })
                }
                }
                defaultValue={this.state.item}
                placeholder={"아이디"}/>  
      
            <Button 
                title="검색"
                onPress={() => {
                    this.fetchData(this.state.item);
                    this.setState({item:''})
                }}
            />
            {
                //this.state.todo!=undefined?Object.entries(this.state.todo).map(([key, value]) => {
                //    return <Text key={key}>{key}:{value==0?'미완료':'완료'}<Button title="X" onPress={()=>{this.deleteData(key)}}/></Text> 
                //}):<Text>할 일을 추가해주세요.</Text>
                
            }
            <FlatList data={this.state.workerList} 
                renderItem={({ item }) => 
                    <Text>{item}<Button title="초대" onPress={()=>{console.log(item+'<<<<<<<<<<<<<,'); this.sendInviteMessage(item); }}/></Text>
                }/>
            
        </View>
            
        )
    }
}

export default InviteScreen;