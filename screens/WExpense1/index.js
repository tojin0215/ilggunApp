
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput,ImageBackground, TouchableWithoutFeedback, Keyboard,Platform} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


class WExpenseScreen1 extends Component{

  constructor(props) {
    super(props);
    
    this.state = {
      MonthlySalary:'0', // MonthlySalary:보수총액
      TaxDeduction:'0', // TaxDeduction:3.3세금공제
      NationalPension:'0', // NationalPension:국민연금 (보수총액*4.5%)
      HealthInsurance:'0', // HealthInsurance:건강보험 (보수총액*3.3335%)
      RegularCare:'0', // RegularCare:건강보험(정기요양) (건강보험료*5.125%)
      EmploymentInsurance:'0', // EmploymentInsurance : 고용보험 (보수총액*0.8%)
      SocialInsurance:'0', // SocialInsurance:사대보험 (국민연금+건강보험+고용보험) -> 150인 이하,이상 근로자가 내는 보험료는 달라지지않음.
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
    
    AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.setState({bangCode: bangCode});
        this.fetchData();
      })
  }
 

  fetchData = async() => { 
    try {
        axios.post('http://13.124.141.28:3000/insurancePercentage',{
          bang : this.state.bangCode
        },
                {  headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'}
                })
                  .then(res => {
                    let year = new Date().getFullYear();
                    for(let i=0 ; i<res.data.length ; i++){
                      if(res.data[i].date == year){
                        this.setState({
                          NationalPensionPercentage:res.data[i].NationalPensionPercentage,
                          HealthInsurancePercentage:res.data[i].HealthInsurancePercentage,
                          RegularCarePercentage:res.data[i].RegularCarePercentage,
                          EmploymentInsurancePercentage:res.data[i].EmploymentInsurancePercentage
                        })
                      }
                    }
                      
                });
    } catch (e) {
        console.error(e);
      }
}

  updateState(){
    const NationalPension1 = Math.floor(((parseInt(this.state.MonthlySalary)*this.state.NationalPensionPercentage/100).toFixed(0))/10)*10;
    const HealthInsurance1 =  Math.floor(((parseInt(this.state.MonthlySalary)*this.state.HealthInsurancePercentage/100).toFixed(0))/10)*10;
    const RegularCare1 =  Math.floor(((HealthInsurance1*this.state.RegularCarePercentage/100).toFixed(0))/10)*10;
    const EmploymentInsurance1 = Math.floor(((parseInt(this.state.MonthlySalary)*this.state.EmploymentInsurancePercentage/100).toFixed(0))/10)*10;//근로자_고용보험
    const EmploymentInsurance1_1 = Math.floor((((parseInt(this.state.MonthlySalary)*this.state.EmploymentInsurancePercentage/100)+(this.state.MonthlySalary*0.25/100)).toFixed(0))/10)*10; //사업주_고용보험
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

  
  render() {
    const state = this.state;
    const{MonthlySalary, SocialInsurance, NationalPension, HealthInsurance, RegularCare, EmploymentInsurance, TaxDeduction,TotalSalary} = this.state
    
    return (
      
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.image}>
      <View style={styles.container}>
        <View style={styles.titleArea}>
        <Text style={styles.textTitle}>인건비 계산하기(정규직)</Text>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.textStyle}>*월 급여를 입력해주세요.</Text>
          <View style={styles.wrapper}>
            <TextInput
              value={this.state.MonthlySalary}
              keyboardType={"number-pad"}
              onChangeText={(MonthlySalary) => this.setState({MonthlySalary})}
              autoFocus={true}
              placeholder={'1000000'}
              keyboardType={"number-pad"}
              style={styles.textinputStyle}
            />
            <Text style={styles.textStyle}>원</Text>
          </View>
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.updateState()}}>
            <Text style={styles.buttonTitle}>인건비 계산하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReset}
            onPress={()=>{this.resetData()}}>
           <Text style={styles.buttonResetTitle}>초기화</Text>       
        </TouchableOpacity>
        </View>

        <Table borderStyle={{borderWidth: 1, borderColor:'white'}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.tableTextStyle}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[hp('6%'),hp('6%'),hp('6%'),hp('6%') ]} textStyle={styles.tableTextStyle}/>
            <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.tableTextStyle}/>
          </TableWrapper>
        </Table>

