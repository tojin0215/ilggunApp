import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Animated,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import DropDownPicker from "react-native-dropdown-picker";
import StatementScreen from "../Statemanet";
import { AsyncStorage } from "react-native";
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { getOvertimeWork } from "../../api/Api";
import calculate_income_tax, { getEmploymentInsurance, getHealthInsurance, getNationalPension, getRegularCare } from "../../utils/tax";

//data 순서 : 입사일/월급(보수총액)->DB/추가금액->DB/공제액->계산/실지금액->계산

//정규공제) SocialInsurance:사대보험 (국민연금+건강보험+고용보험) / IncomeTax:갑근세 / InhabitantsTax:주민세
//알바공제) WithholdingTax:3.3세금공제

const calculateAndCutToday = (start_year, start_month, start_date) => {
  let nn = Math.floor((start_date - 1) / 7);
  let weekk = [nn, nn, nn, nn, nn, nn, nn];
  let dd = new Date(start_year, start_month - 1, 1).getDay();
  console.log("오늘 날짜까지 끊자!" + dd);
  for (let j = 0; j < (start_date - 1) % 7; j++) {
    weekk[dd]++;
    dd++;
    dd = dd % 7;
  }
  return weekk;
}

const calculatePayByMinimumPayPerHour = (minimum_pay, start_year, start_month, start_date) => {
  return Math.floor(minimum_pay * (
    (new Date(start_year, start_month, 0).getDate() - start_date + 1)
    / new Date(start_year, start_month, 0).getDate())
    );
}

const calculateSumTime = (eachtime, week, weekk) => {
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    if (weekk[i] <= week[i]) {
      sum += eachtime[i] * 1 * (week[i] - weekk[i]);
    }
  }

  return sum
}

const getInsurancePercentage = (business_name, select_year) => {
  const data = {bang: business_name};
  return axios.post("http://13.124.141.28:3000/insurancePercentage", data).then(response => response.data.filter(value => String(value.date) === String(select_year))).then(result => result[0])
}

const getWorkers = (business_name) => {
  const data = {business: business_name};
  return axios.post("http://13.124.141.28:3000/selectWorker", data)
}


class StatementScreen1 extends React.Component {
  // 급여대장
  constructor(props) {
    super(props);
    this.state = {
      itemA: String(new Date().getFullYear()) + "년",
      isVisibleA: false,
      itemB: String(new Date().getMonth() + 1) + "월",
      isVisibleB: false,
      tableHead: [
        "이름",
        "분류",
        "보수총액\n(신고금액)",
        "기타수당",
        "공제",
        "실지금액",
      ],
      tableTitle: [],
      tableData: [],
      arrName: [],
      week: [],
      addtime: {},
      bangcode: "",
      id: "",
      EmploymentInsurancePercentage: 0,
      HealthInsurancePercentage: 0,
      NationalPensionPercentage: 0,
      RegularCarePercentage: 0,
      HourlyWage: 0,
      pay11: 0,
      bangCode: null,
    };
    AsyncStorage.getItem("bangCode").then((bangCode) => {
      this.setState({ bangcode: bangCode });
      this.fetchData(bangCode);
    });

    AsyncStorage.getItem("userData").then((userData) => {
      this.setState({ id: JSON.parse(userData).id });
    });
  }

  load_overtime_work = async (bangCode, select_year, select_month) => {
    getOvertimeWork(bangCode, select_year, select_month)
    .then(async (datas) => {
      let dic = {};
      for (let i = 0; i < datas.length; i++) {
        if (!dic[datas[i].workername]) {
          dic[datas[i].workername] = datas[i].subt;
        } else {
          dic[datas[i].workername] += datas[i].subt; 
        }
      }
      this.setState({ addtime: dic });
    });
  }

  load_insurance_percentage = async (bangCode, select_year) => {
    getInsurancePercentage(bangCode, select_year)
    .then(data => {
      data.pay11 = data.HourlyWage;
      this.setState(data)
    })
  }

