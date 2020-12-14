const axios = require('axios');
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ImageBackground} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckboxGroup from 'react-native-checkbox-group'
import { AsyncStorage } from 'react-native';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from 'react-native-webview'

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
      Employee: this.props.route.params.workername, id:this.props.route.params.workername, bang:'', types4:[0,0,0,0,0]
    };
    
    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bang: bangCode});
        this.initfetchHtml(bangCode);
      })
  }

  handleSubmit(){
    if(this.state.Employer == null||this.state.Employee ==null
        ||this.state.StartYear==null||this.state.StartMonth==null||this.state.StartDay==null
        ||this.state.EndYear==null||this.state.EndMonth==null||this.state.EndDay==null
        ||this.state.WorkPlace==null||this.state.WorkReference==null||this.state.StartTimeHour==null
        ||this.state.StartTimeHMin==null||this.state.EndTimeHour==null||this.state.EndTimeHMin==null
        ||this.state.WorkingDays==null||this.state.Holiday==null||this.state.Salary==null
        ||this.state.SalaryDay==null||this.state.ContractYear==null||this.state.ContractMonth==null
        ||this.state.ContractDay==null||this.state.BusinessName==null||this.state.BusinessAddress==null
        ||this.state.BusinessOwner1==null||this.state.BusinessPhone==null){
        Alert.alert('빈칸을 채워주세요.') 
    } else{
        console.log(this.state);
        this.fetchHtml();
        Alert.alert('저장되었습니다.')    
    }
  }
  initfetchHtml = async(bangCode) => {
    
    axios.post('https://www.kwonsoryeong.tk:3000/selectContractform', {
        bang:bangCode,
        id: this.props.route.params.workername
    },
    {  headers:{
        'Content-Type': 'application/json',
      'Accept': 'application/json'}
    })
    /*await fetch('https://www.kwonsoryeong.tk:3000/selectContractform', {
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
            if(JSON.parse(res.data[0].types1)[0].value == 1){
                res.data[0].types1 = "없음"
            }
            else{
                res.data[0].types1 = "있음"
            }
            
            if(JSON.parse(res.data[0].types2)[0].value == 1){
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
    axios.post('https://www.kwonsoryeong.tk:3000/writeContractform', this.state,
    {  headers:{
        'Content-Type': 'application/json',
      'Accept': 'application/json'}
    })
    /*await fetch('https://www.kwonsoryeong.tk:3000/writeContractform', {
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
        //this.initfetchHtml(this.state.bangCode);
      })     
    }

    StatementScreen = async() => {
        let sign="";
      axios.post('https://www.kwonsoryeong.tk:3000/selectSign', {
          id:this.props.route.params.workername
      },
      {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
      /*fetch('https://www.kwonsoryeong.tk:3000/selectSign', {
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
          console.log(sign)
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
              <svg viewBox = "0 0 400 400" style="left: 230px; top:1570px; height:300px; width: 300px; font-size: 1.8em; position: absolute;" xmlns="http://www.w3.org/2000/svg">
              <polyline points="${String(sign)}"
              style="fill:none;stroke:black;stroke-width:3" />
              </svg>
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
    
                <label class="text_underline">${this.state.EndYear}</label>
                <label>년</label>
                <label class="text_underline">${this.state.EndMonth}</label>
                <label>월</label>
                <label class="text_underline">${this.state.EndDay}</label>
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
                <input type="radio" id="bonusYes" name="bonus" value="bonusYes">
                <label for="bonusYes">${this.state.types1}</label>
                <label class="text_underline">${this.state.Bonus}</label>
                <label>원</label>
                <input type="radio" id="bonusNo" name="bonus" value="bonusNo"  class="margin_left">
                <label for="bonusNo">없음</label><br>
    
                <label class="margin_left">- 기타급여(제수당 등) : </label>
                <label for="bonus2Yes">${this.state.types2}</label>
                <label class="text_underline_margin_left">${this.state.Bonus1}</label>
                <label>원, </label>
                <label class="text_underline_margin_left">${this.state.Bonus2}</label>
                <label>원 </label><br>
                <label class="text_underline_margin_left">${this.state.Bonus3}</label>
                <label>원, </label>
                <label class="text_underline_margin_left">${this.state.Bonus4}</label>
                <label>원 </label><br>
                <label class="margin_left">- 임금지급일 : 매월(매주 또는 매일)</label>
                <label class="text_underline">10</label>
                <label>일 (휴일의 경우에는 전일 지급)</label><br>
                <label class="margin_left">- 지급방법 : </label>
                <input type="radio" id="wayOfPayment1" name="wayOfPayment" value="wayOfPayment1">
                <label for="wayOfPayment1">근로자에게 직접지급</label>
                <input type="radio" id="wayOfPayment2" name="wayOfPayment" value="wayOfPayment2" class="margin_left">
                <label for="wayOfPayment2">근로자 명의 예금통장에 입금</label><br><br>
    
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
                <label>사업체명 : </label>
                <label>${this.state.BusinessName}</label>
                <label class="margin_left2">(전 화 : </label>
                <label>${this.state.BusinessPhone}</label>
                <label>) </label><br>
                <label class="margin_left2">주    소 : </label>
                <label>${this.state.BusinessAddress}</label><br>
                <label class="margin_left2">대 표 자 : </label>
                <label>${this.state.BusinessOwner1}</label>
                <label class="margin_left2">(서명)</label><br><br>
    
                <label>(근로자)</label>
                <label>주 소 : </label>
                <label>${this.state.EmployeeAddress}</label><br>
                <label class="margin_left2">연 락 처 : </label>
                <label>${this.state.EmployeePhone}</label><br>
                <label class="margin_left2">성    명 : </label>
                <label>${this.state.EmployeeName}</label>
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
        
            <View style={styles.container}>
        <Text style={styles.head}> 근로계약서_정규/계약</Text>
        {
            console.log(">>>>>>>>>>>>>>>>"+this.state.type)
        }
        {
            
            this.state.type==2?
            <ScrollView>
                <Text>근로자가 확인하고 있습니다.</Text>
            <View style={styles.marginBottom1}>
                <View style={styles.rowView}>
                <Text style={styles.textinput}>{this.state.Employer}</Text>
                <Text>(이하 "사업주"라 함) 과(와)</Text>
                </View>
                <View style={styles.rowView}>
                <Text style={styles.textinput}>{this.state.Employee}</Text>
                <Text>(이하 "근로자"라 함) 은 다음과 같이 근로계약을 체결한다.</Text>
                </View>
            </View>
    
            <View style={styles.marginBottom2}>
                <Text style={styles.marginText}>1. 근로계약기간 :</Text> 
                <View style={styles.rowView}>
                <Text style={styles.textinput1}>{this.state.StartYear}</Text>
                <Text>년</Text>
                <Text style={styles.textinput2}>{this.state.StartMonth}</Text>
                <Text>월</Text>
                <Text style={styles.textinput2}>{this.state.StartDay}</Text>
                <Text>일부터</Text>
    
                <Text style={styles.textinput1}>{this.state.EndYear}</Text>
                <Text>년</Text>
                <Text style={styles.textinput2}>{this.state.EndMonth}</Text>
                <Text>월</Text>
                <Text style={styles.textinput2}>{this.state.EndDay}</Text>
                <Text>일까지</Text>
                </View>
            </View>
            
            <View style={styles.marginBottom2}>
                <View style={styles.rowView}>
                <Text style={styles.marginText}>2. 근무장소 : </Text>
                <Text style={styles.textinput}>{this.state.WorkPlace}</Text>
                </View>
            </View>
            
            
            <View style={styles.marginBottom2}>
            <View style={styles.rowView}>
              <Text style={styles.marginText}>3. 업무의 내용 : </Text>
              <Text style={styles.textinput}>{this.state.WorkReference}</Text>
            </View>
            </View>
    
    
            <View style={styles.marginBottom2}>
            <View style={styles.rowView}>
            <Text style={styles.marginText}>4. 소정근로시간 :</Text> 
                <Text style={styles.textinput2}>{this.state.StartTimeHour}</Text> 
                <Text>시</Text>
                <Text style={styles.textinput2}>{this.state.StartTimeHMin}</Text>
                <Text>분 ~ </Text>
                <Text style={styles.textinput2}>{this.state.EndTimeHour}</Text>
                <Text>시</Text>
                <Text style={styles.textinput2}>{this.state.EndTimeHMin}</Text>
                <Text>분 </Text>
            </View>
            <View style={styles.rowView3}>
                <Text>휴게시간</Text>
                <Text style={styles.textinput2}>{this.state.BreakTimeStartHour}</Text>
                <Text>시</Text>
                <Text style={styles.textinput2}>{this.state.BreakTimeStartMin}</Text>
                <Text>분 ~ </Text>
                <Text style={styles.textinput2}>{this.state.BreakTimeEndHour}</Text>
                <Text>시</Text>
                <Text style={styles.textinput2}>{this.state.BreakTimeEndMin}</Text>
                <Text>분 </Text>
            </View>
            </View>
    
    
            <View style={styles.marginBottom2}>
            <View style={styles.rowView}>
                <Text style={styles.marginText}>5. 근무일/휴일 : </Text> 
                <Text>매주 </Text>
                <Text style={styles.textinput2}>{this.state.WorkingDays}</Text>
                <Text>일(또는 매일단위)근무, 주휴일 매주</Text>
                <Text style={styles.textinput2}>{this.state.Holiday}</Text>
                <Text>일 </Text>
            </View>
            </View>
    
    
            <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>6. 임금</Text> 
            <View style={styles.rowView3}>
                <Text>-월(일, 시간)급 : </Text>
                <Text style={styles.textinput}>{this.state.Salary}</Text>
                <Text>원</Text>
            </View>
            <View style={styles.rowView3}>
                <Text>-상여금 : </Text>
                <Text style={styles.textinput}>{this.state.types1}</Text>
                <Text>, </Text>
                <Text style={styles.textinput}>{this.state.Bonus}</Text>
                <Text>원</Text>
            </View>
            <View style={styles.rowView3}>
                <Text>-기타급여(제수당 등) : </Text>
                <Text style={styles.textinput}>{this.state.types2}</Text>
            </View>
            <View style={styles.rowView3}>
                <Text style={styles.textinput}>{this.state.Bonus1}</Text>
                <Text>원, </Text>
                <Text style={styles.marginLeft1}></Text>
                <Text style={styles.textinput}>{this.state.Bonus2}</Text>
                <Text>원</Text>
            </View>
                    <View style={styles.rowView3}>
                    <Text style={styles.textinput}>{this.state.Bonus3}</Text>
                <Text>원, </Text>
                <Text style={styles.marginLeft1}></Text>
                <Text style={styles.textinput}>{this.state.Bonus4}</Text>
                <Text>원</Text>
            </View>
            <View style={styles.rowView3}>
                <Text>-임금지급일 : 매월(매주 또는 매일)</Text>
                <Text style={styles.textinput2}>{this.state.SalaryDay}</Text>
                <Text>일 (휴일의 경우에는 전일 지급)</Text>
            </View>
            <View style={styles.rowView3}>
                <Text>-지급방법 : </Text>
                <Text style={styles.textinput3}>{this.state.types3}</Text>
            </View>
            </View>
    
            
            <View style={styles.marginBottom2}>
                <Text style={styles.marginText}>7. 연차유급휴가</Text> 
                <Text style={styles.marginText}> - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함</Text>
            </View>
    
            <View style={styles.marginBottom2}>
                <Text style={styles.marginText}>8. 사대보험 적용여부(해당란에 체크)</Text> 
        <Text style={styles.marginText}>고용보험:</Text><Text style={styles.textinput1}>{this.state.types4[1]==1?'O':'X'}</Text>
                <Text style={styles.marginText}>, 산재보험:</Text><Text style={styles.textinput1}>{this.state.types4[2]==1?'O':'X'}</Text>
                <Text style={styles.marginText}>, 국민연금:</Text><Text style={styles.textinput1}>{this.state.types4[3]==1?'O':'X'}</Text>
                <Text style={styles.marginText}>, 건강보험:</Text><Text style={styles.textinput1}>{this.state.types4[4]==1?'O':'X'}</Text>
    </View>
            <View style={styles.marginBottom2}>
                <Text style={styles.marginText}>9. 근로계약서 교부</Text> 
                <Text style={styles.marginText}> - 사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)</Text>
            </View>
    
            <View style={styles.marginBottom2}>
                <Text style={styles.marginText}>10. 기타</Text> 
                <Text style={styles.marginText}> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</Text>
            </View>
            
    
            <View style={styles.rowView2}> 
              <Text style={styles.textinput1}>{this.state.ContractYear}</Text>
              <Text>년</Text>
              <Text style={styles.textinput2}>{this.state.ContractMonth}</Text>
              <Text>월</Text>
              <Text style={styles.textinput2}>{this.state.ContractDay}</Text>         
              <Text>일</Text>       
            </View>
          
          <View>
            <Text style={styles.head2}>사업주</Text>
            <View style={styles.rowView4}>
                <Text>사업체명 : </Text>
                <Text style={styles.textinput3}>{this.state.BusinessName}</Text>
            </View>
            <View style={styles.rowView4}>
                <Text>주소 : </Text>
                <Text style={styles.textinput3}>{this.state.BusinessAddress}</Text>
            </View>        
            <View style={styles.rowView4}>
                <Text>전화번호 : </Text>
                <Text style={styles.textinput3}>{this.state.BusinessPhone}</Text>
            </View>
            <View style={styles.rowView4}>
                <Text>대표자 : </Text>
                <Text style={styles.textinput3}>{this.state.BusinessOwner1}</Text>
            </View>
          </View>
    
          <View>
        <Text style={styles.head2}>근로자</Text>
            <View style={styles.rowView4}>
                <Text>주소 : 근로자가 입력하는 칸입니다.</Text>
            </View>
            <View style={styles.rowView4}>
                <Text>연락처 : 근로자가 입력하는 칸입니다.</Text>
            </View>
            <View style={styles.rowView4}>
                <Text>성명 : 근로자가 입력하는 칸입니다.</Text>
            </View>
        </View>
    
          </ScrollView>
          :
          this.state.type==3?
          <>
            <WebView
                originWhitelist={['*']}
                source={{ html: this.state.htmlContent }}
                style={{ marginTop: 20 }}
            />
            <Button
              title="공유하기"
              color="#FF3232"
              onPress={()=>{this.createAndSavePDF(this.state.htmlContent)}}/>
            </>

          :
        <ScrollView>
        <View style={styles.marginBottom1}>
            <View style={styles.rowView}>
            <TextInput
                value={this.state.Employer} 
                onChangeText={(Employer) => this.setState({Employer})}
                autoFocus={true}
                onSubmitEditing={() => { this.TextInput1.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업주이름'}
                style={styles.textinput}/>
            <Text>(이하 "사업주"라 함) 과(와)</Text>
            </View>
            <View style={styles.rowView}>
            <TextInput
                value={this.state.Employee} 
                onChangeText={(Employee) => this.setState({Employee})}
                ref={(input) => { this.TextInput1 = input; }}
                onSubmitEditing={() => { this.TextInput2.focus(); }}
                blurOnSubmit={false}
                placeholder={'근로자이름'}
                style={styles.textinput}/>
            <Text>(이하 "근로자"라 함) 은 다음과 같이 근로계약을 체결한다.</Text>
            </View>
        </View>

        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>1. 근로계약기간 :</Text> 
            <View style={styles.rowView}>
            <TextInput
                value={this.state.StartYear} 
                onChangeText={(StartYear) => this.setState({StartYear})}
                ref={(input) => { this.TextInput2 = input; }}
                onSubmitEditing={() => { this.TextInput3.focus(); }}
                blurOnSubmit={false}
                placeholder={'2020'}
                style={styles.textinput1}/>
            <Text>년</Text>
            <TextInput
                value={this.state.StartMonth} 
                onChangeText={(StartMonth) => this.setState({StartMonth})}
                ref={(input) => { this.TextInput3 = input; }}
                onSubmitEditing={() => { this.TextInput4.focus(); }}
                blurOnSubmit={false}
                placeholder={'10'}
                style={styles.textinput2}/>
            <Text>월</Text>
            <TextInput
                value={this.state.StartDay} 
                onChangeText={(StartDay) => this.setState({StartDay})}
                ref={(input) => { this.TextInput4 = input; }}
                onSubmitEditing={() => { this.TextInput5.focus(); }}
                blurOnSubmit={false}
                placeholder={'20'}
                style={styles.textinput2}/>
            <Text>일부터</Text>

            <TextInput
                value={this.state.EndYear} 
                onChangeText={(EndYear) => this.setState({EndYear})}
                ref={(input) => { this.TextInput5 = input; }}
                onSubmitEditing={() => { this.TextInput6.focus(); }}
                blurOnSubmit={false}
                placeholder={'2022'}
                style={styles.textinput1}/>
            <Text>년</Text>
            <TextInput
                value={this.state.EndMonth} 
                onChangeText={(EndMonth) => this.setState({EndMonth})}
                ref={(input) => { this.TextInput6 = input; }}
                onSubmitEditing={() => { this.TextInput7.focus(); }}
                blurOnSubmit={false}
                placeholder={'12'}
                style={styles.textinput2}/>
            <Text>월</Text>
            <TextInput
                value={this.state.EndDay} 
                onChangeText={(EndDay) => this.setState({EndDay})}
                ref={(input) => { this.TextInput7 = input; }}
                onSubmitEditing={() => { this.TextInput8.focus(); }}
                blurOnSubmit={false}
                placeholder={'31'}
                style={styles.textinput2}/>
            <Text>일까지</Text>
            </View>
        </View>


        <View style={styles.marginBottom2}>
            <View style={styles.rowView}>
            <Text style={styles.marginText}>2. 근무장소 : </Text>
            <TextInput
                value={this.state.WorkPlace} 
                onChangeText={(WorkPlace) => this.setState({WorkPlace})}
                ref={(input) => { this.TextInput8 = input; }}
                onSubmitEditing={() => { this.TextInput9.focus(); }}
                blurOnSubmit={false}
                placeholder={'예) 사무실'}
                style={styles.textinput}/>
            </View>
        </View>
        
        
        <View style={styles.marginBottom2}>
        <View style={styles.rowView}>
          <Text style={styles.marginText}>3. 업무의 내용 : </Text>
          <TextInput
            value={this.state.WorkReference} 
            onChangeText={(WorkReference) => this.setState({WorkReference})}
            ref={(input) => { this.TextInput9 = input; }}
            onSubmitEditing={() => { this.TextInput10.focus(); }}
            blurOnSubmit={false}
            placeholder={'예) 어플개발'}
            style={styles.textinput}/>
        </View>
        </View>


        <View style={styles.marginBottom2}>
        <View style={styles.rowView}>
        <Text style={styles.marginText}>4. 소정근로시간 :</Text> 
            <TextInput
                value={this.state.StartTimeHour} 
                onChangeText={(StartTimeHour) => this.setState({StartTimeHour})}
                ref={(input) => { this.TextInput10 = input; }}
                onSubmitEditing={() => { this.TextInput11.focus(); }}
                blurOnSubmit={false}
                placeholder={'9'}
                style={styles.textinput2}/>
            <Text>시</Text>
            <TextInput
                value={this.state.StartTimeHMin} 
                onChangeText={(StartTimeHMin) => this.setState({StartTimeHMin})}
                ref={(input) => { this.TextInput11 = input; }}
                onSubmitEditing={() => { this.TextInput12.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                style={styles.textinput2}/>
            <Text>분 ~ </Text>
            <TextInput
                value={this.state.EndTimeHour} 
                onChangeText={(EndTimeHour) => this.setState({EndTimeHour})}
                ref={(input) => { this.TextInput12 = input; }}
                onSubmitEditing={() => { this.TextInput13.focus(); }}
                blurOnSubmit={false}
                placeholder={'18'}
                style={styles.textinput2}/>
            <Text>시</Text>
            <TextInput
                value={this.state.EndTimeHMin} 
                onChangeText={(EndTimeHMin) => this.setState({EndTimeHMin})}
                ref={(input) => { this.TextInput13 = input; }}
                onSubmitEditing={() => { this.TextInput14.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                style={styles.textinput2}/>
            <Text>분 </Text>
        </View>
        <View style={styles.rowView3}>
            <Text>휴게시간</Text>
            <TextInput
                value={this.state.BreakTimeStartHour} 
                onChangeText={(BreakTimeStartHour) => this.setState({BreakTimeStartHour})}
                ref={(input) => { this.TextInput14 = input; }}
                onSubmitEditing={() => { this.TextInput15.focus(); }}
                blurOnSubmit={false}
                placeholder={'12'}
                style={styles.textinput2}/>
            <Text>시</Text>
            <TextInput
                value={this.state.BreakTimeStartMin} 
                onChangeText={(BreakTimeStartMin) => this.setState({BreakTimeStartMin})}
                ref={(input) => { this.TextInput15 = input; }}
                onSubmitEditing={() => { this.TextInput16.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                style={styles.textinput2}/>
            <Text>분 ~ </Text>
            <TextInput
                value={this.state.BreakTimeEndHour} 
                onChangeText={(BreakTimeEndHour) => this.setState({BreakTimeEndHour})}
                ref={(input) => { this.TextInput16 = input; }}
                onSubmitEditing={() => { this.TextInput17.focus(); }}
                blurOnSubmit={false}
                placeholder={'13'}
                style={styles.textinput2}/>
            <Text>시</Text>
            <TextInput
                value={this.state.BreakTimeEndMin} 
                onChangeText={(BreakTimeEndMin) => this.setState({BreakTimeEndMin})}
                ref={(input) => { this.TextInput17 = input; }}
                onSubmitEditing={() => { this.TextInput18.focus(); }}
                blurOnSubmit={false}
                placeholder={'00'}
                style={styles.textinput2}/>
            <Text>분 </Text>
        </View>
        </View>


        <View style={styles.marginBottom2}>
        <View style={styles.rowView}>
            <Text style={styles.marginText}>5. 근무일/휴일 : </Text> 
            <Text>매주 </Text>
            <TextInput
                value={this.state.WorkingDays} 
                onChangeText={(WorkingDays) => this.setState({WorkingDays})}
                ref={(input) => { this.TextInput18 = input; }}
                onSubmitEditing={() => { this.TextInput19.focus(); }}
                blurOnSubmit={false}
                placeholder={'5'}
                style={styles.textinput2}/>
            <Text>일(또는 매일단위)근무, 주휴일 매주</Text>
            <TextInput
                value={this.state.Holiday} 
                onChangeText={(Holiday) => this.setState({Holiday})}
                ref={(input) => { this.TextInput19 = input; }}
                onSubmitEditing={() => { this.TextInput20.focus(); }}
                blurOnSubmit={false}
                placeholder={'2'}
                style={styles.textinput2}/>
            <Text>일 </Text>
        </View>
        </View>


        <View style={styles.marginBottom2}>
        <Text style={styles.marginText}>6. 임금</Text> 
        <View style={styles.rowView3}>
            <Text>-월(일, 시간)급 : </Text>
            <TextInput
                value={this.state.Salary} 
                onChangeText={(Salary) => this.setState({Salary})}
                ref={(input) => { this.TextInput20 = input; }}
                onSubmitEditing={() => { this.TextInput21.focus(); }}
                blurOnSubmit={false}
                placeholder={'2000000'}
                style={styles.textinput}/>
            <Text>원</Text>
        </View>
        <View style={styles.rowView3}>
            <Text>-상여금 : </Text>
            <RadioForm
                ref="radioForm"
                radio_props={this.state.types1=="있음"||this.state.types1=="없음"?[{"label":"없음   ","value":0},{"label":"있음","value":0}]:this.state.types1}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={(value, index) => {
                    this.setState({
                        value1:value,
                        value1Index:index
                    })
                }}
            />
            <TextInput
                value={this.state.Bonus} 
                onChangeText={(Bonus) => this.setState({Bonus})}
                ref={(input) => { this.TextInput21 = input; }}
                onSubmitEditing={() => { this.TextInput22.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원</Text>
        </View>
        <View style={styles.rowView3}>
            <Text>-기타급여(제수당 등) : </Text>
            <RadioForm
                ref="radioForm"
                radio_props={this.state.types2=="있음"||this.state.types2=="없음"?[{"label":"없음   ","value":0},{"label":"있음","value":0}]:this.state.types2}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={(value, index) => {
                    this.setState({
                        value2:value,
                        value2Index:index
                    })
                }}
            />
        </View>
        <View style={styles.rowView3}>
            <TextInput
                value={this.state.Bonus1} 
                onChangeText={(Bonus1) => this.setState({Bonus1})}
                ref={(input) => { this.TextInput22 = input; }}
                onSubmitEditing={() => { this.TextInput23.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원, </Text>
            <Text style={styles.marginLeft1}></Text>
            <TextInput
                value={this.state.Bonus2} 
                onChangeText={(Bonus2) => this.setState({Bonus2})}
                ref={(input) => { this.TextInput23 = input; }}
                onSubmitEditing={() => { this.TextInput24.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원</Text>
        </View>
                <View style={styles.rowView3}>
            <TextInput
                value={this.state.Bonus3} 
                onChangeText={(Bonus3) => this.setState({Bonus3})}
                ref={(input) => { this.TextInput24 = input; }}
                onSubmitEditing={() => { this.TextInput25.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원, </Text>
            <Text style={styles.marginLeft1}></Text>
            <TextInput
                value={this.state.Bonus4} 
                onChangeText={(Bonus4) => this.setState({Bonus4})}
                ref={(input) => { this.TextInput25 = input; }}
                onSubmitEditing={() => { this.TextInput26.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원</Text>
        </View>
        <View style={styles.rowView3}>
            <Text>-임금지급일 : 매월(매주 또는 매일)</Text>
            <TextInput
                value={this.state.SalaryDay} 
                onChangeText={(SalaryDay) => this.setState({SalaryDay})}
                ref={(input) => { this.TextInput26 = input; }}
                placeholder={'10'}
                style={styles.textinput2}/>
            <Text>일 (휴일의 경우에는 전일 지급)</Text>
        </View>
        <View style={styles.rowView3}>
            <Text>-지급방법 : </Text>
            <RadioForm
                ref="radioForm"
                radio_props={this.state.types3=="근로자에게 직접지급   "||this.state.types3=="근로자 명의 예금통장에 입금"?[{"label":"근로자에게 직접지급   ","value":0},{"label":"근로자 명의 예금통장에 입금","value":1}]:this.state.types3}
                initial={0}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
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

        
        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>7. 연차유급휴가</Text> 
            <Text style={styles.marginText}> - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함</Text>
        </View>
        
        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>8. 사대보험 적용여부(해당란에 체크)</Text> 
            <CheckboxGroup
                callback={(selected) => { 
                  this.setState({
                    value4:selected
                }) }}
              iconColor={"#00a2dd"}
              iconSize={30}
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
                color: '#333'
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"row"}
            />
        </View>

        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>9. 근로계약서 교부</Text> 
            <Text style={styles.marginText}> - 사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 근로자에게 교부함(근로기준법 제17조 이행)</Text>
        </View>

        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>10. 기타</Text> 
            <Text style={styles.marginText}> - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</Text>
        </View>
        

        <View style={styles.rowView2}> 
          <TextInput
            value={this.state.ContractYear} 
            onChangeText={(ContractYear) => this.setState({ContractYear})}
            onSubmitEditing={() => { this.TextInput30.focus(); }}
            blurOnSubmit={false}
            placeholder={'2020'}
            style={styles.textinput1}/>
          <Text>년</Text>
          <TextInput
            value={this.state.ContractMonth} 
            onChangeText={(ContractMonth) => this.setState({ContractMonth})}
            ref={(input) => { this.TextInput30 = input; }}
            onSubmitEditing={() => { this.TextInput31.focus(); }}
            blurOnSubmit={false}
            placeholder={'11'}
            style={styles.textinput2}/>
          <Text>월</Text>      
          <TextInput
            value={this.state.ContractDay} 
            onChangeText={(ContractDay) => this.setState({ContractDay})}
            ref={(input) => { this.TextInput31 = input; }}
            onSubmitEditing={() => { this.TextInput32.focus(); }}
            blurOnSubmit={false}
            placeholder={'20'}
            style={styles.textinput2}/>
          <Text>일</Text>       
        </View>
      
      <View>
        <Text style={styles.head2}>사업주</Text>
        <View style={styles.rowView4}>
            <Text>사업체명 : </Text>
            <TextInput
                value={this.state.BusinessName} 
                onChangeText={(BusinessName) => this.setState({BusinessName})}
                ref={(input) => { this.TextInput32 = input; }}
                onSubmitEditing={() => { this.TextInput33.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업체 이름'}
                style={styles.textinput3}/>
        </View>
        <View style={styles.rowView4}>
            <Text>주소 : </Text>
            <TextInput
                value={this.state.BusinessAddress} 
                onChangeText={(BusinessAddress) => this.setState({BusinessAddress})}
                ref={(input) => { this.TextInput33 = input; }}
                onSubmitEditing={() => { this.TextInput34.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업체 주소'}
                style={styles.textinput3}/>
        </View>        
        <View style={styles.rowView4}>
            <Text>전화번호 : </Text>
            <TextInput
                value={this.state.BusinessPhone} 
                onChangeText={(BusinessPhone) => this.setState({BusinessPhone})}
                ref={(input) => { this.TextInput34 = input; }}
                onSubmitEditing={() => { this.TextInput35.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업체 전화번호'}
                style={styles.textinput3}/>
        </View>
        <View style={styles.rowView4}>
            <Text>대표자 : </Text>
            <TextInput
                value={this.state.BusinessOwner1} 
                onChangeText={(BusinessOwner1) => this.setState({BusinessOwner1})}
                ref={(input) => { this.TextInput35 = input; }}
                onSubmitEditing={() => { this.TextInput36.focus(); }}
                blurOnSubmit={false}
                placeholder={'사업체 대표'}
                style={styles.textinput3}/>
        </View>
      </View>

      <View>
        <Text style={styles.head2}>근로자</Text>
        <View style={styles.rowView4}>
            <Text>주소 : 근로자가 입력하는 칸입니다.</Text>
        </View>
        <View style={styles.rowView4}>
            <Text>연락처 : 근로자가 입력하는 칸입니다.</Text>
        </View>
        <View style={styles.rowView4}>
            <Text>성명 : 근로자가 입력하는 칸입니다.</Text>
        </View>
      </View>

      <View style={styles.buttonBottom}>
          <Button 
            title="저장하기"
            onPress={()=>{
                this.state.type=2;
                this.handleSubmit()    
            }}/>
        </View>
      </ScrollView>
    }
      </View>
    )
  }
}

export default ContractformAScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff',marginBottom:10, textAlign:'center' , fontSize:20, paddingTop:7},
  head2: {marginLeft:5, marginTop:15, fontSize:13, fontWeight: 'bold'},
  rowView : { flexDirection: 'row'},
  rowView2 : { flexDirection: 'row', justifyContent:"center", marginTop:20, marginBottom:20},
  rowView3 : { flexDirection: 'row', marginLeft:20},
  rowView4 : { flexDirection: 'row', marginLeft:10},
  
  marginBottom1:{marginBottom:20},
  marginBottom2:{marginBottom:10},
  marginLeft1 : {marginLeft:30},
  marginText : {marginBottom:5, marginLeft:5},
  textinput:{ width: 50, height: 20, marginRight:3, marginLeft:10},
  textinput1:{ width: 30, height: 20, marginRight:3, marginLeft:10},
  textinput2:{ width: 15, height: 20, marginRight:3, marginLeft:10},
  textinput3:{ width: 250, height: 20, marginRight:3, marginLeft:10},
});