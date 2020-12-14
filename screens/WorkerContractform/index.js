const axios = require('axios');
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ImageBackground} from 'react-native';
import { Table, TableWrapper,  Col, Cols, Cell } from 'react-native-table-component';
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
      axios.post('https://www.kwonsoryeong.tk:3000/selectSign', {
        id:'/'
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
  
  StatementScreen2 = async() => {
    let sign="";
          axios.post('https://www.kwonsoryeong.tk:3000/selectSign', {
            id:'/'
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
            <svg viewBox = "0 0 600 600" style="left: 230px; top:0px; height:200px; width: 200px; font-size: 1.8em; position: absolute;" xmlns="http://www.w3.org/2000/svg">
              <polyline points="${String(sign)}"
              style="fill:none;stroke:black;stroke-width:3" />
            </svg>
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
                <input type="radio" id="bonusYes" name="bonus" value="bonusYes">
                <label for="bonusYes">${this.state.types1}</label>
                <label class="text_underline">${this.state.Bonus}</label>
                <label>원</label>
    
                <label class="margin_left">- 기타급여(제수당 등) : </label>
                <label for="bonus2Yes">${this.state.types2}</label>
                <label class="text_underline_margin_left">${this.state.Bonus1}</label>
                <label>원, </label>
                <label class="text_underline_margin_left">${this.state.Bonus2}</label>
                <label>원 </label><br>
                <label class="text_underline_margin_left">${this.state.Bonus3}</label>
                <label>원, </label>
                <label class="text_underline_margin_left">${this.state.Bonus4}</label>
    
                <label class="margin_left">- 초과근로에 대한 가산임금률</label>
                <label class="text_underline">${this.state.AdditionalWageRate}</label>
                <label>%</label><br>
                <label class="margin_left">- 임금지급일 : 매월(매주 또는 매일)</label>
                <label class="text_underline">${this.state.SalaryDay}</label>
                <label>일 (휴일의 경우에는 전일 지급)</label><br>
                <label class="margin_left">- 지급방법 : </label>
                <label for="wayOfPayment1">${this.state.types3}</label>
    
                <label>7. 연차유급휴가</label><br>
                <label class="margin_left"> - 통상근로자의 근로시간에 비례하여 연차유급휴가 부여함.</label><br>
    
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
                <div>
                  <img style="left: 270px; height:10px; width: 10px; bottom: 400px; font-size: 1.8em; font-weight: bold; position: absolute;" src="https://www.kwonsoryeong.tk:3000/11.jpg">
                </div>
            </form>
        </body>
    </html>`

          this.setState({htmlContent : htmlContent})
  })}
  ;
      
    

  createAndSavePDF = async (html) => {
      try {
        const { uri } = await Print.printToFileAsync({ html },base64=true);
        Sharing.shareAsync(uri);  
      } catch (error) {
        console.error(error);
      }
    };

    fetchHtml = async(bangCode) => {
    axios.post('https://www.kwonsoryeong.tk:3000/selectContractform', {
      bang:bangCode
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
          bang:bangCode
        }),
      }).then(res => res.json())*/
      .then(res => {
          //res.types1 = JSON.parse(res.types1);
          //res.types2 = JSON.parse(res.types2);
          //res.types3 = JSON.parse(res.types3);
          console.log(res.data[0]);
          console.log('--------------')
          if(res.data[0] != undefined){
          if(res.data[0].type==3){
            this.StatementScreen()
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
        }else{

          axios.post('https://www.kwonsoryeong.tk:3000/selectContractform2', {
            bang:bangCode
          },
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
          /*fetch('https://www.kwonsoryeong.tk:3000/selectContractform2', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bang:bangCode
          }),
        }).then(res => res.json())*/
        .then(res => {
            //res.types1 = JSON.parse(res.types1);
            //res.types2 = JSON.parse(res.types2);
            //res.types3 = JSON.parse(res.types3);
            console.log(res.data[0]);
            console.log('--------------')
            if(res.data[0] != undefined){
            if(res.data[0].type==5){
              this.StatementScreen2()
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
                this.setState({tableData: [
                    ['시작시간',<TextInput value={this.state.Start1} onChangeText={(Start1) => this.setState({Start1})} placeholder='09:00' style={styles.text} />, 
                        <TextInput value={this.state.Start2} onChangeText={(Start2) => this.setState({Start2})} placeholder='09:00' style={styles.text} />, 
                        <TextInput value={this.state.Start3} onChangeText={(Start3) => this.setState({Start3})} placeholder='09:00' style={styles.text} />,
                        <TextInput value={this.state.Start4} onChangeText={(Start4) => this.setState({Start4})} placeholder='09:00' style={styles.text} />,
                        <TextInput value={this.state.Start5} onChangeText={(Start5) => this.setState({Start5})} placeholder='09:00' style={styles.text} />,
                        <TextInput value={this.state.Start6} onChangeText={(Start6) => this.setState({Start6})} placeholder='09:00' style={styles.text} />,
                        <TextInput value={this.state.Start7} onChangeText={(Start7) => this.setState({Start7})} placeholder='09:00' style={styles.text} />],
                    ['마치는시간',<TextInput value={this.state.End1} onChangeText={(End1) => this.setState({End1})} placeholder='15:00' style={styles.text} />, 
                        <TextInput value={this.state.End2} onChangeText={(End2) => this.setState({End2})} placeholder='15:00' style={styles.text} />,
                        <TextInput value={this.state.End3} onChangeText={(End3) => this.setState({End3})} placeholder='15:00' style={styles.text} />,
                        <TextInput value={this.state.End4} onChangeText={(End4) => this.setState({End4})} placeholder='15:00' style={styles.text} />,
                        <TextInput value={this.state.End5} onChangeText={(End5) => this.setState({End5})} placeholder='15:00' style={styles.text} />,
                        <TextInput value={this.state.End6} onChangeText={(End6) => this.setState({End6})} placeholder='15:00' style={styles.text} />,
                        <TextInput value={this.state.End7} onChangeText={(End7) => this.setState({End7})} placeholder='15:00' style={styles.text} />],
                    ['근무시간',<TextInput value={this.state.time1} onChangeText={(time1) => this.setState({time1})} placeholder='7' style={styles.text} />,
                        <TextInput value={this.state.time1} onChangeText={(time2) => this.setState({time2})} placeholder='7' style={styles.text} />,
                        <TextInput value={this.state.time2} onChangeText={(time3) => this.setState({time3})} placeholder='7' style={styles.text} />,
                        <TextInput value={this.state.time3} onChangeText={(time4) => this.setState({time4})} placeholder='7' style={styles.text} />,
                        <TextInput value={this.state.time4} onChangeText={(time5) => this.setState({time5})} placeholder='7' style={styles.text} />,
                        <TextInput value={this.state.time5} onChangeText={(time6) => this.setState({time6})} placeholder='7' style={styles.text} />,
                        <TextInput value={this.state.time6} onChangeText={(time7) => this.setState({time7})} placeholder='7' style={styles.text} />]
            
                ]})
        }})
    }
  })}


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
          axios.post('https://www.kwonsoryeong.tk:3000/updateContractform', this.state,
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
    /*await fetch('https://www.kwonsoryeong.tk:3000/updateContractform', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            this.state
        ),
      }).then(res => res.json())*/
      .then(res => {})     
      
      if( this.state.type == 3){
        let time = (this.state.StartTimeHour.length<2?'0'+this.state.StartTimeHour:this.state.StartTimeHour)
        + (this.state.StartTimeHMin.length<2?'0'+this.state.StartTimeHMin:this.state.StartTimeHMin)
        + (this.state.EndTimeHour.length<2?'0'+this.state.EndTimeHour:this.state.EndTimeHour)
        + (this.state.EndTimeHMin.length<2?'0'+this.state.EndTimeHMin:this.state.EndTimeHMin)
         
        let t1 = this.state.EndTimeHour*60 -this.state.StartTimeHour*60 + this.state.EndTimeHMin*1 - this.state.EndTimeHMin*1;
        let t2 = this.state.BreakTimeEndHour*60 - this.state.BreakTimeStartHour*60 +this.state.BreakTimeEndMin*1 - this.state.BreakTimeStartMin*1; 
        let tt = String((t1-t2)/60)

        axios.post('https://www.kwonsoryeong.tk:3000/alterState', {
          type:2,
          bang: this.state.bangcode,
          id:'/',
          pay: this.state.Salary,
          mon: time,
          tue:time,
          wed: time,
          thu: time,
          fri : time,
          sat: null,
          sun : null,
          eachtime :`${tt}/${tt}/${tt}/${tt}/${tt}/0/0`,

        },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
        /*fetch('https://www.kwonsoryeong.tk:3000/alterState', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type:2,
            bang: this.state.bangcode,
            id:'/',
            pay: this.state.Salary,
            mon: time,
            tue:time,
            wed: time,
            thu: time,
            fri : time,
            sat: 0,
            sun : 0,
            eachtime :`${tt}/${tt}/${tt}/${tt}/${tt}/0/0`,
          }),
        }).then(res => res.json())*/
        .then(res => {
          console.log(res.data);
          this.props.navigation.navigate('Worker Home');
        })     
      }

    }
    handleSubmit2(){
      if(this.state.EmployeeAddress==null
          ||this.state.EmployeePhone==null
          ||this.state.EmployeeName==null){
          Alert.alert('빈칸을 채워주세요.')    
  
      } else{
          this.fetch2();
          Alert.alert('저장되었습니다.')    
      }
    }

    
  fetch2 = async() => {
    axios.post('https://www.kwonsoryeong.tk:3000/updateContractform2', {
      type: 5,
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
          End1:this.state.End1
          ,End2:this.state.End2
          ,End3:this.state.End3
          ,End4:this.state.End4
          ,End5:this.state.End5
          ,End6:this.state.End6
          ,End7:this.state.End7,
          EndDay:this.state.EndDay
          , EndMonth:this.state.EndMonth
          , EndYear:this.state.EndYear
          ,Salary:this.state.Salary
          ,SalaryDay:this.state.SalaryDay,
          Start1:this.state.Start1
          ,Start2:this.state.Start2
          ,Start3:this.state.Start3
          ,Start4:this.state.Start4
          ,Start5:this.state.Start5
          ,Start6:this.state.Start6
          ,Start7:this.state.Start7,
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
          ,value4:JSON.stringify(this.state.value4),
          EmployeeAddress : this.state.EmployeeAddress,
          EmployeePhone : this.state.EmployeePhone,
          EmployeeName : this.state.EmployeeName,
    },
      {  headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
      })
    /*await fetch('https://www.kwonsoryeong.tk:3000/updateContractform2', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
    }),
      }).then(res => res.json())*/
      .then(res => {})     
      
        let t1 = (this.state.Start1.split(':')[0].length<2?'0'+ this.state.Start1.split(':')[0]:this.state.Start1.split(':')[0]) + (this.state.Start1.split(':')[1].length<2?'0'+ this.state.Start1.split(':')[1]:this.state.Start1.split(':')[1]) + (this.state.End1.split(':')[0].length<2?'0'+ this.state.End1.split(':')[0]:this.state.End1.split(':')[0]) + (this.state.End1.split(':')[1].length<2?'0'+ this.state.End1.split(':')[1]:this.state.End1.split(':')[1]);
        let t2 = (this.state.Start2.split(':')[0].length<2?'0'+ this.state.Start2.split(':')[0]:this.state.Start2.split(':')[0]) + (this.state.Start2.split(':')[1].length<2?'0'+ this.state.Start2.split(':')[1]:this.state.Start2.split(':')[1]) + (this.state.End2.split(':')[0].length<2?'0'+ this.state.End2.split(':')[0]:this.state.End2.split(':')[0]) + (this.state.End2.split(':')[1].length<2?'0'+ this.state.End2.split(':')[1]:this.state.End2.split(':')[1]);
        let t3 = (this.state.Start3.split(':')[0].length<2?'0'+ this.state.Start3.split(':')[0]:this.state.Start3.split(':')[0]) + (this.state.Start3.split(':')[1].length<2?'0'+ this.state.Start3.split(':')[1]:this.state.Start3.split(':')[1]) + (this.state.End3.split(':')[0].length<2?'0'+ this.state.End3.split(':')[0]:this.state.End3.split(':')[0]) + (this.state.End3.split(':')[1].length<2?'0'+ this.state.End3.split(':')[1]:this.state.End3.split(':')[1]);
        let t4 = (this.state.Start4.split(':')[0].length<2?'0'+ this.state.Start4.split(':')[0]:this.state.Start4.split(':')[0]) + (this.state.Start4.split(':')[1].length<2?'0'+ this.state.Start4.split(':')[1]:this.state.Start4.split(':')[1]) + (this.state.End4.split(':')[0].length<2?'0'+ this.state.End4.split(':')[0]:this.state.End4.split(':')[0]) + (this.state.End4.split(':')[1].length<2?'0'+ this.state.End4.split(':')[1]:this.state.End4.split(':')[1]);
        let t5 = (this.state.Start5.split(':')[0].length<2?'0'+ this.state.Start5.split(':')[0]:this.state.Start5.split(':')[0]) + (this.state.Start5.split(':')[1].length<2?'0'+ this.state.Start5.split(':')[1]:this.state.Start5.split(':')[1]) + (this.state.End5.split(':')[0].length<2?'0'+ this.state.End5.split(':')[0]:this.state.End5.split(':')[0]) + (this.state.End5.split(':')[1].length<2?'0'+ this.state.End5.split(':')[1]:this.state.End5.split(':')[1]);
        let t6 = (this.state.Start6.split(':')[0].length<2?'0'+ this.state.Start6.split(':')[0]:this.state.Start6.split(':')[0]) + (this.state.Start6.split(':')[1].length<2?'0'+ this.state.Start6.split(':')[1]:this.state.Start6.split(':')[1]) + (this.state.End6.split(':')[0].length<2?'0'+ this.state.End6.split(':')[0]:this.state.End6.split(':')[0]) + (this.state.End6.split(':')[1].length<2?'0'+ this.state.End6.split(':')[1]:this.state.End6.split(':')[1]);
        let t7 = (this.state.Start7.split(':')[0].length<2?'0'+ this.state.Start7.split(':')[0]:this.state.Start7.split(':')[0]) + (this.state.Start7.split(':')[1].length<2?'0'+ this.state.Start7.split(':')[1]:this.state.Start7.split(':')[1]) + (this.state.End7.split(':')[0].length<2?'0'+ this.state.End7.split(':')[0]:this.state.End7.split(':')[0]) + (this.state.End7.split(':')[1].length<2?'0'+ this.state.End7.split(':')[1]:this.state.End7.split(':')[1]);

        axios.post('https://www.kwonsoryeong.tk:3000/alterState', {
          type:2,
            bang: this.state.bangcode,
            id:'/',
            pay: this.state.Salary,
            mon: (t1==null?null:t1),
            tue: (t2==null?null:t2),
            wed: (t3==null?null:t3),
            thu: (t4==null?null:t4),
            fri : (t5==null?null:t5),
            sat: (t6==null?null:t6),
            sun : (t7==null?null:t7),
            eachtime :`${this.state.time1}/${this.state.time2}/${this.state.time3}/${this.state.time4}/${this.state.time5}/${this.state.time6}/${this.state.time7}`,

        },
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
        /*fetch('https://www.kwonsoryeong.tk:3000/alterState', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type:2,
            bang: this.state.bangcode,
            id:'/',
            pay: this.state.Salary,
            mon: t1,
            tue: t2,
            wed: t3,
            thu: t4,
            fri : t5,
            sat: t6,
            sun : t7,
            eachtime :`${this.state.time1}/${this.state.time2}/${this.state.time3}/${this.state.time4}/${this.state.time5}/${this.state.time6}/${this.state.time7}`,
          }),
        }).then(res => res.json())*/
        .then(res => {
          console.log(res.data);
          this.props.navigation.navigate('Worker Home');
        })     
      

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
            :this.state.type==1?
            <Text>사업주가 아직 계약서를 작성하지 않았습니다.</Text>
            :this.state.type==2?
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
              this.handleSubmit()
              }}>
              <Text style={styles.buttonTitle}>저장하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:hp('5%')}}><Text></Text></View>
        
      </ScrollView>
      </>
      :this.state.type==4?(
        <>
        <ScrollView>
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
        <Text style={styles.marginText}>4. 근로일 및 근로일별 근로시간 :</Text> 
        <Table style={styles.wrapper} borderStyle={{borderWidth: 1}}>
                         {/* Left Wrapper */}
                        <TableWrapper style={{width:50}} >
                            <Cell data="" style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data="월" style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data="화" style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data="수" style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data="목" style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data="금" style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data="토" style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data="일" style={styles.singleHead1_2} textStyle={styles.text}/>
                        </TableWrapper>

                        <TableWrapper style={{flex:1}}>
                            <Cols data={this.state.tableData} heightArr={[30,30,30,30,30,30,30,30]} textStyle={styles.text}/>
                        </TableWrapper>
                    </Table>
        </View>
            <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>5. 임금</Text> 
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
                <Text>-초과근로에 대한 가산임금률 : </Text>
                <Text style={styles.textinput}>{this.state.AdditionalWageRate}</Text>
                <Text>%</Text>
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
            <Text style={styles.marginText}>6. 연차유급휴가</Text> 
            <Text style={styles.marginText}> - 통상근로자의 근로시간에 비례하여 연차유급휴가 부여함.</Text>
        </View>
        
        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>7. 사대보험 적용여부(해당란에 체크)</Text> 
            <Text style={styles.marginText}>고용보험:</Text><Text style={styles.textinput1}>{this.state.types4[1]==1?'O':'X'}</Text>
                <Text style={styles.marginText}>, 산재보험:</Text><Text style={styles.textinput1}>{this.state.types4[2]==1?'O':'X'}</Text>
                <Text style={styles.marginText}>, 국민연금:</Text><Text style={styles.textinput1}>{this.state.types4[3]==1?'O':'X'}</Text>
                <Text style={styles.marginText}>, 건강보험:</Text><Text style={styles.textinput1}>{this.state.types4[4]==1?'O':'X'}</Text>
        </View>

        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>8. 근로계약서 교부</Text> 
            <Text style={styles.marginText}> - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)</Text>
        </View>

        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>9. 기타</Text> 
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
      <View style={styles.buttonBottom}>
          <Button 
            title="저장하기"
            onPress={()=>{
                this.setState({tableData:[]})
                this.handleSubmit2()
            }}/>
        </View>
      </ScrollView></>)
      :this.state.type==5?
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
      :<></>
    
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