  fetchData = async (bangCode) => {
    const select_year = this.state.itemA.split("년")[0] * 1;
    const select_month = this.state.itemB.split("월")[0] * 1;
    const this_year = new Date().getFullYear();
    const this_month = new Date().getMonth() + 1;
    try {
      if (select_year > this_year || (select_year === this_year && select_month > this_month)) {
        this.setState({ arrName: [] }, () => this.show());
      } else {
        await this.load_overtime_work(bangCode, select_year, select_month);
        await this.load_insurance_percentage(bangCode, select_year);
        await getWorkers(bangCode)
          .then((res) => {
            let rowall = [];

            if (select_year !== this_year || select_month !== this_month) {
              const d = new Date(select_year, select_month, 0)
              let week = [4, 4, 4, 4, 4, 4, 4];

              let it = d.getDay();
              let nalsu = d.getDate();
              let namugi = nalsu % 7;

              for (let i = 0; i < namugi; i++) {
                week[(it - i) % 7]++;
              }

              for (let i = 0; i < res.data.length; i++) {
                const start_year = res.data[i].startdate.split("/")[0] * 1;
                const start_month = res.data[i].startdate.split("/")[1] * 1;
                const start_date = res.data[i].startdate.split("/")[2] * 1;

                if (select_year < start_year || (select_year === start_year && select_month < start_month)) {
                  break;
                }

                if (res.data[i].type == 1) {
                  let weekk = [0, 0, 0, 0, 0, 0, 0];
                  if (select_year === start_year && select_month === start_month) {
                    weekk = calculateAndCutToday(start_year, start_month, start_date)
                  }
                  
                  const sum = calculateSumTime(res.data[i].eachtime.split("/"), week, weekk);

                  rowall.push([
                    select_year + "." + select_month,
                    res.data[i].workername2,
                    "알바",
                    String(this.state.pay11 /*시급*/),
                    String(sum /* 시간 */),
                    String(
                      (this.state.addtime[res.data[i].workername]
                        ? this.state.addtime[res.data[i].workername]
                        : 0) * this.state.pay11 /*시급*/
                    ),
                  ]);
                } else {
                  let pay = this.state.pay11; //(date/new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate());
                  if (select_year === start_year && select_month === start_month) {
                    pay = calculatePayByMinimumPayPerHour(this.state.pay11, start_year, start_month, start_date)
                  }
                  rowall.push([
                    select_year + "." + select_month,
                    res.data[i].workername2,
                    "정규직",
                    String(pay),
                    String(
                      this.state.addtime[res.data[i].workername]
                        ? this.state.addtime[res.data[i].workername]
                        : 0
                    ) * this.state.pay11,
                  ]);
                }
              }
            } else {
              let week = calculateAndCutToday(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() + 1);

              for (let i = 0; i < res.data.length; i++) {
                const start_year = res.data[i].startdate.split("/")[0] * 1;
                const start_month = res.data[i].startdate.split("/")[1] * 1;
                const start_date = res.data[i].startdate.split("/")[2] * 1;

                if (select_year < start_year || (select_year === start_year && select_month < start_month)) {
                  break;
                }
                
                if (res.data[i].type == 1) {
                  let weekk = [0, 0, 0, 0, 0, 0, 0];
                  if (select_year === start_year && select_month === start_month) {
                    weekk = calculateAndCutToday(start_year, start_month, start_date);
                  }

                  const sum = calculateSumTime(res.data[i].eachtime.split("/"), week, weekk);
                  rowall.push([
                    select_year + "." + select_month,
                    res.data[i].workername2,
                    "알바",
                    String(this.state.pay11 /*시급*/),
                    String(sum /* 시간 */),
                    String(
                      (this.state.addtime[res.data[i].workername]
                        ? this.state.addtime[res.data[i].workername]
                        : 0) * this.state.pay11 /*시급*/
                    ),
                  ]);
                } else {
                  let date = new Date().getDate();
                  if (select_year === start_year && select_month === start_month) {
                    if (date <= start_date)
                      date = 0;
                    else {
                      date = date - start_date;
                    }
                  }
                  rowall.push([
                    select_year + "." + select_month,
                    res.data[i].workername2,
                    "정규직",
                    String(Math.floor(this.state.pay11 * (date / new Date(this_year, this_month, 0).getDate()))),
                    String(
                      this.state.addtime[res.data[i].workername]
                        ? this.state.addtime[res.data[i].workername]
                        : 0
                    ) * this.state.pay11,
                  ]);
                }
              }
            }
            this.setState({ arrName: rowall }, () => this.show());
          });
      }
    } catch (e) {
      console.error(e);
    }
  };
  clickHandler = async () => {
    try {
      let t = this.state.tableData;
      var yymm = this.state.arrName[0][0];
      let trs = "";
      for (let i = 0; i < t.length; i++) {
        trs += `<tr><td>${this.state.tableTitle[i]}</td><td>${t[i][0]}</td><td>${t[i][1]}</td><td>${t[i][2]}</td><td>${t[i][3]}</td><td>${t[i][4]}</td></tr>`;
      }
      let signOrStamp = "";

      await axios
        .post(
          "http://13.124.141.28:3000/selectBusinessByName",
          {
            bname: this.state.bangcode,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data[0].stamp == 1) {
            signOrStamp = `<img src="http://13.124.141.28:3000/${this.state.bangcode}.png" alt="도장" z-index="2" width="100" height="100"></img>`;
          }
        });
      axios
        .post(
          "http://13.124.141.28:3000/selectSign",
          {
            id: this.state.id,
            id2: this.state.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          let sign = res.data[0].sign;

          if (signOrStamp == "") {
            signOrStamp = `<svg viewBox = "0 0 500 500" style="position:absolute; z-index: 2; height:300px; width: 300px;" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="${String(sign)}"
                      style="fill:none;stroke:black;stroke-width:3" />
              </svg>`;
          }
          html = `
              <!DOCTYPE html>
              <html>
                <head>
                    <meta charset="UTF-8">
                    <title>월별 급여대장</title>
                </head>
                <style>
                    body{margin:30px 30px 30px 30px; line-height: 30px;}
                    span{margin-left:440px;}
                    table{border-collapse:collapse; margin: 10px 30px 10px 10px;}
                    h1{ text-align: center; }
                    h3{ text-align: center; }
                    th{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                    td{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                    .text_underline {text-decoration: underline;}
                    .margin_left{margin-left:15px;}
                    .margin_left2{margin-left:65px;}
                    .text_underline_margin_left{text-decoration: underline;margin-left:50px;}
                    .contract_day{position:relative; left:50%; margin-left: -100px;}
                </style>
                <body>
                  <h1>[${this.state.bangcode}] 월별 급여대장</h1>
                  <h3>${yymm.split(".")[0]}년 ${yymm.split(".")[1]}월</h3>
                  <table>
                    <th>이름</th><th>분류</th><th>보수총액(신고금액)</th><th>기타수당</th><th>공제</th><th>실지금액</th>
                    ${trs}
                  </table><span>${signOrStamp}</span>
                </body>
              </html>`;
          const { uri } = await Print.printToFileAsync({ html }, true);
          Sharing.shareAsync(uri);
        });
    } catch (error) {
      console.error(error);
    }

