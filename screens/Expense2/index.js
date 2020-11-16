import React, {Component} from "react";
import { View, Text, StyleSheet, Button, TextInput,FlatList, Alert } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';

import CheckboxGroup from 'react-native-checkbox-group'


let arrItem = [];

const week = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
const time = [0,0,0,0,0,0,0];

for(let i = 0; i < week.length; i++){
    arrItem.push({       
        key : i,       
        week: week[i],
        goToWorkHour : "0",
        goToWorkMin : "0",
        offWorkHour : "0",
        offWorkMin: "0",
        time:time[i],
    });
}

class ExpenseScreen2 extends Component {

    state={
        totalSelectedTime:arrItem,
        HourlyWage:0,
        selectedHoursGoToWork:0,
        selectedMinutesGoToWork:0,
        selectedHoursOffWork:0,
        selectedMinutesOffWork:0,
        time:null,
        WithholdingTax:0, // 월급*원천세 3.3% 
        HourlyWage:0, //시급
        Salary:0, //월급 :시간*시급
        RealSalary:0 //실질급여 : 월급-원천세
    }

    renderSeparator = () => {  

        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                }}  
            />  
        );  
    };  

    //handling onPress action  
    getListViewItem = (item) => {  
        //Alert.alert(item.key + " : " + item.length);
    }  

    handleChange = (mode, key, hour, min) => {
        if(mode === "goToWork"){
            arrItem[key].goToWorkHour = hour;
            arrItem[key].goToWorkMin = min;
        }else{
            arrItem[key].offWorkHour = hour;
            arrItem[key].offWorkMin = min;
        }
        const goToTime = (arrItem[key].goToWorkHour*60)+arrItem[key].goToWorkMin
        const offTime =  (arrItem[key].offWorkHour*60)+arrItem[key].offWorkMin
        arrItem[key].time = (offTime - goToTime) / 60
        time[key] = arrItem[key].time

        this.setState({
            totalSelectedTime : arrItem,
        })
        //Alert.alert(key + " : " + arrItem[key].goToWorkHour + " : " + arrItem[key].goToWorkMin + " : " + arrItem[key].time);
        //console.log(event.target.value);
    }
    
    updateState(){
        let sumTime=0;
        for(let i=0; i<time.length; i++){
            //console.log(time[i]);
            sumTime = sumTime + time[i]
        }

        const Salary1 = (sumTime * this.state.HourlyWage * 4).toFixed(0) 
        const WithholdingTax1 = (Salary1 * 0.033).toFixed(0) //3.3%
        const RealSalary1 = Salary1 - WithholdingTax1

        this.setState({
            Salary:parseInt(Salary1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            WithholdingTax:parseInt(WithholdingTax1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            RealSalary:parseInt(RealSalary1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        })
    }

    resetData(){
        this.setState({
            HourlyWage:0,
        })
    }
 

    render(){
        const{selectedHoursGoToWork,selectedMinutesGoToWork, selectedHoursOffWork, selectedMinutesOffWork,
            HourlyWage, WithholdingTax, Salary, RealSalary} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.paddingView2}>
                    <View style={styles.textA}>
                        <Text>시급</Text>
                        <Text style={styles.marginText}>*2020년 법정 최저 시급 : 8,590원</Text>
                    </View>
                    <TextInput 
                        value={this.state.HourlyWage}
                        onChangeText={(HourlyWage) => this.setState({HourlyWage})}
                        autoFocus={true}
                        placeholder={'시급을 입력해주세요.'}/>
                </View>
                 
                <Text>시간 선택하기</Text>
            
                <FlatList  
                    data={arrItem}
                    backgroundColor='#D3D3D3'
                    renderItem={({item}) => 
                        <View>
                            <CheckboxGroup
                                callback={(selected) => { console.log(selected) }}
                                iconColor={"#00a2dd"}
                                iconSize={30}
                                checkedIcon="ios-checkbox-outline"
                                uncheckedIcon="ios-square-outline"
                                checkboxes={[
                                    {
                                    label:<Text>{item.week}</Text>,
                                    //label: "월요일", // label for checkbox item
                                    value: 1, // selected value for item, if selected, what value should be sent?
                                    },
                                ]}
                                labelStyle={{
                                    color: '#333'
                                }}
                                rowStyle={{
                                    flexDirection: 'row'
                                }}
                            />
                            {/*<View style={styles.rowView}>
                                <Text style={styles.item} 
                                    onPress={this.getListViewItem.bind(this, item)}>{item.week}</Text> 
                            </View>*/}
                            <Text>출근시간 {item.goToWorkHour}hr : {item.goToWorkMin}min</Text>
                            <TimePicker
                                key={item.key}
                                selectedHoursGoToWork={selectedHoursGoToWork} //initial Hourse value
                                selectedMinutesGoToWork={selectedMinutesGoToWork} //initial Minutes value
                                onChange={(hours, minutes) =>
                                    //this.setState({ selectedHoursGoToWork: hours, selectedMinutesGoToWork: minutes })}
                                    this.handleChange('goToWork', item.key, hours, minutes)
                                }
                            />
                            <Text>퇴근시간 {item.offWorkHour}hr : {item.offWorkMin}min</Text>
                            <TimePicker
                                selectedHoursOffWork={selectedHoursOffWork} //initial Hourse value
                                selectedMinutesOffWork={selectedMinutesOffWork} //initial Minutes value
                                onChange={(hours, minutes) =>
                                    //this.setState({ selectedHoursOffWork: hours, selectedMinutesOffWork: minutes })}
                                    this.handleChange('offWork', item.key, hours, minutes)
                                }
                            />
                            <Text>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</Text>
                        </View>
                        }  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  

                {/* <View>
                    <Text>시간선택</Text>
                </View>
                <TimePicker
                    selectedHours={selectedHours}
                    //initial Hourse value
                    selectedMinutes={selectedMinutes}
                    //initial Minutes value
                    onChange={(selectedHours) => this.setState({selectedHours})}
                    onChange={(selectedMinutes) => this.setState({selectedMinutes})}
                /> */}
                
                <View style={styles.paddingView}>
                    <View style={styles.buttonView}>
                        <Button
                            title="계산하기"
                            onPress={()=>{this.updateState()}}/>
                        <Button
                            title="초기화"
                            color="#FF3232"
                            onPress={()=>{this.resetData()}}/>
                    </View>
                    <View style={styles.paddingView}>
                        <View style={styles.rowView}>
                            <Text>월 급여</Text>
                            <Text style={styles.marginText}>{Salary}</Text>
                        </View>
                        <View style={styles.rowView}>
                            <Text>원천세</Text>
                            <Text style={styles.marginText}>{WithholdingTax}</Text>
                        </View>
                        <View style={styles.rowView}>
                            <Text>실질 급여</Text>
                            <Text style={styles.marginText}>{RealSalary}</Text>
                        </View>
                    </View>
 
                </View>
            </View>
        );
    }
    
}

export default ExpenseScreen2;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    checkboxContainer : {flexDirection:"row", marginBottom:20},
    textD : {marginTop:5},
    textA : {flexDirection:"row"},
    marginText : {marginLeft:10},
    paddingView : { paddingTop: 20},
    paddingView2 : { paddingBottom: 20},
    buttonView : {flexDirection:"row", paddingTop: 20},
    rowView : {flexDirection:"row"}
});
