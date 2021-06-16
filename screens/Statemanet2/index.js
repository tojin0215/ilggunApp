import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Animated, ImageBackground, Image, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper,  Col, Cols, Cell } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import StatementScreen1 from '../Statemanet1';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";


//data 순서 : 입사일/월급(보수총액)->DB/추가금액->DB/공제액->계산/실지금액->계산

//정규) SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
//알바) TaxDeduction:3.3세금공제


class StatementScreen2 extends Component{
// 급여대장
    constructor(props) {
      super(props);
      this.state = {
          itemA: null , isVisibleA: false, itemB: null, isVisibleB: false,itemAA: String(new Date().getFullYear())+'년' , isVisibleAA: false, itemBB: String(new Date().getMonth()+1)+'월', isVisibleBB: false,
          PaymentSum:'-', DeductionSum:'-', Difference:'-', Name:'-', WorkingType:'-',
          tableTitle:['기본급','기타수당(과세)','기타수당(비과세)','국민연금','건강보험료','장기요양보험료','고용보험료','소득세','주민세'],
          tableData: [
              ['-','-','-','-','-','-','-','-','-'],
          ],
          addtime: {},
          nname :[], type1:[], type2:[], bangCode:'' , id:'',
          EmploymentInsurancePercentage:'',HealthInsurancePercentage:'',NationalPensionPercentage:'',RegularCarePercentage:'',
          pay11:0//시급
      }
    
      AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
          this.setState({bangCode : bangCode})
            this.fetchData(0);
      })
      AsyncStorage.getItem("userData").then((userData) =>{
        this.setState({id:JSON.parse(userData).id});
      });
    }

    fetchData = async(flag) => { 
      try {
        axios.post('http://13.124.141.28:3000/selectOvertimework', {
          business: this.state.bangCode,
          year : this.state.itemAA.split('년')[0]*1,
          month : this.state.itemBB.split('월')[0]*1,
        },
        {  headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
        })
          .then(res => {
            console.log(this.state.itemAA.split('년')[0]*1);
            console.log(this.state.itemBB.split('월')[0]*1);
            console.log("???");
              console.log(res.data);
            let dic ={};
            for(let i=0 ; i<res.data.length ; i++){
              if(!dic[res.data[i].workername]){
                dic[res.data[i].workername] = res.data[i].subt;   
              }
              else{
                dic[res.data[i].workername] += res.data[i].subt;   //this.setState({addtime :{...this.state.addtime, n : s}});
              }
            }
            console.log("???");
              console.log(dic);
            this.setState({addtime : dic})
            

          });

          axios.post('http://13.124.141.28:3000/insurancePercentage',
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
            .then(res => {
              for(let i=0 ; i<res.data.length ; i++){
                console.log('*************************************************DB년도',res.data[i].date)
                if(res.data[i].date === this.state.itemAA.split('년')[0]){
                  console.log('국민연금',res.data[i].NationalPensionPercentage)
                  console.log('건강보험',res.data[i].HealthInsurancePercentage)
                  console.log('건강보험(장기)',res.data[i].RegularCarePercentage)
                  console.log('고용보험',res.data[i].EmploymentInsurancePercentage)
                  console.log('시급',res.data[i].HourlyWage)
                  this.setState({
                    NationalPensionPercentage:res.data[i].NationalPensionPercentage,
                    HealthInsurancePercentage:res.data[i].HealthInsurancePercentage,
                    RegularCarePercentage:res.data[i].RegularCarePercentage,
                    EmploymentInsurancePercentage:res.data[i].EmploymentInsurancePercentage,
                    pay11:res.data[i].HourlyWage
                  })
                }
              }
                
          });

// //여기 과세/비과세 추가되는 값들
//           axios.post('http://13.124.141.28:3000/otherAllowance', {
//             id: this.state.id,
//             year : this.state.itemAA.split('년')[0]*1,
//             month : this.state.itemBB.split('월')[0]*1,
//           },
//           {  headers:{
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'}
//           })
//             .then(res => {
//               console.log(this.state.id,'_',this.state.itemAA.split('년')[0]*1, '_', this.state.itemBB.split('월')[0]*1)
//               for(let i=0 ; i<res.data.length ; i++){
//                 console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!_______________!여기_',res.data[i])
                
//               }
                
//           });

          axios.post('http://13.124.141.28:3000/selectWorker', {
            business : this.state.bangCode
          },
          {  headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'}
          })
      .then(res => {
        let week=[4,4,4,4,4,4,4];
        let t1=[];
        let t2=[];
        let rowall = []
        
        if(this.state.itemAA.split('년')[0]*1!=new Date().getFullYear() || this.state.itemBB.split('월')[0] != new Date().getMonth()+1){
          console.log(":::::::::::::::::::::::")
        // console.log(this.state.itemA.split('년')[0]+' '+ this.state.itemB.split('월')[0])
          let nalsu = new Date(this.state.itemAA.split('년')[0], this.state.itemBB.split('월')[0], 0).getDate();
          let namugi = nalsu%7;
          let it = new Date(this.state.itemAA.split('년')[0], this.state.itemBB.split('월')[0], 0).getDay();
          console.log(nalsu, namugi, it, this.state.itemAA.split('년')[0], this.state.itemBB.split('월')[0]);
          for(let i=0 ; i<namugi ; i++){
            week[(it-i)%7]++;
          }
        for (let i = 0; i < res.data.length; i++) {
          if(this.state.itemAA.split('년')[0]*1>new Date().getFullYear() || 
          (this.state.itemAA.split('년')[0]*1==new Date().getFullYear() && this.state.itemBB.split('월')[0]*1>new Date().getMonth()+1)){
            if(res.data[i].type==1){
              rowall.push([res.data[i].workername2, "알바", '0', '0' , '0', '0']);
              t1.push({label: res.data[i].workername2, value: res.data[i].workername2})
            }
            else{
              rowall.push([res.data[i].workername2, "정규직", '0', '0', '0']);
              t2.push({label: res.data[i].workername2, value: res.data[i].workername2})
            }
            this.setState({nname: rowall, type1:t1, type2:t2},() => 
            {
              if(flag==1){
                this.show();
              }
            })
          }
          else{
          if(this.state.itemAA.split('년')[0]*1 < res.data[i].startdate.split('/')[0]*1 || ( (this.state.itemAA.split('년')[0]*1 == res.data[i].startdate.split('/')[0]*1) && (this.state.itemBB.split('월')[0]*1 < res.data[i].startdate.split('/')[1]*1))){
            if(res.data[i].type==1){
              rowall.push([res.data[i].workername2, "알바", '0', '0' , '0', '0']);
              t1.push({label: res.data[i].workername2, value: res.data[i].workername2})
            }
            else{
              rowall.push([res.data[i].workername2, "정규직", '0', '0', '0']);
              t2.push({label: res.data[i].workername2, value: res.data[i].workername2})
            }
            this.setState({nname: rowall, type1:t1, type2:t2},() => 
            {
              if(flag==1){
                this.show();
              }
            })
          }else{
          if(res.data[i].type==1){
            let weekk=[0,0,0,0,0,0,0];
            if(this.state.itemAA.split('년')[0]*1 == res.data[i].startdate.split('/')[0] && this.state.itemBB.split('월')[0]== res.data[i].startdate.split('/')[1]){
              let nn = Math.floor((res.data[i].startdate.split('/')[2]-1)/7);
              weekk=[nn,nn,nn,nn,nn,nn,nn];
              console.log(res.data[i].startdate.split('/')[0], res.data[i].startdate.split('/')[1], res.data[i].startdate.split('/')[2]);
              let dd = new Date(res.data[i].startdate.split('/')[0], res.data[i].startdate.split('/')[1]*1-1, 1).getDay();
              console.log("오늘 날짜까지 끊자!"+dd);
              for(let j=0; j<((res.data[i].startdate.split('/')[2]-1)%7) ; j++){
                weekk[dd]++;
                dd++; dd=dd%7;
              }
            }
            let sum = 0;
            let eachtime = res.data[i].eachtime.split('/');
            for(let i=0 ; i<7 ; i++){
              console.log((eachtime[i]*1) , week[i]);
              sum += (eachtime[i]*1) * (week[i]-weekk[i]);
            }
            console.log(">>>");
            console.log(res.data);
            console.log(">>>");
            console.log(this.state.addtime[res.data[i].workername]);
            rowall.push([res.data[i].workername2, "알바", String(this.state.pay11/*시급*/), String(sum/* 시간 */) , String(0),String((this.state.addtime[res.data[i].workername]?this.state.addtime[res.data[i].workername]:0)*this.state.pay11/*추가근로*/)]);
                t1.push({label: res.data[i].workername2, value: res.data[i].workername2})
              }
              else{
                let pay = this.state.pay11;//(date/new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate());
                if(this.state.itemAA.split('년')[0]*1 == res.data[i].startdate.split('/')[0]*1 && this.state.itemBB.split('월')[0]*1== res.data[i].startdate.split('/')[1]*1){
                  pay = Math.floor(this.state.pay11 *( (new Date(res.data[i].startdate.split('/')[0]*1, res.data[i].startdate.split('/')[1]*1, 0).getDate() - res.data[i].startdate.split('/')[2]*1+1)/new Date(res.data[i].startdate.split('/')[0]*1, res.data[i].startdate.split('/')[1]*1, 0).getDate()));
                }
                rowall.push([res.data[i].workername2, "정규직", String(pay), '0', String((this.state.addtime[res.data[i].workername]?this.state.addtime[res.data[i].workername]:0)*this.state.pay11/*시급*/)]);
                t2.push({label: res.data[i].workername2, value: res.data[i].workername2})
              }
            }
            }
          }
        } 
        else{
          let n = Math.floor(new Date().getDate()/7);
              let week=[n,n,n,n,n,n,n];
              console.log(week)
              console.log(new Date().getFullYear(), new Date().getMonth(), 1);
              let d = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
              console.log("오늘 날짜까지 끊자!"+d);
              for(let i=0; i<(new Date().getDate()%7) ; i++){
                week[d]++;
                d++; d=d%7;
              }

              for (let i = 0; i < res.data.length; i++) {
                console.log('======================================================///////===========================')
                console.log('><><><><'+this.state.itemAA.split('년')[0]*1 , res.data[i].startdate.split('/')[0]*1 , this.state.itemBB.split('월')[0]*1 , res.data[i].startdate.split('/')[1]*1)
                if(this.state.itemAA.split('년')[0]*1 < res.data[i].startdate.split('/')[0]*1 || ( (this.state.itemAA.split('년')[0]*1 == res.data[i].startdate.split('/')[0]*1) && (this.state.itemBB.split('월')[0]*1 < res.data[i].startdate.split('/')[1]*1))){ 
                  if(res.data[i].type==1){
                    rowall.push([res.data[i].workername2, "알바", '0', '0' , '0', '0']);
                    t1.push({label: res.data[i].workername2, value: res.data[i].workername2})
                  }
                  else{
                    rowall.push([res.data[i].workername2, "정규직", '0', '0', '0']);
                    t2.push({label: res.data[i].workername2, value: res.data[i].workername2})
                  }
                  this.setState({nname: rowall, type1:t1, type2:t2},() => 
                  {
                    if(flag==1){
                      this.show();
                    }
                  })
                }
                console.log(res.data);
                if(res.data[i].type==1){
                  
                  let weekk=[0,0,0,0,0,0,0];
                  if(this.state.itemAA.split('년')[0]*1 == res.data[i].startdate.split('/')[0]*1 && this.state.itemBB.split('월')[0]*1== res.data[i].startdate.split('/')[1]*1){
                    let nn = Math.floor((res.data[i].startdate.split('/')[2]-1)/7);
                    weekk=[nn,nn,nn,nn,nn,nn,nn];
                    console.log(res.data[i].startdate.split('/')[0], res.data[i].startdate.split('/')[1], res.data[i].startdate.split('/')[2]);
                    let dd = new Date(res.data[i].startdate.split('/')[0], (res.data[i].startdate.split('/')[1]*1)-1, 1).getDay();
                    console.log("오늘 날짜까지 끊자!"+dd);
                    for(let j=0; j<((res.data[i].startdate.split('/')[2]-1)%7) ; j++){
                      weekk[dd]++;
                      dd++; dd=dd%7;
                    }
                    console.log('///////////////////////////////////////////22')
                    console.log(weekk)
                  }

                  let sum = 0;
                  let eachtime = res.data[i].eachtime.split('/');
                  for(let i=0 ; i<7 ; i++){
                    console.log((eachtime[i]*1) , week[i]);
                    sum += (eachtime[i]*1) * (week[i]-weekk[i]);
                  }
                  console.log(">>>");
                  console.log(res.data);
                  console.log(">>>");
 //변경해야함                 
                  rowall.push([res.data[i].workername2, "알바", String(this.state.pay11/*시급*/), String(sum/* 시간 */) , String(0),String((this.state.addtime[res.data[i].workername]?this.state.addtime[res.data[i].workername]:0)*this.state.pay11/*추가근로*/)]);
                  t1.push({label: res.data[i].workername2, value: res.data[i].workername2})
                }
                else{
                  let date = new Date().getDate();
                    if(this.state.itemAA.split('년')[0]*1 == res.data[i].startdate.split('/')[0]*1 && this.state.itemBB.split('월')[0]*1== res.data[i].startdate.split('/')[1]*1){
                      if(date <= res.data[i].startdate.split('/')[2]*1) date = 0;
                      else{ date = date - res.data[i].startdate.split('/')[2]*1 } 
                    }
                  rowall.push([res.data[i].workername2, "정규직", String(Math.floor(this.state.pay11*(date/new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()))), '0', String((this.state.addtime[res.data[i].workername]?this.state.addtime[res.data[i].workername]:0)*this.state.pay11/*시급*/)]);
                  t2.push({label: res.data[i].workername2, value: res.data[i].workername2});
                }
              }
            }


            this.setState({nname: rowall, type1:t1, type2:t2})
            console.log(this.state.nname, this.state.type1, this.state.type2);
            if(flag==1){
              this.show();
            }
          });
          
      } catch (e) {
          console.error(e);
        }
    }


    clickHandler = async() => {
      try {
        let t = this.state.tableData[0];
        let signOrStamp = '';
        
        await axios.post('http://13.124.141.28:3000/selectBusinessByName', {
            bname : this.state.bangCode
            },
            {  headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'}
            })
            .then(res => {
                if(res.data[0].stamp == 1){
                    signOrStamp = `<img src="http://13.124.141.28:3000/${this.state.bangCode}.png" alt="도장" z-index="2" width="100" height="100"></img>`
                }
        });
        axios.post('http://13.124.141.28:3000/selectSign', {
            id:this.state.id,
            id2: this.state.id
        },
        {  headers:{
              'Content-Type': 'application/json',
            'Accept': 'application/json'}
        })
        .then(async(res) => {
            let sign = res.data[0].sign;

            if(signOrStamp ==''){
              signOrStamp = `<svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="${String(sign)}"
                      style="fill:none;stroke:black;stroke-width:3" />
              </svg>`
            }
            html =`
              <!DOCTYPE html>
              <html>
                <head>
                    <meta charset="UTF-8">
                    <title>월별 급여대장</title>
                </head>
                <style>
                    body{margin:30px 30px 30px 30px; line-height: 30px;}
                    span{margin-left:240px;}
                    table{border-collapse:collapse; margin: 10px 30px 10px 10px;}
                    h1{ text-align: center; }
                    th{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                    td{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                    .text_underline {text-decoration: underline;}
                    .margin_left{margin-left:15px;}
                    .margin_left2{margin-left:65px;}
                    .text_underline_margin_left{text-decoration: underline;margin-left:50px;}
                    .contract_day{position:relative; left:50%; margin-left: -100px;}
                </style>
                <body>
                  <h1>[${this.state.bangCode}] 근로자 급여명세서</h1>
                  <b>날짜 : ${this.state.itemAA} ${this.state.itemBB}</b><br>
                  <b>이름 : ${this.state.Name}(${this.state.WorkingType})</b><br>
                  <b>급여산정기간 : 1일 ~ 말일</b><br>
                  <table>
                    <th>내역</th><th>금액</th>
                    <tr><td>(+) 기본급</td><td>${String(t[0])}</td></tr>
                    <tr><td>(+) 기타수당(과세)</td><td>${String(t[1])}</td></tr>
                    <tr><td>(+) 기타수당(비과세)</td><td>${String(t[2])}</td></tr>
                    <tr><td>(-) 국민연금</td><td>${String(t[3])}</td></tr>
                    <tr><td>(-) 건강보험료</td><td>${String(t[4])}</td></tr>
                    <tr><td>(-) 장기요양보험료</td><td>${String(t[5])}</td></tr>
                    <tr><td>(-) 고용보험료</td><td>${String(t[6])}</td></tr>
                    <tr><td>(-) 소득세</td><td>${String(t[7])}</td></tr>
                    <tr><td>(-) 주민세</td><td>${String(t[8])}</td></tr>
                    <tr><td>(+) 지급액계</td><td>${this.state.PaymentSum}</td></tr>
                    <tr><td>(-) 공제액계</td><td>${this.state.DeductionSum}</td></tr>
                    <tr><td>(=) 차인지급액계</td><td>${this.state.Difference}</td></tr>
                  </table><span>${signOrStamp}</span>
                </body>
              </html>`;
            const { uri } = await Print.printToFileAsync({ html },true);
            Sharing.shareAsync(uri); 
        }); 
      } catch (error) {
        console.error(error);
      }
        /*let t = this.state.tableData[0];
        var data = [
          {
            "이름" : this.state.Name,
            "근무형태" : this.state.WorkingType
          },
        {
          "내역": "(+)기본급",
          "금액": String(t[0])
        },
        {
          "내역": "(+)추가근로수당",
          "금액": String(t[1])
        },
        {
          "내역": "(+)식대",
          "금액": String(t[2])
        },
        {
          "내역": "(-)국민연금",
          "금액": String(t[3])
        },
        {
          "내역": "(-)건강보험료",
          "금액": String(t[4])
        },
        {
          "내역": "(-)장기요양보험료",
          "금액": String(t[5])
        },
        {
          "내역": "(-)고용보험료",
          "금액": String(t[6])
        },
        {
          "내역": "(-)소득세",
          "금액": String(t[7])
        },
        {
          "내역": "(-)주민세",
          "금액": String(t[8])
        },
        {
          "내역": "(+)지급액계",
          "금액": this.state.PaymentSum 
        },
        {
          "내역": "(-)공제액계",
          "금액": this.state.DeductionSum
        },
        {
          "내역": "(=)차인지급액계",
          "금액": this.state.Difference
        },
        ];
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Cities");
        const wbout = XLSX.write(wb, {
          type: 'base64',
          bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + 'statement.xlsx';
        console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
        await FileSystem.writeAsStringAsync(uri, wbout, {
          encoding: FileSystem.EncodingType.Base64
        });
  
        await Sharing.shareAsync(uri, {
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          dialogTitle: 'MyWater data',
          UTI: 'com.microsoft.excel.xlsx'
        });*/
      }
    show(){
          //console.log('itmeA : ' + this.state.itemA);
        //console.log('itmeB : ' + this.state.itemB);

        //----------DB에서 불러오는 값들----------------
        // MonthlySalary:보수총액
        let MonthlySalary = '0'

        
// 변경해야함
        // 추가급여
        let ExtraWorkAllowance = '0' // 추가근로수당
        let MealCharge = '0' // 식대

        // HourlyWage : 시급 / WorkingHour : 한달 일한 시간 
        let WorkingHour = '0'
        let HourlyWage = '0'

        // 추가급여
        let ExtraWorkAllowancePartTime = '0' // 추가근로수당
        let MealChargePartTime = '0' // 식대
        
        let WorkingType = '정규직'
        console.log("여기여기요~~");
        console.log(this.state.nname);
        for(let i=0; i<this.state.nname.length; i++){
            if(this.state.itemA == this.state.nname[i][0] || this.state.itemB == this.state.nname[i][0]){
                
                WorkingType = this.state.nname[i][1]
                if(this.state.nname[i][1] == '정규직'){
                    MonthlySalary = this.state.nname[i][2]
                    MealCharge = this.state.nname[i][3]
                    ExtraWorkAllowance = this.state.nname[i][4]
                } else{
                    WorkingHour = this.state.nname[i][3]
                    HourlyWage = this.state.nname[i][2]
                    MealChargePartTime = this.state.nname[i][4]
                    ExtraWorkAllowancePartTime = this.state.nname[i][5]
                }
                break;
            }
        }
        
        console.log('000000000000000000000000000000000000000000000000000000000000000')
        console.log('이름',this.state.Name);
        console.log('국민연금(%) : ', this.state.NationalPensionPercentage)
        console.log('건강보험(%) : ', this.state.HealthInsurancePercentage)
        console.log('건강보험(정기요양)(%) : ', this.state.RegularCarePercentage)
        console.log('고용보험(%) : ', this.state.EmploymentInsurancePercentage)
      
        //----------------------계산식---------------------------------------------
        // NationalPension:국민연금 (보수총액*4.5%)
        let NationalPension = Math.floor(((parseInt(MonthlySalary)*this.state.NationalPensionPercentage/100).toFixed(0))/10)*10;
        // HealthInsurance:건강보험 (보수총액*3.3335%)
        let HealthInsurance = Math.floor(((parseInt(MonthlySalary)*this.state.HealthInsurancePercentage/100).toFixed(0))/10)*10;
        // RegularCare:건강보험(정기요양) (건강보험료*5.125%)
        let RegularCare = Math.floor(((HealthInsurance*this.state.RegularCarePercentage/100).toFixed(0))/10)*10;
        // EmploymentInsurance : 고용보험 (보수총액*0.8%)
        let EmploymentInsurance = Math.floor(((parseInt(MonthlySalary)*this.state.EmploymentInsurancePercentage/100).toFixed(0))/10)*10;//근로자_고용보험
        // SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
        let SocialInsurance = (parseInt(NationalPension)+parseInt(HealthInsurance)+parseInt(RegularCare)+parseInt(EmploymentInsurance)).toFixed(0);

        
        // WithholdingTax:원천과세(IncomeTax+InhabitantsTax)
        // IncomeTax : 갑근세(소득세) : 보수총액*3.0%
        //let IncomeTax = (parseInt(MonthlySalary)*0.03).toFixed(0)
        var IncomeTax =0; 
       
        if(parseInt(MonthlySalary)<1060000){
          IncomeTax = 0
        }
        else if(parseInt(MonthlySalary)>=1060000 & parseInt(MonthlySalary) <=1100000){
          IncomeTax = 1600
        }
        else if(parseInt(MonthlySalary)>1100000 & parseInt(MonthlySalary) <=1200000){
          IncomeTax = 2990
        }
        else if(parseInt(MonthlySalary)>1200000 & parseInt(MonthlySalary) <=1300000){
          IncomeTax = 4740
        }
        else if(parseInt(MonthlySalary)>1300000 & parseInt(MonthlySalary) <=1400000){
          IncomeTax = 6800
        }
        else if(parseInt(MonthlySalary)>1400000 & parseInt(MonthlySalary) <=1500000){
          IncomeTax = 8920
        }
        else if(parseInt(MonthlySalary)>1500000 & parseInt(MonthlySalary) <=1600000){
          IncomeTax = 10980
        }
        else if(parseInt(MonthlySalary)>1600000 & parseInt(MonthlySalary) <=1700000){
          IncomeTax = 13050
        }
        else if(parseInt(MonthlySalary)>1700000 & parseInt(MonthlySalary) <=1800000){
          IncomeTax = 15110
        }
        else if(parseInt(MonthlySalary)>1800000 & parseInt(MonthlySalary) <=1900000){
          IncomeTax = 17180
        }
        else if(parseInt(MonthlySalary)>1900000 & parseInt(MonthlySalary) <=2000000){
          IncomeTax = 19520
        }
        else if(parseInt(MonthlySalary)>2000000 & parseInt(MonthlySalary) <=2100000){
          IncomeTax = 22740
        }
        else if(parseInt(MonthlySalary)>2100000 & parseInt(MonthlySalary) <=2200000){
          IncomeTax = 25950
        }
        else if(parseInt(MonthlySalary)>2200000 & parseInt(MonthlySalary) <=2300000){
          IncomeTax = 29160
        }
        else if(parseInt(MonthlySalary)>2300000 & parseInt(MonthlySalary) <=2400000){
          IncomeTax = 33570
        }
        else if(parseInt(MonthlySalary)>2400000 & parseInt(MonthlySalary) <=2500000){
          IncomeTax = 41630
        }
        else if(parseInt(MonthlySalary)>2500000 & parseInt(MonthlySalary) <=2600000){
          IncomeTax = 50190
        }
        else if(parseInt(MonthlySalary)>2600000 & parseInt(MonthlySalary) <=2700000){
          IncomeTax = 58750
        }
        else if(parseInt(MonthlySalary)>2700000 & parseInt(MonthlySalary) <=2800000){
          IncomeTax = 67300
        }
        else if(parseInt(MonthlySalary)>2800000 & parseInt(MonthlySalary) <=2900000){
          IncomeTax = 75860
        }
        else if(parseInt(MonthlySalary)>2900000 & parseInt(MonthlySalary) <=3000000){
          IncomeTax = 84850
        }
        else if(parseInt(MonthlySalary)>3000000 & parseInt(MonthlySalary) <=3100000){
          IncomeTax = 93400
        }
        else if(parseInt(MonthlySalary)>3100000 & parseInt(MonthlySalary) <=3200000){
          IncomeTax = 105540
        }
        else if(parseInt(MonthlySalary)>3200000 & parseInt(MonthlySalary) <=3300000){
          IncomeTax = 117770
        }
        else if(parseInt(MonthlySalary)>3300000 & parseInt(MonthlySalary) <=3400000){
          IncomeTax = 129990
        }
        else if(parseInt(MonthlySalary)>3400000 & parseInt(MonthlySalary) <=3500000){
          IncomeTax = 142220
        }
        else if(parseInt(MonthlySalary)>3500000 & parseInt(MonthlySalary) <=3600000){
          IncomeTax = 154440
        }
        else if(parseInt(MonthlySalary)>3600000 & parseInt(MonthlySalary) <=3700000){
          IncomeTax = 166670
        }
        else if(parseInt(MonthlySalary)>3700000 & parseInt(MonthlySalary) <=3800000){
          IncomeTax = 184260
        }
        else if(parseInt(MonthlySalary)>3800000 & parseInt(MonthlySalary) <=3900000){
          IncomeTax = 197610
        }
        else if(parseInt(MonthlySalary)>3900000 & parseInt(MonthlySalary) <=4000000){
          IncomeTax = 210960
        }
        else if(parseInt(MonthlySalary)>4000000 & parseInt(MonthlySalary) <=4100000){
          IncomeTax = 224310
        }
        else if(parseInt(MonthlySalary)>4100000 & parseInt(MonthlySalary) <=4200000){
          IncomeTax = 237660
        }
        else if(parseInt(MonthlySalary)>4200000 & parseInt(MonthlySalary) <=4300000){
          IncomeTax = 251010
        }
        else if(parseInt(MonthlySalary)>4300000 & parseInt(MonthlySalary) <=4400000){
          IncomeTax = 264360
        }
        else if(parseInt(MonthlySalary)>4400000 & parseInt(MonthlySalary) <=4500000){
          IncomeTax = 277840
        }
        else if(parseInt(MonthlySalary)>4500000 & parseInt(MonthlySalary) <=4600000){
          IncomeTax = 294370
        }
        else if(parseInt(MonthlySalary)>4600000 & parseInt(MonthlySalary) <=4700000){
          IncomeTax = 308390
        }
        else if(parseInt(MonthlySalary)>4700000 & parseInt(MonthlySalary) <=4800000){
          IncomeTax = 322420
        }
        else if(parseInt(MonthlySalary)>4800000 & parseInt(MonthlySalary) <=4900000){
          IncomeTax = 336440
        }
        else if(parseInt(MonthlySalary)>4900000 & parseInt(MonthlySalary) <=5000000){
          IncomeTax = 350470
        }
        
        // InhabitantsTax : 주민세 (갑근세의 10%)
        let InhabitantsTax = Math.floor(((parseInt(IncomeTax)*0.1).toFixed(0))/10)*10;

        // TotalDeduction:공제총액(사대보험+갑근세+주민세) : 보수총액*0.3%
        let TotalDeduction = parseInt(SocialInsurance) + parseInt(IncomeTax) + parseInt(InhabitantsTax)
        // 지급총액 : 보수총액+추가금
        let TotalPayment = parseInt(MonthlySalary)+parseInt(ExtraWorkAllowance)+parseInt(MealCharge)
        // 실지급액(지급총액-공제총액)
        let ActualSalary = parseInt(TotalPayment) - parseInt(TotalDeduction)


        // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ알바계산ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
        //MonthlySalaryPartTime : 한달보수총액
        let MonthlySalaryPartTime = parseInt(WorkingHour) * parseInt(HourlyWage);

        // 지급총액 : 보수총액+추가금
        let TotalPaymentPartTime = parseInt(MonthlySalaryPartTime)+parseInt(ExtraWorkAllowancePartTime)+parseInt(MealChargePartTime)

        // IncomeTax : 갑근세(소득세) : 보수총액*3.0%
        let IncomeTaxPartTime = Math.floor(((parseInt(MonthlySalaryPartTime)*0.03).toFixed(0))/10)*10;

        // InhabitantsTax : 주민세 (갑근세의 10%)  : 보수총액*0.3%
        let InhabitantsTaxPartTime = Math.floor(((parseInt(IncomeTaxPartTime)*0.1).toFixed(0))/10)*10

        // WithholdingTax:원천과세(IncomeTax+InhabitantsTax) : 3.3 세금공제
        let WithholdingTax = parseInt(IncomeTaxPartTime) + parseInt(InhabitantsTaxPartTime)

        // 실지급액(지급총액-공제총액)
        let ActualSalaryPartTime = parseInt(TotalPaymentPartTime) - parseInt(WithholdingTax)


      if(WorkingType=='정규직'){ // -------정규------
                  this.setState({
                      Name:this.state.itemA, WorkingType:'정규직',
                      tableData:[[MonthlySalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),ExtraWorkAllowance,MealCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      NationalPension.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),HealthInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      RegularCare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),EmploymentInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      IncomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),InhabitantsTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")]],
                      DeductionSum : TotalDeduction.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      PaymentSum:TotalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      Difference:ActualSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  })
              } else{ // ------알바-------
                  this.setState({
                      Name:this.state.itemB, WorkingType:'알바',
                      tableData:[[MonthlySalaryPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),ExtraWorkAllowancePartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      MealChargePartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),0,0,0,0,IncomeTaxPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),InhabitantsTaxPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")]],
                      DeductionSum : WithholdingTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      PaymentSum:TotalPaymentPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      Difference:ActualSalaryPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  })
              }
      }

    changeVisibility(state) {
        this.setState({
            isVisibleA: false,
            isVisibleB: false,
            ...state
        });
    }

    render() {
        const state = this.state;
        const{PaymentSum, DeductionSum, Difference, Name, WorkingType} = this.state
        //PaymentSum:지급합계, DeductionSum:공제합계, Difference:차이

        return (
            
          <View style={styles.image}>
            <View style={styles.container}>
              <ScrollView>
            <View style={styles.titleArea}>
              <Text style={styles.textTitle}>근로자 급여명세서</Text>
            </View>
              <View style={styles.dropDownArea}>
                <DropDownPicker
                    items={[
                      {label: '2020년', value: '2020년'},
                      {label: '2021년', value: '2021년'},
                      {label: '2022년', value: '2022년'},
                      {label: '2023년', value: '2023년'},
                      {label: '2024년', value: '2024년'},
                      {label: '2025년', value: '2025년'},
                    ]}
                    defaultValue={this.state.itemAA}
                    containerStyle={{height: hp('6%'), width: wp('30%'), marginLeft:wp('3%')}}
                    dropDownStyle={{backgroundColor: 'white', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
                    itemStyle={{justifyContent: 'center', }}
                    labelStyle={{
                      height:hp('3%'),
                      textAlign: 'center',
                      color:'#040525',
                      fontFamily:"NanumSquare",
                      fontSize: wp('4%'),
                      marginTop:hp('1%')
                    }}
                    isVisible={this.state.isVisibleAA}
                    onOpen={() => this.changeVisibility({
                        isVisibleAA: true
                    })}
                    onClose={() => this.setState({
                        isVisibleAA: false
                    })}
                    onChangeItem={item => {
                    this.setState({
                        itemAA: item.value
                    })
                }}
                
                />
            
                <DropDownPicker
                    items={[
                    {label: '1월', value: '1월'},
                    {label: '2월', value: '2월'},
                    {label: '3월', value: '3월'},
                    {label: '4월', value: '4월'},
                    {label: '5월', value: '5월'},
                    {label: '6월', value: '6월'},
                    {label: '7월', value: '7월'},
                    {label: '8월', value: '8월'},
                    {label: '9월', value: '9월'},
                    {label: '10월', value: '10월'},
                    {label: '11월', value: '11월'},
                    {label: '12월', value: '12월'},
                    ]}
                    defaultValue={this.state.itemBB}
                    containerStyle={{height: hp('6%'), width: wp('30%'), marginLeft:wp('1%')}}
                    dropDownStyle={{backgroundColor: 'white', borderBottomLeftRadius: wp('1.7%'), borderBottomRightRadius: wp('1.7%')}}

                    itemStyle={{justifyContent: 'center', }}
                    labelStyle={{
                      height:hp('3%'),
                      textAlign: 'center',
                      color:'#040525',
                      fontFamily:"NanumSquare",
                      fontSize: wp('4%'),
                      marginTop:hp('1%')
                    }}
                
                    isVisible={this.state.isVisibleBB}
                    onOpen={() => this.changeVisibility({
                        isVisibleBB: true
                    })}
                    onClose={() => this.setState({
                        isVisibleBB: false
                    })}
                    onChangeItem={item => this.setState({
                        itemBB: item.value
                    })}
                />
                </View>
            
                <View style={styles.dropDownArea2}>
                <DropDownPicker
                    items={this.state.type2}
                    placeholder='정규직/계약직'
                    defaultValue={this.state.itemA}
                    containerStyle={{height: hp('6%'), width: wp('30%'), marginLeft:wp('3%'), marginTop:wp('1%')}}
                    dropDownStyle={{backgroundColor: 'white', borderBottomLeftRadius: wp('1.7%'), borderBottomRightRadius: wp('1.7%'),}}

                    itemStyle={{justifyContent: 'center', alignItems:"center" }}
                    labelStyle={{
                      height:hp('3%'),
                      textAlign: 'center',
                      color:'#040525',
                      fontFamily:"NanumSquare",
                      fontSize: wp('3.8%'),
                      marginTop:hp('1%'),
                      ...Platform.select({
                        ios:{
                          fontSize: wp('3.3%'),
                        },
                        android:{
                          fontSize: wp('3.8%'),
                        }
                      })
                    }}
                    isVisible={this.state.isVisibleA}
                    onOpen={() => this.changeVisibility({
                        isVisibleA: true
                    })}
                    onClose={() => this.setState({
                        isVisibleA: false
                    })}
                    onChangeItem={item => this.setState({
                        itemA: item.value,
                        itemB: null
                    })}
                    
                />
                <DropDownPicker
                    items={this.state.type1}
                    placeholder='알바/단기'
                    defaultValue={this.state.itemB}
                    containerStyle={{height: hp('6%'), width: wp('30%'), marginLeft:wp('1%'), marginTop:wp('1%'),}}
                    dropDownStyle={{backgroundColor: 'white', borderBottomLeftRadius: wp('1.7%'), borderBottomRightRadius: wp('1.7%')}}
                    itemStyle={{justifyContent: 'center', }}
                     
                    labelStyle={{
                      height:hp('3%'),
                      textAlign: 'center',
                      color:'#040525',
                      fontFamily:"NanumSquare",
                      fontSize: wp('3.8%'),
                      marginTop:hp('1%'),
                      ...Platform.select({
                        ios:{
                          fontSize: wp('3.3%'),
                        },
                        android:{
                          fontSize: wp('3.8%'),
                        }
                      })
                    }}

                    isVisible={this.state.isVisibleB}
                    onOpen={() => this.changeVisibility({
                        isVisibleB: true
                    })}
                    onClose={() => this.setState({
                        isVisibleB: false
                    })}
                    onChangeItem={item => this.setState({
                        itemB:item.value,
                        itemA:null
                    })}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.fetchData(1)}
                  }>
                  <Text style={styles.buttonTitle}>조회하기</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.textArea}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.textStyle}>이름 : {Name}</Text>
                    <Text style={styles.textStyle}>, 근무형태 : {WorkingType}</Text>

                  </View>
                    <Text style={styles.textStyle}>급여산정기간 : 1일 ~ 말일</Text>
                </View>
                <ScrollView style={{zIndex: -2000}}>
                <View style={styles.tableArea}>
                    <Table style={styles.wrapper} borderStyle={{borderWidth: 1,borderColor:'white'}}>
                      {/* Left Wrapper */}
                      <TableWrapper style={{width:wp('40%')}} >
                            <Cell data="내역" style={styles.singleHead} textStyle={styles.tableTitleText}/>
                            <TableWrapper style={styles.wrapper}>
                                <Col data={['지급','공제']} style={styles.title1} heightArr={[hp('16.5%'), hp('33%')]} textStyle={styles.tableTitleText}/>
                                <Col data={state.tableTitle} style={styles.title} heightArr={[hp('5.5%'), hp('5.5%'), hp('5.5%'),hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%')]} textStyle={styles.tableTitleText}/>
                            </TableWrapper>
                            <Cell data="지급액계" style={styles.singleHead1_1} textStyle={styles.tableTitleText}/>
                            <Cell data="공제액계" style={styles.singleHead1_1} textStyle={styles.tableTitleText}/>
                            <Cell data="차인지급액계" style={styles.singleHead1_1_1} textStyle={styles.tableTitleText}/>
                        </TableWrapper>

                        <TableWrapper style={{flex:1}}>
                            <Cell data="금액" style={styles.singleHead1} textStyle={styles.tableTitleText}/>
                            <Cols data={state.tableData} heightArr={[hp('5.5%'), hp('5.5%'), hp('5.5%'),hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%')]} textStyle={styles.tableText}/>

                            <Cell data={PaymentSum} style={styles.singleHead1_2} textStyle={styles.tableTitleWhiteText}/>
                            <Cell data={DeductionSum} style={styles.singleHead1_2} textStyle={styles.tableTitleWhiteText}/>
                            <Cell data={Difference} style={styles.singleHead1_2_1} textStyle={styles.tableTitleWhiteText}/>
                        </TableWrapper>
                    </Table>
                </View>

                <View style={{marginTop:hp('10%')}}><Text></Text></View>
            <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={()=> this.clickHandler()}>
                        <Image style={styles.excelBtn} source={require('../../img/excel.png')}></Image>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </ScrollView>
            </View>
            </View>

        )
    }
}

export default StatementScreen2;

const styles = StyleSheet.create({
  
  image:{
    alignItems: 'center', justifyContent:"center",
    width: "100%", height: "100%", 
    backgroundColor:'#67C8BA'
  },
  container: {
    width:'100%', height:'100%',
    alignItems: 'center',
    justifyContent: 'center',    
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
  },
  titleArea:{
    alignItems:"center"
  },
  textTitle:{
      fontSize:wp('5.55%'),
      fontFamily:"NanumSquareB",
      color: '#040525',
      marginBottom:hp('1%'),
      marginTop:hp('4%')
  },
  dropDownArea:{
    flexDirection:'row',
    marginTop:hp('3%'),
    marginBottom:hp('0.1%'),
    width:wp('90%'), height:hp('6%'),
    alignItems:"center", justifyContent:"flex-start",
    marginLeft:wp('5%')
  },
  dropDownArea2:{
    flexDirection:'row',
    marginTop:hp('0.1%'),
    marginLeft:wp('5%'),
    width:wp('90%'), height:hp('18%'),
    alignItems:"flex-start", justifyContent:"flex-start",
    ...Platform.select({
      ios:{
        zIndex:-1000
      }
    })
  },
  button: {
    backgroundColor: "#67C8BA", marginLeft:wp('2%'),marginTop:wp('1%'),
    width:wp('20%'), height: hp('6%'),
    justifyContent: 'center', alignItems:"center",
    borderRadius:wp('1.7%'),
  },
  buttonTitle: {
    color: 'white',
    fontFamily:"NanumSquare",
    fontSize:wp('4.5%'),
  },
  tableArea:{
    marginBottom:hp('5%'),
    marginTop:hp('2%'),
    width:wp('90%'),
    marginLeft:wp('5%'),
  },
  textArea:{
    marginTop:hp('2%'),
    marginLeft:wp('7%'),
    width:wp('80%'),
    position:"absolute",
    top:hp('27%'),
    ...Platform.select({
      ios:{
        zIndex:-2000
      }
    })
  },
  textStyle:{
    fontSize:wp('4.2%'),
    fontFamily:"NanumSquare",
    color: '#040525',
    marginTop:wp('1%'),
    marginBottom:wp('1.5%'),
    marginRight:wp('2%'),
  },  
  wrapper: { flexDirection: 'row' },
  singleHead: { width: wp('40%'), height: hp('5.5%'), backgroundColor: '#A3E5DA', borderTopLeftRadius:wp('4%')},
  singleHead1: {height: hp('5.5%'), backgroundColor: '#A3E5DA', borderTopRightRadius:wp('4%')},
  singleHead1_1: { width: wp('40%'), height: hp('5.5%'), backgroundColor: '#A3E5DA'},
  singleHead1_1_1: { width: wp('40%'), height: hp('5.5%'), backgroundColor: '#A3E5DA',borderBottomLeftRadius:wp('4%')},
  singleHead1_2: {height: hp('5.5%'), backgroundColor: '#67C8BA' },
  singleHead1_2_1:{height: hp('5.5%'), backgroundColor: '#67C8BA',borderBottomRightRadius:wp('4%')},
  title: { flex: 3, backgroundColor: '#E2F2EF' },
  title1: { flex: 1, backgroundColor: '#A3E5DA' },
  
  tableText: { 
    textAlign: 'center', 
    fontFamily:"NanumSquare", 
    color: '#040525',
    fontSize: wp('3.35%') },
  tableTitleText: { 
      textAlign: 'center', 
      fontFamily:"NanumSquare", 
      color: '#040525',
      ...Platform.select({
        ios:{
          fontSize: wp('3.2%')
        },
        android:{
          fontSize: wp('3.8%')
        }
      })
  },
  tableTitleWhiteText: { 
      textAlign: 'center', 
      fontFamily:"NanumSquare", 
      color: 'white',
      fontSize: wp('3.8%') },
  buttonArea: {
    position:'absolute', backgroundColor:'white',
    bottom:0, left:0, right:0, 
    alignItems:"center", justifyContent:"center",
    width: '100%', height: hp('14%'),
    paddingBottom:hp('7%'), paddingTop:hp('3%')
  },
  button1: {
    width:wp('90%'),height:hp('8%'),
    justifyContent: 'center', alignItems:"center",
    marginTop:hp('2%')
  },
  excelBtn:{
    ...Platform.select({
      ios:{
        width:wp('80%'), 
        height:hp('5.6%')
      },
      android:{
        width:wp('85%'), 
        height:hp('5.6%')
      }
    })
  }
});