    //엑셀로 공유하기
    /*console.log(this.state.tableTitle);
      console.log(this.state.arrName)
      let t = this.state.tableData;
      var data = [
        {
          "년월":this.state.arrName[0][0]
        }
      ];
      for(let i=0 ; i<t.length ; i++)
      {
        data.push({
          "이름" : this.state.tableTitle[i],
          "분류" : t[i][0],
          "보수총액(신고금액)" : t[i][1] ,
          "추가금" : t[i][2],
          "공제" : t[i][3],
          "실지금액" : t[i][4],
        })
      }
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
      });*/
  };
  show() {
    //console.log(this.state.itemA);
    //console.log(this.state.itemB);

    let year = this.state.itemA.substring(0, 4);
    let month = this.state.itemB.substring(0, 2);
    let select = year + "." + month;
    console.log("////" + select);

    let WorkingType = "정규직";
    let tableTitleArr = [];
    let tableDataArr = [];
    let data = [];

    // 정규) MonthlySalary:보수총액 / AddSalary:추가급여
    let MonthlySalary = "0";
    let AddSalary = "0";

    // 알바) HourlyWage : 시급 / WorkingHour : 한달 일한 시간 / AddSalaryPartTime:추가급여
    let WorkingHour = "0";
    let HourlyWage = "0";
    let AddSalaryPartTime = "0";

    for (let i = 0; i < this.state.arrName.length; i++) {
      //if(select == this.state.arrName[i][0]) {
      WorkingType = this.state.arrName[i][2];
      data = [];

      if (WorkingType == "정규직") {
        tableTitleArr.push(this.state.arrName[i][1]);
        MonthlySalary = this.state.arrName[i][3];
        AddSalary = this.state.arrName[i][4];

        console.log("국민연금(%) : ", this.state.NationalPensionPercentage);
        console.log("건강보험(%) : ", this.state.HealthInsurancePercentage);
        console.log(
          "건강보험(정기요양)(%) : ",
          this.state.RegularCarePercentage
        );
        console.log("고용보험(%) : ", this.state.EmploymentInsurancePercentage);

        // NationalPension:국민연금 (보수총액*4.5%)
        let NationalPension = getNationalPension(MonthlySalary, this.state.NationalPensionPercentage)

        // HealthInsurance:건강보험 (보수총액*3.3335%)
        let HealthInsurance = getHealthInsurance(MonthlySalary, this.state.HealthInsurancePercentage)
        // RegularCare:건강보험(정기요양) (건강보험료*5.125%)
        let RegularCare = getRegularCare(MonthlySalary, this.state.RegularCarePercentage)
        // EmploymentInsurance : 고용보험 (보수총액*0.8%)
        let EmploymentInsurance = getEmploymentInsurance(MonthlySalary, this.state.EmploymentInsurancePercentage)
        // SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
        let SocialInsurance = (
          parseInt(NationalPension) +
          parseInt(HealthInsurance) +
          parseInt(RegularCare) +
          parseInt(EmploymentInsurance)
        ).toFixed(0);

        // WithholdingTax:원천과세(IncomeTax+InhabitantsTax)
        const IncomeTax = calculate_income_tax(MonthlySalary);

        // InhabitantsTax : 주민세 (갑근세의 10%)
        let InhabitantsTax =
          Math.floor((parseInt(IncomeTax) * 0.1).toFixed(0) / 10) * 10;

        console.log(
          "--------------------------------" + parseInt(SocialInsurance),
          parseInt(IncomeTax),
          parseInt(InhabitantsTax)
        );
        // TotalDeduction:공제총액(사대보험+갑근세+주민세)
        let TotalDeduction =
          parseInt(SocialInsurance) +
          parseInt(IncomeTax) +
          parseInt(InhabitantsTax);
        console.log(
          "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!공제액",
          TotalDeduction
        );

        // 실지급액(보수총액+추가급여-공제총액)
        let ActualSalary =
          parseInt(MonthlySalary) +
          parseInt(AddSalary) -
          parseInt(TotalDeduction);

        data = [
          WorkingType,
          MonthlySalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          AddSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          TotalDeduction.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ActualSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        ];
        tableDataArr.push(data);
      }
      //}
    }

    for (let i = 0; i < this.state.arrName.length; i++) {
      //if(select == this.state.arrName[i][0]) {
      WorkingType = this.state.arrName[i][2];
      data = [];
      if (WorkingType == "알바") {
        tableTitleArr.push(this.state.arrName[i][1]);
        HourlyWage = this.state.pay11;
        WorkingHour = this.state.arrName[i][4];
        AddSalaryPartTime = this.state.arrName[i][5];

        // MonthlySalaryPartTime : 한달보수총액
        let MonthlySalaryPartTime =
          parseInt(WorkingHour) * parseInt(HourlyWage);

        // IncomeTax : 갑근세(소득세) : 보수총액*3.0%
        let IncomeTaxPartTime =
          Math.floor((parseInt(MonthlySalaryPartTime) * 0.03).toFixed(0) / 10) *
          10;

        // InhabitantsTax : 주민세 (갑근세의 10%)  : 보수총액*0.3%
        let InhabitantsTaxPartTime =
          Math.floor((parseInt(IncomeTaxPartTime) * 0.1).toFixed(0) / 10) * 10;

        // WithholdingTax:원천과세(IncomeTax+InhabitantsTax) : 3.3 세금공제
        let WithholdingTax =
          parseInt(IncomeTaxPartTime) + parseInt(InhabitantsTaxPartTime);
        let ActualSalaryPartTime =
          parseInt(MonthlySalaryPartTime) +
          parseInt(AddSalaryPartTime) -
          parseInt(WithholdingTax);

        data = [
          WorkingType,
          MonthlySalaryPartTime.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          ),
          AddSalaryPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          WithholdingTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ActualSalaryPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        ];
        tableDataArr.push(data);
      }
      //}
    }

    let dataValue = this.state.data;

    this.setState({
      tableTitle: tableTitleArr,
      tableData: tableDataArr,
      YearMonth: dataValue,
    });
  }

  changeVisibility(state) {
    this.setState({
      isVisibleA: false,
      isVisibleB: false,
      ...state,
    });
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.image}>
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styles.textTitle}>월별 급여대장</Text>
          </View>
          <View style={styles.dropDownArea}>
            <DropDownPicker
              items={[
                { label: "2020년", value: "2020년" },
                { label: "2021년", value: "2021년" },
                { label: "2022년", value: "2022년" },
                { label: "2023년", value: "2023년" },
                { label: "2024년", value: "2024년" },
                { label: "2025년", value: "2025년" },
              ]}
              defaultValue={this.state.itemA}
              containerStyle={{ height: hp("6%"), width: wp("35%") }}
              dropDownStyle={{
                backgroundColor: "white",
                borderBottomLeftRadius: wp("1.7%"),
                borderBottomRightRadius: wp("1.7%"),
              }}
              itemStyle={{ justifyContent: "center" }}
              labelStyle={{
                height: hp("3%"),
                textAlign: "center",
                color: "#040525",
                fontFamily: "NanumSquare",
                fontSize: wp("4.2%"),
                marginTop: hp("1%"),
              }}
              isVisible={this.state.isVisibleA}
              onOpen={() =>
                this.changeVisibility({
                  isVisibleA: true,
                })
              }
              onClose={() =>
                this.setState({
                  isVisibleA: false,
                })
              }
              onChangeItem={(item) => {
                this.setState({
                  itemA: item.value,
                });
              }}
            />

            <DropDownPicker
              items={[
                { label: "1월", value: "1월" },
                { label: "2월", value: "2월" },
                { label: "3월", value: "3월" },
                { label: "4월", value: "4월" },
                { label: "5월", value: "5월" },
                { label: "6월", value: "6월" },
                { label: "7월", value: "7월" },
                { label: "8월", value: "8월" },
                { label: "9월", value: "9월" },
                { label: "10월", value: "10월" },
                { label: "11월", value: "11월" },
                { label: "12월", value: "12월" },
              ]}
              defaultValue={this.state.itemB}
              containerStyle={{
                height: hp("6%"),
                width: wp("25%"),
                marginLeft: wp("0.5%"),
              }}
              dropDownStyle={{
                backgroundColor: "white",
                borderBottomLeftRadius: wp("1.7%"),
                borderBottomRightRadius: wp("1.7%"),
              }}
              itemStyle={{ justifyContent: "center" }}
              labelStyle={{
                height: hp("3%"),
                textAlign: "center",
                color: "#040525",
                fontFamily: "NanumSquare",
                fontSize: wp("4.2%"),
                marginTop: hp("1%"),
              }}
              isVisible={this.state.isVisibleB}
              onOpen={() =>
                this.changeVisibility({
                  isVisibleB: true,
                })
              }
              onClose={() =>
                this.setState({
                  isVisibleB: false,
                })
              }
              onChangeItem={(item) =>
                this.setState({
                  itemB: item.value,
                })
              }
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.fetchData(this.state.bangcode);
              }}
            >
              <Text style={styles.buttonTitle}>조회하기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textArea}>
            <Text style={styles.textStyle}>
              {this.state.itemA + " " + this.state.itemB} 근로자 급여대장{" "}
            </Text>
          </View>

          <ScrollView style={{ zIndex: -2000 }}>
            <View style={styles.tableArea}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "white" }}>
                <Row
                  data={state.tableHead}
                  flexArr={[1, 0.8, 1, 0.8, 1, 1]}
                  style={styles.head}
                  textStyle={styles.tableTitleText}
                />
                <TableWrapper style={styles.wrapper}>
                  <Col
                    data={state.tableTitle}
                    style={styles.title}
                    heightArr={[hp("6%"), hp("6%")]}
                    textStyle={styles.tableText}
                  />
                  <Rows
                    data={state.tableData}
                    flexArr={[0.8, 1, 0.8, 1, 1]}
                    style={styles.row}
                    textStyle={styles.tableText}
                  />
                </TableWrapper>
              </Table>
            </View>

            <View style={styles.buttonArea}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => this.clickHandler()}
              >
                <Image
                  style={styles.excelBtn}
                  source={require("../../img/excel.png")}
                ></Image>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: hp("5%") }}>
              <Text></Text>
            </View>
          </ScrollView>

          {/*<View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={()=> this.clickHandler()}>
                        <Image style={styles.excelBtn} source={require('../../img/excel.png')}></Image>
                    </TouchableOpacity>
                </View>*/}
        </View>
      </View>
    );
  }
}

