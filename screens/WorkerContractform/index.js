const axios = require('axios');
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, ImageBackground, Image} from 'react-native';
import { Table, TableWrapper,Row, Rows,  Col, Cols, Cell } from 'react-native-table-component';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckboxGroup from 'react-native-checkbox-group';
import * as Font from 'expo-font';

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
        htmlContent:'',
        tableHead:['','????????????','???????????????','????????????'],
        tableTitle: ['???', '???', '???', '???', '???', '???', '???'],
    };
  }
  componentDidMount(){
    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode:bangCode});
        AsyncStorage.getItem("userData").then((userData) => {
          this.setState({idid:JSON.parse(userData).id})
          this.fetchHtml(bangCode,JSON.parse(userData).id);
        });
      })
    /*AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangcode:bangCode});
        this.fetchHtml(bangCode);
      })*/
  }

  StatementScreen = async() => {
      let sign="";
      let bsign="";
      let idid2="";

      let signOrStamp = '';
      axios.post('https://??????.kr/api/selectBusinessByName', {
        bname : this.state.bangCode
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        }).then(res => {
          idid2 = res.data[0].id;
          if(res.data[0].stamp ==1){
            signOrStamp = `<img src="https://??????.kr/api/${this.state.bang}.png" alt="??????" z-index="2" width="100" height="100"></img>`
          }
      axios.post('https://??????.kr/api/selectSign', {
        id:this.state.idid,
        id2:idid2
      },
      {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
      .then(async(res) => {
          sign = res.data[0].sign;
          bsign = res.data[1].sign;
          if(signOrStamp ==''){
            signOrStamp = `<svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                <polyline points="${String(bsign)}"
                    style="fill:none;stroke:black;stroke-width:3" />
            </svg>`
          }
          console.log(sign)
          const htmlContent = `
                <!DOCTYPE html>
      <html>
          <head>
              <meta charset="UTF-8">
              <title>??????????????? ??????/??????</title>
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
              <span>?????????????????????</span>
              <form>
                  <hr><br>
                  <label class="text_underline">${this.state.Employer}</label>
                  <label>(?????? "?????????"??? ???) ???(???)</label>
                  <label class="text_underline">${this.state.Employee}</label>
                  <label>(?????? "?????????"??? ???) ??? ????????? ?????? ??????????????? ????????????.</label><br><br>
          
                  <label>1. ?????????????????? :</label> 
                  <label class="text_underline">${this.state.StartYear}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.StartMonth}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.StartDay}</label>
                  <label>?????????</label>
      
                  <label class="text_underline">${this.state.EndYear==null?'-':this.state.EndYear}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.EndMonth==null?'-':this.state.EndMonth}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.EndDay==null?'-':this.state.EndDay}</label>
                  <label>?????????</label><br>
                  
                  <label>2. ??? ??? ??? ??? : </label>
                  <label>${this.state.WorkPlace}</label><br>
                  
                  
                  <label>3. ????????? ?????? : </label>
                  <label>${this.state.WorkReference}</label><br>
      
                  <label>4. ?????????????????? :</label> 
                  <label class="text_underline">${this.state.StartTimeHour}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.StartTimeHMin}</label>
                  <label>????????? </label>
                  <label class="text_underline">${this.state.EndTimeHour}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.EndTimeHMin}</label>
                  <label>?????????</label>
                  <label>(???????????? : </label>
                  <label class="text_underline">${this.state.BreakTimeStartHour}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.BreakTimeStartMin}</label>
                  <label>???~</label>
                  <label class="text_underline">${this.state.BreakTimeEndHour}</label>
                  <label>???</label>
                  <label class="text_underline">${this.state.BreakTimeEndMin}</label>
                  <label>???)</label><br>
      
                  <label>5. ?????????/?????? : ??????</label> 
                  <label class="text_underline">${this.state.WorkingDays}</label>
                  <label>???(?????? ????????????)??????, ????????? ??????</label>
                  <label class="text_underline">${this.state.Holiday}</label>
                  <label>???</label><br>
          
                  <label>6. ??? ???</label><br>
                  <label class="margin_left">- ?????? : </label>
                  <label class="text_underline">${this.state.Salary}</label>
                  <Text>???</Text><br>
      
                  <label class="margin_left">- ????????? : </label>
                  <label for="bonusYes">${this.state.types1}</label>
                  <label class="text_underline">${this.state.Bonus}</label>
                  <label>???</label><br>
      
                  <label class="margin_left">- ????????????(????????? ???) : </label>
                  <label for="bonus2Yes">${this.state.types2}</label><br>
                  <label class="text_underline_margin_left">${this.state.Bonus1}</label>
                  <label>???, </label>
                  <label class="text_underline_margin_left">${this.state.Bonus2}</label>
                  <label>???, </label>
                  <label class="text_underline_margin_left">${this.state.Bonus3}</label>
                  <label>???, </label>
                  <label class="text_underline_margin_left">${this.state.Bonus4}</label>
                  <label>??? </label><br>
                  <label class="margin_left">- ?????????????????? :</label> 
                  <label class="text_underline">${this.state.SalaryCalculationPeriodStart}</label>
                  <label>???~</label>
                  <label class="text_underline">${this.state.SalaryCalculationPeriodEnd}</label>
                  <label>???</label><br>
                  <label class="margin_left">- ??????????????? : ??????</label>
                  <label class="text_underline">10</label>
                  <label>??? (????????? ???????????? ?????? ??????)</label><br>
                  <label class="margin_left">- ???????????? : </label>
                  <label for="wayOfPayment1">${this.state.types3}</label><br>
      
                  <label>7. ??????????????????</label><br>
                  <label class="margin_left"> - ????????????????????? ????????????????????? ????????? ?????? ?????? ?????????.</label><br>
      
                  <label>8. ???????????? ????????????(???????????? ??????)</label> <br>
                  
                  <label class="margin_left">???????????? ${this.state.types4[1]==1?'O':'X'}</label>
                  <label class="margin_left">???????????? ${this.state.types4[2]==1?'O':'X'}</label>
                  <label class="margin_left">???????????? ${this.state.types4[3]==1?'O':'X'}</label>
                  <label class="margin_left">???????????? ${this.state.types4[4]==1?'O':'X'}</label><br>
        
                  <label>9. ??????????????? ??????</label> <br>
                  <label class="margin_left"> - '?????????'??? ??????????????? ???????????? ????????? ??? ???????????? ???????????? ???????????? ??????????????? ???????????? '?????????'?????? ?????????(??????????????? ???17??? ??????)</label><br>
      
                  <label>10. ??????</label><br>
                  <label class="margin_left"> - ??? ????????? ????????? ?????? ????????? ????????????????????? ??????</label><br><br>
                  
                  <div class="contract_day">
                  <label>${this.state.ContractYear}</label>
                  <label>???</label>
                  <label>${this.state.ContractMonth}</label>
                  <label>???</label>
                  <label>${this.state.ContractDay}</label>
                  <label>???</label></div><br>
                
                  <label>(?????????)</label>
                  <label>???????????? : </label>
                  <label>${this.state.BusinessName}</label>
                  <label class="margin_left2">(??? ??? : </label>
                  <label>${this.state.BusinessPhone}</label>
                  <label>) </label><br>
                  <label class="margin_left2">???    ??? : </label>
                  <label>${this.state.BusinessAddress}</label><br>
                  <label class="margin_left2">??? ??? ??? : </label>
                  <label>${this.state.BusinessOwner1}</label>
                  <label class="margin_left2">(??????)</label>${signOrStamp}<br><br><br>
      
                  <label>(?????????)</label>
                  <label>??? ??? : </label>
                  <label>${this.state.EmployeeAddress}</label><br>
                  <label class="margin_left2">??? ??? ??? : </label>
                  <label>${this.state.EmployeePhone}</label><br>
                  <label class="margin_left2">???    ??? : </label>
                  <label>${this.state.EmployeeName}</label><svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="${String(sign)}"
                  style="fill:none;stroke:black;stroke-width:3" />
                  </svg>
                  <label class="margin_left2">(??????)</label>
                  
              </form>
      
                    
                </body>
                </html>
                `
      
                this.setState({htmlContent : htmlContent})
      
              });
              });

        }
  
  StatementScreen2 = async() => {
    let sign="";
      let bsign="";
      let idid2="";
      let signOrStamp = '';

      axios.post('https://??????.kr/api/selectBusinessByName', {
        bname : this.state.bangCode
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        }).then(res => {
          idid2 = res.data[0].id;
          if(res.data[0].stamp ==1){
            signOrStamp = `<img src="https://??????.kr/api/${this.state.bang}.png" alt="??????" z-index="2" width="100" height="100"></img>`
          }
      axios.post('https://??????.kr/api/selectSign', {
        id:this.state.idid,
        id2:idid2
      },
      {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
      })
      .then(async(res) => {
          sign = res.data[0].sign;
          bsign = res.data[1].sign;
          if(signOrStamp ==''){
            signOrStamp = `<svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                <polyline points="${String(bsign)}"
                    style="fill:none;stroke:black;stroke-width:3" />
            </svg>`
          }
          console.log(sign)
    const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>??????????????? ??????/??????</title>
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
                <span>?????????????????? ?????????????????????</span>
                <hr><br>
                <label class="text_underline">${this.state.Employer}</label>
                <label>(?????? "?????????"??? ???) ???(???)</label>
                <label class="text_underline">${this.state.Employee}</label>
                <label>(?????? "?????????"??? ???) ??? ????????? ?????? ??????????????? ????????????.</label><br><br>
        
                <label>1. ?????????????????? :</label> 
                <label class="text_underline">${this.state.StartYear}</label>
                <label>???</label>
                <label class="text_underline">${this.state.StartMonth}</label>
                <label>???</label>
                <label class="text_underline">${this.state.StartDay}</label>
                <label>?????????</label>
    
                <label class="text_underline">${this.state.EndYear==null?'-':this.state.EndYear}</label>
                <label>???</label>
                <label class="text_underline">${this.state.EndMonth==null?'-':this.state.EndMonth}</label>
                <label>???</label>
                <label class="text_underline">${this.state.EndDay==null?'-':this.state.EndDay}</label>
                <label>?????????</label><br>
                
                <label>2. ??? ??? ??? ??? : </label>
                <label>${this.state.WorkPlace}</label><br>
                
                
                <label>3. ????????? ?????? : </label>
                <label>${this.state.WorkReference}</label><br>
    
                <label>4. ????????? ??? ???????????? ????????????</label> 
                <table>
                    <th>    </th><th>????????????</th><th>???????????????</th><th>????????????</th>
                    <tr><td>?????????</td><td>${this.state.Start1}</td><td>${this.state.End1}</td><td>${this.state.time1}</td></tr>
                    <tr><td>?????????</td><td>${this.state.Start2}</td><td>${this.state.End2}</td><td>${this.state.time2}</td></tr>
                    <tr><td>?????????</td><td>${this.state.Start3}</td><td>${this.state.End3}</td><td>${this.state.time3}</td></tr>
                    <tr><td>?????????</td><td>${this.state.Start4}</td><td>${this.state.End4}</td><td>${this.state.time4}</td></tr>
                    <tr><td>?????????</td><td>${this.state.Start5}</td><td>${this.state.End5}</td><td>${this.state.time5}</td></tr>
                    <tr><td>?????????</td><td>${this.state.Start6}</td><td>${this.state.End6}</td><td>${this.state.time6}</td></tr>
                    <tr><td>?????????</td><td>${this.state.Start7}</td><td>${this.state.End7}</td><td>${this.state.time7}</td></tr>
                </table><br>
        
                <label>5. ??? ???</label><br>
                <label class="margin_left">- ?????? : </label>
                <label class="text_underline">${this.state.Salary}</label>
                <Text>???</Text><br>
    
                <label class="margin_left">- ????????? : </label>
                <label for="bonusYes">${this.state.types1}</label>
                <label class="text_underline">, ${this.state.Bonus}</label>
                <label>???</label><br>
    
                <label class="margin_left">- ????????????(????????? ???) : </label>
                <label for="bonus2Yes">${this.state.types2}</label><br>
                <label class="text_underline_margin_left">${this.state.Bonus1}</label>
                <label>???, </label>
                <label class="text_underline_margin_left">${this.state.Bonus2}</label>
                <label>???, </label>
                <label class="text_underline_margin_left">${this.state.Bonus3}</label>
                <label>???, </label>
                <label class="text_underline_margin_left">${this.state.Bonus4}</label>
                <label>??? </label><br>
    
                <label class="margin_left">- ??????????????? ?????? ???????????????</label>
                <label class="text_underline">${this.state.AdditionalWageRate}</label>
                <label>%</label><br>
                <label class="margin_left">- ?????????????????? :</label> 
                <label class="text_underline">${this.state.SalaryCalculationPeriodStart}</label>
                <label>???~</label>
                <label class="text_underline">${this.state.SalaryCalculationPeriodEnd}</label>
                <label>???</label><br>
                <label class="margin_left">- ??????????????? : ??????(?????? ?????? ??????)</label>
                <label class="text_underline">${this.state.SalaryDay}</label>
                <label>??? (????????? ???????????? ?????? ??????)</label><br>
                <label class="margin_left">- ???????????? : </label>
                <label for="wayOfPayment1">${this.state.types3}</label><br>
    
                <label>7. ??????????????????</label><br>
                <label class="margin_left"> - ?????????????????? ??????????????? ???????????? ?????????????????? ?????????.</label><br>
    
                <label>8. ???????????? ????????????(???????????? ??????)</label> <br>
                
                <label class="margin_left">???????????? ${this.state.types4[1]==1?'O':'X'}</label>
                <label class="margin_left">???????????? ${this.state.types4[2]==1?'O':'X'}</label>
                <label class="margin_left">???????????? ${this.state.types4[3]==1?'O':'X'}</label>
                <label class="margin_left">???????????? ${this.state.types4[4]==1?'O':'X'}</label><br>

                <label>9. ??????????????? ??????</label> <br>
                <label class="margin_left"> - '?????????'??? ??????????????? ???????????? ????????? ??? ???????????? ???????????? ???????????? ??????????????? ???????????? '?????????'?????? ?????????(??????????????? ???17??? ??????)</label><br>
    
                <label>10. ??????</label><br>
                <label class="margin_left"> - ??? ????????? ????????? ?????? ????????? ????????????????????? ??????</label><br><br>
                
                <div class="contract_day">
                <label>${this.state.ContractYear}</label>
                <label>???</label>
                <label>${this.state.ContractMonth}</label>
                <label>???</label>
                <label>${this.state.ContractDay}</label>
                <label>???</label></div><br>

                <label>(?????????)</label>
                <label>???????????? : </label>
                <label>${this.state.BusinessName}</label>
                <label class="margin_left2">(??? ??? : </label>
                <label>${this.state.BusinessPhone}</label>
                <label>) </label><br>
                <label class="margin_left2">???    ??? : </label>
                <label>${this.state.BusinessAddress}</label><br>
                <label class="margin_left2">??? ??? ??? : </label>
                <label>${this.state.BusinessOwner1}</label>
                <label class="margin_left2">(??????)</label>${signOrStamp}<br><br><br>

                <label>(?????????)</label>
                <label>??? ??? : </label>
                <label>${this.state.EmployeeAddress}</label><br>
                <label class="margin_left2">??? ??? ??? : </label>
                <label>${this.state.EmployeePhone}</label><br>
                <label class="margin_left2">???    ??? : </label>
                <label>${this.state.EmployeeName}</label><svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                <polyline points="${String(sign)}"
                style="fill:none;stroke:black;stroke-width:3" />
                </svg>
                <label class="margin_left2">(??????)</label>
            </form>
        </body>
    </html>`

          this.setState({htmlContent : htmlContent})
        });
  });
}
  
      
    

  createAndSavePDF = async (html) => {
      try {
        const { uri } = await Print.printToFileAsync({ html },base64=true);
        Sharing.shareAsync(uri);  
      } catch (error) {
        console.error(error);
      }
    };

    fetchHtml = async(bangCode,idid) => {
    axios.post('https://??????.kr/api/selectContractform', {
      bang:bangCode,
      id: idid,
    },
    {  headers:{
      'Content-Type': 'application/json',
    'Accept': 'application/json'}
    })
    /*await fetch('https://??????.kr/api/selectContractform', {
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
          if(res.data[0].value1Index == 0){
            res.data[0].types1 = "??????"
        }
        else{
            res.data[0].types1 = "??????"
        }
        
        if(res.data[0].value2Index == 0){
            res.data[0].types2 = "??????"
        }
        else{
            res.data[0].types2 = "??????"
        }

        if(JSON.parse(res.data[0].types3)[0].value == 1){
            res.data[0].types3 = "??????????????? ?????? ??????"
        }
        else{
            res.data[0].types3 = "????????? ?????? ??????????????? ??????"
        }

        if(res.data[0].Bonus == null) res.data[0].Bonus = 0
        if(res.data[0].Bonus1 == null) res.data[0].Bonus1 = 0
        if(res.data[0].Bonus2 == null) res.data[0].Bonus2 = 0
        if(res.data[0].Bonus3 == null) res.data[0].Bonus3 = 0
        if(res.data[0].Bonus4 == null) res.data[0].Bonus4 = 0
        if(res.data[0].AdditionalWageRate == null) res.data[0].AdditionalWageRate = 0
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

          axios.post('https://??????.kr/api/selectContractform2', {
            bang:bangCode, id: idid,
          },
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
          /*fetch('https://??????.kr/api/selectContractform2', {
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
            if(res.data[0].value1Index == 0){
              res.data[0].types1 = "??????"
            }
            else{
                res.data[0].types1 = "??????"
            }
            
            if(res.data[0].value2Index == 0){
                res.data[0].types2 = "??????"
            }
            else{
                res.data[0].types2 = "??????"
            }

            if(JSON.parse(res.data[0].types3)[0].value == 1){
                res.data[0].types3 = "??????????????? ?????? ??????"
            }
            else{
                res.data[0].types3 = "????????? ?????? ??????????????? ??????"
            }

            if(res.data[0].Bonus == null) res.data[0].Bonus = 0
            if(res.data[0].Bonus1 == null) res.data[0].Bonus1 = 0
            if(res.data[0].Bonus2 == null) res.data[0].Bonus2 = 0
            if(res.data[0].Bonus3 == null) res.data[0].Bonus3 = 0
            if(res.data[0].Bonus4 == null) res.data[0].Bonus4 = 0
            if(res.data[0].AdditionalWageRate == null) res.data[0].AdditionalWageRate = 0
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
        }})
    }
  })}


  handleSubmit(){
    if(this.state.EmployeeAddress==null
        ||this.state.EmployeePhone==null
        ||this.state.EmployeeName==null){
        Alert.alert('????????? ???????????????.')    

    } else{
        this.fetch();
        Alert.alert('?????????????????????.')    
    }
  }

  fetch = async() => {
          axios.post('https://??????.kr/api/updateContractform', this.state,
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
    /*await fetch('https://??????.kr/api/updateContractform', {
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

        axios.post('https://??????.kr/api/alterState', {
          type:2,
          bang: this.state.bang,
          id:this.state.id,
          pay: this.state.Salary,
          mon: time,
          tue:time,
          wed: time,
          thu: time,
          fri : time,
          sat: null,
          sun : null,
          eachtime :`${tt}/${tt}/${tt}/${tt}/${tt}/0/0`,
          startdate:`${this.state.StartYear}/${this.state.StartMonth}/${this.state.StartDay}`,
          endtime:`${this.state.EndYear}/${this.state.EndMonth}/${this.state.EndDay}`,
        },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
        .then(res => {
          console.log(res.data);
          this.props.navigation.navigate('Worker Home',{state:2});
        })     

        axios.post('https://??????.kr/api/selectBusinessByName', {
          bname : this.state.bang
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
          .then(res => {
            try {
              axios.post('https://??????.kr/api/sendMessage', {
                t: res.data[0].id,
                message :"<"+this.state.bang+"> ????????? '"+this.state.id+"'??? ???????????? ?????? ??????????????????. ???????????? ???????????? ????????? ??? ????????????.",
                f: this.state.id,
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


      }

    }
    handleSubmit2(){
      if(this.state.EmployeeAddress==null
          ||this.state.EmployeePhone==null
          ||this.state.EmployeeName==null){
          Alert.alert('????????? ???????????????.')    
  
      } else{
          this.fetch2();
          Alert.alert('?????????????????????.')    
      }
    }

    
  fetch2 = async() => {
    axios.post('https://??????.kr/api/updateContractform2', {
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
    /*await fetch('https://??????.kr/api/updateContractform2', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
    }),
      }).then(res => res.json())*/
      .then(res => {})     
      
        let t1 = this.state.Start1=='X'?null:(this.state.Start1.split(':')[0].length<2?'0'+ this.state.Start1.split(':')[0]:this.state.Start1.split(':')[0]) + (this.state.Start1.split(':')[1].length<2?'0'+ this.state.Start1.split(':')[1]:this.state.Start1.split(':')[1]) + (this.state.End1.split(':')[0].length<2?'0'+ this.state.End1.split(':')[0]:this.state.End1.split(':')[0]) + (this.state.End1.split(':')[1].length<2?'0'+ this.state.End1.split(':')[1]:this.state.End1.split(':')[1]);
        let t2 = this.state.Start2=='X'?null:(this.state.Start2.split(':')[0].length<2?'0'+ this.state.Start2.split(':')[0]:this.state.Start2.split(':')[0]) + (this.state.Start2.split(':')[1].length<2?'0'+ this.state.Start2.split(':')[1]:this.state.Start2.split(':')[1]) + (this.state.End2.split(':')[0].length<2?'0'+ this.state.End2.split(':')[0]:this.state.End2.split(':')[0]) + (this.state.End2.split(':')[1].length<2?'0'+ this.state.End2.split(':')[1]:this.state.End2.split(':')[1]);
        let t3 = this.state.Start3=='X'?null:(this.state.Start3.split(':')[0].length<2?'0'+ this.state.Start3.split(':')[0]:this.state.Start3.split(':')[0]) + (this.state.Start3.split(':')[1].length<2?'0'+ this.state.Start3.split(':')[1]:this.state.Start3.split(':')[1]) + (this.state.End3.split(':')[0].length<2?'0'+ this.state.End3.split(':')[0]:this.state.End3.split(':')[0]) + (this.state.End3.split(':')[1].length<2?'0'+ this.state.End3.split(':')[1]:this.state.End3.split(':')[1]);
        let t4 = this.state.Start4=='X'?null:(this.state.Start4.split(':')[0].length<2?'0'+ this.state.Start4.split(':')[0]:this.state.Start4.split(':')[0]) + (this.state.Start4.split(':')[1].length<2?'0'+ this.state.Start4.split(':')[1]:this.state.Start4.split(':')[1]) + (this.state.End4.split(':')[0].length<2?'0'+ this.state.End4.split(':')[0]:this.state.End4.split(':')[0]) + (this.state.End4.split(':')[1].length<2?'0'+ this.state.End4.split(':')[1]:this.state.End4.split(':')[1]);
        let t5 = this.state.Start5=='X'?null:(this.state.Start5.split(':')[0].length<2?'0'+ this.state.Start5.split(':')[0]:this.state.Start5.split(':')[0]) + (this.state.Start5.split(':')[1].length<2?'0'+ this.state.Start5.split(':')[1]:this.state.Start5.split(':')[1]) + (this.state.End5.split(':')[0].length<2?'0'+ this.state.End5.split(':')[0]:this.state.End5.split(':')[0]) + (this.state.End5.split(':')[1].length<2?'0'+ this.state.End5.split(':')[1]:this.state.End5.split(':')[1]);
        let t6 = this.state.Start6=='X'?null:(this.state.Start6.split(':')[0].length<2?'0'+ this.state.Start6.split(':')[0]:this.state.Start6.split(':')[0]) + (this.state.Start6.split(':')[1].length<2?'0'+ this.state.Start6.split(':')[1]:this.state.Start6.split(':')[1]) + (this.state.End6.split(':')[0].length<2?'0'+ this.state.End6.split(':')[0]:this.state.End6.split(':')[0]) + (this.state.End6.split(':')[1].length<2?'0'+ this.state.End6.split(':')[1]:this.state.End6.split(':')[1]);
        let t7 = this.state.Start7=='X'?null:(this.state.Start7.split(':')[0].length<2?'0'+ this.state.Start7.split(':')[0]:this.state.Start7.split(':')[0]) + (this.state.Start7.split(':')[1].length<2?'0'+ this.state.Start7.split(':')[1]:this.state.Start7.split(':')[1]) + (this.state.End7.split(':')[0].length<2?'0'+ this.state.End7.split(':')[0]:this.state.End7.split(':')[0]) + (this.state.End7.split(':')[1].length<2?'0'+ this.state.End7.split(':')[1]:this.state.End7.split(':')[1]);

        axios.post('https://??????.kr/api/alterState', {
          type:2,
            bang: this.state.bang,
            id:this.state.id,
            pay: this.state.Salary,
            mon: (t1==null?null:t1),
            tue: (t2==null?null:t2),
            wed: (t3==null?null:t3),
            thu: (t4==null?null:t4),
            fri : (t5==null?null:t5),
            sat: (t6==null?null:t6),
            sun : (t7==null?null:t7),
            eachtime :`${this.state.time7=='X'?0:this.state.time7}/${this.state.time1=='X'?0:this.state.time1}/${this.state.time2=='X'?0:this.state.time2}/${this.state.time3=='X'?0:this.state.time3}/${this.state.time4=='X'?0:this.state.time4}/${this.state.time5=='X'?0:this.state.time5}/${this.state.time6=='X'?0:this.state.time6}`,
            startdate:`${this.state.StartYear}/${this.state.StartMonth}/${this.state.StartDay}`,
            enddate:`${this.state.EndYear}/${this.state.EndMonth}/${this.state.EndDay}`,
          },
          {  headers:{
            'Content-Type': 'application/json',
          'Accept': 'application/json'}
          })
        .then(res => {
          console.log(res.data);
          this.props.navigation.navigate('Worker Home',{state:2});
        })     
        
        axios.post('https://??????.kr/api/selectBusinessByName', {
          bname : this.state.bang
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
          .then(res => {
            try {
              axios.post('https://??????.kr/api/sendMessage', {
                t: res.data[0].id,
                message :"<"+this.state.bang+"> ????????? '"+this.state.id+"'??? ???????????? ?????? ??????????????????. ???????????? ???????????? ????????? ??? ????????????.",
                f: this.state.id,
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


    }
  
  render() {
    return (
      <View style={styles.image}>
        <View  style={styles.container}>
        {
          this.state.type==3?
          <>
{/*           
          <WebView
        originWhitelist={['*']}
        source={{ html: this.state.htmlContent }}
        style={{ marginTop: 20 }}
      />
      <Button
              title="????????????"
              color="#FF3232"
              onPress={()=>{this.createAndSavePDF(this.state.htmlContent)}}/> */}
              <View style={{ width:'100%', height:hp('70%'), marginTop:hp('1%')}}>
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
                    <Image style={styles.excelBtn} source={require('../../img/excel_purple.png')}></Image>
                </TouchableOpacity>
            </View>
            </>
            :this.state.type==1?
            <View style={{marginTop:hp('3%')}}>
              <Text style={styles.textTitleStyle_1}>???????????? ?????? ???????????? ???????????? ???????????????.</Text>
            </View>
            :this.state.type==2?
            <>
        <Text style={styles.textTitle}> ???????????????</Text>
        <ScrollView>
        <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
            <Text style={styles.textinputName1}>{this.state.Employer}</Text>
            <Text style={styles.textTitleStyle}>(?????? "?????????"??? ???) ???(???)</Text>
            </View>
            <View style={styles.textAreaRow}>
            <Text style={styles.textinputName1}>{this.state.Employee}</Text>
            <Text style={styles.textTitleStyle}>(?????? "?????????"??? ???) ??? </Text>
            </View>
            <Text style={styles.textTitleStyle_1}>????????? ?????? ??????????????? ????????????.</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>1. ?????????????????? :</Text> 
          <View style={styles.rowPeriod}>
            <Text style={styles.textinputYearStyle}>{this.state.StartYear}</Text>
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.StartMonth}</Text>
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.StartDay}</Text>
            <Text style={styles.textStyle}>?????????</Text>
          </View>
          <View style={styles.rowPeriod2}>
            <Text style={styles.textinputYearStyle}>{this.state.EndYear}</Text>
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.EndMonth}</Text>
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.EndDay}</Text>
            <Text style={styles.textStyle}>?????????</Text>
            </View>
        </View>
        
        <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
            <Text style={styles.textTitleStyle}>2. ???????????? : </Text>
            <Text style={styles.textStyle}>{this.state.WorkPlace}</Text>
            </View>
        </View>
        
        
        <View style={styles.textArea}>
        <View style={styles.textAreaRow}>
          <Text style={styles.textTitleStyle}>3. ????????? ?????? : </Text>
          <Text style={styles.textStyle}>{this.state.WorkReference}</Text>
        </View>
        </View>


        <View style={styles.textArea}>
        <View style={styles.textTitleStyle}>
        <Text style={styles.textTitleStyle}>4. ?????????????????? :</Text> 
        <View style={styles.rowPeriod}>
            <Text style={styles.textinputDayStyle}>{this.state.StartTimeHour}</Text> 
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.StartTimeHMin}</Text>
            <Text style={styles.textStyle}>??? ~ </Text>
            <Text style={styles.textinputDayStyle}>{this.state.EndTimeHour}</Text>
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.EndTimeHMin}</Text>
            <Text style={styles.textStyle}>??? </Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>????????????</Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeStartHour}</Text>
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeStartMin}</Text>
            <Text style={styles.textStyle}>??? ~ </Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeEndHour}</Text>
            <Text style={styles.textStyle}>???</Text>
            <Text style={styles.textinputDayStyle}>{this.state.BreakTimeEndMin}</Text>
            <Text style={styles.textStyle}>??? </Text>
        </View>
        </View>
        </View>


        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>5. ?????????/?????? : </Text> 
        
          <View style={styles.rowPeriod}>    
            <Text style={styles.textStyle}>?????? </Text>
            <Text style={styles.textinputDayStyle}>{this.state.WorkingDays}</Text>
            <Text style={styles.textStyle}>??? ??????, </Text>
            </View>
            <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>????????? ??????</Text>
            <Text style={styles.textinputDayStyle}>{this.state.Holiday}</Text>
            <Text style={styles.textStyle}>??? </Text>
        </View>
        </View>


            <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>5. ??????</Text> 
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-?????? : </Text>
                <Text style={styles.textinputName}>{this.state.Salary}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-????????? : </Text>
                <Text style={styles.textinputName}>{this.state.types1}</Text>
                <Text style={styles.textStyle}>, </Text>
                <Text style={styles.textinputName}>{this.state.Bonus}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-????????????(????????? ???) : </Text>
                <Text style={styles.textinputName}>{this.state.types2}</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textinputName}>{this.state.Bonus1}</Text>
                <Text style={styles.textStyle}>???, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName}>{this.state.Bonus2}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textinputName}>{this.state.Bonus3}</Text>
                <Text style={styles.textStyle}>???, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName}>{this.state.Bonus4}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-??????????????? ?????? ??????????????? : </Text>
                <Text style={styles.textinputDayStyle}>{this.state.AdditionalWageRate}</Text>
                <Text style={styles.textStyle}>%</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-?????????????????? : </Text>
                <Text style={styles.textinputDayStyle}>{this.state.SalaryCalculationPeriodStart}</Text>
                <Text style={styles.textStyle}>??? ~ </Text>
                <Text style={styles.textinputDayStyle}>{this.state.SalaryCalculationPeriodEnd}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-??????????????? : ??????(?????? ?????? ??????)</Text>
                <Text style={styles.textinputDayStyle}>{this.state.SalaryDay}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={{marginLeft:wp('30%')}}>
                <Text style={styles.textStyle}>(????????? ???????????? ?????? ??????)</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-???????????? : </Text>
                <Text style={styles.textStyle}>{this.state.types3}</Text>
            </View>
            </View>

        
        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>7. ??????????????????</Text> 
            <Text style={styles.textLineStyle}> - ????????????????????? ????????????????????? ????????? ?????? ?????? ?????????</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>8. ???????????? ????????????(???????????? ??????)</Text> 
            <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[1]==1?'O':'X'}</Text>
            <Text style={styles.textStyle}>, ????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[2]==1?'O':'X'}</Text><Text style={styles.textStyle}>, </Text>
            </View>
            <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[3]==1?'O':'X'}</Text>
            <Text style={styles.textStyle}>, ????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[4]==1?'O':'X'}</Text>
            </View>
            
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>9. ??????????????? ??????</Text> 
            <Text style={styles.textLineStyle}> - ???????????? ??????????????? ???????????? ????????? ??? ???????????? ???????????? ???????????? ??????????????? ???????????? ??????????????? ?????????(??????????????? ???17??? ??????)</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>10. ??????</Text> 
            <Text style={styles.textLineStyle}> - ??? ????????? ????????? ?????? ????????? ????????????????????? ??????</Text>
        </View>
        

        <View style={styles.rowPeriod3}> 
          <Text style={styles.textinputYearStyle}>{this.state.ContractYear}</Text>
          <Text style={styles.textTitleStyle}>???</Text>
          <Text style={styles.textinputDayStyle}>{this.state.ContractMonth}</Text>
          <Text style={styles.textTitleStyle}>???</Text>
          <Text style={styles.textinputDayStyle}>{this.state.ContractDay}</Text>         
          <Text style={styles.textTitleStyle}>???</Text>       
        </View>
      
      <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>?????????</Text>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>???????????? : </Text>
            <Text style={styles.textinputStyle1}>{this.state.BusinessName}</Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>?????? : </Text>
            <Text style={styles.textinputStyle1}>{this.state.BusinessAddress}</Text>
        </View>        
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>???????????? : </Text>
            <Text style={styles.textinputStyle1}>{this.state.BusinessPhone}</Text>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>????????? : </Text>
            <Text style={styles.textinputStyle1}>{this.state.BusinessOwner1}</Text>
        </View>
      </View>

      <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>?????????</Text>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>?????? : </Text>
            <TextInput
                value={this.state.EmployeeAddress} 
                onChangeText={(EmployeeAddress) => this.setState({EmployeeAddress})}
                ref={(input) => { this.TextInput36 = input; }}
                onSubmitEditing={() => { this.TextInput37.focus(); }}
                blurOnSubmit={false}
                placeholder={'????????? ??????'}
                style={styles.textinputStyle}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>????????? : </Text>
            <TextInput
                value={this.state.EmployeePhone} 
                onChangeText={(EmployeePhone) => this.setState({EmployeePhone})}
                ref={(input) => { this.TextInput37 = input; }}
                onSubmitEditing={() => { this.TextInput38.focus(); }}
                blurOnSubmit={false}
                placeholder={'?????????'}
                style={styles.textinputStyle}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>?????? : </Text>
            <TextInput
                value={this.state.EmployeeName} 
                onChangeText={(EmployeeName) => this.setState({EmployeeName})}
                ref={(input) => { this.TextInput38 = input; }}
                placeholder={'????????? ??????'}
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
              <Text style={styles.buttonTitle}>????????????</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:hp('5%')}}><Text></Text></View>
        
      </ScrollView>
      </>
      :this.state.type==4?(
        <>
        <ScrollView>
        <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
            <Text style={styles.textinputName1}>{this.state.Employer}</Text>
            <Text style={styles.textTitleStyle}>(?????? "?????????"??? ???) ???(???)</Text>
            </View>
            <View style={styles.textAreaRow}>
            <Text style={styles.textinputName1}>{this.state.Employee}</Text>
            <Text style={styles.textTitleStyle}>(?????? "?????????"??? ???) ??? </Text>
            </View>
            <Text style={styles.textTitleStyle_1}>????????? ?????? ??????????????? ????????????.</Text>
        </View>
        
        <View style={styles.textArea}>
                <Text style={styles.textTitleStyle}>1. ?????????????????? :</Text> 
                <View style={styles.rowPeriod}>
                  <Text style={styles.textinputYearStyle}>{this.state.StartYear}</Text>
                  <Text style={styles.textStyle}>???</Text>
                  <Text style={styles.textinputDayStyle}>{this.state.StartMonth}</Text>
                  <Text style={styles.textStyle}>???</Text>
                  <Text style={styles.textinputDayStyle}>{this.state.StartDay}</Text>
                  <Text style={styles.textStyle}>?????????</Text>
                </View>
                <View style={styles.rowPeriod2}>
                  <Text style={styles.textinputYearStyle}>{this.state.EndYear}</Text>
                  <Text style={styles.textStyle}>???</Text>
                  <Text style={styles.textinputDayStyle}>{this.state.EndMonth}</Text>
                  <Text style={styles.textStyle}>???</Text>
                  <Text style={styles.textinputDayStyle}>{this.state.EndDay}</Text>
                  <Text style={styles.textStyle}>?????????</Text>
                </View>
            </View>
            
            <View style={styles.textArea}>
                <View style={styles.textAreaRow}>
                <Text style={styles.textTitleStyle}>2. ???????????? : </Text>
                <Text style={styles.textinputStyle1}>{this.state.WorkPlace}</Text>
                </View>
            </View>
            
            
            <View style={styles.textArea}>
            <View style={styles.textAreaRow}>
              <Text style={styles.textTitleStyle}>3. ????????? ?????? : </Text>
              <Text style={styles.textinputStyle1}>{this.state.WorkReference}</Text>
            </View>
            </View>

            <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>4. ????????? ??? ???????????? ???????????? :</Text> 
        <View style={styles.tableArea}>
        <Table borderStyle={{borderWidth: 1, borderColor:'white'}}>
            <Row data={this.state.tableHead} flexArr={[0.5, 1, 1, 1]} style={styles.head} textStyle={styles.tableTextStyle}/>
            <TableWrapper style={styles.wrapper}>
                <Col data={this.state.tableTitle} style={styles.title} heightArr={[hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%'),hp('5.5%')  ]} textStyle={styles.tableTextStyle}/>
                <Rows data={this.state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.tableTextStyle}/>
            </TableWrapper>
        </Table>
        </View>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>5. ??????</Text> 
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-?????? : </Text>
                <Text style={styles.textinputName}>{this.state.Salary}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-????????? : </Text>
                <Text style={styles.textinputName}>{this.state.types1}</Text>
                <Text style={styles.textStyle}>, </Text>
                <Text style={styles.textinputName}>{this.state.Bonus}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-????????????(????????? ???) : </Text>
                <Text style={styles.textinputName}>{this.state.types2}</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textinputName}>{this.state.Bonus1}</Text>
                <Text style={styles.textStyle}>???, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName}>{this.state.Bonus2}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textinputName}>{this.state.Bonus3}</Text>
                <Text style={styles.textStyle}>???, </Text>
                <Text style={{marginLeft:wp('5%')}}></Text>
                <Text style={styles.textinputName}>{this.state.Bonus4}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-??????????????? ?????? ??????????????? : </Text>
                <Text style={styles.textinputDayStyle}>{this.state.AdditionalWageRate}</Text>
                <Text style={styles.textStyle}>%</Text>
            </View>
            
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-?????????????????? : </Text>
                <Text style={styles.textinputDayStyle}>{this.state.SalaryCalculationPeriodStart}</Text>
                <Text style={styles.textStyle}>??? ~ </Text>
                <Text style={styles.textinputDayStyle}>{this.state.SalaryCalculationPeriodEnd}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-??????????????? : ??????(?????? ?????? ??????)</Text>
                <Text style={styles.textinputDayStyle}>{this.state.SalaryDay}</Text>
                <Text style={styles.textStyle}>???</Text>
            </View>
            <View style={{marginLeft:wp('30%')}}>
                <Text style={styles.textStyle}>(????????? ???????????? ?????? ??????)</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>-???????????? : </Text>
                <Text style={styles.textStyle}>{this.state.types3}</Text>
            </View>
            </View>
        
            <View style={styles.textArea}>
              <Text style={styles.textTitleStyle}>6. ??????????????????</Text> 
              <Text style={styles.textLineStyle}> - ?????????????????? ??????????????? ???????????? ?????????????????? ?????????.</Text>
          </View>
        
          <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>7. ???????????? ????????????(???????????? ??????)</Text> 
            <View style={styles.rowPeriod2}>
              <Text style={styles.textStyle}>????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[1]==1?'O':'X'}</Text>
              <Text style={styles.textStyle}>, ????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[2]==1?'O':'X'}</Text>
            </View>
            <View style={styles.rowPeriod2}>
              <Text style={styles.textStyle}>, ????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[3]==1?'O':'X'}</Text>
              <Text style={styles.textStyle}>, ????????????:</Text><Text style={styles.textinputDayStyle}>{this.state.types4[4]==1?'O':'X'}</Text>
            </View>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>8. ??????????????? ??????</Text> 
            <Text style={styles.textLineStyle}> - '?????????'??? ??????????????? ???????????? ????????? ??? ???????????? ???????????? ???????????? ??????????????? ???????????? '?????????'?????? ?????????(??????????????? ???17??? ??????)</Text>
        </View>

        <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>9. ??????</Text> 
            <Text style={styles.textLineStyle}> - ??? ????????? ????????? ?????? ????????? ????????????????????? ??????</Text>
        </View>
        

        <View style={styles.rowPeriod3}> 
              <Text style={styles.textinputYearStyle}>{this.state.ContractYear}</Text>
              <Text style={styles.textTitleStyle}>???</Text>
              <Text style={styles.textinputDayStyle}>{this.state.ContractMonth}</Text>
              <Text style={styles.textTitleStyle}>???</Text>
              <Text style={styles.textinputDayStyle}>{this.state.ContractDay}</Text>         
              <Text style={styles.textTitleStyle}>???</Text>       
            </View>
          
          
            <View style={styles.textArea}>
            <Text style={styles.textTitleStyle}>?????????</Text>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>???????????? : </Text>
                <Text style={styles.textinputStyle1}>{this.state.BusinessName}</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>?????? : </Text>
                <Text style={styles.textinputStyle1}>{this.state.BusinessAddress}</Text>
            </View>        
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>???????????? : </Text>
                <Text style={styles.textinputStyle1}>{this.state.BusinessPhone}</Text>
            </View>
            <View style={styles.rowPeriod}>
                <Text style={styles.textStyle}>????????? : </Text>
                <Text style={styles.textinputStyle1}>{this.state.BusinessOwner1}</Text>
            </View>
          </View>

      <View style={styles.textArea}>
        <Text style={styles.textTitleStyle}>?????????</Text>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>?????? : </Text>
            <TextInput
                value={this.state.EmployeeAddress} 
                onChangeText={(EmployeeAddress) => this.setState({EmployeeAddress})}
                ref={(input) => { this.TextInput36 = input; }}
                onSubmitEditing={() => { this.TextInput37.focus(); }}
                blurOnSubmit={false}
                placeholder={'????????? ??????'}
                style={styles.textinputStyle}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>????????? : </Text>
            <TextInput
                value={this.state.EmployeePhone} 
                onChangeText={(EmployeePhone) => this.setState({EmployeePhone})}
                ref={(input) => { this.TextInput37 = input; }}
                onSubmitEditing={() => { this.TextInput38.focus(); }}
                blurOnSubmit={false}
                placeholder={'?????????'}
                style={styles.textinputStyle}/>
        </View>
        <View style={styles.rowPeriod}>
            <Text style={styles.textStyle}>?????? : </Text>
            <TextInput
                value={this.state.EmployeeName} 
                onChangeText={(EmployeeName) => this.setState({EmployeeName})}
                ref={(input) => { this.TextInput38 = input; }}
                placeholder={'????????? ??????'}
                style={styles.textinputStyle}/>
        </View>
      </View>
      <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              this.setState({tableData:[]})
              this.handleSubmit2()
          }}>
              <Text style={styles.buttonTitle}>????????????</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:hp('5%')}}><Text></Text></View>
      </ScrollView></>)
      :this.state.type==5?
      <>
        {/* <WebView
            originWhitelist={['*']}
            source={{ html: this.state.htmlContent }}
            style={{ marginTop: 20 }}
        />
        <Button
          title="????????????"
          color="#FF3232"
          onPress={()=>{this.createAndSavePDF(this.state.htmlContent)}}/> */}
          <View style={{ width:'100%', height:hp('70%')}}>
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
                    <Image style={styles.excelBtn} source={require('../../img/excel_purple.png')}></Image>
                </TouchableOpacity>
            </View>
      </>
      :<></>
    
      }
      </View>
      </View>
    )
  }
}

export default WorkerContractformScreen;
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
      backgroundColor:'#7085DF'
  },
  textTitle:{
      fontSize:wp('5.55%'),
      fontFamily:"NanumSquareB",
      marginTop:hp('2%'),
      marginBottom:hp('2%'),
      textAlign:"center"
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
      marginRight:wp('1%'),
      borderBottomColor:'#D3D6E2',
      borderBottomWidth:wp('0.5%')
  },
  textinputStyle1:{
      fontSize:wp('4.2%'),
      fontFamily:"NanumSquare",
      marginLeft:wp('1.5%'),
      marginTop:hp('1%'),
      width:wp('60%'),
  },
  buttonArea: {
      alignItems:"center",
      width: '100%', height: hp('6%'),
      marginBottom:hp('2%'),
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
  textinputName1:{
      width:wp('25%'),
      fontSize:wp('4.8%'),
      fontFamily:"NanumSquareB",
      marginTop:hp('1%'),
      marginBottom:wp('1.5%'),
      marginRight:wp('2%'),
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
        color: 'white',
        fontFamily:"NanumSquare",
        fontSize:wp('4.8%'),
  },
  
  tableArea:{
    width:wp('90%'), 
  },
  wrapper: {
      flexDirection: 'row'
  },
  title: { 
      flex: 0.5, 
      backgroundColor: "#7085DF" ,
      borderBottomLeftRadius:wp('4%')
  },
  row: {  height:  hp('5.5%') },
  head: {  
      height: hp('6%'),  
      backgroundColor: "#7085DF" , 
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
  buttonArea1: {
      position:"absolute", 
      bottom:hp('1%'), left:0, right:0,
      width: wp('100%'), height: hp('10%'),
      justifyContent:'center', alignItems:'center',
      paddingBottom:hp('6%')
  },
  button1: {
      width:wp('90%'), height: hp('8%'),
      marginTop:hp('4%'), 
      justifyContent:'center', alignItems:'center'
  },
  excelBtn:{
    width:wp('85%'), height:hp('5.6%')
  },
});