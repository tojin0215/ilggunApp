const axios = require('axios');
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckboxGroup from 'react-native-checkbox-group'

class WorkerContractformScreen extends Component{
  state={
  }
  
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }
  componentDidMount(){
    this.fetchHtml();
  }

    fetchHtml = async() => {
    await fetch('http://192.168.43.253:3000/selectContractform', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
      .then(res => {
          //res.types1 = JSON.parse(res.types1);
          //res.types2 = JSON.parse(res.types2);
          //res.types3 = JSON.parse(res.types3);
          console.log(res[0]);
          console.log('--------------')
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
      <View style={styles.container}>
        <Text style={styles.head}> 근로계약서_정규/계약</Text>
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
            <Text>주소 : </Text>
            <TextInput
                value={this.state.EmployeeAddress} 
                onChangeText={(EmployeeAddress) => this.setState({EmployeeAddress})}
                ref={(input) => { this.TextInput36 = input; }}
                onSubmitEditing={() => { this.TextInput37.focus(); }}
                blurOnSubmit={false}
                placeholder={'근로자 주소'}
                style={styles.textinput3}/>
        </View>
        <View style={styles.rowView4}>
            <Text>연락처 : </Text>
            <TextInput
                value={this.state.EmployeePhone} 
                onChangeText={(EmployeePhone) => this.setState({EmployeePhone})}
                ref={(input) => { this.TextInput37 = input; }}
                onSubmitEditing={() => { this.TextInput38.focus(); }}
                blurOnSubmit={false}
                placeholder={'연락처'}
                style={styles.textinput3}/>
        </View>
        <View style={styles.rowView4}>
            <Text>성명 : </Text>
            <TextInput
                value={this.state.EmployeeName} 
                onChangeText={(EmployeeName) => this.setState({EmployeeName})}
                ref={(input) => { this.TextInput38 = input; }}
                placeholder={'근로자 이름'}
                style={styles.textinput3}/>
        </View>
      </View>

      <View style={styles.buttonBottom}>
          <Button 
            title="저장하기"
            onPress={()=>{this.handleSubmit()}}/>
        </View>
      </ScrollView>
      </View>
    )
  }
}

export default WorkerContractformScreen;

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