export default StatementScreen1;
const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#67C8BA",
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopRightRadius: wp("13%"),
    borderTopLeftRadius: wp("13%"),
  },

  titleArea: {
    alignItems: "center",
  },
  textTitle: {
    fontSize: wp("5.5%"),
    color: "#040525",
    fontFamily: "NanumSquareB",
    marginBottom: hp("1%"),
    marginTop: hp("4%"),
  },
  dropDownArea: {
    flexDirection: "row",
    marginTop: hp("3%"),
    marginLeft: wp("3%"),
    width: wp("80%"),
    height: hp("18%"),
    alignItems: "flex-start",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#67C8BA",
    width: wp("20%"),
    height: hp("5.9%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("1.7%"),
    marginLeft: wp("2%"),
  },
  buttonTitle: {
    color: "white",
    fontFamily: "NanumSquare",
    fontSize: wp("4.8%"),
  },
  tableArea: {
    marginBottom: hp("3%"),
    width: wp("90%"),
  },
  textArea: {
    marginTop: hp("2%"),
    marginLeft: wp("1.5%"),
    position: "absolute",
    top: hp("20%"),
    ...Platform.select({
      ios: {
        zIndex: -1000,
      },
    }),
  },
  textStyle: {
    fontSize: wp("4.5%"),
    fontFamily: "NanumSquare",
    color: "#040525",
    marginTop: wp("1%"),
    marginBottom: wp("1.5%"),
    marginRight: wp("2%"),
  },
  wrapper: { flexDirection: "row" },
  head: {
    height: hp("6%"),
    backgroundColor: "#E2F2EF",
    borderTopRightRadius: wp("4%"),
    borderTopLeftRadius: wp("4%"),
  },
  title: {
    flex: 1,
    backgroundColor: "#E2F2EF",
    borderBottomLeftRadius: wp("4%"),
  },
  row: { height: hp("6%") },
  tableText: {
    textAlign: "center",
    fontFamily: "NanumSquare",
    color: "#040525",
    fontSize: wp("3.35%"),
  },
  tableTitleText: {
    textAlign: "center",
    color: "#040525",
    fontFamily: "NanumSquare",
    fontSize: wp("3.6%"),
  },
  buttonArea: {
    height: hp("8%"),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: hp("8%"),
  },
  button1: {
    width: wp("90%"),
    height: hp("8%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  excelBtn: {
    ...Platform.select({
      ios: {
        width: wp("80%"),
        height: hp("5.6%"),
      },
      android: {
        width: wp("85%"),
        height: hp("5.6%"),
      },
    }),
  },
});
