import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, View, Button,Alert, Animated} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper,  Col, Cols, Cell } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import StatementScreen1 from '../Statemanet1';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

//data 순서 : 입사일/월급(보수총액)->DB/추가금액->DB/공제액->계산/실지금액->계산

//정규) SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
//알바) TaxDeduction:3.3세금공제

// 알바:시급/시간/식대/추가근로      정규:기본급/식대/추가근로
const name = [['김수정','알바','8590','80','10000','40000'],['권소령','정규직','3000000','20000','50000'],
            ['전세웅','정규직','1000000','20000','60000'],['정민지','정규직','2000000','0','100000']]

class WorkerStatementScreen extends Component{
// 급여대장
    constructor(props) {
      super(props);
      this.state = {
          itemA: null , isVisibleA: false, itemB: null, isVisibleB: false,
          PaymentSum:'-', DeductionSum:'-', Difference:'-', Name:'-', WorkingType:'-',
          tableTitle:['기본급','추가근로수당','식대','국민연금','건강보험료','장기요양보험료','고용보험료','소득세','주민세'],
          tableData: [
              ['-','-','-','-','-','-','-','-','-'],
          ],
          nname :[], type1:[], type2:[],
      }
    
      AsyncStorage.getItem("bangCode")
      .then((bangCode) => {
        this.fetchData(bangCode)
        
      })

    }
    clickHandler = async() => {
      let t = this.state.tableData[0];
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
      });
    }
    fetchData = async(bangCode) => { 
      try {
        console.log(bangCode);
          let res = await fetch('http://192.168.43.253:3000/selectWorkerEach', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              business : bangCode
            }),
          }).then(res => res.json())
          .then(res => {
            console.log(res);
            let rowall = [];
            let t1=[];
            let t2=[];
            for (let i = 0; i < res.length; i++) {
              if(res[i].type==1){
                rowall.push([res[i].workername, "알바", String(res[i].pay), '80' , '10000', '0']);
                t1.push({label: res[i].workername, value: res[i].workername})
                this.setState({itemA:res[i].workername});
                this.setState({nname: rowall, type1:t1})
              }
              else{
                rowall.push([res[i].workername, "정규직", String(res[i].pay), '0', '0']);
                t2.push({label: res[i].workername, value: res[i].workername})
                this.setState({itemB:res[i].workername});
                this.setState({nname: rowall,type2:t2})
              }
            }
            this.show();
          });
      } catch (e) {
          console.error(e);
        }
    }
    state={
        
    }

    show(){
          //console.log('itmeA : ' + this.state.itemA);
        //console.log('itmeB : ' + this.state.itemB);

        //----------DB에서 불러오는 값들----------------
        // MonthlySalary:보수총액
        let MonthlySalary = '0'
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

        //----------------------계산식---------------------------------------------
        // NationalPension:국민연금 (보수총액*4.5%)
        let NationalPension = (parseInt(MonthlySalary)*4.5/100).toFixed(0);
        // HealthInsurance:건강보험 (보수총액*3.3335%)
        let HealthInsurance = (parseInt(MonthlySalary)*3.335/100).toFixed(0);
        // RegularCare:건강보험(정기요양) (건강보험료*5.125%)
        let RegularCare = (HealthInsurance*10.25/100).toFixed(0);
        // EmploymentInsurance : 고용보험 (보수총액*0.8%)
        let EmploymentInsurance = (parseInt(MonthlySalary)*0.8/100).toFixed(0);//근로자_고용보험
        // SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
        let SocialInsurance = (parseInt(NationalPension)+parseInt(HealthInsurance)+parseInt(RegularCare)+parseInt(EmploymentInsurance)).toFixed(0);

        // WithholdingTax:원천과세(IncomeTax+InhabitantsTax)
        // IncomeTax : 갑근세(소득세) : 보수총액*3.0%
        let IncomeTax = (parseInt(MonthlySalary)*0.03).toFixed(0)
        // InhabitantsTax : 주민세 (갑근세의 10%)
        let InhabitantsTax = (parseInt(IncomeTax)*0.1).toFixed(0)

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
        let IncomeTaxPartTime = (parseInt(MonthlySalaryPartTime)*0.03).toFixed(0)
        // InhabitantsTax : 주민세 (갑근세의 10%)  : 보수총액*0.3%
        let InhabitantsTaxPartTime = (parseInt(IncomeTaxPartTime)*0.1).toFixed(0)
        
        // WithholdingTax:원천과세(IncomeTax+InhabitantsTax) : 3.3 세금공제
        let WithholdingTax = parseInt(IncomeTaxPartTime) + parseInt(InhabitantsTaxPartTime)

        // 실지급액(지급총액-공제총액)
        let ActualSalaryPartTime = parseInt(TotalPaymentPartTime) - parseInt(WithholdingTax)


      if(WorkingType=='정규직'){ // -------정규------
                  this.setState({
                      Name:this.state.itemB, WorkingType:'정규직',
                      tableData:[[MonthlySalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),ExtraWorkAllowance,MealCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      NationalPension.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),HealthInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      RegularCare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),EmploymentInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      IncomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),InhabitantsTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")]],
                      DeductionSum : TotalDeduction.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      PaymentSum:TotalPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      Difference:ActualSalary,
                  })
              } else{ // ------알바-------
                  this.setState({
                      Name:this.state.itemA, WorkingType:'알바',
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
          <View>
          <ImageBackground style={styles.image} source={require('../../img/page2_2.png')}>
        <ScrollView>
            <View style={styles.textArea}>
                <Text style={styles.textStyle}>이름 : {Name}</Text>
                <Text style={styles.textStyle}>근무형태 : {WorkingType}</Text>
            </View>
            <View style={styles.textArea}>
                <Table style={styles.wrapper} borderStyle={{borderWidth: 1}}>
                     {/* Left Wrapper */}
                    <TableWrapper style={{width:wp('40%')}} >
                        <Cell data="내역" style={styles.singleHead} textStyle={styles.tableTitleText}/>
                        <TableWrapper style={styles.wrapper}>
                            <Col data={['지급','공제']} style={styles.title1} heightArr={[hp('16.5%'), hp('33%')]} textStyle={styles.tableTitleText}/>
                            <Col data={state.tableTitle} style={styles.title} heightArr={[hp('5.5%'), hp('5.5%'), hp('5.5%'),hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%')]} textStyle={styles.tableTitleText}/>
                        </TableWrapper>
                        <Cell data="지급액계" style={styles.singleHead1_1} textStyle={styles.tableTitleText}/>
                        <Cell data="공제액계" style={styles.singleHead1_1} textStyle={styles.tableTitleText}/>
                        <Cell data="차인지급액계" style={styles.singleHead1_1} textStyle={styles.tableTitleText}/>
                    </TableWrapper>

                    <TableWrapper style={{flex:1}}>
                        <Cell data="금액" style={styles.singleHead1} textStyle={styles.tableTitleText}/>
                        <Cols data={state.tableData} heightArr={[hp('5.5%'), hp('5.5%'), hp('5.5%'),hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%'), hp('5.5%')]} textStyle={styles.tableText}/>
                        
                        <Cell data={PaymentSum} style={styles.singleHead1_2} textStyle={styles.tableTitleText}/>
                        <Cell data={DeductionSum} style={styles.singleHead1_2} textStyle={styles.tableTitleText}/>
                        <Cell data={Difference} style={styles.singleHead1_2} textStyle={styles.tableTitleText}/>
                    </TableWrapper>
                </Table>
            </View>
            <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> this.clickHandler()}>

              <Text style={styles.buttonTitle}>엑셀 공유</Text> 
            </TouchableOpacity>

            </View>

          <View style={styles.tableArea}><Text></Text></View>
        </ScrollView>
        
        <Button title="엑셀 공유" onPress={()=> this.clickHandler()}/>
        </ImageBackground>
        </View>
        )
    }
}

export default WorkerStatementScreen;

const styles = StyleSheet.create({
  image:{
      width: "100%", height: "103%", 
  },
  textArea:{
    padding:wp('5%'),
    marginTop:hp('2%'),
    marginLeft:wp('1.5%')
  },
  tableArea:{
    marginTop:hp('1%'),
    marginBottom:hp('5%'),
    width:wp('90%'),
  },
  buttonArea:{
    padding:wp('5%'), 
  },
  button: {
    backgroundColor: "#7085DF",
    width:wp('90%'), height:hp('6%'),
    justifyContent: 'center', alignItems:"center",
    borderRadius:wp('1.7%'),
  },
  buttonTitle: {
    color: '#040525',
    fontFamily:"NanumSquareB",
    fontSize:wp('4.8%'),
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
  singleHead: { width: wp('40%'), height: hp('5.5%'), backgroundColor: '#7085DF'},
  singleHead1: {height: hp('5.5%'), backgroundColor: '#7085DF' },
  singleHead1_1: { width: wp('40%'), height: hp('5.5%'), backgroundColor: '#7085DF'},
  singleHead1_2: {height: hp('5.5%'), backgroundColor: '#7085DF' },
  title: { flex: 3, backgroundColor: 'white' },
  title1: { flex: 1, backgroundColor: 'white' },
  tableText: { 
      textAlign: 'center', 
      fontFamily:"NanumSquare", 
      color: '#040525',
      fontSize: wp('3.35%') },
  tableTitleText: { 
      textAlign: 'center', 
      fontFamily:"NanumSquare", 
      color: '#040525',
      fontSize: wp('3.8%') },
});