const axios = require('axios');
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ImageBackground} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckboxGroup from 'react-native-checkbox-group';

//============================바뀐부분A=============================
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AsyncStorage } from 'react-native';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from 'react-native-webview'

class WorkerContractformScreen extends Component{
  state={
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
        bangcode:'',
        types1: 0,
        types2: 0,
        types3: 0,
        types4: [],
        value1: 0,
        value1Index: 0,
        value2: 0,
        value2Index: 0,
        value3: 0,
        value3Index: 0,
        Employer: 0,
        Employee: 0,
        StartYear: 0,
        StartMonth: 0,
        StartDay: 0,
        EndYear: 0,
        EndMonth: 0,
        EndDay: 0,
        WorkReference: 0,
        StartTimeHour: 0,
        StartTimeHMin: 0,
        EndTimeHMin: 0,
        BreakTimeStartMin: 0,
        BreakTimeEndHour: 0,
        BreakTimeEndMin: 0,
        Salary: 0,
        Bonus: 0,
        Bonus2: 0,
        Bonus3: 0,
        Bonus4: 0,
        SalaryDay: 0,
        WorkPlace: 0,
        Holiday: 0,
        EndTimeHour: 0,
        WorkingDays: 0,
        ContractYear: 0,
        ContractMonth: 0,
        ContractDay: 0,
        BusinessName: 0,
        BusinessAddress: 0,
        BusinessPhone: 0,
        BusinessOwner1: 0,
        EmployeePhone: 0,
        EmployeeName: 0,
        Employer: 0,
        Employee: 0,
        StartYear: 0,
        StartMonth: 0,
        StartDay: 0,
        EndYear: 0,
        EndMonth: 0,
        EndDay: 0,
        WorkReference: 0,
        StartTimeHour: 0,
        StartTimeHMin: 0,
        EndTimeHMin: 0,
        BreakTimeStartMin: 0,
        BreakTimeEndHour: 0,
        BreakTimeEndMin: 0,
        Salary: 0,
        Bonus: 0,
        Bonus2: 0,
        Bonus3: 0,
        Bonus4: 0,
        SalaryDay: 0,
        WorkPlace: 0,
        Holiday: 0,
        EndTimeHour: 0,
        WorkingDays: 0,
        ContractYear: 0,
        ContractMonth: 0,
        ContractDay: 0,
        BusinessName: 0,
        BusinessAddress: 0,
        BusinessPhone: 0,
        BusinessOwner1: 0,
        EmployeeAddress: 0,
        EmployeePhone: 0,
        EmployeeName: 0,
        type:1,
        htmlContent:''
    };
  }
  componentDidMount(){
    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangcode:bangCode});
        this.fetchHtml(bangCode);
      })
    
  }

  StatementScreen = async() => {
    let sign="";
    fetch('http://192.168.43.253:3000/selectSign', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //id : idid
        }),
      }).then(res => res.json())
      .then(async(res) => {
          sign = res[0].sign;
          console.log(sign)
          fetch("http://192.168.43.253:3000/selectImg",{
            method: 'POST',})
              .then(res => 
                {
                  console.log(res)
                  console.log("나와라ㅏㅏㅏㅏ");
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
              <svg viewBox = "0 0 1000 1000" style="left: 200px; top:1070px; height:500px; width: 500px; font-size: 1.8em; position: absolute;" xmlns="http://www.w3.org/2000/svg">
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

        })
    
      
  }
  createAndSavePDF = async (html) => {
      try {
        const { uri } = await Print.printToFileAsync({ html },base64=true);
        Sharing.shareAsync(uri);  
      } catch (error) {
        console.error(error);
      }
    };

    fetchHtml = async(bangCode) => {
    await fetch('http://192.168.43.253:3000/selectContractform', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bang:bangCode
        }),
      }).then(res => res.json())
      .then(res => {
          //res.types1 = JSON.parse(res.types1);
          //res.types2 = JSON.parse(res.types2);
          //res.types3 = JSON.parse(res.types3);
          console.log(res[0]);
          console.log('--------------')
          if(res[0] != undefined){
          if(res[0].type==3){
            this.StatementScreen()
          }
          if(JSON.parse(res[0].types1)[0].value == 1){
            res[0].types1 = "없음"
          }
          else{
            res[0].types1 = "있음"
          }
          
          if(JSON.parse(res[0].types2)[0].value == 1){
            res[0].types2 = "없음"
          }
          else{
            res[0].types2 = "있음"
          }

          if(JSON.parse(res[0].types3)[0].value == 1){
            res[0].types3 = "근로자에게 직접 지급"
          }
          else{
            res[0].types3 = "근로자 명의 예금통장에 입금"
          }
          let t4 = [0,0,0,0,0];
          console.log('dddd')
          let n = JSON.parse(res[0].value4);
          for(let i=0 ; i<n.length ; i++){
            t4[n[i]]=1;
          }
          console.log("whyyyyyyyyyyyyyyyyyyyyy?"+t4);
          res[0].types4 = t4;

          this.setState(res[0]);
          console.log(res[0].types4);
          this.setState(res[0]);
        }
      })     
    }

  handleSubmit(){
    if(this.state.EmployeeAddress==null
        ||this.state.EmployeePhone==null
        ||this.state.EmployeeName==null){
        Alert.alert('빈칸을 채워주세요.')    

    } else{
        this.fetch();
        Alert.alert('저장되었습니다.')    
    }
  }
  fetch = async() => {
    await fetch('http://192.168.43.253:3000/updateContractform', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            this.state
        ),
      }).then(res => res.json())
      .then(res => {})     
    }
  
  render() {
    return (
      <ImageBackground style={styles.image} source={require('../../img/page2_2.png')}>
      <View  style={styles.container}>
        {
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
            :this.state.type==1?<Text>사업주가 아직 계약서를 작성하지 않았습니다.</Text>:
            <>
        <Text style={styles.textTitle}> 근로계약서</Text>
        <ScrollView>
        <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
            <Text style={styles.textStyle}>{this.state.Employer}</Text>
            <Text style={styles.textStyle}>(이하 "사업주"라 함) 과(와)</Text>
            </View>
            <View style={styles.textAreaRow}>
            <Text style={styles.textStyle}>{this.state.Employee}</Text>
            <Text style={styles.textStyle}>(이하 "근로자"라 함) 은 </Text>
            </View>
            <Text style={styles.textStyle}>다음과 같이 근로계약을 체결한다.</Text>
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
        <View style={styles.textTitleStyle}>
        <Text style={styles.textTitleStyle}>4. 소정근로시간 :</Text> 
        <View style={styles.rowPeriod}>
            <Text style={styles.textinputDayStyle}>{this.state.StartTimeHour}</Text> 
            <Text style={styles.textStyle}>시</Text>
            <Text style={styles.textinputDayStyle}>{this.state.StartTimeHMin}</Text>
            <Text style={styles.textStyle}>분 ~ </Text>
            <Text style={styles.textinputDayStyle}>{this.state.EndTimeHour}</Text>
            <Text style={styles.textStyle}>시</Text>
            <Text style={styles.textinputDayStyle}>{this.state.EndTimeHMin}</Text>
            <Text style={styles.textStyle}>분 </Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>휴게시간</Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeStartHour}</Text>
            <Text style={styles.textStyle}>시</Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeStartMin}</Text>
            <Text style={styles.textStyle}>분 ~ </Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeEndHour}</Text>
            <Text style={styles.textStyle}>시</Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeEndMin}</Text>
            <Text style={styles.textStyle}>분 </Text>
        </View>
        </View>
        </View>


        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>5. 근무일/휴일 : </Text> 
        
          <View style={styles.rowPeriod}>    
            <Text style={styles.textStyle}>매주 </Text>
            <Text style={styles.textinputDayStyle}>{this.state.WorkingDays}</Text>
            <Text style={styles.textStyle}>일 (또는 매일단위) 근무, </Text>
            </View>
            <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>주휴일 매주</Text>
            <Text style={styles.textinputDayStyle}>{this.state.Holiday}</Text>
            <Text style={styles.textStyle}>일 </Text>
        </View>
        </View>


        <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>6. 임금</Text> 
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-월(일, 시간)급 : </Text>
            <Text style={styles.textinputName}>{this.state.Salary}</Text>
            <Text style={styles.textStyle}>원</Text>
        </View>
        <View  style={{marginTop:hp('0.5%')}}>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-상여금 : </Text>
            <Text style={styles.textinputName}>{this.state.types1}</Text>
            <Text style={styles.textStyle}>원, </Text>
            <Text style={styles.textinputName}>{this.state.Bonus}</Text>
            <Text style={styles.textStyle}>원</Text>
        </View>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-기타급여(제수당 등) : </Text>
            <Text style={styles.textinputName}>{this.state.types2}</Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textinputName}>{this.state.Bonus1}</Text>
            <Text style={styles.textStyle}>원, </Text>
            <Text style={styles.marginLeft1}></Text>
            <Text style={styles.textinputName}>{this.state.Bonus2}</Text>
            <Text style={styles.textStyle}>원</Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textinputName}>{this.state.Bonus3}</Text>
            <Text style={styles.textStyle}>원, </Text>
            <Text style={styles.marginLeft1}></Text>
            <Text style={styles.textinputName}>{this.state.Bonus4}</Text>
            <Text style={styles.textStyle}>원</Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-임금지급일 : 매월(매주 또는 매일)</Text>
            <Text style={styles.textinputDayStyle}>{this.state.SalaryDay}</Text>
            <Text style={styles.textStyle}>일 </Text>
        </View>
        <View style={styles.rowPeriod2}>
              <Text style={styles.textStyle}>(휴일의 경우에는 전일 지급)</Text>
            </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>-지급방법 : </Text>
            <Text style={styles.textinputName}>{this.state.types3}</Text>
        </View>
        </View>

        
        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>7. 연차유급휴가</Text> 
            <Text style={styles.textLineStyle}> - 연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>8. 사대보험 적용여부(해당란에 체크)</Text> 
            <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>고용보험:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[1]==1?'O':'X'}</Text>
            <Text style={styles.textStyle}>, 산재보험:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[2]==1?'O':'X'}</Text><Text style={styles.textStyle}>, </Text>
            </View>
            <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>국민연금:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[3]==1?'O':'X'}</Text>
            <Text style={styles.textStyle}>, 건강보험:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[4]==1?'O':'X'}</Text>
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
          <Text style={styles.textinputYearStyle}>{this.state.ContractYear}</Text>
          <Text style={styles.textTitleStyle}>년</Text>
          <Text style={styles.textinputDayStyle}>{this.state.ContractMonth}</Text>
          <Text style={styles.textTitleStyle}>월</Text>
          <Text style={styles.textinputDayStyle}>{this.state.ContractDay}</Text>         
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
            <Text style={styles.textStyle}>주소 : </Text>
            <TextInput
                value={this.state.EmployeeAddress} 
                onChangeText={(EmployeeAddress) => this.setState({EmployeeAddress})}
                ref={(input) => { this.TextInput36 = input; }}
                onSubmitEditing={() => { this.TextInput37.focus(); }}
                blurOnSubmit={false}
                placeholder={'근로자 주소'}
                style={styles.textinputStyle}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>연락처 : </Text>
            <TextInput
                value={this.state.EmployeePhone} 
                onChangeText={(EmployeePhone) => this.setState({EmployeePhone})}
                ref={(input) => { this.TextInput37 = input; }}
                onSubmitEditing={() => { this.TextInput38.focus(); }}
                blurOnSubmit={false}
                placeholder={'연락처'}
                style={styles.textinputStyle}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>성명 : </Text>
            <TextInput
                value={this.state.EmployeeName} 
                onChangeText={(EmployeeName) => this.setState({EmployeeName})}
                ref={(input) => { this.TextInput38 = input; }}
                placeholder={'근로자 이름'}
                style={styles.textinputStyle}/>
        </View>
      </View>

      <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              this.state.type = 3;
              this.handleSubmit()}}>
              <Text style={styles.buttonTitle}>저장하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:hp('5%')}}><Text></Text></View>
        
      </ScrollView>
      </>
      }
      </View>
      </ImageBackground>
    )
  }
}

