import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';
import moment from "moment";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class UnemploymentScreen2 extends Component{

    state={
        Age:0, Period:0, yesORno:null,
    }

    updateState(){
        const Last = new Date(this.state.LastYear, this.state.LastMonth-1, this.state.LastDay) // 마지막근무일
        const MyBirth = moment(this.state.DateOfBirth).add(1,'days').format('YYYYMMDD');
        const BirDiff1 = moment(Last).diff(moment(MyBirth), 'months')
        const BirDiff = Math.floor(BirDiff1/12);

        const LastDay = moment(Last).add(1,'days').format('DD')

        console.log(this.state.DateOfBirth)

        if(this.state.DateOfBirth == null || this.state.JoinMonth ==null || this.state.LastYear == null || this.state.LastMonth == null || this.state.LastDay == null){
            Alert.alert('빈칸없이 입력해주세요.')
        } else {

            if (LastDay == '01'){
                const Term1 = moment(Last).subtract(1,'months').endOf('month')
                const Term1_1 = moment(Term1).startOf('month')
                const Term2 = moment(Last).subtract(2,'months').endOf('month')
                const Term2_1 = moment(Term2).startOf('month')
                const Term3 = moment(Last).subtract(3,'months').endOf('month')
                const Term3_1 = moment(Term3).startOf('month')
        
                const diff1 = moment(Term1).diff(moment(Term1_1), 'days')+1
                const diff2 = moment(Term2).diff(moment(Term2_1), 'days')+1
                const diff3 = moment(Term3).diff(moment(Term3_1), 'days')+1
                const diff4 = 0

                this.setState({
                tableTitle: [
                    Term3_1.format('YYYY.MM.DD')+'\n~'+Term3.format('YYYY.MM.DD'),
                    Term2_1.format('YYYY.MM.DD')+'\n~'+Term2.format('YYYY.MM.DD'), 
                    Term1_1.format('YYYY.MM.DD')+'\n~'+Term1.format('YYYY.MM.DD'), 
                    '-', '1일 평균 임금','월 납부 보험료'], 
                    //(1일 평균급여액 = 최근 3개월 급여액 / 최근 3개월 근무기간)
                    //월 납부 보험료 = 월 평균급여(1일평균급여*30) X 0.8%)
                tableData: [
                    [diff3, <TextInput value={this.state.term3BasePay} onChangeText={(term3BasePay) => this.setState({term3BasePay})} autoFocus={true} placeholder={'1000000'} onSubmitEditing={() => { this.TextInput11.focus(); }} blurOnSubmit={false} style={styles.input} />],
                    [diff2, <TextInput value={this.state.term2BasePay} onChangeText={(term2BasePay) => this.setState({term2BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput11 = input; }} onSubmitEditing={() => { this.TextInput12.focus(); }} blurOnSubmit={false} style={styles.input} />],
                    [diff1, <TextInput value={this.state.term1BasePay} onChangeText={(term1BasePay) => this.setState({term1BasePay})} placeholder={'1000000'} ref={(input) => { this.TextInput12 = input; }} style={styles.input} />],
                    ['-', '-'],
                    [diff1+diff2+diff3, 
                        ((parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay))/(diff1+diff2+diff3)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")],
                    ['', 
                        ((parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay))/3*0.008).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")],
                ],
                term4BasePay:0, diff4:0,        
                diff3Month:diff1+diff2+diff3+diff4,
                AverageSalary: (parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay))/(diff1+diff2+diff3+diff4)
                })
        
            } else{
                const Term1 = moment(Last).subtract(1,'months')
                const Term1_1 = moment(Last).subtract(1,'months').startOf('month')
                const Term2 = moment(Last).subtract(2,'months').endOf('month')
                const Term2_1 = moment(Term2).startOf('month')
                const Term3 = moment(Last).subtract(3,'months').endOf('month')
                const Term3_1 = moment(Term3).startOf('month')
                const Term4= moment(Last).subtract(4,'months').endOf('month')
                const Term4_1= moment(Last).subtract(4,'month').add(1,'days')
        
                const diff1 = moment(Term1).diff(moment(Term1_1), 'days')+1
                const diff2 = moment(Term2).diff(moment(Term2_1), 'days')+1
                const diff3 = moment(Term3).diff(moment(Term3_1), 'days')+1
                const diff4 = moment(Term4).diff(moment(Term4_1), 'days')+1
        
                this.setState({
                tableTitle: [
                    Term4_1.format('YYYY.MM.DD')+'\n~'+Term4.format('YYYY.MM.DD'), 
                    Term3_1.format('YYYY.MM.DD')+'\n~'+Term3.format('YYYY.MM.DD'), 
                    Term2_1.format('YYYY.MM.DD')+'\n~'+Term2.format('YYYY.MM.DD'), 
                    Term1_1.format('YYYY.MM.DD')+'\n~'+Term1.format('YYYY.MM.DD'), '1일 평균 임금','월 납부 보험료'],
                tableData: [
                    [diff4, <TextInput value={this.state.term4BasePay} onChangeText={(term4BasePay) => this.setState({term4BasePay})} autoFocus={true} placeholder={'1000000'} onSubmitEditing={() => { this.TextInput13.focus(); }} blurOnSubmit={false} style={styles.input} />],
                    [diff3, <TextInput value={this.state.term3BasePay} onChangeText={(term3BasePay) => this.setState({term3BasePay})} ref={(input) => { this.TextInput13 = input; }} onSubmitEditing={() => { this.TextInput14.focus(); }} blurOnSubmit={false} style={styles.input} />],
                    [diff2, <TextInput value={this.state.term2BasePay} onChangeText={(term2BasePay) => this.setState({term2BasePay})} ref={(input) => { this.TextInput14 = input; }} onSubmitEditing={() => { this.TextInput15.focus(); }} blurOnSubmit={false} style={styles.input} />],
                    [diff1, <TextInput value={this.state.term1BasePay} onChangeText={(term1BasePay) => this.setState({term1BasePay})} ref={(input) => { this.TextInput15 = input; }} style={styles.input} />],
                    [diff1+diff2+diff3+diff4,
                        ((parseInt(this.state.term4BasePay)+parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay))/(diff1+diff2+diff3+diff4)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")], 
                        //(1일 평균 임금 = 이직일 이전4개월 중 최종 1개월을 제외한 3개월간의 임금 총액 / 이직일 이전 4개월중 최종 1개월을 제외한 3개월 간의 총 일수)
                    ['',
                        ((parseInt(this.state.term4BasePay)+parseInt(this.state.term3BasePay)+parseInt(this.state.term2BasePay)+parseInt(this.state.term1BasePay))/3*0.008).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")]   
                        //(월 납부 보험료 = 월 평균급여 X 0.8%)
                ],        
                diff3Month:diff1+diff2+diff3+diff4})
            }
            
            var yesORno1 = '';
            if(this.state.types1[this.state.value1Index].label == '예'){
                yesORno1 = 'yes';
                console.log('예예예')
            }else{
                yesORno1 = 'no';
                console.log('노노노')
            }  

            this.setState({
                Period:this.state.JoinMonth,
                Age:BirDiff,
                DateOfResignation:moment(Last),
                yesORno:yesORno1
            })
            
        }
    }

    calculation(){
        const year = moment(this.state.DateOfResignation).format('YYYY');
        const yearmonth = moment(this.state.DateOfResignation).format('YYYYMM');
        var PaymentDays1=0;
        var OneDayUnemploymentBenefitAmount1=0;
        const RyesORno = this.state.yesORno;
        
        console.log(RyesORno);

        const StandardDate1 = new Date(2019, 9, 1) //2019.10.1이 기준일
        const StandardDate = moment(StandardDate1).format('YYYYMM')
        const Age1 = this.state.Age
        const Period1 = this.state.Period


        if(yearmonth < StandardDate) {
            if(RyesORno == 'yes'){
                if(Period1<12){//1이상
                    PaymentDays1=90;
                } else if(Period1>=12 && Period1<36){//1이상 3미만
                    PaymentDays1=150;
                } else if(Period1>=36 && Period1<60){//3이상 5미만
                    PaymentDays1=180;
                } else if(Period1>=60 && Period1<120){//5이상 10미만
                    PaymentDays1=210;
                } else{//10미만
                    PaymentDays1=240;
                }
            } else{
                if(Age1 < 30){
                    if(Period1<12){//1미만
                        PaymentDays1=90;
                    } else if(Period1>=12 && Period1<36){//1이상 3미만
                        PaymentDays1=90;
                    } else if(Period1>=36 && Period1<60){//3이상 5미만
                        PaymentDays1=120;
                    } else if(Period1>=60 && Period1<120){//5이상 10미만
                        PaymentDays1=150;
                    } else{//10이상
                        PaymentDays1=180;
                    }
                } else if(Age1>=30 && Age1 <50){
                    if(Period1<12){//1이상
                        PaymentDays1=90;
                    } else if(Period1>=12 && Period1<36){//1이상 3미만
                        PaymentDays1=120;
                    } else if(Period1>=36 && Period1<60){//3이상 5미만
                        PaymentDays1=150;
                    } else if(Period1>=60 && Period1<120){//5이상 10미만
                        PaymentDays1=180;
                    } else{//10이상
                        PaymentDays1=210;
                    }
                } else{
                    if(Period1<12){//1이상
                        PaymentDays1=90;
                    } else if(Period1>=12 && Period1<36){//1이상 3미만
                        PaymentDays1=150;
                    } else if(Period1>=36 && Period1<60){//3이상 5미만
                        PaymentDays1=180;
                    } else if(Period1>=60 && Period1<120){//5이상 10미만
                        PaymentDays1=210;
                    } else{//10미만
                        PaymentDays1=240;
                    }
                }
            }
            
        } else{
            if(RyesORno == 'yes'){
                if(Period1<12){ //1미만
                    PaymentDays1=120;
                } else if(Period1>=12 && Period1<36){ //1이상 3미만
                    PaymentDays1=180;
                } else if(Period1>=36 && Period1<60){//3이상 5미만
                    PaymentDays1=210;
                } else if(Period1>=60 && Period1<120){//5이상 10미만
                    PaymentDays1=240;
                } else{//10이상
                    PaymentDays1=270;
                }
            }else{
                if(Age1 < 50){
                    if(Period1<12){ //1미만
                        PaymentDays1=120;
                    } else if(Period1>=12 && Period1<36){ //1이상 3미만
                        PaymentDays1=150;
                    } else if(Period1>=36 && Period1<60){//3이상 5미만
                        PaymentDays1=180;
                    } else if(Period1>=60 && Period1<120){//5이상 10미만
                        PaymentDays1=210;
                    } else{//10이상
                        PaymentDays1=240;
                    }
                } else{
                    console.log('2019.10.1 이후 & 50세 이상')
                    if(Period1<12){ //1미만
                        PaymentDays1=120;
                    } else if(Period1>=12 && Period1<36){ //1이상 3미만
                        PaymentDays1=180;
                    } else if(Period1>=36 && Period1<60){//3이상 5미만
                        PaymentDays1=210;
                    } else if(Period1>=60 && Period1<120){//5이상 10미만
                        PaymentDays1=240;
                    } else{//10이상
                        PaymentDays1=270;
                    }
                }
            }
        }

        if(parseInt(year) == 2016){
            OneDayUnemploymentBenefitAmount1=43416;
        }else if(parseInt(year) == 2017){
            OneDayUnemploymentBenefitAmount1=46584;
        }else if(parseInt(year) == 2018){
            OneDayUnemploymentBenefitAmount1=54216;
        }else if(parseInt(year) >= 2019){
            OneDayUnemploymentBenefitAmount1=60120;
        }else{
            Alert.alert('마지막 근무일을 다시 한번 확인해주세요.');
        }

        console.log('year : '+year +', 보험: '+ OneDayUnemploymentBenefitAmount1)
        const UnemploymentBenefitAmount1 =  OneDayUnemploymentBenefitAmount1*PaymentDays1

        this.setState({
            OneDayUnemploymentBenefitAmount: OneDayUnemploymentBenefitAmount1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            PaymentDays:PaymentDays1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            UnemploymentBenefitAmount:UnemploymentBenefitAmount1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        })
        
    }

    resetData(){
        this.setState({
          tableTitle: ['기간1', '기간2', '기간3', '기간4','1일 평균 임금','월 납부 보험료'],
          tableData: [
            ['-', '-'],
            ['-', '-'],
            ['-', '-'],
            ['-', '-'],
            ['-', '-'],
            ['-', '-']
          ],
          DateOfBirth:0, JoinMonth:0,
          LastYear:0, LastMonth:0, LastDay:0, 
          term4BasePay:0,term3BasePay:0, term2BasePay:0,term1BasePay:0,
          OneDayUnemploymentBenefitAmount:0, UnemploymentBenefitAmount:0, PaymentDays:0
        })
      }

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['계산기간', '산정기간', '월 급여액'],
            tableTitle: ['기간1', '기간2', '기간3', '기간4','1일 평균 임금','월 납부 보험료'],
            tableData: [
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-'],
                ['-', '-']
            ],
            types1: [{label: '예', value: 0}, {label: '아니오', value: 1}],
            value1: 1,
            value1Index: 1,
        }
    }

    render() {
        const state = this.state;
        const{DateOfBirth,Period, Age, OneDayUnemploymentBenefitAmount,UnemploymentBenefitAmount, PaymentDays} = this.state
        return (
            <View  style={styles.container}>
            <ScrollView>
                <Text>실업급여 모의계산 : 일용 근로자{'\n'}</Text>
                <Text>“모의 계산은 실직(폐업) 시 수급 받을 수 있는 실업급여를 추정해 보는 것입니다” {'\n'}
                        고용보험에 가입해 있는 피보험자가 실직할 경우 받게 될 실업급여를 모의 계산해 볼 수 있습니다.{'\n'}
                        “실제 수급일수 및 수급액과는 차이가 있을 수 있습니다“{'\n'}
                </Text>
                <View style={styles.rowView}>
                    <Text style={styles.textMargin}>생년월일</Text>
                    <TextInput
                        value={this.state.DateOfBirth}
                        autoFocus={true}
                        onChangeText={(DateOfBirth) => this.setState({DateOfBirth})}
                        onSubmitEditing={() => { this.TextInput1.focus(); }}
                        blurOnSubmit={false}
                        placeholder={'19901013'}
                        style={styles.input}
                    />
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.textMargin}>장애인 여부</Text>
                    <RadioForm
                        ref="radioForm"
                        radio_props={this.state.types1}
                        initial={1}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        labelColor={'#000'}
                        animation={true}
                        onPress={(value, index) => {
                            this.setState({
                            value1:value,
                            value1Index:index
                            })
                        }}
                    />
                    {/* <Text>selected: {this.state.types1[this.state.value1Index].label}</Text> */}
                </View>                
                <View style={styles.rowView}>
                    <Text style={styles.textMargin}>고용보험 총 가입기간</Text>
                    <TextInput
                        value={this.state.JoinMonth}
                        onChangeText={(JoinMonth) => this.setState({JoinMonth})}
                        ref={(input) => { this.TextInput1 = input; }}
                        onSubmitEditing={() => { this.TextInput2.focus(); }}
                        blurOnSubmit={false}
                        placeholder={'5'}
                        style={styles.input}
                        />
                    <Text style={styles.textMargin}>개월 </Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.textMargin}>마지막 근무일</Text>
                    <TextInput
                        value={this.state.LastYear}
                        onChangeText={(LastYear) => this.setState({LastYear})}
                        ref={(input) => { this.TextInput2 = input; }}
                        onSubmitEditing={() => { this.TextInput3.focus(); }}
                        blurOnSubmit={false}
                        placeholder={'2015'}
                        style={styles.input}
                    />
                    <Text style={styles.textMargin}>년 </Text>
                    <TextInput
                        value={this.state.LastMonth}
                        onChangeText={(LastMonth) => this.setState({LastMonth})}
                        ref={(input) => { this.TextInput3 = input; }}
                        onSubmitEditing={() => { this.TextInput4.focus(); }}
                        blurOnSubmit={false}
                        placeholder={'5'}
                        style={styles.input}
                        />
                    <Text style={styles.textMargin}>월 </Text>
                    <TextInput
                        value={this.state.LastDay}
                        onChangeText={(LastDay) => this.setState({LastDay})}
                        ref={(input) => { this.TextInput4 = input; }}
                        placeholder={'25'}
                        style={styles.input}
                    />
                    <Text style={styles.textMargin}>일 </Text>
                </View>
                <Text>{'\n'}실업급여 모의계산 결과는 실제 수급액, 수급자격 인정 여부와 차이가 있을 수 있으며, 특히 근무기간이 6∼7개월인 경우 피보험단위기간(무급휴일 제외) 180일 요건을 충족하지 못하여 수급자격이 인정되지 않을 수 있으므로 정확한 수급자격인정여부는 거주지 관할 고용센터에 직접 문의하시기 바랍니다.{'\n'}</Text>
                <Button
                    title="확인하기"
                    onPress={()=>{this.updateState()}}/>
                <Text style={styles.textCenter}>퇴사당시 만 나이 : 만 {Age}세</Text>
                <Text style={styles.textCenter}>고용보험 총 가입기간 : {Period}개월</Text>

                <View  style={styles.marginTop}>
                    <Text style={styles.marginTop}>* 계산기간 : 일직일 이전 4개월 중 최종 1개월을 제외한 3개월</Text>
                    <Table borderStyle={{borderWidth: 1}}>
                        <Row data={state.tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                        <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                        <Rows data={state.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text}/>
                        </TableWrapper>
                    </Table>
                    <Button
                    title="평균 임금, 보험료 확인하기"
                    onPress={()=>{this.updateState()}}/>
                </View>
                <View style={styles.marginTop}>
                    <Button
                        title="실업급여 모의 계산"
                        onPress={()=>{this.calculation()}}/>
                    <Button
                        title="초기화"
                        color="#FF3232"
                        onPress={()=>{this.resetData()}}/> 
                    <Text style={styles.textCenter}>1일 실업급여 수급액 : {OneDayUnemploymentBenefitAmount} 원</Text>
                    <Text style={styles.textCenter}>예상 지급일 수 : {PaymentDays}일</Text>
                    <Text style={styles.textCenter}>총 예상수급액 : {UnemploymentBenefitAmount}원</Text>
                </View>

                <Text style={styles.textMargin}>
                {'\n'}※예상지급일 수는 퇴직 당시 연령 과 고용보험 가입기간에 따라 최소 120일에서 최대 270일까지로 계산 됩니다.(이직일이 2019.10.1 이전은 최소 90일에서 최대 240일)
                {'\n'}※ 실업급여 모의계산 결과는 실제 수급액, 수급자격 인정 여부와 차이가 있을 수 있으며, 특히 근무기간이 6∼7개월인 경우 피보험단위기간(무급휴일 제외) 180일 요건을 충족하지 못하여 수급자격이 인정되지 않을 수 있으므로 정확한 수급자격인정여부는 거주지 관할 고용센터에 직접 문의하시기 바랍니다.
                </Text>

            </ScrollView>
            </View>
        )
    }
}

export default UnemploymentScreen2;
