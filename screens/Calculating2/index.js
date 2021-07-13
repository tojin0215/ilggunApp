import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, TextInput, ScrollView, ImageBackground, Platform} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';
import moment from "moment";
import * as Font from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CalculatingScreen2 extends Component{
  updateState(){
    const Join = new Date(this.state.JoinYear, this.state.JoinMonth-1, this.state.JoinDay)
    const Leave = new Date(this.state.LeaveYear, this.state.LeaveMonth-1, this.state.LeaveDay)
    //const diff = ((Leave-Join)/(1000 * 3600 * 24))+1
    const diff = moment(Leave).diff(moment(Join), 'days')+1
    console.log('입사날짜 : ' + this.state.JoinYear+'년'+this.state.JoinMonth+'월'+this.state.JoinDay+'일')
    console.log('퇴사날짜 : ' + this.state.LeaveYear+'년'+this.state.LeaveMonth+'월'+this.state.LeaveDay+'일')
    //console.log(Join + '///' +Leave)
    console.log(diff)
    //console.log(moment(Join).format('YYYY년 MM월 DD일'))
    //console.log(moment(Leave).add(1,'days').format('YYYY년 MM월 DD일'))
    const LastDay = moment(Leave).add(1,'days').format('DD')

    if (LastDay == '01'){
      const Term1 = moment(Leave)
      const Term1_1 = moment(Term1).startOf('month')
      const Term2 = moment(Leave).subtract(1,'months').endOf('month')
      const Term2_1 = moment(Term2).startOf('month')
      const Term3 = moment(Leave).subtract(2,'months').endOf('month')
      const Term3_1 = moment(Term3).startOf('month')

      const diff1 = moment(Term1).diff(moment(Term1_1), 'days')+1
      const diff2 = moment(Term2).diff(moment(Term2_1), 'days')+1
      const diff3 = moment(Term3).diff(moment(Term3_1), 'days')+1
      const diff4 = 0

      this.setState({
        tableTitle: [
          Term3_1.format('YYYY.MM.DD')+'\n~'+Term3.format('YYYY.MM.DD'),
          Term2_1.format('YYYY.MM.DD')+'\n~'+Term2.format('YYYY.MM.DD'), 
          Term1_1.format('YYYY.MM.DD')+'\n~'+Term1.format('YYYY.MM.DD'), '-', '합계'],
        tableData: [
          [diff3, <TextInput value={this.state.term3BasePay} keyboardType={"number-pad"} onChangeText={(term3BasePay) => this.setState({term3BasePay})} autoFocus={true} placeholder={'1000000'} ref={(input) => { this.TextInput11 = input; }} onSubmitEditing={() => { this.TextInput12.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />, 
            <TextInput value={this.state.term3OtherAllowance} keyboardType={"number-pad"} onChangeText={(term3OtherAllowance) => this.setState({term3OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput12 = input; }} onSubmitEditing={() => { this.TextInput13.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />],
          [diff2, <TextInput value={this.state.term2BasePay} keyboardType={"number-pad"} onChangeText={(term2BasePay) => this.setState({term2BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput13 = input; }} onSubmitEditing={() => { this.TextInput14.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} /> , 
            <TextInput value={this.state.term2OtherAllowance} keyboardType={"number-pad"} onChangeText={(term2OtherAllowance) => this.setState({term2OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput14 = input; }} onSubmitEditing={() => { this.TextInput15.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />],
          [diff1, <TextInput value={this.state.term1BasePay} keyboardType={"number-pad"} onChangeText={(term1BasePay) => this.setState({term1BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput15 = input; }} onSubmitEditing={() => { this.TextInput16.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />,
            <TextInput value={this.state.term1OtherAllowance} keyboardType={"number-pad"} onChangeText={(term1OtherAllowance) => this.setState({term1OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput16 = input; }} onSubmitEditing={() => { this.TextInput30.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />],
          ['-', '-', '-'],
          [diff1+diff2+diff3, 
            parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay), 
            parseInt(this.state.term3OtherAllowance)+parseInt(this.state.term2OtherAllowance)+parseInt(this.state.term1OtherAllowance)]
        ],
        term4BasePay:'0', term4OtherAllowance:'0', diff4:'0',        
        diff3Month:diff1+diff2+diff3+diff4
      })

    } else{
      const Term1 = moment(Leave)
      const Term1_1 = moment(Leave).startOf('month')
      const Term2 = moment(Leave).subtract(1,'months').endOf('month')
      const Term2_1 = moment(Term2).startOf('month')
      const Term3 = moment(Leave).subtract(2,'months').endOf('month')
      const Term3_1 = moment(Term3).startOf('month')
      const Term4= moment(Leave).subtract(3,'months').endOf('month')
      const Term4_1= moment(Leave).subtract(3,'month').add(1,'days')

      const diff1 = moment(Term1).diff(moment(Term1_1), 'days')+1
      const diff2 = moment(Term2).diff(moment(Term2_1), 'days')+1
      const diff3 = moment(Term3).diff(moment(Term3_1), 'days')+1
      const diff4 = moment(Term4).diff(moment(Term4_1), 'days')+1

      this.setState({
        tableTitle: [
          Term4_1.format('YYYY.MM.DD')+'\n~'+Term4.format('YYYY.MM.DD'), 
          Term3_1.format('YYYY.MM.DD')+'\n~'+Term3.format('YYYY.MM.DD'), 
          Term2_1.format('YYYY.MM.DD')+'\n~'+Term2.format('YYYY.MM.DD'), 
          Term1_1.format('YYYY.MM.DD')+'\n~'+Term1.format('YYYY.MM.DD'), '합계'],
        tableData: [
          [diff4, <TextInput value={this.state.term4BasePay} keyboardType={"number-pad"} onChangeText={(term4BasePay) => this.setState({term4BasePay})} autoFocus={true} placeholder={'1000000'} ref={(input) => { this.TextInput11 = input; }} onSubmitEditing={() => { this.TextInput12.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />, 
            <TextInput value={this.state.term4OtherAllowance} keyboardType={"number-pad"} onChangeText={(term4OtherAllowance) => this.setState({term4OtherAllowance})} placeholder={'200000'} ref={(input) => { this.TextInput12 = input; }} onSubmitEditing={() => { this.TextInput13.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />],
          [diff3, <TextInput value={this.state.term3BasePay} keyboardType={"number-pad"} onChangeText={(term3BasePay) => this.setState({term3BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput13 = input; }} onSubmitEditing={() => { this.TextInput14.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />, 
            <TextInput value={this.state.term3OtherAllowance} keyboardType={"number-pad"} onChangeText={(term3OtherAllowance) => this.setState({term3OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput14 = input; }} onSubmitEditing={() => { this.TextInput15.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />],
          [diff2, <TextInput value={this.state.term2BasePay} keyboardType={"number-pad"} onChangeText={(term2BasePay) => this.setState({term2BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput15 = input; }} onSubmitEditing={() => { this.TextInput16.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} /> , 
            <TextInput value={this.state.term2OtherAllowance} keyboardType={"number-pad"} onChangeText={(term2OtherAllowance) => this.setState({term2OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput16 = input; }} onSubmitEditing={() => { this.TextInput17.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />],
          [diff1, <TextInput value={this.state.term1BasePay} keyboardType={"number-pad"} onChangeText={(term1BasePay) => this.setState({term1BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput17 = input; }} onSubmitEditing={() => { this.TextInput18.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />,
            <TextInput value={this.state.term1OtherAllowance} keyboardType={"number-pad"} onChangeText={(term1OtherAllowance) => this.setState({term1OtherAllowance})} placeholder={'20000'} ref={(input) => { this.TextInput18 = input; }} onSubmitEditing={() => { this.TextInput30.focus(); }} blurOnSubmit={false} style={styles.textinputStyle} />],
          [diff1+diff2+diff3+diff4,
            parseInt(this.state.term4BasePay)+parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay), 
            parseInt(this.state.term4OtherAllowance)+parseInt(this.state.term3OtherAllowance)+parseInt(this.state.term2OtherAllowance)+parseInt(this.state.term1OtherAllowance)]
        ],        
        diff3Month:diff1+diff2+diff3+diff4})
    }

    this.setState({
      NumberOfWorkingDays:diff,
      EnteringDate:moment(Join).format('YYYY년 MM월 DD일'),//Join,
      DateOfResignation:moment(Leave).format('YYYY년 MM월 DD일'), //Leave
    });
  }

  resetData(){
    this.setState({
      tableTitle: ['기간1', '기간2', '기간3', '기간4','합계'],
      tableData: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ],
      AverageDailyWage:0, SeverancePay:0,
      JoinYear:0, JoinMonth:0, JoinDay:0, 
      LeaveYear:0, LeaveMonth:0, LeaveDay:0, 
      NumberOfWorkingDays:0, 
      AnnualBonus:0, // 연간상여금
      AnnualAllowance:0, //연차수당
      term4OtherAllowance:0,term3OtherAllowance:0,term2OtherAllowance:0,term1OtherAllowance:0,
      term4BasePay:0,term3BasePay:0,term2BasePay:0,term1BasePay:0,
    })
  }

  SeverancePayCalculation(){
    const sumTermBasePay = parseInt(this.state.term1BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term3BasePay)+parseInt(this.state.term4BasePay)
    const sumTermOtherAllowance = parseInt(this.state.term1OtherAllowance)+parseInt(this.state.term2OtherAllowance)+parseInt(this.state.term3OtherAllowance)+parseInt(this.state.term4OtherAllowance)
    const TotalWage3Month = sumTermBasePay + sumTermOtherAllowance //A:3개월 간 임금총액=기본급 + 기타수당

    const AnnualBonus1 = this.state.AnnualBonus*3/12 //B:상여금가산액=연간상여금*(3개월/12개월)
    const AnnualAllowance1 = (this.state.AnnualAllowance)*3/12 //C:연차수당가산액=(연차수당(연차수당지급액*5일))*(3개월/12개월)
    
    const AverageDailyWage1= ((TotalWage3Month+AnnualBonus1+AnnualAllowance1)/this.state.diff3Month).toFixed(2)//1일평균임금=3개월지급총액(A+B+C)/3개월 총 일수
    const SeverancePay1 = (AverageDailyWage1*30*(this.state.NumberOfWorkingDays/365)).toFixed(2) //퇴직금=1일평균임금*30일*(재직일수/365)
    
    this.setState({
      AverageDailyWage:parseInt(AverageDailyWage1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      SeverancePay:parseInt(SeverancePay1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      JoinYear:'2020', JoinMonth:'1', JoinDay:'1', //입사 년,월,일
      LeaveYear:'2020', LeaveMonth:'12', LeaveDay:'31', //퇴사 년,월,일
      NumberOfWorkingDays:'0', //재직일수
      EnteringDate:'0', //입사일자
      DateOfResignation:'0', //퇴사일자
      term1BasePay:null, term2BasePay:null, term3BasePay:null, term4BasePay:null,
      term1OtherAllowance:null, term2OtherAllowance:null, term3OtherAllowance:null, term4OtherAllowance:null,
      diff3Month:'0',
      AnnualBonus:'0', // 연간상여금
      AnnualAllowance:'0', //연차수당
      SeverancePay:'0', //퇴직금
      tableHead: ['기간', '기간별일수', '기본급', '기타수당'],
      tableTitle: ['기간1', '기간2', '기간3', '기간4','합계'],
      tableData: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    }
  }

  render(){
    const state = this.state;
    const{JoinYear, JoinMonth, JoinDay, LeaveYear, LeaveMonth, LeaveDay, AnnualBonus, AnnualAllowance, SeverancePay, AverageDailyWage} = this.state
    
    return(
      <View style={styles.image}>
     <View style={styles.container}>
     
        <ScrollView>
          <View style={styles.titleArea}>
            <Text style={styles.textTitle}>퇴직금 계산하기</Text>
            </View>
          <View style={styles.rowView}>
            <Text style={styles.textStyle}>입사일자 : </Text>
            <TextInput
              value={this.state.JoinYear}
              onChangeText={(JoinYear) => this.setState({JoinYear})}
              autoFocus={true}
              onSubmitEditing={() => { this.TextInput1.focus(); }}
              blurOnSubmit={false}
              placeholder={'2015'}
              keyboardType={"number-pad"}
              style={styles.textinputYearStyle}
            />
            <Text style={styles.textStyle}>년</Text>
            <TextInput
              value={this.state.JoinMonth}
              onChangeText={(JoinMonth) => this.setState({JoinMonth})}
              ref={(input) => { this.TextInput1 = input; }}
              onSubmitEditing={() => { this.TextInput2.focus(); }}
              blurOnSubmit={false}
              placeholder={'5'}
              keyboardType={"number-pad"}
              style={styles.textinputDayStyle}
            />
            <Text style={styles.textStyle}>월</Text>
            <TextInput
              value={this.state.JoinDay}
              onChangeText={(JoinDay) => this.setState({JoinDay})}
              ref={(input) => { this.TextInput2= input; }}
              onSubmitEditing={() => { this.TextInput3.focus(); }}
              blurOnSubmit={false}
              placeholder={'25'}
              keyboardType={"number-pad"}
              style={styles.textinputDayStyle}
            />
            <Text style={styles.textStyle}>일</Text>
          </View>

          <View style={styles.rowView}>
            <Text style={styles.textStyle}>퇴직일자 : </Text>
            <TextInput
              value={this.state.LeaveYear}
              onChangeText={(LeaveYear) => this.setState({LeaveYear})}
              ref={(input) => { this.TextInput3 = input; }}
              onSubmitEditing={() => { this.TextInput4.focus(); }}
              blurOnSubmit={false}
              placeholder={'2020'}
              keyboardType={"number-pad"}
              style={styles.textinputYearStyle}
            />
            <Text style={styles.textStyle}>년</Text>
            <TextInput
              value={this.state.LeaveMonth}
              onChangeText={(LeaveMonth) => this.setState({LeaveMonth})}
              ref={(input) => { this.TextInput4 = input; }}
              onSubmitEditing={() => { this.TextInput5.focus(); }}
              blurOnSubmit={false}
              placeholder={'10'}
              keyboardType={"number-pad"}
              style={styles.textinputDayStyle}
            />
            <Text style={styles.textStyle}>월</Text>
            <TextInput
              value={this.state.LeaveDay}
              onChangeText={(LeaveDay) => this.setState({LeaveDay})}
              ref={(input) => { this.TextInput5 = input; }}
              placeholder={'10'}
              keyboardType={"number-pad"}
              style={styles.textinputDayStyle}
            />
            <Text style={styles.textStyle}>일</Text>
          </View>
          <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.updateState()}}>
            <Text style={styles.buttonTitle}>평균임금계산 기간보기</Text>

          </TouchableOpacity>
          </View>

          <View style={styles.marginTop}>
            {/* <Text>입사일자 : {this.state.EnteringDate}</Text>
            <Text>퇴사일자 : {this.state.DateOfResignation}</Text>  */}
            <Text style={styles.textStyle1}>재직일수 : {this.state.NumberOfWorkingDays}일</Text>
          </View>

         <View style={styles.tableArea}>
          <Table borderStyle={{borderWidth: 1, borderColor:'white'}}>
            <Row data={state.tableHead} flexArr={[0.8, 1, 1, 1]} style={styles.head} textStyle={styles.tableText}/>
            <TableWrapper style={styles.wrapper}>
              <Col data={state.tableTitle} style={styles.title} heightArr={[hp('6%'),hp('6%'),hp('6%'),hp('6%')]} textStyle={styles.tableText}/>
              <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.tableText}/>
            </TableWrapper>
          </Table>
          </View>

          <View style={styles.textArea}>
            <Text style={styles.textStyle1}>*연간상여금과 연차수당 없으면 0으로 입력해주세요. </Text>
            <View style={styles.rowView}>
              <Text style={styles.textStyle}>연간상여금 총액 : </Text>
              <TextInput
                value={this.state.AnnualBonus}
                onChangeText={(AnnualBonus) => this.setState({AnnualBonus})}
                ref={(input) => { this.TextInput30 = input; }}
                onSubmitEditing={() => { this.TextInput31.focus(); }}
                blurOnSubmit={false}
                placeholder={'연간상여금 총액'}
                keyboardType={"number-pad"}
                style={styles.textinputStyle}
              />
              <Text style={styles.textStyle}> 원</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.textStyle}>연차수당 : </Text>
              <TextInput
                type="number"
                value={this.state.AnnualAllowance}
                onChangeText={(AnnualAllowance) => this.setState({AnnualAllowance})}
                ref={(input) => { this.TextInput31 = input; }}
                blurOnSubmit={false}
                placeholder={'연차수당'}
                keyboardType={"number-pad"}
                style={styles.textinputStyle}
              />
              <Text style={styles.textStyle}> 원</Text>
            </View>
          </View>
          
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.updateState()}}>
              <Text style={styles.buttonTitle}>기본급/기타수당 입력하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonReset}
              onPress={()=>{this.resetData()}}>
              <Text style={styles.buttonResetTitle}>초기화</Text>
            </TouchableOpacity> 
          </View>

          <View style={styles.resultArea}>
          <Text style={styles.textStyle1}>* 기본급/기타수당 입력하기 버튼을 누른 후 퇴직금 계산하기 버튼을 누르시오.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.SeverancePayCalculation()}}>
              <Text style={styles.buttonTitle}>퇴직금 계산하기</Text>
            </TouchableOpacity> 
          </View>
          <View>
            <Text style={styles.textStyle}>* 퇴직금 계산 결과</Text>
            <Text style={styles.textResultStyle}>1일평균임금 : {AverageDailyWage} 원</Text>    
            <Text style={styles.textResultStyle}>퇴직금 : {SeverancePay} 원</Text>
          </View>  
          <View style={{marginTop:hp('2%')}}>
            <Text style={styles.textStyle}>* 회사 내규 등에따라 실제 지급액과가 차이가 있을 수 있습니다.</Text>
          </View>
        </ScrollView>    
      </View>
      </View>
    )
  }
  
}
  
  export default CalculatingScreen2;
  const styles = StyleSheet.create({
    container: {
      padding:wp('5%'), 
      width: "100%", 
      height: "100%",    
      backgroundColor: 'white',
      borderTopRightRadius:wp('13%'),
      borderTopLeftRadius:wp('13%'),
  
    },
    rowView: { flexDirection: 'row' },
    marginTop : {marginTop: hp('1.3%')},
    wrapper: { flexDirection: 'row' },
    head: {  height: hp('6%'),  backgroundColor: '#E2F2EF', borderTopRightRadius:wp('4%'), borderTopLeftRadius:wp('4%') },
    title: { flex: 0.8, backgroundColor: '#E2F2EF',  borderBottomLeftRadius:wp('4%')},
    row: {  height:hp('6%') },
    titleArea:{
      alignItems:"center"
    },
    tableText: { 
      textAlign: 'center', 
      fontFamily:"NanumSquare", 
      color: '#040525',
      ...Platform.select({
        ios:{
          fontSize: wp('3.2%'),
        },
        android:{
          fontSize: wp('3.8%'),
        }
      })
    },
    image:{ 
      alignItems: 'center', justifyContent:"center",
      width: "100%", height: "100%",     
      backgroundColor:'#67C8BA'
    },
    textTitle:{
      fontSize: wp('5.55%'),
      fontFamily:"NanumSquareB",
      color: '#040525',
      marginBottom:hp('2%'),
      marginTop:hp('2%')
    },
    textStyle:{
      fontSize:wp('4.2%'),
      fontFamily:"NanumSquare",
      color: '#040525',
      marginLeft:wp('1.5%'),
      marginTop:hp('1%'),
      marginBottom:wp('1%'),
      marginRight:wp('2%'),
    },
    textStyle1:{
      fontSize:wp('4.2%'),
      fontFamily:"NanumSquare",
      color: '#040525',
      marginLeft:wp('1.5%'),
      marginTop:wp('1%'),
      marginBottom:wp('2.5%'),
      marginRight:wp('2%'),
    },
    textResultStyle:{
      fontSize: wp('5.05%'),
      fontFamily:"NanumSquareB",
      color: '#040525',
      marginLeft:wp('3%'),
      marginTop:wp('1%'),
      marginBottom:wp('1.5%'),
      marginRight:wp('2%'),
    },
    textinputStyle:{
      fontSize:wp('4.2%'),
      fontFamily:"NanumSquare",
      marginLeft:wp('1.5%'),
      width:wp('30%')
    },
    textinputYearStyle:{
      fontSize:wp('4.2%'),
      fontFamily:"NanumSquare",
      marginLeft:wp('1.5%'),
      width:wp('11%')
    },
    textinputDayStyle:{
      fontSize:wp('4.2%'),
      fontFamily:"NanumSquare",
      marginLeft:wp('2%'),
      width:wp('7%'),
    },
    buttonArea: {
      alignItems:"center",
      width: '100%', height: hp('10%'),
      marginBottom:hp('2%'),
    },
    button: {
        backgroundColor: "#67C8BA",
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
        fontSize:wp('4.8%'),
    },
    buttonResetTitle: {
        color: 'white',
        fontFamily:"NanumSquare",
        fontSize:wp('4.8%'),
    },
    tableArea:{
      marginTop:hp('2%'), marginBottom:hp('3%')
    },
    resultArea:{
      marginTop:hp('9%'), alignItems:"center",
      width: '100%', height: hp('15%'),
      marginBottom:hp('2%'),
    },
    textArea:{
      marginTop:hp('2%'),
      marginBottom:hp('2%')
    }
  });
  