export default WorkerContractformScreen;
const styles = StyleSheet.create({
  container: { padding:wp('3%'), width: "100%", height: "100%",},
  image:{ 
      alignItems: 'center', justifyContent:"center",
      width: "100%", height: "103%", 
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
      marginTop:wp('1.7%'),
      marginBottom:wp('1.5%'),
      marginRight:wp('2%'),
  },  
  textTitleStyle:{
      fontSize:wp('4.8%'),
      fontFamily:"NanumSquareB",
      marginTop:wp('2%'),
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
  textinputStyle:{
      fontSize:wp('4.2%'),
      fontFamily:"NanumSquare",
      marginLeft:wp('1.5%'),
      width:wp('25%'),
  },
  
  textinputYearStyle:{
    fontSize:wp('4.2%'),
    fontFamily:"NanumSquare",
    marginLeft:wp('1.5%'),
    marginTop:wp('1.7%'),
    width:wp('11%')
  },
  textinputDayStyle:{
      fontSize:wp('4.2%'),
      marginTop:wp('1.7%'),
      fontFamily:"NanumSquare",
      marginLeft:wp('2%'),
      width:wp('7%'),
  },
  textinputName:{
    fontSize:wp('4.2%'),
    fontFamily:"NanumSquare",
    marginLeft:wp('1.5%'),
    marginTop:wp('1.7%'),
    width:wp('18%'),
    textAlign:"center"
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
  buttonArea: {
      alignItems:"center",
      width: '100%', height: hp('6%'),
      marginBottom:hp('2%'),
  },
  button: {
      backgroundColor: "#7085DF",
      width:wp('80%'), height: hp('6%'),
      justifyContent: 'center', alignItems:"center",
      borderRadius:wp('4%'),
      marginTop:hp('2%'),
      marginBottom:hp('2%'),
  },
  buttonTitle: {
        color: '#040525',
        fontFamily:"NanumSquare",
        fontSize:wp('4.8%'),
  },
});