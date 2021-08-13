import React, {Component} from "react";
import { View, Text, StyleSheet, Button, TextInput,FlatList, Alert, ImageBackground} from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import CheckboxGroup from 'react-native-checkbox-group';
import * as Font from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';


let arrItem = [];

const week = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
const time = [0,0,0,0,0,0,0];



class ExpenseScreen2 extends Component {
    constructor(props) {
        super(props);

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
        this.state = {
            totalSelectedTime:arrItem,
            HourlyWage:'0',
            selectedHoursGoToWork:'0',
            selectedMinutesGoToWork:'0',
            selectedHoursOffWork:'0',
            selectedMinutesOffWork:'0',
            time:null,
            WithholdingTax:'0', // 월급*원천세 3.3% 
            HourlyWage:'0', //시급
            Salary:'0', //월급 :시간*시급
            RealSalary:'0' //실질급여 : 월급-원천세
        }
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
            totalSelectedTime:arrItem,
            HourlyWage:'0',
            selectedHoursGoToWork:'0',
            selectedMinutesGoToWork:'0',
            selectedHoursOffWork:'0',
            selectedMinutesOffWork:'0',
            time:null,
            WithholdingTax:'0', // 월급*원천세 3.3% 
            HourlyWage:'0', //시급
            Salary:'0', //월급 :시간*시급
            RealSalary:'0' //실질급여 : 월급-원천세
        })
    }
 

    render(){
        const{selectedHoursGoToWork,selectedMinutesGoToWork, selectedHoursOffWork, selectedMinutesOffWork,
            HourlyWage, WithholdingTax, Salary, RealSalary} = this.state

        return (
        <View style={styles.image}>
           <View style={styles.container}>
            <ScrollView>
                <View style={styles.titleArea}>
                    <Text style={styles.textTitle}>인건비 계산하기(단기/일용직)</Text>
                </View>
                <View style={styles.textArea}>
                    <View style={styles.rowView}>
                        <Text style={styles.textStyle}>*시급을 입력해주세요.</Text>
                    </View>
                    <View style={styles.rowView}>
                        <TextInput
                            value={this.state.HourlyWage}
                            onChangeText={(HourlyWage) => this.setState({HourlyWage})}
                            autoFocus={true}
                            placeholder={'8720'}
                            keyboardType={"number-pad"}
                            style={styles.textinputStyle}
                            />
                        <Text style={styles.textStyle}>원</Text>
                    </View>
                </View>

                <View style={{marginTop:hp('2%')}}>
                    <Text style={styles.textStyle}>시간 선택하기</Text>
                </View>
               <View style={styles.timeSelectArea}>
                <ScrollView>
            
                <FlatList  
                    data={arrItem}
                    backgroundColor='white'
                    renderItem={({item}) => 
                        <View style={styles.pickerArea}>
                            <CheckboxGroup
                                callback={(selected) => { console.log(selected) }}
                                iconColor={"#00a2dd"}
                                iconSize={wp('10%')}
                                checkedIcon="ios-checkbox-outline"
                                uncheckedIcon="ios-square-outline"
                                checkboxes={[
                                    {
                                    label:<Text style={styles.listText}>{item.week}</Text>,
                                    //label: "월요일", // label for checkbox item
                                    value: 1, // selected value for item, if selected, what value should be sent?
                                    },
                                ]}
                                labelStyle={{
                                    color: '#040525',
                                    marginTop:hp('1%'),
                                    marginLeft:hp('1.5%'),
                                }}
                                rowStyle={{
                                    flexDirection: 'row'
                                }}
                            />
                            {/*<View style={styles.rowView}>
                                <Text style={styles.item} 
                                    onPress={this.getListViewItem.bind(this, item)}>{item.week}</Text> 
                            </View>*/}
                            <Text style={styles.listText}>출근시간) {item.goToWorkHour}시 : {item.goToWorkMin}분</Text>
                            <TimePicker
                                key={item.key}
                                selectedHoursGoToWork={selectedHoursGoToWork} //initial Hourse value
                                selectedMinutesGoToWork={selectedMinutesGoToWork} //initial Minutes value
                                onChange={(hours, minutes) =>
                                    //this.setState({ selectedHoursGoToWork: hours, selectedMinutesGoToWork: minutes })}
                                    this.handleChange('goToWork', item.key, hours, minutes)
                                }
                            />
                            <Text style={styles.listText}>퇴근시간) {item.offWorkHour}시 : {item.offWorkMin}분</Text>
                            <TimePicker
                                selectedHoursOffWork={selectedHoursOffWork} //initial Hourse value
                                selectedMinutesOffWork={selectedMinutesOffWork} //initial Minutes value
                                onChange={(hours, minutes) =>
                                    //this.setState({ selectedHoursOffWork: hours, selectedMinutesOffWork: minutes })}
                                    this.handleChange('offWork', item.key, hours, minutes)
                                }

                            />
                        </View>
                        }  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
                
                </ScrollView>
                </View>

                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.updateState()}}>
                        <Text style={styles.buttonTitle}>인건비 계산하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonReset}
                        onPress={()=>{this.resetData()}}>
                    <Text style={styles.buttonResetTitle}>초기화</Text>       
                    </TouchableOpacity>
                </View>

                <View style={styles.resultArea}>
                    <Text style={styles.textStyle}>* 인건비 계산 결과</Text>
                    <Text style={styles.textResultStyle}>월 급여 : {Salary} 원</Text>    
                    <Text style={styles.textResultStyle}>원천세 : {WithholdingTax} 원</Text>
                    <Text style={styles.textResultStyle}>실질 급여 : {RealSalary} 원</Text>
                </View> 

                
            </ScrollView>
            </View>
            </View>
        );
    }
    
}