{/* 
        <Text></Text>
        <Text>사대보험 : {SocialInsurance}</Text>
        <Text>국민연금 : {NationalPension}</Text>
        <Text>건강보험 : {HealthInsurance}</Text>
        <Text>건강보험(정기요양) : {RegularCare}</Text>
        <Text>고용보험 : {EmploymentInsurance}</Text> */}
      </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default WExpenseScreen1;

const styles = StyleSheet.create({
  container: { 
    padding:wp('4.5%'), 
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    borderTopRightRadius:wp('13%'),
    borderTopLeftRadius:wp('13%'),
  },
  wrapper: { flexDirection: 'row' },
  head: {  
    height: hp('6%'),  
    backgroundColor: '#D3DDFF',
    borderTopRightRadius:wp('4%'), 
    borderTopLeftRadius:wp('4%')
  },
  titleArea:{
    alignItems:"center"
  },
  title: { 
    flex: 1, 
    backgroundColor: '#D3DDFF',
    borderBottomLeftRadius:wp('4%')
  },
  row: {  height:hp('6%') },
  image:{ 
    width: "100%", height: "100%", 
    backgroundColor:'#7085DF',
    alignItems: 'center', justifyContent:"center",
  },
  textTitle:{
    fontSize:wp('5.55%'),
    fontFamily:"NanumSquareB",
    marginBottom:hp('2%'),
    marginTop:hp('2%'),
    color:'#040525'
  },
  textArea:{
    marginTop:hp('2%'),
    marginBottom:hp('2%'),
    marginLeft:wp('1.5%')
  },
  textStyle:{
    fontSize:wp('4.2%'),
    fontFamily:"NanumSquare",
    color:'#040525',
    marginTop:wp('1%'),
    marginBottom:wp('1.5%'),
    marginRight:wp('2%'),
  },  
  tableTextStyle:{
    textAlign:"center",
    fontFamily:"NanumSquare",
    color:'#040525',
    ...Platform.select({
      ios:{
        fontSize: wp('3.6%') 
      },
      android:{
        fontSize: wp('4.2%') 
      }
    })
  },
  textinputStyle:{
    fontSize:wp('4.2%'),
    fontFamily:"NanumSquare",
    marginLeft:wp('3%'),
    width:wp('35%'), height:hp('4.5%'), textAlign:"center", justifyContent:"center",
    borderBottomWidth:hp('0.5%'),
    borderBottomColor:'#7085DF'
  },
  buttonArea: {
    alignItems:"center",
    width: '100%', height: hp('10%'),
    marginBottom:hp('10%'),
  },
  button: {
      backgroundColor: "#7085DF",
      width:wp('90%'), height: hp('5.5%'),
      justifyContent: 'center', alignItems:"center",
      borderRadius:wp('6%'),
      marginTop:hp('2%'),
  },
  buttonReset: {
    backgroundColor: "#040525",
    width:wp('90%'), height: hp('5.5%'),
    justifyContent: 'center', alignItems:"center",
    borderRadius:wp('6%'),
    marginTop:hp('1%'),
  },
  buttonTitle: {
      color: 'white',
      fontFamily:"NanumSquare",
      fontSize: wp('4.8%'),
  },
  buttonResetTitle: {
      color: 'white',
      fontFamily:"NanumSquare",
      fontSize: wp('4.8%'),
  },
  tableArea:{
    marginTop:hp('2%'), marginBottom:hp('3%')
  },
});
