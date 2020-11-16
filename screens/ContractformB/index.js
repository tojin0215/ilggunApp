
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Alert} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Table, TableWrapper,  Col, Cols, Cell } from 'react-native-table-component';
import CheckboxGroup from 'react-native-checkbox-group'

class ContractformBScreen extends Component{
  state={
  }

  constructor(props) {
    super(props);
    this.state = {
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

      ]
    };
  }
  

  handleSubmit(){
    if(this.state.Employer == null||this.state.Employee ==null
        ||this.state.StartYear==null||this.state.StartMonth==null||this.state.StartDay==null
        ||this.state.EndYear==null||this.state.EndMonth==null||this.state.EndDay==null
        ||this.state.WorkPlace==null||this.state.WorkReference==null||this.state.Salary==null
        ||this.state.SalaryDay==null||this.state.ContractYear==null||this.state.ContractMonth==null
        ||this.state.ContractDay==null||this.state.BusinessName==null||this.state.BusinessAddress==null
        ||this.state.BusinessOwner1==null||this.state.EmployeeAddress==null||this.state.EmployeePhone==null
        ||this.state.EmployeeName==null||this.state.BusinessPhone==null){
        Alert.alert('빈칸을 채워주세요.') 
    } else{
        Alert.alert('저장되었습니다.')    
    }
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.head}> 단기간근로자 표준근로계약서</Text>
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
            <Text style={styles.marginText}>6. 연차유급휴가</Text> 
            <Text style={styles.marginText}> - 통상근로자의 근로시간에 비례하여 연차유급휴가 부여함.</Text>
        </View>
        
        <View style={styles.marginBottom2}>
            <Text style={styles.marginText}>7. 사대보험 적용여부(해당란에 체크)</Text> 
            <CheckboxGroup
              callback={(selected) => { console.log(selected) }}
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