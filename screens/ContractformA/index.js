const axios = require('axios');
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckboxGroup from 'react-native-checkbox-group'

class ContractformAScreen extends Component{
  state={
  }
  
  constructor(props) {
    super(props);
    this.state = {
      types1: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types2: [{label: '없음   ', value: 0}, {label: '있음', value: 1}], 
      types3: [{label: '근로자에게 직접지급   ', value: 0}, {label: '근로자 명의 예금통장에 입금', value: 1}], 
      value1: 0, value1Index:0, value2: 0, value2Index:0, value3: 0, value3Index:0,value4: 0
    };
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
        ||this.state.BusinessOwner1==null||/*this.state.EmployeeAddress==null||this.state.EmployeePhone==null
        ||this.state.EmployeeName==null||*/this.state.BusinessPhone==null){
        this.fetchHtml();
        Alert.alert('빈칸을 채워주세요.') 
    } else{
        console.log(this.state);
        this.fetchHtml();
        Alert.alert('저장되었습니다.')    
    }
  }
  fetchHtml = async(a) => {
    await fetch('http://192.168.43.253:3000/writeContractform', {
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
            EmployeeName: this.state.EmployeeName}*/
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
                radio_props={this.state.types1}
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
                radio_props={this.state.types2}
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
                radio_props={this.state.types3}
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
            <Text>주소 : 사용자가 입력하는 칸입니다.</Text>
        </View>
        <View style={styles.rowView4}>
            <Text>연락처 : 사용자가 입력하는 칸입니다.</Text>
        </View>
        <View style={styles.rowView4}>
            <Text>성명 : 사용자가 입력하는 칸입니다.</Text>
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