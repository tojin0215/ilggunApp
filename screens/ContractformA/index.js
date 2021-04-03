const axios = require('axios');
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ImageBackground, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckboxGroup from 'react-native-checkbox-group'
import { AsyncStorage } from 'react-native';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from 'react-native-webview'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ContractformAScreen extends React.Component{
  state={
  }
  constructor(props) {
    
    super(props);
    this.state = {
        type:1,
      types1: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types2: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types3: [{label: '근로자에게 직접지급   ', value: 0}, {label: '근로자 명의 예금통장에 입금', value: 1}], 
      value1: 0, value1Index:0, value2: 0, value2Index:0, value3: 0, value3Index:0,value4: 0,
      Employee: '', id:this.props.route.params.workername, bang:'', types4:[0,0,0,0,0],

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
        ||this.state.WorkPlace==null||this.state.WorkReference==null||this.state.StartTimeHour==null
        ||this.state.StartTimeHMin==null||this.state.EndTimeHour==null||this.state.EndTimeHMin==null
        ||this.state.WorkingDays==null||this.state.Holiday==null||this.state.Salary==null
        ||this.state.SalaryDay==null||this.state.ContractYear==null||this.state.ContractMonth==null
        ||this.state.ContractDay==null||this.state.BusinessName==null||this.state.BusinessAddress==null
        ||this.state.BusinessOwner1==null||/*this.state.EmployeeAddress==null||this.state.EmployeePhone==null
        ||this.state.EmployeeName==null||*/this.state.BusinessPhone==null){
        Alert.alert('빈칸을 채워주세요.') 
    } else if(!((chkNum(this.state.StartYear)===true) && (chkEng(this.state.StartYear)===false) && (chkKor(this.state.StartYear) ===false) && (chkSpc(this.state.StartYear)===false))||
        !((chkNum(this.state.StartMonth)===true) && (chkEng(this.state.StartMonth)===false) && (chkKor(this.state.StartMonth) ===false) && (chkSpc(this.state.StartMonth)===false))||
        !((chkNum(this.state.StartDay)===true) && (chkEng(this.state.StartDay)===false) && (chkKor(this.state.StartDay) ===false) && (chkSpc(this.state.StartDay)===false))||
        !((chkNum(this.state.StartTimeHour)===true) && (chkEng(this.state.StartTimeHour)===false) && (chkKor(this.state.StartTimeHour) ===false) && (chkSpc(this.state.StartTimeHour)===false))||
        !((chkNum(this.state.StartTimeHMin)===true) && (chkEng(this.state.StartTimeHMin)===false) && (chkKor(this.state.StartTimeHMin) ===false) && (chkSpc(this.state.StartTimeHMin)===false))||
        !((chkNum(this.state.EndTimeHour)===true) && (chkEng(this.state.EndTimeHour)===false) && (chkKor(this.state.EndTimeHour) ===false) && (chkSpc(this.state.EndTimeHour)===false))||
        !((chkNum(this.state.EndTimeHMin)===true) && (chkEng(this.state.EndTimeHMin)===false) && (chkKor(this.state.EndTimeHMin) ===false) && (chkSpc(this.state.EndTimeHMin)===false))||
        !((chkNum(this.state.WorkingDays)===true) && (chkEng(this.state.WorkingDays)===false) && (chkKor(this.state.WorkingDays) ===false) && (chkSpc(this.state.WorkingDays)===false))||
        !((chkNum(this.state.Holiday)===true) && (chkEng(this.state.Holiday)===false) && (chkKor(this.state.Holiday) ===false) && (chkSpc(this.state.Holiday)===false))||
        !((chkNum(this.state.Salary)===true) && (chkEng(this.state.Salary)===false) && (chkKor(this.state.Salary) ===false) && (chkSpc(this.state.Salary)===false))||
        !((chkNum(this.state.SalaryDay)===true) && (chkEng(this.state.SalaryDay)===false) && (chkKor(this.state.SalaryDay) ===false) && (chkSpc(this.state.SalaryDay)===false))||
        !((chkNum(this.state.ContractYear)===true) && (chkEng(this.state.ContractYear)===false) && (chkKor(this.state.ContractYear) ===false) && (chkSpc(this.state.ContractYear)===false))||
        !((chkNum(this.state.ContractMonth)===true) && (chkEng(this.state.ContractMonth)===false) && (chkKor(this.state.ContractMonth) ===false) && (chkSpc(this.state.ContractMonth)===false))||
        !((chkNum(this.state.ContractDay)===true) && (chkEng(this.state.ContractDay)===false) && (chkKor(this.state.ContractDay) ===false) && (chkSpc(this.state.ContractDay)===false))
        ){
        Alert.alert('계약기간, 근로시간, 임금, 계약날짜의 숫자가 제대로 입력되었는지 확인해주세요.') 
    } else{
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

        if(!(this.state.BreakTimeStartHour==null)||!(this.state.BreakTimeStartMin==null)||!(this.state.BreakTimeEndHour==null)||!(this.state.BreakTimeEndMin==null)){
            console.log('근로기간 확인')
            if(!((chkNum(this.state.BreakTimeStartHour)===true) && (chkEng(this.state.BreakTimeStartHour)===false) && (chkKor(this.state.BreakTimeStartHour) ===false) && (chkSpc(this.state.BreakTimeStartHour)===false))||
            !((chkNum(this.state.BreakTimeStartMin)===true) && (chkEng(this.state.BreakTimeStartMin)===false) && (chkKor(this.state.BreakTimeStartMin) ===false) && (chkSpc(this.state.BreakTimeStartMin)===false))||
            !((chkNum(this.state.BreakTimeEndHour)===true) && (chkEng(this.state.BreakTimeEndHour)===false) && (chkKor(this.state.BreakTimeEndHour) ===false) && (chkSpc(this.state.BreakTimeEndHour)===false))||
            !((chkNum(this.state.BreakTimeEndMin)===true) && (chkEng(this.state.BreakTimeEndMin)===false) && (chkKor(this.state.BreakTimeEndMin) ===false) && (chkSpc(this.state.BreakTimeEndMin)===false))){
                Alert.alert('휴게시간의 숫자가 제대로 입력되었는지 확인해주세요.') 
                console.log('휴게시간_숫자 제대로 입력안됨')
                flag=false
            }else{
                console.log('휴게시간_숫자 제대로 확인됨')
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
            this.state.type=2;
            console.log(this.state);
            this.fetchHtml();
            Alert.alert('저장되었습니다.')   
        }else{
            //에러 
        }
        
    }
  }
  initfetchHtml = async(bangCode) => {
    
    axios.post('https://www.toojin.cf:3000/selectContractform', {
        bang:bangCode,
        id: this.props.route.params.workername
    },
    {  headers:{
        'Content-Type': 'application/json',
      'Accept': 'application/json'}
    })
    /*await fetch('https://www.toojin.cf:3000/selectContractform', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bang:bangCode,
          id: this.props.route.params.workername
        }),
      }).then(res => res.json())*/
      .then(res => {
          //res.types1 = JSON.parse(res.types1);
          //res.types2 = JSON.parse(res.types2);
          //res.types3 = JSON.parse(res.types3);
          console.log(res.data[0]);
          console.log('--------------')
          
          if(res.data[0]!=undefined){
               if(res.data[0].type==3){
                   
                this.StatementScreen();
          }
          console.log(JSON.parse(res.data[0].types1)[0]);
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
            console.log(res.data[0].types4);
            this.setState(res.data[0]);
            }
      })     
    }
  fetchHtml = async(a) => {
    axios.post('https://www.toojin.cf:3000/writeContractform', this.state,
    {  headers:{
        'Content-Type': 'application/json',
      'Accept': 'application/json'}
    })
    /*await fetch('https://www.toojin.cf:3000/writeContractform', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            this.state
            /*{
            types1: this.state.types1,
            types2: this.state.types2,
            types3: this.state.types3,
            value1: this.state.value1,
            value1Index: this.state.value1Index,
            value2: this.state.value2,
            value2Index: this.state.value2Index,
            value3: this.state.value3,
            value3Index: this.state.value3Index,
            Employer: this.state.Employer,
            Employee: this.state.Employee,
            StartYear: this.state.StartYear,
            StartMonth: this.state.StartMonth,
            StartDay: this.state.StartDay,
            EndYear: this.state.EndYear,
            EndMonth: this.state.EndMonth,
            EndDay: this.state.EndDay,
            WorkReference: this.state.WorkReference,
            StartTimeHour: this.state.StartTimeHour,
            StartTimeHMin: this.state.StartTimeHMin,
            EndTimeHMin: this.state.EndTimeHMin,
            BreakTimeStartMin: this.state.BreakTimeStartMin,
            BreakTimeEndHour: this.state.BreakTimeEndHour,
            BreakTimeEndMin: this.state.BreakTimeEndMin,
            Salary: this.state.Salary,
            Bonus: this.state.Bonus,
            Bonus2: this.state.Bonus2,
            Bonus3: this.state.Bonus3,
            Bonus4: this.state.Bonus4,
            SalaryDay: this.state.SalaryDay,
            WorkPlace: this.state.WorkPlace,
            Holiday: this.state.Holiday,
            EndTimeHour: this.state.EndTimeHour,
            WorkingDays: this.state.WorkingDays,
            ContractYear: this.state.ContractYear,
            ContractMonth: this.state.ContractMonth,
            ContractDay: this.state.ContractDay,
            BusinessName: this.state.BusinessName,
            BusinessAddress: this.state.BusinessAddress,
            BusinessPhone: this.state.BusinessPhone,
            BusinessOwner1: this.state.BusinessOwner1,
            EmployeeAddress: this.state.EmployeeAddress,
            EmployeePhone: this.state.EmployeePhone,
            EmployeeName: this.state.EmployeeName,
            value3Index: this.state.value3Index,
            Employer: this.state.Employer,
            Employee: this.state.Employee,
            StartYear: this.state.StartYear,
            StartMonth: this.state.StartMonth,
            StartDay: this.state.StartDay,
            EndYear: this.state.EndYear,
            EndMonth: this.state.EndMonth,
            EndDay: this.state.EndDay,
            WorkReference: this.state.WorkReference,
            StartTimeHour: this.state.StartTimeHour,
            StartTimeHMin: this.state.StartTimeHMin,
            EndTimeHMin: this.state.EndTimeHMin,
            BreakTimeStartMin: this.state.BreakTimeStartMin,
            BreakTimeEndHour: this.state.BreakTimeEndHour,
            BreakTimeEndMin: this.state.BreakTimeEndMin,
            Salary: this.state.Salary,
            Bonus: this.state.Bonus,
            Bonus2: this.state.Bonus2,
            Bonus3: this.state.Bonus3,
            Bonus4: this.state.Bonus4,
            SalaryDay: this.state.SalaryDay,
            WorkPlace: this.state.WorkPlace,
            Holiday: this.state.Holiday,
            EndTimeHour: this.state.EndTimeHour,
            WorkingDays: this.state.WorkingDays,
            ContractYear: this.state.ContractYear,
            ContractMonth: this.state.ContractMonth,
            ContractDay: this.state.ContractDay,
            BusinessName: this.state.BusinessName,
            BusinessAddress: this.state.BusinessAddress,
            BusinessPhone: this.state.BusinessPhone,
            BusinessOwner1: this.state.BusinessOwner1,
            EmployeeAddress: this.state.EmployeeAddress,
            EmployeePhone: this.state.EmployeePhone,
            EmployeeName: this.state.EmployeeName}//
        ),
      }).then(res => res.json())*/
      .then(res => {
        this.props.navigation.goBack();
        axios.post('https://www.toojin.cf:3000/selectBusinessByName', {
            bname : this.state.bang
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then(res => {
              try {
                axios.post('https://www.toojin.cf:3000/sendMessage', {
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

        //this.initfetchHtml(this.state.bangCode);
      })
        
    }

    StatementScreen = async() => {
        let sign="";
        let bsign="";
        console.log("33333333 ");
        console.log(this.props.route.params.bid);
        let signOrStamp = '';
        await axios.post('https://www.toojin.cf:3000/selectBusinessByName', {
            bname : this.state.bang
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then(res => {
                if(res.data[0].stamp ==1){
                    signOrStamp = `<img src="https://www.toojin.cf:3000/${this.state.bang}.png" alt="도장" z-index="2" width="100" height="100"></img>`
                }
        });
      axios.post('https://www.toojin.cf:3000/selectSign', {
          id:this.props.route.params.workername,
          id2: this.props.route.params.bid
      },
      {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
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
              <title>근로계약서 정규/계약</title>
          </head>
          <style>
              body{margin:30px 30px 30px 30px; line-height: 30px;}
              span{font-weight: bold;  font-size:1.5em; position:relative; left:50%; margin-left: -100px;}
              .text_underline {text-decoration: underline;}
              .margin_left{margin-left:15px;}
              .margin_left2{margin-left:65px;}
              .text_underline_margin_left{text-decoration: underline;margin-left:50px;}
              .contract_day{position:relative; left:50%; margin-left: -100px;}
          </style>
          <body>
              
            <span>표준근로계약서</span>
            <form>
            
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
    
                <label>4. 소정근로시간 :</label> 
                <label class="text_underline">${this.state.StartTimeHour}</label>
                <label>시</label>
                <label class="text_underline">${this.state.StartTimeHMin}</label>
                <label>분부터 </label>
                <label class="text_underline">${this.state.EndTimeHour}</label>
                <label>시</label>
                <label class="text_underline">${this.state.EndTimeHMin}</label>
                <label>분까지</label>
                <label>(휴게시간 : </label>
                <label class="text_underline">${this.state.BreakTimeStartHour}</label>
                <label>시</label>
                <label class="text_underline">${this.state.BreakTimeStartMin}</label>
                <label>분~</label>
                <label class="text_underline">${this.state.BreakTimeEndHour}</label>
                <label>시</label>
                <label class="text_underline">${this.state.BreakTimeEndMin}</label>
                <label>분)</label><br>
    
                <label>5. 근무일/휴일 : 매주</label> 
                <label class="text_underline">${this.state.WorkingDays}</label>
                <label>일(또는 매일단위)근무, 주휴일 매주</label>
                <label class="text_underline">${this.state.Holiday}</label>
                <label>일</label><br>
        
                <label>6. 임 금</label><br>
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
                <label>원, </label>
                <label class="text_underline_margin_left">${this.state.Bonus3}</label>
                <label>원, </label>
                <label class="text_underline_margin_left">${this.state.Bonus4}</label>
                <label>원 </label><br>
                <label class="margin_left">- 임금지급일 : 매월</label>
                <label class="text_underline">${this.state.SalaryDay}</label>
                <label>일 (휴일의 경우에는 전일 지급)</label><br>
                <label class="margin_left">- 지급방법 : </label>
                <label for="wayOfPayment1">${this.state.types3}</label><br>
    
                <label>7. 연차유급휴가</label><br>
                <label class="margin_left"> - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함.</label><br>
    
                <label>8. 사대보험 적용여부(해당란에 체크)</label> <br>
                
                <label class="margin_left">고용보험 ${this.state.types4[1]==1?'O':'X'}</label>
                <label class="margin_left">산재보험 ${this.state.types4[2]==1?'O':'X'}</label>
                <label class="margin_left">국민연금 ${this.state.types4[3]==1?'O':'X'}</label>
                <label class="margin_left">건강보험 ${this.state.types4[4]==1?'O':'X'}</label><br>
      
                <label>9. 근로계약서 교부</label> <br>
                <label class="margin_left"> - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)</label><br>
    
                <label>10. 기타</label><br>
                <label class="margin_left"> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</label><br><br>
                
                <div class="contract_day">
                <label>${this.state.ContractYear}</label>
                <label>년</label>
                <label>${this.state.ContractMonth}</label>
                <label>월</label>
                <label>${this.state.ContractDay}</label>
                <label>일</label></div><br>
              
                <label>(사업주)</label>
                <label>사업체명 : </lab
                <label>${this.state.BusinessName}</label>
                <label class="margin_left2">(전 화 : </label>
                <label>${this.state.BusinessPhone}</label>
                <label>) </label><br>
                <label class="margin_left2">주    소 : </label>
                <label>${this.state.BusinessAddress}</label><br>
                <label class="margin_left2">대 표 자 : </label>
                <label>${this.state.BusinessOwner1}</label>
                
                
                <label class="margin_left2">(서명)${signOrStamp}</label>
                
                <br><br><br><br>
                
    
                <label>(근로자)</label>
                <label>주 소 : </label>
                <label>${this.state.EmployeeAddress}</label><br>
                <label class="margin_left2">연 락 처 : </label>
                <label>${this.state.EmployeePhone}</label><br>
                <label class="margin_left2">성    명 : </label>
                <label>${this.state.EmployeeName}  </label><svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px; " xmlns="http://www.w3.org/2000/svg">
                <polyline points="${String(sign)}"
                style="fill:none;stroke:black;stroke-width:3" />
                </svg>
                <label class="margin_left2">(서명)</label>
            </form>
    
                  
              </body>
              </html>
              `
    
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
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.image}>
        <View style={styles.container}>
        <View style={{marginTop:hp('3%')}}>
            <Text style={styles.textTitle}> 근로계약서(정규/계약)</Text>
        </View>
        {
            console.log(">>>>>>>>>>>>>>>>"+this.state.type)
        }
        {
            
            this.state.type==2?
            <ScrollView>
                <Text style={styles.textTitleStyle11}>근로자가 확인하고 있습니다.</Text>
            <View style={styles.textArea}>
                <View style={styles.textAreaRow}>
                <Text style={styles.textinputName}>{this.state.Employer}</Text>
                <Text style={styles.textTitleStyle}>(이하 "사업주"라 함) 과(와)</Text>
                </View>
                <View style={styles.textAreaRow}>
                    <Text style={styles.textinputName}>{this.state.Employee}</Text>
                    <Text style={styles.textTitleStyle}>(이하 "근로자"라 함) 은</Text>
                </View>
                <Text style={styles.textTitleStyle_1}>다음과 같이 근로계약을 체결한다.</Text>
            </View>
    
    
            <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>1. 근로계약기간 :</Text> 
                <View style={styles.rowPeriod}>
                    <Text style={styles.textinputYearStyle1}>{this.state.StartYear}</Text>
                    <Text style={styles.textStyle}>년</Text>
                    <Text style={styles.textinputDayStyle1}>{this.state.StartMonth}</Text>
                    <Text style={styles.textStyle}>월</Text>
                    <Text style={styles.textinputDayStyle1}>{this.state.StartDay}</Text>
                    <Text style={styles.textStyle}>일부터</Text>
                </View>
                <View style={styles.rowPeriod2}>
                    <Text style={styles.textinputYearStyle1}>{this.state.EndYear}</Text>
                    <Text style={styles.textStyle}>년</Text>
                    <Text style={styles.textinputDayStyle1}>{this.state.EndMonth}</Text>
                    <Text style={styles.textStyle}>월</Text>
                    <Text style={styles.textinputDayStyle1}>{this.state.EndDay}</Text>
                    <Text style={styles.textStyle}>일까지</Text>
                </View>
            </View>
            
            <View style={styles.textArea}>
                <View style={styles.textAreaRow}>
                <Text style={styles.textTitleStyle}>2. 근무장소 : </Text>
                <Text style={styles.textStyle}>{this.state.WorkPlace}</Text>
                </View>
            </View>
            
            
            <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
              <Text style={styles.textTitleStyle}>3. 업무의 내용 : </Text>
              <Text style={styles.textStyle}>{this.state.WorkReference}</Text>
            </View>
            </View>
    
    
            <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>4. 소정근로시간 :</Text>
            <View style={styles.rowPeriod}> 
                <Text style={styles.textinputDayStyle1}>{this.state.StartTimeHour}</Text> 
                <Text style={styles.textStyle}>시</Text>
                <Text style={styles.textinputDayStyle1}>{this.state.StartTimeHMin}</Text>
                <Text style={styles.textStyle}>분 ~ </Text>
                <Text style={styles.textinputDayStyle1}>{this.state.EndTimeHour}</Text>
                <Text style={styles.textStyle}>시</Text>
                <Text style={styles.textinputDayStyle1}>{this.state.EndTimeHMin}</Text>
                <Text style={styles.textStyle}>분 </Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>휴게시간</Text>
                <Text style={styles.textinputDayStyle1}>{this.state.BreakTimeStartHour}</Text>
                <Text style={styles.textStyle}>시</Text>
                <Text style={styles.textinputDayStyle1}>{this.state.BreakTimeStartMin}</Text>
                <Text style={styles.textStyle}>분 ~ </Text>
                <Text style={styles.textinputDayStyle1}>{this.state.BreakTimeEndHour}</Text>
                <Text style={styles.textStyle}>시</Text>
                <Text style={styles.textinputDayStyle1}>{this.state.BreakTimeEndMin}</Text>
                <Text style={styles.textStyle}>분 </Text>
            </View>
            </View>
    
    
            <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>5. 근무일/휴일 : </Text> 
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>매주 </Text>
                <Text style={styles.textinputDayStyle1}>{this.state.WorkingDays}</Text>
                <Text style={styles.textStyle}>일 근무,</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>주휴일 매주</Text>
                <Text style={styles.textinputDayStyle1}>{this.state.Holiday}</Text>
                <Text style={styles.textStyle}>일 </Text>
            </View>
            </View>
    
    
            <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>6. 임금</Text> 
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-월급 : </Text>
                <Text style={styles.textinputName1}>{this.state.Salary}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-상여금 : </Text>
                <Text style={styles.textinputName1}>{this.state.types1}</Text>
                <Text style={styles.textStyle}>, </Text>
                <Text style={styles.textinputName1}>{this.state.Bonus}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-기타급여(제수당 등) : </Text>
                <Text style={styles.textinputName1}>{this.state.types2}</Text>
            </View>
            <View style={styles.rowPeriod2}>
                <Text style={styles.textinputName1}>{this.state.Bonus1}</Text>
                <Text style={styles.textStyle}>원, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName1}>{this.state.Bonus2}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
            <View style={styles.rowPeriod2}>
                <Text style={styles.textinputName1}>{this.state.Bonus3}</Text>
                <Text style={styles.textStyle}>원, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName1}>{this.state.Bonus4}</Text>
                <Text style={styles.textStyle}>원</Text>
            </View>
             <View>   
                <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-임금지급일 : 매월</Text>
                <Text style={styles.textinputDayStyle1}>{this.state.SalaryDay}</Text>
                <Text style={styles.textStyle}>일</Text>
                </View>
                <View style={{marginLeft:wp('20%')}}>
                    <Text style={styles.textStyle}>(휴일의 경우에는 전일 지급)</Text>
                </View>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-지급방법 : </Text>
                <Text style={styles.textStyle}>{this.state.types3}</Text>
            </View>
            </View>
    
            
            <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>7. 연차유급휴가</Text> 
                <Text style={styles.textLineStyle}> - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함</Text>
            </View>
    
            <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>8. 사대보험 적용여부(해당란에 체크)</Text> 
                <View style={styles.rowPeriod}>
                    <Text style={styles.textStyle}>고용보험:</Text><Text style={styles.textinputDayStyle1}>{this.state.types4[1]==1?'O':'X'}</Text>
                    <Text style={styles.textStyle}>, </Text>
                    <Text style={styles.textStyle}>산재보험:</Text><Text style={styles.textinputDayStyle1}>{this.state.types4[2]==1?'O':'X'}</Text>
                    <Text style={styles.textStyle}>, </Text>
                </View>
                <View style={styles.rowPeriod}>
                    <Text style={styles.textStyle}>국민연금:</Text><Text style={styles.textinputDayStyle1}>{this.state.types4[3]==1?'O':'X'}</Text>
                    <Text style={styles.textStyle}>, </Text>
                    <Text style={styles.textStyle}>건강보험:</Text><Text style={styles.textinputDayStyle1}>{this.state.types4[4]==1?'O':'X'}</Text>
                </View>
            </View>

            <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>9. 근로계약서 교부</Text> 
                <Text style={styles.textLineStyle}> - 사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)</Text>
            </View>
    
            <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>10. 기타</Text> 
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
                    <Text style={styles.textinputStyle2}>{this.state.BusinessName}</Text>
                </View>
                <View style={styles.rowPeriod}>
                    <Text style={styles.textStyle}>주소 : </Text>
                    <Text style={styles.textinputStyle2}>{this.state.BusinessAddress}</Text>
                </View>        
                <View style={styles.rowPeriod}>
                    <Text style={styles.textStyle}>전화번호 : </Text>
                    <Text style={styles.textinputStyle2}>{this.state.BusinessPhone}</Text>
                </View>
                <View style={styles.rowPeriod}>
                    <Text style={styles.textStyle}>대표자 : </Text>
                    <Text style={styles.textinputStyle2}>{this.state.BusinessOwner1}</Text>
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
            <View style={{marginBottom:hp('5%')}}><Text></Text></View>
        </View>
    
          </ScrollView>
          :
          this.state.type==3?
          <>
          
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
        <ScrollView style={{flex: 1}}>
            <TouchableOpacity>
        <View style={styles.textArea}>

            <View style={styles.textAreaRow}>
            <TextInput
                value={this.state.Employer} 
                onChangeText={(Employer) => this.setState({Employer})}
                autoFocus={true}
                onSubmitEditing={() => { this.TextInput1.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업주이름'}
                style={styles.textinputName1_1}/>
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
                style={styles.textinputName1_1}/>
            <Text style={styles.textTitleStyle}>(이하 "근로자"라 함) 은</Text>
            </View>
            <View style={{marginLeft:wp('3%'),}}>
                <Text style={styles.textTitleStyle_1}>다음과 같이 근로계약을 체결한다.</Text>
            </View>
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
                style={styles.textinputYearStyle}/>
            <Text style={styles.textStyle}>년</Text>
            <TextInput
                value={this.state.StartMonth} 
                onChangeText={(StartMonth) => this.setState({StartMonth})}
                ref={(input) => { this.TextInput3 = input; }}
                onSubmitEditing={() => { this.TextInput4.focus(); }}
                blurOnSubmit={false}
                placeholder={'10'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>월</Text>
            <TextInput
                value={this.state.StartDay} 
                onChangeText={(StartDay) => this.setState({StartDay})}
                ref={(input) => { this.TextInput4 = input; }}
                onSubmitEditing={() => { this.TextInput5.focus(); }}
                blurOnSubmit={false}
                placeholder={'20'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
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
                style={styles.textinputYearStyle}/>
            <Text style={styles.textStyle}>년</Text>
            <TextInput
                value={this.state.EndMonth} 
                onChangeText={(EndMonth) => this.setState({EndMonth})}
                ref={(input) => { this.TextInput6 = input; }}
                onSubmitEditing={() => { this.TextInput7.focus(); }}
                blurOnSubmit={false}
                placeholder={'12'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>월</Text>
            <TextInput
                value={this.state.EndDay} 
                onChangeText={(EndDay) => this.setState({EndDay})}
                ref={(input) => { this.TextInput7 = input; }}
                onSubmitEditing={() => { this.TextInput8.focus(); }}
                blurOnSubmit={false}
                placeholder={'31'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>일까지</Text>
            </View>
        </View>


        <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
            <Text style={styles.textTitleStyle}>2. 근무장소 : </Text>
            <TextInput
                value={this.state.WorkPlace} 
                onChangeText={(WorkPlace) => this.setState({WorkPlace})}
                ref={(input) => { this.TextInput8 = input; }}
                onSubmitEditing={() => { this.TextInput9.focus(); }}
                blurOnSubmit={false}
                placeholder={'예) 사무실'}
                style={styles.textinputStyle}/>
            </View>
        </View>
        
        
        <View style={styles.textArea}>
        <View style={styles.textAreaRow}>
          <Text style={styles.textTitleStyle}>3. 업무의 내용 : </Text>
          <TextInput
            value={this.state.WorkReference} 
            onChangeText={(WorkReference) => this.setState({WorkReference})}
            ref={(input) => { this.TextInput9 = input; }}
            onSubmitEditing={() => { this.TextInput10.focus(); }}
            blurOnSubmit={false}
            placeholder={'예) 어플개발'}
            style={styles.textinputStyle}/>
        </View>
        </View>


        <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>4. 소정근로시간 :</Text> 
        <View style={styles.rowPeriod}> 
            <TextInput
                value={this.state.StartTimeHour} 
                onChangeText={(StartTimeHour) => this.setState({StartTimeHour})}
                ref={(input) => { this.TextInput10 = input; }}
                onSubmitEditing={() => { this.TextInput11.focus(); }}
                blurOnSubmit={false}
                placeholder={'9'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>시</Text>
            <TextInput
                value={this.state.StartTimeHMin} 
                onChangeText={(StartTimeHMin) => this.setState({StartTimeHMin})}
                ref={(input) => { this.TextInput11 = input; }}
                onSubmitEditing={() => { this.TextInput12.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
                <Text style={styles.textStyle}>분 ~ </Text>
            <TextInput
                value={this.state.EndTimeHour} 
                onChangeText={(EndTimeHour) => this.setState({EndTimeHour})}
                ref={(input) => { this.TextInput12 = input; }}
                onSubmitEditing={() => { this.TextInput13.focus(); }}
                blurOnSubmit={false}
                placeholder={'18'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
                <Text style={styles.textStyle}>시</Text>
            <TextInput
                value={this.state.EndTimeHMin} 
                onChangeText={(EndTimeHMin) => this.setState({EndTimeHMin})}
                ref={(input) => { this.TextInput13 = input; }}
                onSubmitEditing={() => { this.TextInput14.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>분 </Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>휴게시간 : </Text>
            <TextInput
                value={this.state.BreakTimeStartHour} 
                onChangeText={(BreakTimeStartHour) => this.setState({BreakTimeStartHour})}
                ref={(input) => { this.TextInput14 = input; }}
                onSubmitEditing={() => { this.TextInput15.focus(); }}
                blurOnSubmit={false}
                placeholder={'12'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>시</Text>
            <TextInput
                value={this.state.BreakTimeStartMin} 
                onChangeText={(BreakTimeStartMin) => this.setState({BreakTimeStartMin})}
                ref={(input) => { this.TextInput15 = input; }}
                onSubmitEditing={() => { this.TextInput16.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>분 ~ </Text>
            <TextInput
                value={this.state.BreakTimeEndHour} 
                onChangeText={(BreakTimeEndHour) => this.setState({BreakTimeEndHour})}
                ref={(input) => { this.TextInput16 = input; }}
                onSubmitEditing={() => { this.TextInput17.focus(); }}
                blurOnSubmit={false}
                placeholder={'13'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
                <Text style={styles.textStyle}>시</Text>
            <TextInput
                value={this.state.BreakTimeEndMin} 
                onChangeText={(BreakTimeEndMin) => this.setState({BreakTimeEndMin})}
                ref={(input) => { this.TextInput17 = input; }}
                onSubmitEditing={() => { this.TextInput18.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>분 </Text>
        </View>
        </View>


        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>5. 근무일/휴일 : </Text> 
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>매주</Text>
            <TextInput
                value={this.state.WorkingDays} 
                onChangeText={(WorkingDays) => this.setState({WorkingDays})}
                ref={(input) => { this.TextInput18 = input; }}
                onSubmitEditing={() => { this.TextInput19.focus(); }}
                blurOnSubmit={false}
                placeholder={'5'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
            <Text style={styles.textStyle}>일 근무</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>주휴일 매주</Text>
            <TextInput
                value={this.state.Holiday} 
                onChangeText={(Holiday) => this.setState({Holiday})}
                ref={(input) => { this.TextInput19 = input; }}
                onSubmitEditing={() => { this.TextInput20.focus(); }}
                blurOnSubmit={false}
                placeholder={'2'}
                keyboardType={"number-pad"}
                style={styles.textinputDayStyle}/>
                <Text style={styles.textStyle}>일 </Text>
            </View>
        </View>


        <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>6. 임금</Text> 
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-월급 : </Text>
            <TextInput
                value={this.state.Salary} 
                onChangeText={(Salary) => this.setState({Salary})}
                ref={(input) => { this.TextInput20 = input; }}
                onSubmitEditing={() => { this.TextInput21.focus(); }}
                blurOnSubmit={false}
                placeholder={'2000000'}
                keyboardType={"number-pad"}
                style={styles.textinputName2}/>
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
                ref={(input) => { this.TextInput21 = input; }}
                onSubmitEditing={() => { this.TextInput22.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName2}/>
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
          </View>
        <View style={styles.rowPeriod2}>
            <TextInput
                value={this.state.Bonus1} 
                onChangeText={(Bonus1) => this.setState({Bonus1})}
                ref={(input) => { this.TextInput22 = input; }}
                onSubmitEditing={() => { this.TextInput23.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName2}/>
            <Text style={styles.textStyle}>원, </Text>
            <Text style={{marginLeft:wp('5%')}}></Text>
            <TextInput
                value={this.state.Bonus2} 
                onChangeText={(Bonus2) => this.setState({Bonus2})}
                ref={(input) => { this.TextInput23 = input; }}
                onSubmitEditing={() => { this.TextInput24.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName2}/>
            <Text style={styles.textStyle}>원</Text>
        </View>
        <View style={styles.rowPeriod2}>
            <TextInput
                value={this.state.Bonus3} 
                onChangeText={(Bonus3) => this.setState({Bonus3})}
                ref={(input) => { this.TextInput24 = input; }}
                onSubmitEditing={() => { this.TextInput25.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName2}/>
            <Text style={styles.textStyle}>원, </Text>
            <Text style={{marginLeft:wp('5%')}}></Text>
            <TextInput
                value={this.state.Bonus4} 
                onChangeText={(Bonus4) => this.setState({Bonus4})}
                ref={(input) => { this.TextInput25 = input; }}
                onSubmitEditing={() => { this.TextInput26.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                keyboardType={"number-pad"}
                style={styles.textinputName2}/>
            <Text style={styles.textStyle}>원</Text>
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
                    style={styles.textinputDayStyle}/>
                <Text style={styles.textStyle}>일</Text>
            </View>
            <View style={{marginLeft:wp('30%')}}>
                <Text style={styles.textStyle}>(휴일의 경우에는 전일 지급)</Text>
            </View>
        </View>

        <View style={{marginTop:hp('0.5%')}}>
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
        </View>

         <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>7. 연차유급휴가</Text> 
            <Text style={styles.textLineStyle}> - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함</Text>
        </View>
        
        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>8. 사대보험 적용여부(해당란에 체크)</Text> 
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
            <Text style={styles.textTitleStyle}>9. 근로계약서 교부</Text> 
            <Text style={styles.textLineStyle}> - 사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>10. 기타</Text> 
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
            style={styles.textinputYearStyle}/>
          <Text style={styles.textTitleStyle}>년</Text>
          <TextInput
            value={this.state.ContractMonth} 
            onChangeText={(ContractMonth) => this.setState({ContractMonth})}
            ref={(input) => { this.TextInput30 = input; }}
            onSubmitEditing={() => { this.TextInput31.focus(); }}
            blurOnSubmit={false}
            placeholder={'11'}
            keyboardType={"number-pad"}
            style={styles.textinputDayStyle}/>
          <Text style={styles.textTitleStyle}>월</Text>
          <TextInput
            value={this.state.ContractDay} 
            onChangeText={(ContractDay) => this.setState({ContractDay})}
            ref={(input) => { this.TextInput31 = input; }}
            onSubmitEditing={() => { this.TextInput32.focus(); }}
            blurOnSubmit={false}
            placeholder={'20'}
            keyboardType={"number-pad"}
            style={styles.textinputDayStyle}/>
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
                style={styles.textinputStyle}/>
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
                style={styles.textinputStyle}/>
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
                style={styles.textinputStyle}/>
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
                style={styles.textinputStyle}/>
        </View>
      </View>

     
      <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>근로자</Text>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>주소 : 사용자가 입력하는 칸입니다.</Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>연락처 : 사용자가 입력하는 칸입니다.</Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>성명 : 사용자가 입력하는 칸입니다.</Text>
        </View>
      </View>

     
      <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
                
                this.handleSubmit()    
            }}>
        <Text style={styles.buttonTitle}>저장하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:hp('5%')}}><Text></Text></View>
        </TouchableOpacity>
      </ScrollView>
    }
      </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ContractformAScreen;

const styles = StyleSheet.create({
    container: { 
        padding:wp('3%'), 
        width: "100%", height: "100%",
        backgroundColor: 'white',
        borderTopRightRadius:wp('13%'),
        borderTopLeftRadius:wp('13%'),
    },
    image:{ 
        alignItems: 'center',
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
    textTitleStyle:{
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginTop:hp('1%'),
        marginBottom:wp('1.5%'),
        marginRight:wp('2%'),
    },
    textTitleStyle_1:{
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginTop:hp('1%'),
        marginBottom:hp('1%'),
        textAlign:'center'
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
        textAlign:"center",
        width:wp('13%'),
        marginRight:wp('1%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    textinputDayStyle:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('2%'),
        width:wp('6%'),
        textAlign:"center",
        marginRight:wp('1%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    textinputYearStyle1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        marginTop:wp('1.7%'),
        width:wp('11%')
      },
      textinputDayStyle1:{
          fontSize:wp('4.2%'),
          marginTop:wp('1.7%'),
          fontFamily:"NanumSquare",
          marginLeft:wp('2%'),
          width:wp('7%'),
      },
    textinputName:{
        width:wp('25%'),
        fontSize:wp('4.8%'),
        fontFamily:"NanumSquareB",
        marginTop:wp('1%'),
        marginBottom:wp('1.5%'),
    },
    textinputName1_1:{
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
        width:wp('40%'),
        marginRight:wp('1%'),
        borderBottomColor:'#D3D6E2',
        borderBottomWidth:wp('0.5%')
    },
    textinputStyle1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        width:wp('25%'),
    },
    textinputStyle2:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        marginTop:hp('0.9%'),
        width:wp('60%'),
    },
    textinputName1:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        marginTop:wp('1.7%'),
        width:wp('18%'),
        textAlign:"center"
    },
    textinputName2:{
        fontSize:wp('4.2%'),
        fontFamily:"NanumSquare",
        marginLeft:wp('1.5%'),
        textAlign:"center",
        width:wp('22%'),
        marginRight:wp('2%'),
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
    excelBtn:{
      width:wp('85%'), height:hp('5.6%')
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
    buttonTitle: {
            color: 'white',
            fontFamily:"NanumSquare",
            fontSize:wp('4.8%'),
    },
});