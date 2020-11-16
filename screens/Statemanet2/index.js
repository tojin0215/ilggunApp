import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Animated} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper,  Col, Cols, Cell } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import StatementScreen1 from '../Statemanet1';
import { AsyncStorage } from 'react-native';
//data 순서 : 입사일/월급(보수총액)->DB/추가금액->DB/공제액->계산/실지금액->계산

//정규) SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
//알바) TaxDeduction:3.3세금공제

// 알바:시급/시간/식대/추가근로      정규:기본급/식대/추가근로
const name = [['김수정','알바','8590','80','10000','40000'],['권소령','정규직','3000000','20000','50000'],
            ['전세웅','정규직','1000000','20000','60000'],['정민지','정규직','2000000','0','100000']]

class StatementScreen2 extends Component{
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

    fetchData = async(bangCode) => { 
      try {
        console.log(bangCode);
          let res = await fetch('http://192.168.43.253:3000/selectWorker', {
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
              }
              else{
                rowall.push([res[i].workername, "정규직", String(res[i].pay), '0', '0']);
                t2.push({label: res[i].workername, value: res[i].workername})
              }
            }
            this.setState({nname: rowall, type1:t1, type2:t2})
            console.log(this.state.nname, this.state.type1, this.state.type2);
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
                      Name:this.state.itemA, WorkingType:'정규직',
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
            <View  style={styles.container}>
            <ScrollView>
                <Text>근로자 급여명세서{'\n'}</Text>
                <View style={styles.wrapper}>
                <DropDownPicker
                    items={this.state.type2}
                    placeholder='정규직/계약직'
                    defaultValue={this.state.itemA}
                    containerStyle={{height: 40, width: 110}}
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
                    placeholder='알바/일용근로자'
                    defaultValue={this.state.itemB}
                    containerStyle={{height: 40, width: 110}}
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
                <Button
                    title="조회하기"
                    onPress={()=>{this.show()}}/>
                </View>

                <View style={styles.marginView}>
                    <Text>이름 : {Name}</Text>
                    <Text>근무형태 : {WorkingType}</Text>
                </View>
                <View style={styles.marginTop}>
                    <Table style={styles.wrapper} borderStyle={{borderWidth: 1}}>
                         {/* Left Wrapper */}
                        <TableWrapper style={{width:150}} >
                            <Cell data="내역" style={styles.singleHead} textStyle={styles.text}/>
                            <TableWrapper style={styles.wrapper}>
                                <Col data={['지급','공제']} style={styles.title1} heightArr={[84, 168]} textStyle={styles.text}/>
                                <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]} textStyle={styles.text}/>
                            </TableWrapper>
                            <Cell data="지급액계" style={styles.singleHead1_1} textStyle={styles.text}/>
                            <Cell data="공제액계" style={styles.singleHead1_1} textStyle={styles.text}/>
                            <Cell data="차인지급액계" style={styles.singleHead1_1} textStyle={styles.text}/>
                        </TableWrapper>

                        <TableWrapper style={{flex:1}}>
                            <Cell data="금액" style={styles.singleHead1} textStyle={styles.text}/>
                            <Cols data={state.tableData} heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]} textStyle={styles.text}/>

                            <Cell data={PaymentSum} style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data={DeductionSum} style={styles.singleHead1_2} textStyle={styles.text}/>
                            <Cell data={Difference} style={styles.singleHead1_2} textStyle={styles.text}/>
                        </TableWrapper>
                    </Table>
                </View>

            </ScrollView>
            </View>
        )
    }
}

export default StatementScreen2;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    wrapper: { flexDirection: 'row' },
    singleHead: { width: 150, height: 40, backgroundColor: '#c8e1ff'},
    singleHead1: {height: 40, backgroundColor: '#c8e1ff' },
    singleHead1_1: { width: 150, height: 30, backgroundColor: '#c8e1ff'},
    singleHead1_2: {height: 30, backgroundColor: '#c8e1ff' },
    marginTop : {marginTop:10},
    marginView: {marginTop:20, marginLeft:10},
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    title: { flex: 3, backgroundColor: '#f6f8fa' },
    title1: { flex: 1, backgroundColor: '#f6f8fa' },
    text: { textAlign: 'center' },
});