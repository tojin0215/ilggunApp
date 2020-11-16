
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';

class ExpenseScreen1 extends Component{
  state={
    MonthlySalary:null, // MonthlySalary:보수총액
    TaxDeduction:null, // TaxDeduction:3.3세금공제
    NationalPension:null, // NationalPension:국민연금 (보수총액*4.5%)
    HealthInsurance:null, // HealthInsurance:건강보험 (보수총액*3.3335%)
    RegularCare:null, // RegularCare:건강보험(정기요양) (건강보험료*5.125%)
    EmploymentInsurance:null, // EmploymentInsurance : 고용보험 (보수총액*0.8%)
    SocialInsurance:null, // SocialInsurance:사대보험 (국민연금+건강보험+고용보험) -> 150인 이하,이상 근로자가 내는 보험료는 달라지지않음.
  }

  updateState(){
    const NationalPension1 = (this.state.MonthlySalary*4.5/100).toFixed(0);
    const HealthInsurance1 = (this.state.MonthlySalary*3.335/100).toFixed(0);
    const RegularCare1 = (HealthInsurance1*10.25/100).toFixed(0);
    const EmploymentInsurance1 = (this.state.MonthlySalary*0.8/100).toFixed(0);//근로자_고용보험
    const EmploymentInsurance1_1 = ((this.state.MonthlySalary*0.8/100)+(this.state.MonthlySalary*0.25/100)).toFixed(0); //사업주_고용보험
    const SocialInsurance1 = parseInt(NationalPension1)+parseInt(HealthInsurance1)+parseInt(RegularCare1)+parseInt(EmploymentInsurance1);

    const SumEmploymentInsurance = parseInt(EmploymentInsurance1)+parseInt(EmploymentInsurance1_1)
    const SumInsurance = parseInt(NationalPension1*2)+parseInt(HealthInsurance1*2)+parseInt(RegularCare1*2)+parseInt(EmploymentInsurance1)+parseInt(EmploymentInsurance1_1)
    const SumEmployee = parseInt(NationalPension1)+parseInt(HealthInsurance1)+parseInt(RegularCare1)+parseInt(EmploymentInsurance1)
    const SumBusinessOwner = parseInt(NationalPension1)+parseInt(HealthInsurance1)+parseInt(RegularCare1)+parseInt(EmploymentInsurance1_1)

    this.setState({
      NationalPension : NationalPension1,
      HealthInsurance : HealthInsurance1,
      RegularCare : RegularCare1,
      EmploymentInsurance : EmploymentInsurance1,
      SocialInsurance : SocialInsurance1,
      tableData: [
        [parseInt(NationalPension1*2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(NationalPension1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(NationalPension1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")],
        [parseInt(HealthInsurance1*2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(HealthInsurance1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") , parseInt(HealthInsurance1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")],
        [parseInt(RegularCare1*2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(RegularCare1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(RegularCare1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")],
        [parseInt(SumEmploymentInsurance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(EmploymentInsurance1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(EmploymentInsurance1_1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")],
        [parseInt(SumInsurance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(SumEmployee).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), parseInt(SumBusinessOwner).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")]
      ]
    });

  }

  resetData(){
    this.setState({
      MonthlySalary:'0',
      tableData: [
        ['-', '-', '-'],
        ['-', '-' , '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['구분', '보험료\n총액', '근로자\n부담', '사업주\n부담'],
      tableTitle: ['국민연금', '건강보험', '건강보험\n(장기요양)', '고용보험','합계'],
      tableData: [
        ['-', '-', '-'],
        ['-', '-' , '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    }
  }
 
  render() {
    const state = this.state;
    const{MonthlySalary, SocialInsurance, NationalPension, HealthInsurance, RegularCare, EmploymentInsurance, TaxDeduction,TotalSalary} = this.state
    
    return (
      <View style={styles.container}>
        <Text>월 급여</Text>
        <TextInput
          value={this.state.MonthlySalary}
          onChangeText={(MonthlySalary) => this.setState({MonthlySalary})}
          autoFocus={true}
          placeholder={'월급을 입력해주세요.'}
          style={styles.input}
        />
        <Button
              title="계산하기"
              onPress={()=>{this.updateState()}}/>
        <Button
              title="초기화"
              color="#FF3232"
              onPress={()=>{this.resetData()}}/>
        <Text></Text>

        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

        <Text></Text>
        <Text>사대보험 : {SocialInsurance}</Text>
        <Text>국민연금 : {NationalPension}</Text>
        <Text>건강보험 : {HealthInsurance}</Text>
        <Text>건강보험(정기요양) : {RegularCare}</Text>
        <Text>고용보험 : {EmploymentInsurance}</Text>
      </View>
    )
  }
}

export default ExpenseScreen1;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
