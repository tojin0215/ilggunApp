
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Table, TableWrapper,  Col, Cols, Cell } from 'react-native-table-component';
import CheckboxGroup from 'react-native-checkbox-group'
import { AsyncStorage } from 'react-native';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { WebView } from 'react-native-webview'
import axios from 'axios';
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
      tableTitle: ['월', '화', '수', '목', '금', '토', '일'],
      tableData: [
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
            <TextInput value={this.state.time1} onChangeText={(time1) => this.setState({time1})} placeholder='7' style={styles.text} />,
            <TextInput value={this.state.time2} onChangeText={(time2) => this.setState({time2})} placeholder='7' style={styles.text} />,
            <TextInput value={this.state.time3} onChangeText={(time3) => this.setState({time3})} placeholder='7' style={styles.text} />,
            <TextInput value={this.state.time4} onChangeText={(time4) => this.setState({time4})} placeholder='7' style={styles.text} />,
            <TextInput value={this.state.time5} onChangeText={(time5) => this.setState({time5})} placeholder='7' style={styles.text} />,
            <TextInput value={this.state.time6} onChangeText={(time6) => this.setState({time6})} placeholder='7' style={styles.text} />]

      ], id:this.props.route.params.workername, bang:''//, types4:[0,0,0,0,0]
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
        ||this.state.WorkPlace==null||this.state.WorkReference==null||this.state.Salary==null
        ||this.state.SalaryDay==null||this.state.ContractYear==null||this.state.ContractMonth==null
        ||this.state.ContractDay==null||this.state.BusinessName==null||this.state.BusinessAddress==null
        ||this.state.BusinessOwner1==null||this.state.BusinessPhone==null){
        Alert.alert('빈칸을 채워주세요.')
    } else{
        this.fetchHtml();
        Alert.alert('저장되었습니다.')  
    }
  }

  initfetchHtml = async(bangCode) => {
    axios.post('https://www.kwonsoryeong.tk:3000/selectContractform2', {
        bang:bangCode,
        id: this.props.route.params.workername
    },
    {  
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json'
        }
    })
    /*await fetch('https://www.kwonsoryeong.tk:3000/selectContractform2', {
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
            if(res.data[0].type==5){
                
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
            }
        })     
    }

fetchHtml = async(a) => {
    axios.post('https://www.kwonsoryeong.tk:3000/writeContractform2', {
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
                ,value4:JSON.stringify(this.state.value4)
    },
    {  headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
    })
    /*await fetch('https://www.kwonsoryeong.tk:3000/writeContractform2', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                
            }
        ),
      }).then(res => res.json())*/
      .then(res => {
        this.props.navigation.goBack();
      })     
    }


    StatementScreen = async() => {
        let sign="";
          axios.post('https://www.kwonsoryeong.tk:3000/selectSign', {
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
            <svg viewBox = "0 0 400 400" style="left: 230px; top:1750px; height:300px; width: 300px; font-size: 1.8em; position: absolute;" xmlns="http://www.w3.org/2000/svg">
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
      <View style={styles.container}>
        <Text style={styles.head}> 단기간근로자 표준근로계약서</Text>
        {this.state.type==4?
        (
        <>
        <Text>근로자가 확인하고 있습니다.</Text>
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
                            <Cols data={state.tableData} heightArr={[30,30,30,30,30,30,30,30]} textStyle={styles.text}/>
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
      </ScrollView></>)
        :
        this.state.type==5?
        
        <>
        {console.log("들어오고있니..?")}
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
                value={this.state. WorkPlace} 
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
            value={this.state. WorkReference} 
            onChangeText={(WorkReference) => this.setState({WorkReference})}
            ref={(input) => { this.TextInput9 = input; }}
            placeholder={'예) 어플개발'}
            style={styles.textinput}/>
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
                            <Cols data={state.tableData} heightArr={[30,30,30,30,30,30,30,30]} textStyle={styles.text}/>
                        </TableWrapper>
                    </Table>
        </View>
            

        <View style={styles.marginBottom2}>
        <Text style={styles.marginText}>5. 임금</Text> 
        <View style={styles.rowView3}>
            <Text>-시간(일, 월)급 : </Text>
            <TextInput
                value={this.state.Salary} 
                onChangeText={(Salary) => this.setState({Salary})}
                onSubmitEditing={() => { this.TextInput20.focus(); }}
                blurOnSubmit={false}
                placeholder={'8,590'}
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
                ref={(input) => { this.TextInput20 = input; }}
                onSubmitEditing={() => { this.TextInput21.focus(); }}
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
                ref={(input) => { this.TextInput21 = input; }}
                onSubmitEditing={() => { this.TextInput22.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원, </Text>
            <Text style={styles.marginLeft1}></Text>
            <TextInput
                value={this.state.Bonus2} 
                onChangeText={(Bonus2) => this.setState({Bonus2})}
                ref={(input) => { this.TextInput22 = input; }}
                onSubmitEditing={() => { this.TextInput23.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원</Text>
        </View>
                <View style={styles.rowView3}>
            <TextInput
                value={this.state.Bonus3} 
                onChangeText={(Bonus3) => this.setState({Bonus3})}
                ref={(input) => { this.TextInput23 = input; }}
                onSubmitEditing={() => { this.TextInput24.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원, </Text>
            <Text style={styles.marginLeft1}></Text>
            <TextInput
                value={this.state.Bonus4} 
                onChangeText={(Bonus4) => this.setState({Bonus4})}
                ref={(input) => { this.TextInput24 = input; }}
                onSubmitEditing={() => { this.TextInput25.focus(); }}
                blurOnSubmit={false}
                placeholder={'100000'}
                style={styles.textinput}/>
            <Text>원</Text>
        </View>
        <View style={styles.rowView3}>
            <Text>-초과근로에 대한 가산임금률 : </Text>
            <TextInput
                value={this.state.AdditionalWageRate} 
                onChangeText={(AdditionalWageRate) => this.setState({AdditionalWageRate})}
                ref={(input) => { this.TextInput25 = input; }}
                onSubmitEditing={() => { this.TextInput26.focus(); }}
                blurOnSubmit={false}
                placeholder={'10'}
                style={styles.textinput}/>
            <Text>%</Text>
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
            <Text style={styles.marginText}>6. 연차유급휴가</Text> 
            <Text style={styles.marginText}> - 통상근로자의 근로시간에 비례하여 연차유급휴가 부여함.</Text>
        </View>
        
        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>7. 사대보험 적용여부(해당란에 체크)</Text> 
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
            <Text style={styles.marginText}>8. 근로계약서 교부</Text> 
            <Text style={styles.marginText}> - '사업주'는 근로계약을 체결함과 동시에 본 계약서를 사본하여 근로자의 교부요구와 관계없이 '근로자'에게 교부함(근로기준법 제17조 이행)</Text>
        </View>

        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>9. 기타</Text> 
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
                this.setState({tableData:[]})
                this.handleSubmit()
            }}/>
        </View>
      </ScrollView>
        }
      </View>
    )
  }
}

export default ContractformBScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff',marginBottom:10, textAlign:'center' , fontSize:20, paddingTop:7},
  head2: {marginLeft:5, marginTop:15, fontSize:13, fontWeight: 'bold'},
  
  wrapper: { flexDirection: 'row' },
  head_t: {  height: 40,  backgroundColor: '#f1f8ff'  },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28 },
  singleHead1_2: {height: 30, backgroundColor: '#c8e1ff' },
    
  rowView : { flexDirection: 'row'},
  rowView2 : { flexDirection: 'row', justifyContent:"center", marginTop:20, marginBottom:20},
  rowView3 : { flexDirection: 'row', marginLeft:20},
  rowView4 : { flexDirection: 'row', marginLeft:10},
  text: { textAlign: 'center' },
  
  marginBottom1:{marginBottom:20},
  marginBottom2:{marginBottom:10},
  marginLeft1 : {marginLeft:30},
  marginText : {marginBottom:5, marginLeft:5},
  textinput:{ width: 50, height: 20, marginRight:3, marginLeft:10},
  textinput1:{ width: 30, height: 20, marginRight:3, marginLeft:10},
  textinput2:{ width: 15, height: 20, marginRight:3, marginLeft:10},
  textinput3:{ width: 250, height: 20, marginRight:3, marginLeft:10},
});