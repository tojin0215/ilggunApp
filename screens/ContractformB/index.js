
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ImageBackground, Image, TouchableOpacity} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Table, TableWrapper,Row, Rows,  Col, Cols, Cell } from 'react-native-table-component';
import CheckboxGroup from 'react-native-checkbox-group'
import { AsyncStorage } from 'react-native';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from 'react-native-webview'
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ContractformBScreen extends Component{
  state={
  }

  constructor(props) {
    super(props);
    this.state = {
        value4: 0,types4:[0,0,0,0,0],htmlContent:'',
      types1: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types2: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types3: [{label: '근로자에게 직접지급   ', value: 0}, {label: '근로자 명의 예금통장에 입금', value: 1}], 
      value1: 0, value1Index:0, value2: 0, value2Index:0, value3: 0, value3Index:0,
      tableHead:['','시작시간','마치는시간','근무시간'],
      tableTitle: ['월', '화', '수', '목', '금', '토', '일'], 
      tableData: [
        [<View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.Start1} onChangeText={(Start1) => this.setState({Start1})} placeholder='08' keyboardType={"number-pad"} onSubmitEditing={() => { this.Tabledata1.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.Start11} onChangeText={(Start11) => this.setState({Start11})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata1 = input; }} onSubmitEditing={() => { this.Tabledata2.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.End1} onChangeText={(End1) => this.setState({End1})} placeholder='14' keyboardType={"number-pad"} ref={(input) => { this.Tabledata2 = input; }} onSubmitEditing={() => { this.Tabledata3.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.End11} onChangeText={(End11) => this.setState({End11})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata3 = input; }} onSubmitEditing={() => { this.Tabledata4.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <TextInput value={this.state.time1} onChangeText={(time1) => this.setState({time1})} placeholder='7' keyboardType={"number-pad"} ref={(input) => { this.Tabledata4 = input; }} onSubmitEditing={() => { this.Tabledata5.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />],
        
        [<View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.Start2} onChangeText={(Start2) => this.setState({Start2})} placeholder='08' keyboardType={"number-pad"} ref={(input) => { this.Tabledata5 = input; }} onSubmitEditing={() => { this.Tabledata6.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.Start22} onChangeText={(Start22) => this.setState({Start22})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata6 = input; }} onSubmitEditing={() => { this.Tabledata7.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.End2} onChangeText={(End2) => this.setState({End2})} placeholder='14' keyboardType={"number-pad"} ref={(input) => { this.Tabledata7 = input; }} onSubmitEditing={() => { this.Tabledata8.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.End22} onChangeText={(End22) => this.setState({End22})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata8 = input; }} onSubmitEditing={() => { this.Tabledata9.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <TextInput value={this.state.time2} onChangeText={(time2) => this.setState({time2})} placeholder='7'  keyboardType={"number-pad"} ref={(input) => { this.Tabledata9 = input; }} onSubmitEditing={() => { this.Tabledata10.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />],

        [<View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.Start3} onChangeText={(Start3) => this.setState({Start3})} placeholder='08' keyboardType={"number-pad"} ref={(input) => { this.Tabledata10 = input; }} onSubmitEditing={() => { this.Tabledata11.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.Start33} onChangeText={(Start33) => this.setState({Start33})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata11 = input; }} onSubmitEditing={() => { this.Tabledata12.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.End3} onChangeText={(End3) => this.setState({End3})} placeholder='14' keyboardType={"number-pad"} ref={(input) => { this.Tabledata12 = input; }} onSubmitEditing={() => { this.Tabledata13.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.End33} onChangeText={(End33) => this.setState({End33})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata13 = input; }} onSubmitEditing={() => { this.Tabledata14.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <TextInput value={this.state.time3} onChangeText={(time3) => this.setState({time3})} placeholder='7' keyboardType={"number-pad"} ref={(input) => { this.Tabledata14 = input; }} onSubmitEditing={() => { this.Tabledata15.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />],

        [<View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.Start4} onChangeText={(Start4) => this.setState({Start4})} placeholder='08' keyboardType={"number-pad"} ref={(input) => { this.Tabledata15 = input; }} onSubmitEditing={() => { this.Tabledata16.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.Start44} onChangeText={(Start44) => this.setState({Start44})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata16 = input; }} onSubmitEditing={() => { this.Tabledata17.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.End4} onChangeText={(End4) => this.setState({End4})} placeholder='14' keyboardType={"number-pad"} ref={(input) => { this.Tabledata17 = input; }} onSubmitEditing={() => { this.Tabledata18.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.End44} onChangeText={(End44) => this.setState({End44})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata18 = input; }} onSubmitEditing={() => { this.Tabledata19.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <TextInput value={this.state.time4} onChangeText={(time4) => this.setState({time4})} placeholder='7' keyboardType={"number-pad"} ref={(input) => { this.Tabledata19 = input; }} onSubmitEditing={() => { this.Tabledata20.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />],

        [<View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.Start5} onChangeText={(Start5) => this.setState({Start5})} placeholder='08' keyboardType={"number-pad"} ref={(input) => { this.Tabledata20 = input; }} onSubmitEditing={() => { this.Tabledata21.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.Start55} onChangeText={(Start55) => this.setState({Start55})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata21 = input; }} onSubmitEditing={() => { this.Tabledata22.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.End5} onChangeText={(End5) => this.setState({End5})} placeholder='14' keyboardType={"number-pad"} ref={(input) => { this.Tabledata22 = input; }} onSubmitEditing={() => { this.Tabledata23.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.End55} onChangeText={(End55) => this.setState({End55})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata23 = input; }} onSubmitEditing={() => { this.Tabledata24.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <TextInput value={this.state.time5} onChangeText={(time5) => this.setState({time5})} placeholder='7' keyboardType={"number-pad"} ref={(input) => { this.Tabledata24 = input; }} onSubmitEditing={() => { this.Tabledata25.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />],

        [<View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.Start6} onChangeText={(Start6) => this.setState({Start6})} placeholder='08' keyboardType={"number-pad"} ref={(input) => { this.Tabledata25 = input; }} onSubmitEditing={() => { this.Tabledata26.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.Start66} onChangeText={(Start66) => this.setState({Start66})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata26 = input; }} onSubmitEditing={() => { this.Tabledata27.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.End6} onChangeText={(End6) => this.setState({End6})} placeholder='14' keyboardType={"number-pad"} ref={(input) => { this.Tabledata27 = input; }} onSubmitEditing={() => { this.Tabledata28.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.End66} onChangeText={(End66) => this.setState({End66})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata28 = input; }} onSubmitEditing={() => { this.Tabledata29.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <TextInput value={this.state.time6} onChangeText={(time6) => this.setState({time6})} placeholder='7'  keyboardType={"number-pad"} ref={(input) => { this.Tabledata29 = input; }} onSubmitEditing={() => { this.Tabledata30.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />],

        [<View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.Start7} onChangeText={(Start7) => this.setState({Start7})} placeholder='08' keyboardType={"number-pad"} ref={(input) => { this.Tabledata30 = input; }} onSubmitEditing={() => { this.Tabledata31.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.Start77} onChangeText={(Start77) => this.setState({Start77})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata31 = input; }} onSubmitEditing={() => { this.Tabledata32.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <View style={{flexDirection:"row", justifyContent:"center"}}>
            <TextInput value={this.state.End7} onChangeText={(End7) => this.setState({End7})} placeholder='14' keyboardType={"number-pad"} ref={(input) => { this.Tabledata32 = input; }} onSubmitEditing={() => { this.Tabledata33.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
            <Text style={styles.tabledatatextStyle}>:</Text>
            <TextInput value={this.state.End77} onChangeText={(End77) => this.setState({End77})} placeholder='00' keyboardType={"number-pad"} ref={(input) => { this.Tabledata33 = input; }} onSubmitEditing={() => { this.Tabledata34.focus(); }} blurOnSubmit={false} style={styles.tableTextStyle1} />
        </View>, 
        <TextInput value={this.state.time7} onChangeText={(time7) => this.setState({time7})} placeholder='7' keyboardType={"number-pad"} ref={(input) => { this.Tabledata34 = input; }} blurOnSubmit={false} style={styles.tableTextStyle1} />]
    ], id:this.props.route.params.workername, bang:''//, types4:[0,0,0,0,0]
    };
    
    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bang: bangCode});
        this.initfetchHtml(bangCode);
      })
  }
  

  handleSubmit(){
    const chkNum = (str)=> {
        var pattern_num = /[0-9]/;
        return pattern_num.test(str) ? true : false;
    };
    const chkEng = (str)=> {
        var pattern_eng = /[a-zA-Z]/;
        return pattern_eng.test(str) ? true : false;
    };
    const chkKor = (str)=> {
        var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        return pattern_kor.test(str) ? true : false;
    };
    const chkSpc = (str)=> {
        var pattern_spc = /[-~!@#$%^&*()_+|<>?:{}.,/]/;
        return pattern_spc.test(str) ? true : false;
    };

    
    if(this.state.Employer == null||this.state.Employee ==null
        ||this.state.StartYear==null||this.state.StartMonth==null||this.state.StartDay==null
        ||this.state.WorkPlace==null||this.state.WorkReference==null||this.state.Salary==null
        ||this.state.SalaryDay==null||this.state.ContractYear==null||this.state.ContractMonth==null
        ||this.state.ContractDay==null||this.state.BusinessName==null||this.state.BusinessAddress==null
        ||this.state.BusinessOwner1==null||this.state.BusinessPhone==null){
        Alert.alert('빈칸을 채워주세요.') 
    }else if(!((chkNum(this.state.StartYear)===true) && (chkEng(this.state.StartYear)===false) && (chkKor(this.state.StartYear) ===false) && (chkSpc(this.state.StartYear)===false))||
        !((chkNum(this.state.StartMonth)===true) && (chkEng(this.state.StartMonth)===false) && (chkKor(this.state.StartMonth) ===false) && (chkSpc(this.state.StartMonth)===false))||
        !((chkNum(this.state.StartDay)===true) && (chkEng(this.state.StartDay)===false) && (chkKor(this.state.StartDay) ===false) && (chkSpc(this.state.StartDay)===false))||
        !((chkNum(this.state.Salary)===true) && (chkEng(this.state.Salary)===false) && (chkKor(this.state.Salary) ===false) && (chkSpc(this.state.Salary)===false))||
        !((chkNum(this.state.SalaryDay)===true) && (chkEng(this.state.SalaryDay)===false) && (chkKor(this.state.SalaryDay) ===false) && (chkSpc(this.state.SalaryDay)===false))||
        !((chkNum(this.state.ContractYear)===true) && (chkEng(this.state.ContractYear)===false) && (chkKor(this.state.ContractYear) ===false) && (chkSpc(this.state.ContractYear)===false))||
        !((chkNum(this.state.ContractMonth)===true) && (chkEng(this.state.ContractMonth)===false) && (chkKor(this.state.ContractMonth) ===false) && (chkSpc(this.state.ContractMonth)===false))||
        !((chkNum(this.state.ContractDay)===true) && (chkEng(this.state.ContractDay)===false) && (chkKor(this.state.ContractDay) ===false) && (chkSpc(this.state.ContractDay)===false))
        || this.state.StartYear<2000 || this.state.StartYear>3000
        || this.state.StartMonth<1 || this.state.StartMonth>12 
        || this.state.StartDay<1 || this.state.StartDay>31
        ){
        Alert.alert('계약기간, 근로시간, 임금, 계약날짜의 숫자가 제대로 입력되었는지 확인해주세요.') 
    } 
    else{
        var flag = true
        if(!(this.state.EndYear==null)||!(this.state.EndMonth==null)||!(this.state.EndDay==null)){
            console.log('근로기간 확인')
            if(!((chkNum(this.state.EndYear)===true) && (chkEng(this.state.EndYear)===false) && (chkKor(this.state.EndYear) ===false) && (chkSpc(this.state.EndYear)===false))||
            !((chkNum(this.state.EndMonth)===true) && (chkEng(this.state.EndMonth)===false) && (chkKor(this.state.EndMonth) ===false) && (chkSpc(this.state.EndMonth)===false))||
            !((chkNum(this.state.EndDay)===true) && (chkEng(this.state.EndDay)===false) && (chkKor(this.state.EndDay) ===false) && (chkSpc(this.state.EndDay)===false))){
                Alert.alert('계약기간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                console.log('근로기간_숫자 제대로 입력안됨')
                flag=false
            }else{
                console.log('근로기간_숫자 제대로 확인됨')
            }            
        } 

        if(!(this.state.Start1==null)||!(this.state.Start11==null)||!(this.state.End1==null)||!(this.state.End11==null)||!(this.state.time1==null)){
            console.log('근로시간(월요일)숫자 확인')
            if(!((chkNum(this.state.Start1)===true) && (chkEng(this.state.Start1)===false) && (chkKor(this.state.Start1) ===false) && (chkSpc(this.state.Start1)===false))||
            !((chkNum(this.state.Start11)===true) && (chkEng(this.state.Start11)===false) && (chkKor(this.state.Start11) ===false) && (chkSpc(this.state.Start11)===false))||
            !((chkNum(this.state.End1)===true) && (chkEng(this.state.End1)===false) && (chkKor(this.state.End1) ===false) && (chkSpc(this.state.End1)===false))||
            !((chkNum(this.state.End11)===true) && (chkEng(this.state.End11)===false) && (chkKor(this.state.End11) ===false) && (chkSpc(this.state.End11)===false))||
            !((chkNum(this.state.time1)===true) && (chkEng(this.state.time1)===false) && (chkKor(this.state.time1) ===false) && (chkSpc(this.state.time1)===false))){
                Alert.alert('근로시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                console.log('근로시간(월요일)_숫자입력 제대로 안됨')
                flag=false
            }else{
                console.log('근로시간(월요일)_숫자 제대로 확인됨')
            }
        }
        
        if(!(this.state.Start2==null)||!(this.state.Start22==null)||!(this.state.End2==null)||!(this.state.End22==null)||!(this.state.time2==null)){
            console.log('근로시간(화요일)')
            if(!((chkNum(this.state.Start2)===true) && (chkEng(this.state.Start2)===false) && (chkKor(this.state.Start2) ===false) && (chkSpc(this.state.Start2)===false))||
            !((chkNum(this.state.Start22)===true) && (chkEng(this.state.Start22)===false) && (chkKor(this.state.Start22) ===false) && (chkSpc(this.state.Start22)===false))||
            !((chkNum(this.state.End2)===true) && (chkEng(this.state.End2)===false) && (chkKor(this.state.End2) ===false) && (chkSpc(this.state.End2)===false))||
            !((chkNum(this.state.End22)===true) && (chkEng(this.state.End22)===false) && (chkKor(this.state.End22) ===false) && (chkSpc(this.state.End22)===false))||
            !((chkNum(this.state.time2)===true) && (chkEng(this.state.time2)===false) && (chkKor(this.state.time2) ===false) && (chkSpc(this.state.time2)===false))){
                Alert.alert('근로시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('근로시간(화요일)_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Start3==null)||!(this.state.Start33==null)||!(this.state.End3==null)||!(this.state.End33==null)||!(this.state.time3==null)){
             console.log('근로시간(수요일)')
            if(!((chkNum(this.state.Start3)===true) && (chkEng(this.state.Start3)===false) && (chkKor(this.state.Start3) ===false) && (chkSpc(this.state.Start3)===false))||
            !((chkNum(this.state.Start33)===true) && (chkEng(this.state.Start33)===false) && (chkKor(this.state.Start33) ===false) && (chkSpc(this.state.Start33)===false))||
            !((chkNum(this.state.End3)===true) && (chkEng(this.state.End3)===false) && (chkKor(this.state.End3) ===false) && (chkSpc(this.state.End3)===false))||
            !((chkNum(this.state.End33)===true) && (chkEng(this.state.End33)===false) && (chkKor(this.state.End33) ===false) && (chkSpc(this.state.End33)===false))||
            !((chkNum(this.state.time3)===true) && (chkEng(this.state.time3)===false) && (chkKor(this.state.time3) ===false) && (chkSpc(this.state.time3)===false))){
                Alert.alert('근로시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('근로시간(수요일)_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Start4==null)||!(this.state.Start44==null)||!(this.state.End4==null)||!(this.state.End44==null)||!(this.state.time4==null)){
            console.log('근로시간(목요일)')
            if( !((chkNum(this.state.Start4)===true) && (chkEng(this.state.Start4)===false) && (chkKor(this.state.Start4) ===false) && (chkSpc(this.state.Start4)===false))||
            !((chkNum(this.state.Start44)===true) && (chkEng(this.state.Start44)===false) && (chkKor(this.state.Start44) ===false) && (chkSpc(this.state.Start44)===false))||
            !((chkNum(this.state.End4)===true) && (chkEng(this.state.End4)===false) && (chkKor(this.state.End4) ===false) && (chkSpc(this.state.End4)===false))||
            !((chkNum(this.state.End44)===true) && (chkEng(this.state.End44)===false) && (chkKor(this.state.End44) ===false) && (chkSpc(this.state.End44)===false))||
            !((chkNum(this.state.time4)===true) && (chkEng(this.state.time4)===false) && (chkKor(this.state.time4) ===false) && (chkSpc(this.state.time4)===false))){
                Alert.alert('근로시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('근로시간(목요일)_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Start5==null)||!(this.state.Start55==null)||!(this.state.End5==null)||!(this.state.End55==null)||!(this.state.time5==null)){
            console.log('근로시간(금요일)')
            if(!((chkNum(this.state.Start5)===true) && (chkEng(this.state.Start5)===false) && (chkKor(this.state.Start5) ===false) && (chkSpc(this.state.Start5)===false))||
            !((chkNum(this.state.Start55)===true) && (chkEng(this.state.Start55)===false) && (chkKor(this.state.Start55) ===false) && (chkSpc(this.state.Start55)===false))||
            !((chkNum(this.state.End5)===true) && (chkEng(this.state.End5)===false) && (chkKor(this.state.End5) ===false) && (chkSpc(this.state.End5)===false))||
            !((chkNum(this.state.End55)===true) && (chkEng(this.state.End55)===false) && (chkKor(this.state.End55) ===false) && (chkSpc(this.state.End55)===false))||
            !((chkNum(this.state.time5)===true) && (chkEng(this.state.time5)===false) && (chkKor(this.state.time5) ===false) && (chkSpc(this.state.time5)===false))){
                Alert.alert('근로시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('근로시간(금요일)_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Start6==null)||!(this.state.Start66==null)||!(this.state.End6==null)||!(this.state.End66==null)||!(this.state.time6==null)){
            console.log('근로시간(토요일)')
            if(!((chkNum(this.state.Start6)===true) && (chkEng(this.state.Start6)===false) && (chkKor(this.state.Start6) ===false) && (chkSpc(this.state.Start6)===false))||
            !((chkNum(this.state.Start66)===true) && (chkEng(this.state.Start66)===false) && (chkKor(this.state.Start66) ===false) && (chkSpc(this.state.Start66)===false))||
            !((chkNum(this.state.End6)===true) && (chkEng(this.state.End6)===false) && (chkKor(this.state.End6) ===false) && (chkSpc(this.state.End6)===false))||
            !((chkNum(this.state.End66)===true) && (chkEng(this.state.End66)===false) && (chkKor(this.state.End66) ===false) && (chkSpc(this.state.End66)===false))||
            !((chkNum(this.state.time6)===true) && (chkEng(this.state.time6)===false) && (chkKor(this.state.time6) ===false) && (chkSpc(this.state.time6)===false))){
                Alert.alert('근로시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('근로시간(토요일)_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Start7==null)||!(this.state.Start77==null)||!(this.state.End7==null)||!(this.state.End77==null)||!(this.state.time7==null)){
            console.log('근로시간(일요일)')
            if(!((chkNum(this.state.Start7)===true) && (chkEng(this.state.Start7)===false) && (chkKor(this.state.Start7) ===false) && (chkSpc(this.state.Start7)===false))||
            !((chkNum(this.state.Start77)===true) && (chkEng(this.state.Start77)===false) && (chkKor(this.state.Start77) ===false) && (chkSpc(this.state.Start77)===false))||
            !((chkNum(this.state.End7)===true) && (chkEng(this.state.End7)===false) && (chkKor(this.state.End7) ===false) && (chkSpc(this.state.End7)===false))||
            !((chkNum(this.state.End77)===true) && (chkEng(this.state.End77)===false) && (chkKor(this.state.End77) ===false) && (chkSpc(this.state.End77)===false))||
            !((chkNum(this.state.time7)===true) && (chkEng(this.state.time7)===false) && (chkKor(this.state.time7) ===false) && (chkSpc(this.state.time7)===false))){
                Alert.alert('근로시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('근로시간(일요일)_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus==null)){
            if(!((chkNum(this.state.Bonus)===true) && (chkEng(this.state.Bonus)===false) && (chkKor(this.state.Bonus) ===false) && (chkSpc(this.state.Bonus)===false))){
                Alert.alert('상여금의 숫자가 제대로 입력되었는지 확인해주세요.')  
                flag=false
            }else{
                console.log('상여금_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus1==null)){
            if(!((chkNum(this.state.Bonus1)===true) && (chkEng(this.state.Bonus1)===false) && (chkKor(this.state.Bonus1) ===false) && (chkSpc(this.state.Bonus1)===false))){
                Alert.alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus2==null)){
            if(!((chkNum(this.state.Bonus2)===true) && (chkEng(this.state.Bonus2)===false) && (chkKor(this.state.Bonus2) ===false) && (chkSpc(this.state.Bonus2)===false))){
                Alert.alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus3==null)){
            if(!((chkNum(this.state.Bonus3)===true) && (chkEng(this.state.Bonus3)===false) && (chkKor(this.state.Bonus3) ===false) && (chkSpc(this.state.Bonus3)===false))){
                Alert.alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.Bonus4==null)){
            if(!((chkNum(this.state.Bonus4)===true) && (chkEng(this.state.Bonus4)===false) && (chkKor(this.state.Bonus4) ===false) && (chkSpc(this.state.Bonus4)===false))){
                Alert.alert('기타급여의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('기타급여_숫자 제대로 확인됨')
            }
        }

        if(!(this.state.AdditionalWageRate==null)){
            if(!((chkNum(this.state.AdditionalWageRate)===true) && (chkEng(this.state.AdditionalWageRate)===false) && (chkKor(this.state.AdditionalWageRate) ===false) && (chkSpc(this.state.AdditionalWageRate)===false))){
                Alert.alert('초가근로 가산임금률의 숫자가 제대로 입력되었는지 확인해주세요.') 
                flag=false
            }else{
                console.log('초가근로 가산임금률_숫자 제대로 확인됨')
            }
        }

        if(flag){ 
            Alert.alert('저장되었습니다.') 
            this.fetchHtml();
        }else{
            //에러 
        }
        
    }
  }


  initfetchHtml = async(bangCode) => {
    axios.post('http://13.124.141.28:3000/selectContractform2', {
        bang:bangCode,
        id: this.props.route.params.workername
    },
    {  
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
      .then(res => {
          console.log(res.data[0]);
          console.log('--------------')
          
          if(res.data[0]!=undefined){
            if(res.data[0].type==5){
                
                this.StatementScreen();
            }
                
            if(res.data[0].value1Index == 0){
                res.data[0].types1 = "없음"
            }
            else{
                res.data[0].types1 = "있음"
            }
            
            if(res.data[0].value2Index == 0){
                res.data[0].types2 = "없음"
            }
            else{
                res.data[0].types2 = "있음"
            }

            if(JSON.parse(res.data[0].types3)[0].value == 1){
                res.data[0].types3 = "근로자에게 직접 지급"
            }
            else{
                res.data[0].types3 = "근로자 명의 예금통장에 입금"
            }

            if(res.data[0].Bonus == null) res.data[0].Bonus = 0
            if(res.data[0].Bonus1 == null) res.data[0].Bonus1 = 0
            if(res.data[0].Bonus2 == null) res.data[0].Bonus2 = 0
            if(res.data[0].Bonus3 == null) res.data[0].Bonus3 = 0
            if(res.data[0].Bonus4 == null) res.data[0].Bonus4 = 0
            
                let t4 = [0,0,0,0,0];
                console.log('dddd')
                let n = JSON.parse(res.data[0].value4);
                for(let i=0 ; i<n.length ; i++){
                    t4[n[i]]=1;
                }
                console.log("whyyyyyyyyyyyyyyyyyyyyy?"+t4);
                res.data[0].types4 = t4;

                this.setState(res.data[0]);
                this.setState({tableData: [
                  [<Text style={styles.tableTextStyle}>{this.state.Start1==null||this.state.Start1=='0'?this.state.Start1='X':this.state.Start1}</Text>, 
                  <Text style={styles.tableTextStyle}>{this.state.End1==null||this.state.End1=='0'?this.state.End1='X':this.state.End1}</Text>, 
                  <Text style={styles.tableTextStyle}>{this.state.time1==null||this.state.time1=='0'?this.state.time1='X':this.state.time1}</Text>],
                  
                  [<Text style={styles.tableTextStyle}>{this.state.Start2==null||this.state.Start2=='0'?this.state.Start2='X':this.state.Start2}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.End2==null||this.state.End2=='0'?this.state.End2='X':this.state.End2}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.time2==null||this.state.time2=='0'?this.state.time2='X':this.state.time2}</Text>],

                  [<Text style={styles.tableTextStyle}>{this.state.Start3==null||this.state.Start3=='0'?this.state.Start3='X':this.state.Start3}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.End3==null||this.state.End3=='0'?this.state.End3='X':this.state.End3}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.time3==null||this.state.time3=='0'?this.state.time3='X':this.state.time3}</Text>],

                  [<Text style={styles.tableTextStyle}>{this.state.Start4==null||this.state.Start4=='0'?this.state.Start4='X':this.state.Start4}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.End4==null||this.state.End4=='0'?this.state.End4='X':this.state.End4}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.time4==null||this.state.time4=='0'?this.state.time4='X':this.state.time4}</Text>],

                  [<Text style={styles.tableTextStyle}>{this.state.Start5==null||this.state.Start5=='0'?this.state.Start5='X':this.state.Start5}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.End5==null||this.state.End5=='0'?this.state.End5='X':this.state.End5}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.time5==null||this.state.time5=='0'?this.state.time5='X':this.state.time5}</Text>],

                  [<Text style={styles.tableTextStyle}>{this.state.Start6==null||this.state.Start6=='0'?this.state.Start6='X':this.state.Start6}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.End6==null||this.state.End6=='0'?this.state.End6='X':this.state.End6}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.time6==null||this.state.time6=='0'?this.state.time6='X':this.state.time6}</Text>],

                  [<Text style={styles.tableTextStyle}>{this.state.Start7==null||this.state.Start7=='0'?this.state.Start7='X':this.state.Start7}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.End7==null||this.state.End7=='0'?this.state.End7='X':this.state.End7}</Text>, 
                    <Text style={styles.tableTextStyle}>{this.state.time7==null||this.state.time7=='0'?this.state.time7='X':this.state.time7}</Text>]
              ]})
            }
        })     
    }

fetchHtml = async(a) => {
    axios.post('http://13.124.141.28:3000/writeContractform2', {
        type: 4,
                id: this.state.id,
                bang: this.state.bang,
                AdditionalWageRate:this.state.AdditionalWageRate,
                BusinessAddress:this.state.BusinessAddress,
                BusinessName:this.state.BusinessName,
                BusinessOwner1:this.state.BusinessOwner1,
                BusinessPhone:this.state.BusinessPhone,
                ContractDay:this.state.ContractDay,
                ContractMonth:this.state.ContractMonth,
                ContractYear:this.state.ContractYear,
                Employer:this.state.Employer,
                Employee:this.state.Employee,
                End1:(this.state.End1!=undefined?this.state.End1+":"+this.state.End11:undefined)
                ,End2:(this.state.End2!=undefined?this.state.End2+":"+this.state.End22:undefined)
                ,End3:(this.state.End3!=undefined?this.state.End3+":"+this.state.End33:undefined)
                ,End4:(this.state.End4!=undefined?this.state.End4+":"+this.state.End44:undefined)
                ,End5:(this.state.End5!=undefined?this.state.End5+":"+this.state.End55:undefined)
                ,End6:(this.state.End6!=undefined?this.state.End6+":"+this.state.End66:undefined)
                ,End7:(this.state.Start7!=undefined?this.state.End7+":"+this.state.End77:undefined),
                EndDay:this.state.EndDay
                , EndMonth:this.state.EndMonth
                , EndYear:this.state.EndYear
                ,Salary:this.state.Salary
                ,SalaryDay:this.state.SalaryDay,
                Start1:(this.state.Start1!=undefined?this.state.Start1+":"+this.state.Start11:undefined)
                ,Start2:(this.state.Start2!=undefined?this.state.Start2+":"+this.state.Start22:undefined)
                ,Start3:(this.state.Start3!=undefined?this.state.Start3+":"+this.state.Start33:undefined)
                ,Start4:(this.state.Start4!=undefined?this.state.Start4+":"+this.state.Start44:undefined)
                ,Start5:(this.state.Start5!=undefined?this.state.Start5+":"+this.state.Start55:undefined)
                ,Start6:(this.state.Start6!=undefined?this.state.Start6+":"+this.state.Start66:undefined)
                ,Start7:(this.state.Start7!=undefined?this.state.Start7+":"+this.state.Start77:undefined),
                StartDay:this.state.StartDay
                ,StartMonth:this.state.StartMonth
                ,StartYear:this.state.StartYear
                ,
                WorkPlace:this.state.WorkPlace
                ,WorkReference:this.state.WorkReference,
                types1: JSON.stringify(this.state.types1),
                types2: JSON.stringify(this.state.types2),
                types3: JSON.stringify(this.state.types3),
                value1: this.state.value1,
                value1Index: this.state.value1Index,
                value2: this.state.value2,
                value2Index: this.state.value2Index,
                value3: this.state.value3,
                value3Index: this.state.value3Index,
                time1:this.state.time1
                ,time2:this.state.time2
                ,time3:this.state.time3
                ,time4:this.state.time4
                ,time5:this.state.time5
                ,time6:this.state.time6,
                Bonus:this.state.Bonus
                ,Bonus1:this.state.Bonus1
                ,Bonus2:this.state.Bonus2
                ,Bonus3:this.state.Bonus3
                ,Bonus4:this.state.Bonus4
                ,value4:JSON.stringify(this.state.value4)
    },
    {  headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
    })
      .then(res => {
        this.props.navigation.goBack();

        axios.post('http://13.124.141.28:3000/selectBusinessByName', {
            bname : this.state.bang
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then(res => {
              try {
                axios.post('http://13.124.141.28:3000/sendMessage', {
                  t: this.state.id,
                  message :"<"+this.state.bang+">사업주가 "+this.state.id+"님의 계약서를 작성했습니다. [문서함>계약서]를 확인해주세요.",
                  f: res.data[0].id,
                  r:0,
                  system:1,
                  type:3
                },
                {  headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'}
              }).then((res) => {
              })} catch (e) {
                console.error(e);
              }
            });   
      })     
    }


    StatementScreen = async() => {
        let bsign = ""
        let sign="";
        console.log("33333333 ");
        console.log(this.props.route.params.bid);

        let signOrStamp = '';
        await axios.post('http://13.124.141.28:3000/selectBusinessByName', {
            bname : this.state.bang
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then(res => {
                if(res.data[0].stamp ==1){
                    signOrStamp = `<img src="http://13.124.141.28:3000/${this.state.bang}.png" alt="도장" z-index="2" width="100" height="100"></img>`
                }
        });
        axios.post('http://13.124.141.28:3000/selectSign', {
            id:this.props.route.params.workername,
            id2:this.props.route.params.bid,
        },
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
      /*fetch('http://13.124.141.28:3000/selectSign', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //id : idid
        }),
      }).then(res => res.json())*/
      .then(async(res) => {
          sign = res.data[0].sign;
          bsign = res.data[1].sign;
          console.log(sign)
          if(signOrStamp ==''){
            signOrStamp = `<svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                <polyline points="${String(bsign)}"
                    style="fill:none;stroke:black;stroke-width:3" />
            </svg>`
          }
          const htmlContent = `
          <!DOCTYPE html>
          <html>
              <head>
                  <meta charset="UTF-8">
                  <title>근로계약서 단기/일용</title>
              </head>
              <style>
                  body{margin:30px 30px 30px 30px; line-height: 30px;}
                  span{font-weight: bold;  font-size:1.5em; position:relative; left:50%; margin-left: -160px;}
                  table{border-collapse:collapse; margin: 10px 30px 10px 10px;}
                  th{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                  td{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                  .text_underline {text-decoration: underline;}
                  .margin_left{margin-left:15px;}
                  .margin_left2{margin-left:65px;}
                  .text_underline_margin_left{text-decoration: underline;margin-left:50px;}
                  .contract_day{position:relative; left:50%; margin-left: -100px;}
              </style>
              <body>
                  <form>
                      <span>단기간근로자 표준근로계약서</span>
                      <hr><br>
                      <label class="text_underline">${this.state.Employer}</label>
                      <label>(이하 "사업주"라 함) 과(와)</label>
                      <label class="text_underline">${this.state.Employee}</label>
                      <label>(이하 "근로자"라 함) 은 다음과 같이 근로계약을 체결한다.</label><br><br>
              
                      <label>1. 근로계약기간 :</label> 
                      <label class="text_underline">${this.state.StartYear}</label>
                      <label>년</label>
                      <label class="text_underline">${this.state.StartMonth}</label>
                      <label>월</label>
                      <label class="text_underline">${this.state.StartDay}</label>
                      <label>일부터</label>
          
                      <label class="text_underline">${this.state.EndYear==null?'-':this.state.EndYear}</label>
                      <label>년</label>
                      <label class="text_underline">${this.state.EndMonth==null?'-':this.state.EndMonth}</label>
                      <label>월</label>
                      <label class="text_underline">${this.state.EndDay==null?'-':this.state.EndDay}</label>
                      <label>일까지</label><br>
                      
                      <label>2. 근 무 장 소 : </label>
                      <label>${this.state.WorkPlace}</label><br>
                      
                      
                      <label>3. 업무의 내용 : </label>
                      <label>${this.state.WorkReference}</label><br>
          
                      <label>4. 근로일 및 근로일별 근로시간</label> 
                      <table>
                          <th>    </th><th>시작시간</th><th>마치는시간</th><th>근로시간</th>
                          <tr><td>월요일</td><td>${this.state.Start1}</td><td>${this.state.End1}</td><td>${this.state.time1}</td></tr>
                          <tr><td>화요일</td><td>${this.state.Start2}</td><td>${this.state.End2}</td><td>${this.state.time2}</td></tr>
                          <tr><td>수요일</td><td>${this.state.Start3}</td><td>${this.state.End3}</td><td>${this.state.time3}</td></tr>
                          <tr><td>목요일</td><td>${this.state.Start4}</td><td>${this.state.End4}</td><td>${this.state.time4}</td></tr>
                          <tr><td>금요일</td><td>${this.state.Start5}</td><td>${this.state.End5}</td><td>${this.state.time5}</td></tr>
                          <tr><td>토요일</td><td>${this.state.Start6}</td><td>${this.state.End6}</td><td>${this.state.time6}</td></tr>
                          <tr><td>일요일</td><td>${this.state.Start7}</td><td>${this.state.End7}</td><td>${this.state.time7}</td></tr>
                      </table><br>
              
                      <label>5. 임 금</label><br>
                      <label class="margin_left">- 월(일, 시간)급 : </label>
                      <label class="text_underline">${this.state.Salary}</label>
                      <Text>원</Text><br>
          
                      <label class="margin_left">- 상여금 : </label>
                      <label for="bonusYes">${this.state.types1}</label>
                      <label class="text_underline">${this.state.Bonus}</label>
                      <label>원</label><br>
          
                      <label class="margin_left">- 기타급여(제수당 등) : </label>
                      <label for="bonus2Yes">${this.state.types2}</label><br>
                      <label class="text_underline_margin_left">${this.state.Bonus1}</label>
                      <label>원, </label>
                      <label class="text_underline_margin_left">${this.state.Bonus2}</label>
                      <label>원 </label>
                      <label class="text_underline_margin_left">${this.state.Bonus3}</label>
                      <label>원, </label>
                      <label class="text_underline_margin_left">${this.state.Bonus4}</label>
                      <label>원 </label><br>
          
                      <label class="margin_left">- 초과근로에 대한 가산임금률</label>
                      <label class="text_underline">${this.state.AdditionalWageRate}</label>
                      <label>%</label><br>
                      <label class="margin_left">- 임금지급일 : 매일</label>
                      <label class="text_underline">${this.state.SalaryDay}</label>
                      <label>일 (휴일의 경우에는 전일 지급)</label><br>
                      <label class="margin_left">- 지급방법 : </label>
                      <label for="wayOfPayment1">${this.state.types3}</label><br>
          
                      <label>6. 연차유급휴가</label><br>
                      <label class="margin_left"> - 통상근로자의 근로시간에 비례하여 연차유급휴가 부여함.</label><br>
          
                      <label>7. 사대보험 적용여부(해당란에 체크)</label> <br>
                      
                      <label class="margin_left">고용보험 ${this.state.types4[1]==1?'O':'X'}</label>
                      <label class="margin_left">산재보험 ${this.state.types4[2]==1?'O':'X'}</label>
                      <label class="margin_left">국민연금 ${this.state.types4[3]==1?'O':'X'}</label>
                      <label class="margin_left">건강보험 ${this.state.types4[4]==1?'O':'X'}</label><br>
      
                      <label>8. 근로계약서 교부</label> <br>
                      <label class="margin_left"> - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)</label><br>
          
                      <label>9. 기타</label><br>
                      <label class="margin_left"> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</label><br><br>
                      
                      <div class="contract_day">
                      <label>${this.state.ContractYear}</label>
                      <label>년</label>
                      <label>${this.state.ContractMonth}</label>
                      <label>월</label>
                      <label>${this.state.ContractDay}</label>
                      <label>일</label></div><br>
      
                      <label>(사업주)</label>
                      <label>사업체명 : </label>
                      <label>${this.state.BusinessName}</label>
                      <label class="margin_left2">(전 화 : </label>
                      <label>${this.state.BusinessPhone}</label>
                      <label>) </label><br>
                      <label class="margin_left2">주    소 : </label>
                      <label>${this.state.BusinessAddress}</label><br>
                      <label class="margin_left2">대 표 자 : </label>
                      <label>${this.state.BusinessOwner1}</label>
                      <label class="margin_left2">(서명)</label>${signOrStamp}<br><br><br>
      
                      <label>(근로자)</label>
                      <label>주 소 : </label>
                      <label>${this.state.EmployeeAddress}</label><br>
                      <label class="margin_left2">연 락 처 : </label>
                      <label>${this.state.EmployeePhone}</label><br>
                      <label class="margin_left2">성    명 : </label>
                      <label>${this.state.EmployeeName}</label><svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="${String(sign)}"
                      style="fill:none;stroke:black;stroke-width:3" />
                      </svg>
                      <label class="margin_left2">(서명)</label>
                  </form>
              </body>
          </html>`
      
    
              this.setState({htmlContent : htmlContent})
            });
          
        }

      createAndSavePDF = async (html) => {
        try {
          const { uri } = await Print.printToFileAsync({ html },true);
          Sharing.shareAsync(uri);  
        } catch (error) {
          console.error(error);
        }
      };
  render() {
    const state = this.state;

    return (
        <View style={styles.image}>
        <View  style={styles.container}>
            <Text style={styles.textTitle}> 근로계약서(단기/일용)</Text>
        {this.state.type==4?
        (
        <>
        <ScrollView>
        <Text style={styles.textTitleStyle11}>근로자가 확인하고 있습니다.</Text>
        <View style={styles.textArea}>
                <View style={styles.textAreaRow}>
                <Text style={styles.textinputName_1}>{this.state.Employer}</Text>
                <Text style={styles.textTitleStyle}>(이하 "사업주"라 함) 과(와)</Text>
                </View>
                <View style={styles.textAreaRow}>
                    <Text style={styles.textinputName_1}>{this.state.Employee}</Text>
                    <Text style={styles.textTitleStyle}>(이하 "근로자"라 함) 은</Text>
                </View>
                <Text style={styles.textTitleStyle_1}>다음과 같이 근로계약을 체결한다.</Text>
            </View>
        
            <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>1. 근로계약기간 :</Text> 
                <View style={styles.rowPeriod}>
                    <Text style={styles.textinputYearStyle}>{this.state.StartYear}</Text>
                    <Text style={styles.textStyle}>년</Text>
                    <Text style={styles.textinputDayStyle}>{this.state.StartMonth}</Text>
                    <Text style={styles.textStyle}>월</Text>
                    <Text style={styles.textinputDayStyle}>{this.state.StartDay}</Text>
                    <Text style={styles.textStyle}>일부터</Text>
    
                </View>
                <View style={styles.rowPeriod2}>
                    <Text style={styles.textinputYearStyle}>{this.state.EndYear}</Text>
                    <Text style={styles.textStyle}>년</Text>
                    <Text style={styles.textinputDayStyle}>{this.state.EndMonth}</Text>
                    <Text style={styles.textStyle}>월</Text>
                    <Text style={styles.textinputDayStyle}>{this.state.EndDay}</Text>
                    <Text style={styles.textStyle}>일까지</Text>
                </View>
            </View>
            
            <View style={styles.textArea}>
                <View style={styles.textAreaRow}>
                <Text style={styles.textTitleStyle}>2. 근무장소 : </Text>
                <Text style={styles.textinputStyle}>{this.state.WorkPlace}</Text>
                </View>
            </View>
            
            
            <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
              <Text style={styles.textTitleStyle}>3. 업무의 내용 : </Text>
              <Text style={styles.textinputStyle}>{this.state.WorkReference}</Text>
            </View>
            </View>

        <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>4. 근로일 및 근로일별 근로시간 :</Text> 
        <View style={styles.tableArea}>
        <Table borderStyle={{borderWidth: 1, borderColor:'white'}}>
            <Row data={state.tableHead} flexArr={[0.5, 1, 1, 1]} style={styles.head} textStyle={styles.tableTextStyle}/>
            <TableWrapper style={styles.wrapper}>
                <Col data={state.tableTitle} style={styles.title} heightArr={[hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%')  ]} textStyle={styles.tableTextStyle}/>
                <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.tableTextStyle}/>
            </TableWrapper>
        </Table>
        </View>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>5. 임금</Text> 
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-시급 : </Text>
                <Text style={styles.textinputName}>{this.state.Salary}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-상여금 : </Text>
                <Text style={styles.textinputName}>{this.state.types1}</Text>
                <Text style={styles.textStyle}>, </Text>
                <Text style={styles.textinputName}>{this.state.Bonus}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-기타급여(제수당 등) : </Text>
                <Text style={styles.textinputName}>{this.state.types2}</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textinputName}>{this.state.Bonus1}</Text>
                <Text style={styles.textStyle}>원, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName}>{this.state.Bonus2}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textinputName}>{this.state.Bonus3}</Text>
                <Text style={styles.textStyle}>원, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName}>{this.state.Bonus4}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
            
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-초과근로에 대한 가산임금률 : </Text>
                <Text style={styles.textinputDayStyle}>{this.state.AdditionalWageRate}</Text>
                <Text style={styles.textStyle}>%</Text>
            </View>
            <View>
                <View style={styles.rowPeriod}>
                    <Text style={styles.textStyle}>-임금지급일 : </Text>
                    <Text style={styles.textStyle}>매월</Text>
                    <Text style={styles.textinputDayStyle}>{this.state.SalaryDay}</Text>
                    <Text style={styles.textStyle}>일</Text>
                </View>
                <View style={{marginLeft:wp('30%')}}>
                    <Text style={styles.textStyle}>(휴일의 경우에는 전일 지급)</Text>
                </View>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-지급방법 : </Text>
                <Text style={styles.textStyle}>{this.state.types3}</Text>
            </View>
            </View>
        
        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>6. 연차유급휴가</Text> 
            <Text style={styles.textLineStyle}> - 통상근로자의 근로시간에 비례하여 연차유급휴가 부여함.</Text>
        </View>
        
        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>7. 사대보험 적용여부(해당란에 체크)</Text> 
            
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>고용보험:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[1]==1?'O':'X'}</Text>
                <Text style={styles.textStyle}>,</Text>
                <Text style={styles.textStyle}>산재보험:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[2]==1?'O':'X'}</Text>
                <Text style={styles.textStyle}>,</Text>
            </View> 
            <View style={styles.rowPeriod}>   
                <Text style={styles.textStyle}>국민연금:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[3]==1?'O':'X'}</Text>
                <Text style={styles.textStyle}>,</Text>
                <Text style={styles.textStyle}>건강보험:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[4]==1?'O':'X'}</Text>
            </View>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>8. 근로계약서 교부</Text> 
            <Text style={styles.textLineStyle}> - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>9. 기타</Text> 
            <Text style={styles.textLineStyle}> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</Text>
        </View>
        
        

        <View style={styles.rowPeriod3}> 
              <Text style={styles.textinputYearStyle1}>{this.state.ContractYear}</Text>
              <Text style={styles.textTitleStyle}>년</Text>
              <Text style={styles.textinputDayStyle1}>{this.state.ContractMonth}</Text>
              <Text style={styles.textTitleStyle}>월</Text>
              <Text style={styles.textinputDayStyle1}>{this.state.ContractDay}</Text>         
              <Text style={styles.textTitleStyle}>일</Text>       
            </View>
          
            <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>사업주</Text>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>사업체명 : </Text>
                <Text style={styles.textinputStyle}>{this.state.BusinessName}</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>주소 : </Text>
                <Text style={styles.textinputStyle}>{this.state.BusinessAddress}</Text>
            </View>        
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>전화번호 : </Text>
                <Text style={styles.textinputStyle}>{this.state.BusinessPhone}</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>대표자 : </Text>
                <Text style={styles.textinputStyle}>{this.state.BusinessOwner1}</Text>
            </View>
          </View>
    
          <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>근로자</Text>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>주소 : 근로자가 입력하는 칸입니다.</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>연락처 : 근로자가 입력하는 칸입니다.</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>성명 : 근로자가 입력하는 칸입니다.</Text>
            </View>
        </View>
      </ScrollView></>)
        :
        this.state.type==5?
        
        <>
        {console.log("들어오고있니..?")}
          {/* <WebView
              originWhitelist={['*']}
              source={{ html: this.state.htmlContent }}
              style={{ marginTop: 20 }}
          />
          <Button
            title="공유하기"
            color="#FF3232"
            onPress={()=>{this.createAndSavePDF(this.state.htmlContent)}}/> */}
            <View style={{ width:'100%', height:hp('70%'), }}>
                <WebView
                    originWhitelist={['*']}
                    automaticallyAdjustContentInsets={false}
                    source={{ html: this.state.htmlContent }}
                />
            </View>
            <View style={styles.buttonArea1}>
                <TouchableOpacity
                    style={styles.button1}
                    onPress={()=>{this.createAndSavePDF(this.state.htmlContent)}}>
                    <Image style={styles.excelBtn} source={require('../../img/excel.png')}></Image>
                </TouchableOpacity>
            </View>
          </>

        :
        
        <ScrollView>
        <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
            <TextInput
                value={this.state.Employer} 
                onChangeText={(Employer) => this.setState({Employer})}
                autoFocus={true}
                onSubmitEditing={() => { this.TextInput1.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업주이름'}
                style={styles.textinputName_2}/>
                <Text style={styles.textTitleStyle}>(이하 "사업주"라 함) 과(와)</Text>
            </View>
            <View style={styles.textAreaRow}>
            <TextInput
                value={this.state.Employee} 
                onChangeText={(Employee) => this.setState({Employee})}
                ref={(input) => { this.TextInput1 = input; }}
                onSubmitEditing={() => { this.TextInput2.focus(); }}
                blurOnSubmit={false}
                placeholder={'근로자이름'}
                style={styles.textinputName_2}/>
                <Text style={styles.textTitleStyle}>(이하 "근로자"라 함) 은</Text>
            </View>
                <Text style={styles.textTitleStyle_1}>다음과 같이 근로계약을 체결한다.</Text>
        </View>
        

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>1. 근로계약기간 :</Text> 
            <View style={styles.rowPeriod}>
            <TextInput
                value={this.state.StartYear} 
                onChangeText={(StartYear) => this.setState({StartYear})}
                ref={(input) => { this.TextInput2 = input; }}
                onSubmitEditing={() => { this.TextInput3.focus(); }}
                blurOnSubmit={false}
                placeholder={'2020'}
                keyboardType={"number-pad"}
                style={styles.textinputYearStyle2}/>
            <Text style={styles.textStyle}>년</Text>
            <TextInput
                value={this.state.StartMonth} 
                onChangeText={(StartMonth) => this.setState({StartMonth})}
                ref={(input) => { this.TextInput3 = input; }}
                onSubmitEditing={() => { this.TextInput4.focus(); }}
                blurOnSubmit={false}
                placeholder={'10'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle2}/>
            <Text style={styles.textStyle}>월</Text>
            <TextInput
                value={this.state.StartDay} 
                onChangeText={(StartDay) => this.setState({StartDay})}
                ref={(input) => { this.TextInput4 = input; }}
                onSubmitEditing={() => { this.TextInput5.focus(); }}
                blurOnSubmit={false}
                placeholder={'20'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle2}/>
            <Text style={styles.textStyle}>일부터</Text>
            </View>
            <View style={styles.rowPeriod2}>
            <TextInput
                value={this.state.EndYear} 
                onChangeText={(EndYear) => this.setState({EndYear})}
                ref={(input) => { this.TextInput5 = input; }}
                onSubmitEditing={() => { this.TextInput6.focus(); }}
                blurOnSubmit={false}
                placeholder={'2022'}
                keyboardType={"number-pad"}
                style={styles.textinputYearStyle2}/>
            <Text style={styles.textStyle}>년</Text>
            <TextInput
                value={this.state.EndMonth} 
                onChangeText={(EndMonth) => this.setState({EndMonth})}
                ref={(input) => { this.TextInput6 = input; }}
                onSubmitEditing={() => { this.TextInput7.focus(); }}
                blurOnSubmit={false}
                placeholder={'12'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle2}/>
            <Text style={styles.textStyle}>월</Text>
            <TextInput
                value={this.state.EndDay} 
                onChangeText={(EndDay) => this.setState({EndDay})}
                ref={(input) => { this.TextInput7 = input; }}
                onSubmitEditing={() => { this.TextInput8.focus(); }}
                blurOnSubmit={false}
                placeholder={'31'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle2}/>
            <Text style={styles.textStyle}>일까지</Text>
            </View>
        </View>


        <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
            <Text style={styles.textTitleStyle}>2. 근무장소 : </Text>
            <TextInput
                value={this.state. WorkPlace} 
                onChangeText={(WorkPlace) => this.setState({WorkPlace})}
                ref={(input) => { this.TextInput8 = input; }}
                onSubmitEditing={() => { this.TextInput9.focus(); }}
                blurOnSubmit={false}
                placeholder={'예) 사무실'}
                style={styles.textinputStyle1}/>
            </View>
        </View>
        
        
        <View style={styles.textArea}>
        <View style={styles.textAreaRow}>
          <Text style={styles.textTitleStyle}>3. 업무의 내용 : </Text>
          <TextInput
            value={this.state. WorkReference} 
            onChangeText={(WorkReference) => this.setState({WorkReference})}
            ref={(input) => { this.TextInput9 = input; }}
            placeholder={'예) 어플개발'}
            style={styles.textinputStyle1}/>
        </View>
        </View>

        <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>4. 근로일 및 근로일별 근로시간 : </Text>
        <Text style={styles.textTitleStyle}>   (근무가 없는 날은 칸을 비워주세요)</Text> 
        <View style={styles.tableArea}>
        <Table borderStyle={{borderWidth: 1, borderColor:'white'}}>
            <Row data={state.tableHead} flexArr={[0.5, 1, 1, 1]} style={styles.head} textStyle={styles.tableTextStyle}/>
            <TableWrapper style={styles.wrapper}>
                <Col data={state.tableTitle} style={styles.title} heightArr={[hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%')  ]} textStyle={styles.tableTextStyle}/>
                <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.tableTextStyle}/>
            </TableWrapper>
        </Table>
        </View>
        </View>
            

        <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>5. 임금</Text> 
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-시급 : </Text>
            <TextInput
                value={this.state.Salary} 
                onChangeText={(Salary) => this.setState({Salary})}
                onSubmitEditing={() => { this.TextInput20.focus(); }}
                blurOnSubmit={false}
                placeholder={'8,720'}
                keyboardType={"number-pad"}
                style={styles.textinputName1}/>
            <Text style={styles.textStyle}>원</Text>
        </View>
        <View style={{marginTop:hp('0.5%')}}>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-상여금 : </Text>
            <RadioForm
                ref="radioForm"
                radio_props={this.state.types1=="있음"||this.state.types1=="없음"?[{"label":"없음   ","value":0},{"label":"있음","value":0}]:this.state.types1}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#67C8BA'}
                selectedButtonColor={'#67C8BA'}
                labelStyle={{fontSize: wp('4.2%'), color: '#040525', marginRight:wp('2%'),fontFamily:"NanumSquare"}}
                animation={true}
                onPress={(value, index) => {
                    this.setState({
                        value1:value,
                        value1Index:index
                    })
                }}
            />
            </View>
            <View style={{marginLeft:wp('30%'), flexDirection:'row'}}>
            <TextInput
                value={this.state.Bonus} 
                onChangeText={(Bonus) => this.setState({Bonus})}
                ref={(input) => { this.TextInput20 = input; }}
                onSubmitEditing={() => { this.TextInput21.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName1}/>
            <Text style={styles.textStyle}>원</Text>
        </View>
        </View>
        <View style={{marginTop:hp('1%')}}>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-기타급여(제수당 등) : </Text>
            <RadioForm
                ref="radioForm"
                radio_props={this.state.types2=="있음"||this.state.types2=="없음"?[{"label":"없음   ","value":0},{"label":"있음","value":0}]:this.state.types2}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#67C8BA'}
                selectedButtonColor={'#67C8BA'}
                labelStyle={{fontSize: wp('4.2%'), color: '#040525', marginRight:wp('2%'),fontFamily:"NanumSquare"}}
                animation={true}
                onPress={(value, index) => {
                    this.setState({
                        value2:value,
                        value2Index:index
                    })
                }}
            />
        </View>
        <View style={styles.rowPeriod2}>
            <TextInput
                value={this.state.Bonus1} 
                onChangeText={(Bonus1) => this.setState({Bonus1})}
                ref={(input) => { this.TextInput21 = input; }}
                onSubmitEditing={() => { this.TextInput22.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName1}/>
            <Text style={styles.textStyle}>원, </Text>
            <Text style={{marginLeft:wp('5%')}}></Text>
            <TextInput
                value={this.state.Bonus2} 
                onChangeText={(Bonus2) => this.setState({Bonus2})}
                ref={(input) => { this.TextInput22 = input; }}
                onSubmitEditing={() => { this.TextInput23.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName1}/>
            <Text style={styles.textStyle}>원, </Text>
        </View>
                <View style={styles.rowPeriod2}>
            <TextInput
                value={this.state.Bonus3} 
                onChangeText={(Bonus3) => this.setState({Bonus3})}
                ref={(input) => { this.TextInput23 = input; }}
                onSubmitEditing={() => { this.TextInput24.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName1}/>
            <Text style={styles.textStyle}>원, </Text>
            <Text style={{marginLeft:wp('5%')}}></Text>
            <TextInput
                value={this.state.Bonus4} 
                onChangeText={(Bonus4) => this.setState({Bonus4})}
                ref={(input) => { this.TextInput24 = input; }}
                onSubmitEditing={() => { this.TextInput25.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName1}/>
            <Text style={styles.textStyle}>원, </Text>
        </View>
        </View>

        <View style={{marginTop:hp('1%')}}>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-초과근로에 대한 가산임금률 : </Text>
            <TextInput
                value={this.state.AdditionalWageRate} 
                onChangeText={(AdditionalWageRate) => this.setState({AdditionalWageRate})}
                ref={(input) => { this.TextInput25 = input; }}
                onSubmitEditing={() => { this.TextInput26.focus(); }}
                blurOnSubmit={false}
                placeholder={'10'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle2}/>
            <Text style={styles.textStyle}>%</Text>
        </View>
        </View>
        
        <View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-임금지급일 : 매월</Text>
            <TextInput
                value={this.state.SalaryDay} 
                onChangeText={(SalaryDay) => this.setState({SalaryDay})}
                ref={(input) => { this.TextInput26 = input; }}
                placeholder={'10'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle2}/>
            <Text style={styles.textStyle}>일</Text>
            </View>
            <View style={{marginLeft:wp('30%')}}>
                <Text style={styles.textStyle}>(휴일의 경우에는 전일 지급)</Text>
            </View>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-지급방법 : </Text>
            <RadioForm
                ref="radioForm"
                radio_props={this.state.types3=="근로자에게 직접지급   "||this.state.types3=="근로자 명의 예금통장에 입금"?[{"label":"근로자에게 직접지급   ","value":0},{"label":"근로자 명의 예금통장에 입금","value":1}]:this.state.types3}
                initial={0}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'#67C8BA'}
                selectedButtonColor={'#67C8BA'}
                labelStyle={{fontSize: wp('4.2%'), color: '#040525', marginRight:wp('2%'),fontFamily:"NanumSquare"}}
                animation={true}
                onPress={(value, index) => {
                    this.setState({
                        value3:value,
                        value3Index:index
                    })
                }}
            />
        </View>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>6. 연차유급휴가</Text> 
            <Text style={styles.textLineStyle}> - 통상근로자의 근로시간에 비례하여 연차유급휴가 부여함.</Text>
        </View>
        
        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>7. 사대보험 적용여부(해당란에 체크)</Text> 
            <CheckboxGroup
              callback={(selected) => { 
                this.setState({
                  value4:selected
              }) }}
              iconColor={"#67C8BA"}
              iconSize={wp('8.5%')}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={[
                {
                  label: "고용보험 ", 
                  value: 1, 
                  },
                {
                  label: "산재보험 ",
                  value: 2
                },
                {
                  label: "국민연금 ",
                  value: 3
                },
                {
                  label: "건강보험 ",
                  value: 4
                },
              ]}
              labelStyle={{
                color: '#333',
                fontFamily:"NanumSquare",
                fontSize:wp('3.6%'),
                marginRight:wp('2%'),
                marginLeft:wp('0.5%'),
                marginTop:hp('1.5%')
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"row"}
            />
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>8. 근로계약서 교부</Text> 
            <Text style={styles.textLineStyle}> - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>9. 기타</Text> 
            <Text style={styles.textLineStyle}> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</Text>
        </View>
        
        

        <View style={styles.rowPeriod3}> 
          <TextInput
            value={this.state.ContractYear} 
            onChangeText={(ContractYear) => this.setState({ContractYear})}
            onSubmitEditing={() => { this.TextInput30.focus(); }}
            blurOnSubmit={false}
            placeholder={'2020'}
            keyboardType={"number-pad"}
            style={styles.textinputYearStyle2}/>
          <Text style={styles.textTitleStyle}>년</Text>
          <TextInput
            value={this.state.ContractMonth} 
            onChangeText={(ContractMonth) => this.setState({ContractMonth})}
            ref={(input) => { this.TextInput30 = input; }}
            onSubmitEditing={() => { this.TextInput31.focus(); }}
            blurOnSubmit={false}
            placeholder={'11'}
            keyboardType={"number-pad"}
            style={styles.textinputDayStyle2}/>
          <Text style={styles.textTitleStyle}>월</Text>  
          <TextInput
            value={this.state.ContractDay} 
            onChangeText={(ContractDay) => this.setState({ContractDay})}
            ref={(input) => { this.TextInput31 = input; }}
            onSubmitEditing={() => { this.TextInput32.focus(); }}
            blurOnSubmit={false}
            placeholder={'20'}
            keyboardType={"number-pad"}
            style={styles.textinputDayStyle2}/>
          <Text style={styles.textTitleStyle}>일</Text>      
        </View>
      
      
        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>사업주</Text>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>사업체명 : </Text>
            <TextInput
                value={this.state.BusinessName} 
                onChangeText={(BusinessName) => this.setState({BusinessName})}
                ref={(input) => { this.TextInput32 = input; }}
                onSubmitEditing={() => { this.TextInput33.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업체 이름'}
                style={styles.textinputStyle1}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>주소 : </Text>
            <TextInput
                value={this.state.BusinessAddress} 
                onChangeText={(BusinessAddress) => this.setState({BusinessAddress})}
                ref={(input) => { this.TextInput33 = input; }}
                onSubmitEditing={() => { this.TextInput34.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업체 주소'}
                style={styles.textinputStyle1}/>
        </View>        
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>전화번호 : </Text>
            <TextInput
                value={this.state.BusinessPhone} 
                onChangeText={(BusinessPhone) => this.setState({BusinessPhone})}
                ref={(input) => { this.TextInput34 = input; }}
                onSubmitEditing={() => { this.TextInput35.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업체 전화번호'}
                style={styles.textinputStyle1}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>대표자 : </Text>
            <TextInput
                value={this.state.BusinessOwner1} 
                onChangeText={(BusinessOwner1) => this.setState({BusinessOwner1})}
                ref={(input) => { this.TextInput35 = input; }}
                onSubmitEditing={() => { }}
                blurOnSubmit={false}
                placeholder={'사업체 대표'}
                style={styles.textinputStyle1}/>
        </View>
      </View>

      <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>근로자</Text>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>주소 : 근로자가 입력하는 칸입니다.</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>연락처 : 근로자가 입력하는 칸입니다.</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>성명 : 근로자가 입력하는 칸입니다.</Text>
            </View>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
                this.setState({tableData:[]})
                this.handleSubmit()
            }}>
              <Text style={styles.buttonTitle}>저장하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:hp('5%')}}><Text></Text></View>
        
      </ScrollView>
        }
      </View>
      </View>
    )
  }
}

export default ContractformBScreen;

const styles = StyleSheet.create({
    container: { 
        padding:wp('3%'), 
        width: "100%", height: "100%",    
        backgroundColor: 'white',
        borderTopRightRadius:wp('13%'),
        borderTopLeftRadius:wp('13%'),
    },
    image:{ 
        alignItems: 'center', justifyContent:"center",
        width: "100%", height: "100%", 
        backgroundColor:'#67C8BA'
    },
    textTitle:{
        fontSize:wp('5.55%'),
        fontFamily:"NanumSquareB",
        marginTop:hp('2%'),
        marginBottom:hp('2%'),
        textAlign:"center"
    },
    textArea:{
        marginTop:hp('1.3%'),
        marginBottom:hp('1.5%'),
        marginLeft:wp('1.5%'),
    },
    textTitleStyle11:{
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginTop:wp('1%'),
        marginBottom:wp('1.5%'),
        borderColor:"#67C8BA",
        borderWidth:wp('0.5%'),
        padding:wp('2%'),
        color:"#67C8BA",
        textAlign:'center'
    },
    textTitleStyle_1:{
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginTop:hp('1%'),
        marginBottom:hp('1%'),
        textAlign:'center'
    },
    textArea:{
        marginTop:hp('2%'),
        marginBottom:hp('1.5%'),
        marginLeft:wp('1.5%'),
    },
    textAreaRow:{ 
        flexDirection:'row'
    },
    textStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginTop:hp('1%'),
        marginBottom:wp('1.5%'),
        marginRight:wp('2%'),
    },  
    textTitleStyle:{
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginTop:hp('1%'),
        marginBottom:wp('1.5%'),
        marginRight:wp('2%'),
    },
    textLineStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginTop:wp('1.7%'),
        marginBottom:wp('1.5%'),
        lineHeight:wp('6.5%'),
        marginLeft:wp('5%')
    },
    textinputYearStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        marginTop:hp('0.8%'),
        width:wp('11%')
    },
    textinputYearStyle1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        width:wp('11%')
    },
    textinputYearStyle2:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        width:wp('11%'),
        marginRight:wp('1%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    textinputDayStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('2%'),
        marginTop:hp('0.8%'),
        width:wp('7%'),
    },
    textinputDayStyle1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('2%'),
        width:wp('7%'),
    },
    textinputDayStyle2:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('2%'),
        width:wp('7%'),
        marginRight:wp('1%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    textinputName:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        marginTop:hp('0.8%'),
        width:wp('18%')
    },
    textinputName1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        width:wp('16%'),
        marginRight:wp('2%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    textinputName_1:{
        width:wp('25%'),
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginBottom:wp('1.5%'),
        marginTop:hp('0.8%'),
        marginRight:wp('2%'),
    },
    textinputName_2:{
        width:wp('25%'),
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginBottom:wp('1.5%'),
        marginRight:wp('2%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    textinputStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        marginTop:hp('0.8%'),
        width:wp('40%'),
    },
    textinputStyle1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        width:wp('40%'),
        marginRight:wp('1%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    rowPeriod:{
        flexDirection:'row',
        marginLeft:wp('5%')
    },
    rowPeriod2:{
        flexDirection:'row',
        marginLeft:wp('15%')
    },
    rowPeriod3:{
        flexDirection:'row',
        justifyContent:"center", alignItems:"center",
        marginTop:hp('3%'), marginBottom:hp('3%')
    },
    buttonArea1: {
        position:"absolute",
        bottom:hp('1%'), left:0, right:0,
        width: wp('100%'), height: hp('10%'),
        justifyContent:'center', alignItems:'center',
        marginTop:hp('2%'), 
    },
    button1: {
        width:wp('90%'), height: hp('8%'),
        marginTop:hp('4%'), 
        justifyContent:'center', alignItems:'center'
    },
    buttonArea: {
        alignItems:"center",
        width: '100%', height: hp('6%'),
        marginBottom:hp('2%'),
    },
    button: {
        backgroundColor: "#67C8BA",
        width:wp('90%'), height: hp('5.5%'),
        justifyContent: 'center', alignItems:"center",
        borderRadius:wp('6%'),
        marginTop:hp('2%'),
        marginBottom:hp('2%'),
    },
    excelBtn:{
      width:wp('85%'), height:hp('5.6%')
    },
    buttonTitle: {
        color: 'white',
        fontFamily:"NanumSquare",
        fontSize:wp('4.8%'),
    },
    tableArea:{
        width:wp('90%'), 
        marginBottom:hp('2%')
    },
    wrapper: {
        flexDirection: 'row'
    },
    title: { 
        flex: 0.5, 
        backgroundColor: "#67C8BA" ,
        borderBottomLeftRadius:wp('4%')
    },
    row: {  height:  hp('5.5%') },
    head: {  
        height: hp('6%'),  
        backgroundColor: "#67C8BA" , 
        borderTopRightRadius: wp('4%'),
        borderTopLeftRadius: wp('4%')
    },
    colTextStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
    },
    tableTextStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        textAlign:"center",
    },
    tableTextStyle1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        textAlign:"center",
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    tabledatatextStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginRight:wp('1%'),
        marginLeft:wp('1%'),
        marginTop:hp('1%')
    },
});