export default ExpenseScreen2;

const styles = StyleSheet.create({
    container: {
        padding:wp('4.5%'), 
        width: "100%",
         height: "100%", 
         backgroundColor: 'white',
         borderTopRightRadius:wp('13%'),
         borderTopLeftRadius:wp('13%'),
    },
    rowView : {flexDirection:"row"},
    image:{ 
        alignItems: 'center', justifyContent:"center",
        width: "100%", height: "100%",
        backgroundColor:'#67C8BA'
    },
    buttonArea: {
        alignItems:"center",
        width: '100%', height: hp('10%'),
        marginBottom:hp('12%'),
    },
    titleArea:{
      alignItems:"center"
    },
    button: {
        backgroundColor: "#67C8BA",
        width:wp('90%'), height: hp('5.5%'),
        justifyContent: 'center', alignItems:"center",
        borderRadius:wp('6%'),
        marginTop:hp('2%'),
    },
    buttonReset: {
        backgroundColor: "#040525",
        width:wp('90%'), height: hp('5.5%'),
        justifyContent: 'center', alignItems:"center",
        borderRadius:wp('6%'),
        marginTop:hp('1%'),
    },
    buttonTitle: {
        color: 'white',
        fontFamily:"NanumSquare",
        fontSize: wp('4.8rem'),
    },  
    buttonResetTitle: {
        color: 'white',
        fontFamily:"NanumSquare",
        fontSize: wp('4.8rem'),
    },  
    textTitle:{
        fontSize: wp('5.55rem'),
        fontFamily:"NanumSquareB",
        marginBottom:hp('2%'),
        marginTop:hp('2%'),
        color:'#040525',
    },
    textArea:{
        marginTop:hp('2%'),
        marginBottom:hp('2%'),
        marginLeft:wp('1.5%')
    },
    textStyle:{
        fontSize: wp('4.2rem'),
        fontFamily:"NanumSquare",
        color:'#040525',
        marginTop:wp('1%'),
        marginBottom:wp('1.5%'),
        marginRight:wp('2%'),
    },  
    textStyle2:{
        fontSize:wp('3.35rem'),
        fontFamily:"NanumSquare",
        marginTop:wp('1.5%'),
        marginBottom:wp('1.5%'),
        marginRight:wp('2%'),
        color:'#040525',
    },  
    textinputStyle:{
      fontSize: wp('4.2rem'),
      fontFamily:"NanumSquare",
      marginLeft:wp('3%'),
      width:wp('35%'), height:hp('4.5%'), textAlign:"center", justifyContent:"center",
      borderBottomWidth:hp('0.5%'),
      borderBottomColor:'#67C8BA'
  },
    timeSelectArea:{
        marginTop:hp('1%'),
        marginBottom:hp('5%'),
        height:hp('40%'),
        borderColor:'#67C8BA', borderWidth:wp('0.5%'), 
        borderRadius:wp('4%'),
        padding:wp('2%')
    },  
    pickerArea:{
        padding:wp('2%'), 
        borderBottomColor:'#67C8BA', 
        borderBottomWidth:hp('0.1%')
    },
    textResultStyle:{
      fontSize:wp('5.05rem'),
      fontFamily:"NanumSquareB",
      marginLeft:wp('3%'),
      marginTop:wp('1%'),
      marginBottom:wp('1.5%'),
      marginRight:wp('2%'),
    },
    resultArea:{
        marginBottom:hp('5%')
    },
    listText1:{
        fontSize:wp('3.6rem'),
        fontFamily:"NanumSquare",
        marginTop:hp('0.5%'),
        color:'#040525',
    },  
    listText:{
        fontSize:wp('4.6rem'),
        lineHeight:wp('6.6rem'),
        fontFamily:"NanumSquare",
        color:'#040525',
    },  
});
