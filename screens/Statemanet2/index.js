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
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import DropDownPicker from "react-native-dropdown-picker";
import StatementScreen1 from "../Statemanet1";
import { AsyncStorage } from "react-native";
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import calculate_income_tax, {
  getNationalPension,
  getHealthInsurance,
  getRegularCare,
  getEmploymentInsurance,
  getSocialInsurance,
  getInhabitantsTax,
  funcTypeCheckAdd,
  calculateWeek,
} from "../../utils/tax";
import { getMinimumPayPerHour } from "../../const/default-value";
import DDP_YEAR from "./component.ddp_year";
import { postInsurancePercentage } from "../../api/Api2";

//정규) SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
//알바) TaxDeduction:3.3세금공제

const url = "http://13.124.141.28:3000";

const TYPE_REGULAR = 0;
const TYPE_ALBA = 1;

const fetchHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const config = {
  headers: fetchHeaders,
};


const DDP_MONTH_ITEMS = [
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
]


class StatementScreen2 extends Component {
  // 급여대장
  constructor(props) {
    super(props);
    this.state = {
      itemA: null,
      isVisibleA: false,
      itemB: null,
      isVisibleB: false,
      itemAA: String(new Date().getFullYear()) + "년",
      isVisibleAA: false,
      itemBB: String(new Date().getMonth() + 1) + "월",
      isVisibleBB: false,
      PaymentSum: "-",
      DeductionSum: "-",
      Difference: "-",
      Name: "-",
      WorkingType: "-",
      tableTitle: [
        "기본급",
        "기타수당(과세)",
        "기타수당(비과세)",
        "국민연금",
        "건강보험료",
        "장기요양보험료",
        "고용보험료",
        "소득세",
        "주민세",
      ],
      tableData: [["-", "-", "-", "-", "-", "-", "-", "-", "-"]],
      addtime: {},
      nname: [], // ['', WorkingType, MonthlySalary]
      type1: [],
      type2: [],
      bangCode: "",
      id: "",
      EmploymentInsurancePercentage: 0.8,
      HealthInsurancePercentage: 3.43,
      NationalPensionPercentage: 4.5,
      RegularCarePercentage: 11.25,
      pay11: getMinimumPayPerHour(),
      bangCode: null,

      HourlyWage: getMinimumPayPerHour(),
      WorkingHour: 0,
      MonthlySalary: 0,
      userAdditionalAllowance: {
        meals: 0,
        extraWork: 0,
      },
      userData: {
        name: "",
        workType: TYPE_REGULAR, // TYPE_REGULAR, TYPE_ALBA,
      },
    };

    AsyncStorage.getItem("bangCode").then((bangCode) => {
      this.setState({ bangCode: bangCode });
      this.fetchData(0);
    });
    AsyncStorage.getItem("userData").then((userData) => {
      this.setState({ id: JSON.parse(userData).id });
    });
  }

  fetchSelectOvertimework = async () => {
    const data_selectOvertimework = {
      business: this.state.bangCode,
      year: this.state.itemAA.split("년")[0] * 1,
      month: this.state.itemBB.split("월")[0] * 1,
    };
    try {
      axios
        .post(url + "/selectOvertimework", data_selectOvertimework, config)
        .then((res) => {
          let dic = {};
          for (let i = 0; i < res.data.length; i++) {
            if (!dic[res.data[i].workername]) {
              dic[res.data[i].workername] = res.data[i].subt;
            } else {
              dic[res.data[i].workername] += res.data[i].subt; //this.setState({addtime :{...this.state.addtime, n : s}});
            }
          }
          this.setState({ addtime: dic });
        });
    } catch (e) {
      console.error("--- fetchSelectOvertimework ---");
      console.error(e);
    }
  };
  fetchInsurancePercentage = async () => {
    try {
      postInsurancePercentage(...{
        business_code: this.state.bangCode,
        find_year: this.state.itemAA.split("년")[0]
      })
      .then(data => {
        if (data === null) return

        console.log("국민연금", data.national_pension_percentage);
        console.log("건강보험", data.health_insurance_percentage);
        console.log("건강보험(장기)", data.regular_care_percentage);
        console.log(
          "고용보험",
          data.employment_insurance_percentage
        );
        console.log("시급", data.hourly_wage);
        this.setState({
          NationalPensionPercentage: data.national_pension_percentage,
          HealthInsurancePercentage: data.health_insurance_percentage,
          RegularCarePercentage: data.regular_care_percentage,
          EmploymentInsurancePercentage: data.employment_insurance_percentage,
          pay11: data.hourly_wage,
          HourlyWage: data.hourly_wage,
        })
      })
      // axios
      //   .post(url + "/insurancePercentage", data_insurancePercentage, config)
      //   .then((res) => {
      //     for (let i = 0; i < res.data.length; i++) {
      //       // console.log(
      //       //   "*************************************************DB년도",
      //       //   res.data[i].date
      //       // );
      //       if (res.data[i].date === this.state.itemAA.split("년")[0]) {
      //         const NationalPensionPercentage = res.data[i].NationalPensionPercentage ? res.data[i].NationalPensionPercentage : 4.5;
      //         const HealthInsurancePercentage = res.data[i].HealthInsurancePercentage ? res.data[i].HealthInsurancePercentage : 3.43;
      //         const RegularCarePercentage = res.data[i].RegularCarePercentage ? res.data[i].RegularCarePercentage : 11.25;
      //         const EmploymentInsurancePercentage = res.data[i].EmploymentInsurancePercentage ? res.data[i].EmploymentInsurancePercentage : 0.8;
      //         const pay11 = res.data[i].HourlyWage ? res.data[i].HourlyWage : getMinimumPayPerHour();
      //         const HourlyWage = res.data[i].HourlyWage ? res.data[i].HourlyWage : getMinimumPayPerHour();
      //         console.log("국민연금", NationalPensionPercentage);
      //         console.log("건강보험", HealthInsurancePercentage);
      //         console.log("건강보험(장기)", RegularCarePercentage);
      //         console.log(
      //           "고용보험",
      //           EmploymentInsurancePercentage
      //         );
      //         console.log("시급", HourlyWage);
      //         this.setState({
      //           NationalPensionPercentage: NationalPensionPercentage,
      //           HealthInsurancePercentage: HealthInsurancePercentage,
      //           RegularCarePercentage: RegularCarePercentage,
      //           EmploymentInsurancePercentage: EmploymentInsurancePercentage,
      //           pay11: pay11,
      //           HourlyWage: HourlyWage,
      //         });
      //       }
      //     }
      //   });
    } catch (e) {
      console.error("--- fetchInsurancePercentage ---");
      console.error(e);
    }
  };

  fetchOtherAllowance = async () => {
    const year = this.state.itemAA.split("년")[0] * 1;
    const month = this.state.itemBB.split("월")[0] * 1;
    const data_otherAllowance = {
      id: this.state.id,
      bang: this.state.bangCode,
      year: year,
      month: month,
    };
    try {
      axios
        .post(url + "/otherAllowance", data_otherAllowance, config)
        .then((res) => {
          console.log("otherAllowance: ");
          console.log(this.state.id, "_", year, "_", month);
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            console.log(
              "!!!!!!!!!!!!!!!!!!!!!!!!!!!!_______________!여기_",
              res.data[i]
            );
          }
        });
    } catch (e) {
      console.error("--- fetchOtherAllowance ---");
      console.error(e);
    }
  };

  fetchData = async (flag) => {
    try {
      this.fetchSelectOvertimework();
      this.fetchInsurancePercentage();
      this.fetchOtherAllowance();

      // //여기 과세/비과세 추가되는 값들
      //           axios.post('http://13.124.141.28:3000/otherAllowance', {
      //             id: this.state.id,
      //             year : this.state.itemAA.split('년')[0]*1,
      //             month : this.state.itemBB.split('월')[0]*1,
      //           },
      //           {  headers:{
      //             'Content-Type': 'application/json',
      //             'Accept': 'application/json'}
      //           })
      //             .then(res => {
      //               console.log(this.state.id,'_',this.state.itemAA.split('년')[0]*1, '_', this.state.itemBB.split('월')[0]*1)
      //               for(let i=0 ; i<res.data.length ; i++){
      //                 console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!_______________!여기_',res.data[i])

      //               }

      //           });

      const data_selectWorker = {
        business: this.state.bangCode,
      };
      axios
        .post(url + "/selectWorker", data_selectWorker, config)
        .then((res) => {
          let week = [4, 4, 4, 4, 4, 4, 4];
          let t1 = [];
          let t2 = [];
          let rowall = [];

          const year = parseInt(this.state.itemAA.split("년")[0]);
          const month = parseInt(this.state.itemBB.split("월")[0]);

          const now_year = new Date().getFullYear();
          const now_month = new Date().getMonth() + 1; // 컴퓨터는 0부터 세는데, 달은 1월부터 있으니까 +1;

          if (year != now_year || month != now_month) {
            console.log(":::::::::::::::::::::::");
            // console.log(this.state.itemA.split('년')[0]+' '+ this.state.itemB.split('월')[0])
            calculateWeek(week, year, month);
            for (let i = 0; i < res.data.length; i++) {
              const type_alba = res.data[i].type == TYPE_ALBA;
              const user_name = res.data[i].workername2;

              const work_type = type_alba ? "알바" : "정규직";

              if (year > now_year || (year == now_year && month > now_month)) {
                funcTypeCheckAdd(type_alba, rowall, t1, t2, user_name);
                // CHECKED::확인
                this.setState(
                  {
                    nname: rowall,
                    type1: t1,
                    type2: t2,
                  },
                  () => {
                    if (flag == 1) {
                      this.show();
                    }
                  }
                );
              } else {
                const worker_start_year =
                  res.data[i].startdate.split("/")[0] * 1;
                const worker_start_month =
                  res.data[i].startdate.split("/")[1] * 1;
                const worker_start_day =
                  res.data[i].startdate.split("/")[2] * 1;
                if (
                  year < worker_start_year ||
                  (year == worker_start_year && month < worker_start_month)
                ) {
                  funcTypeCheckAdd(type_alba, rowall, t1, t2, user_name);
                  this.setState(
                    {
                      nname: rowall,
                      type1: t1,
                      type2: t2,
                    },
                    () => {
                      if (flag == 1) {
                        this.show();
                      }
                    }
                  );
                } else {
                  if (type_alba) {

                    let weekk = [0, 0, 0, 0, 0, 0, 0];
                    if (
                      year == worker_start_year &&
                      month == worker_start_month
                    ) {
                      let nn = Math.floor((worker_start_day - 1) / 7);
                      weekk = [nn, nn, nn, nn, nn, nn, nn];
                      console.log(
                        worker_start_year,
                        worker_start_month,
                        worker_start_day
                      );
                      let dd = new Date(
                        worker_start_year,
                        worker_start_month - 1,
                        1
                      ).getDay();
                      console.log("오늘 날짜까지 끊자!" + dd);
                      for (
                        let j = 0;
                        j < (worker_start_day - 1) % 7;
                        j++
                      ) {
                        weekk[dd]++;
                        dd++;
                        dd = dd % 7;
                      }
                    }
                    let sum = 0;
                    let eachtime = res.data[i].eachtime.split("/");
                    for (let i = 0; i < 7; i++) {
                      console.log(eachtime[i] * 1, week[i]);
                      sum += eachtime[i] * 1 * (week[i] - weekk[i]);
                    }
                    console.log(">>>");
                    console.log(res.data);
                    console.log(">>>");
                    console.log(this.state.addtime[res.data[i].workername]);
                    rowall.push([
                      res.data[i].workername2,
                      "알바",
                      String(this.state.pay11 /*시급*/),
                      String(sum /* 시간 */),
                      String(0),
                      String(
                        (this.state.addtime[res.data[i].workername]
                          ? this.state.addtime[res.data[i].workername]
                          : 0) * this.state.pay11 /*추가근로*/
                      ),
                    ]);
                    t1.push({ label: user_name, value: user_name });
                  } else {
                    let pay = this.state.pay11; //(date/new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate());
                    if (
                      this.state.itemAA.split("년")[0] * 1 ==
                        res.data[i].startdate.split("/")[0] * 1 &&
                      this.state.itemBB.split("월")[0] * 1 ==
                        res.data[i].startdate.split("/")[1] * 1
                    ) {
                      pay = Math.floor(
                        this.state.pay11 *
                          ((new Date(
                            res.data[i].startdate.split("/")[0] * 1,
                            res.data[i].startdate.split("/")[1] * 1,
                            0
                          ).getDate() -
                            res.data[i].startdate.split("/")[2] * 1 +
                            1) /
                            new Date(
                              res.data[i].startdate.split("/")[0] * 1,
                              res.data[i].startdate.split("/")[1] * 1,
                              0
                            ).getDate())
                      );
                    }
                    rowall.push([
                      res.data[i].workername2,
                      "정규직",
                      String(pay),
                      "0",
                      String(
                        (this.state.addtime[res.data[i].workername]
                          ? this.state.addtime[res.data[i].workername]
                          : 0) * this.state.pay11 /*시급*/
                      ),
                    ]);
                    t2.push({ label: user_name, value: user_name });
                  }
                }
              }
            }
          } else {
            let n = Math.floor(new Date().getDate() / 7);
            let week = [n, n, n, n, n, n, n];
            console.log(week);
            console.log(now_year, new Date().getMonth(), 1);
            let d = new Date(now_year, new Date().getMonth(), 1).getDay();
            console.log("오늘 날짜까지 끊자!" + d);
            for (let i = 0; i < new Date().getDate() % 7; i++) {
              week[d]++;
              d++;
              d = d % 7;
            }

            for (let i = 0; i < res.data.length; i++) {
              console.log(
                "======================================================///////==========================="
              );
              console.log(
                "><><><><" + year,
                res.data[i].startdate.split("/")[0] * 1,
                month,
                res.data[i].startdate.split("/")[1] * 1
              );
              if (
                year < res.data[i].startdate.split("/")[0] * 1 ||
                (year == res.data[i].startdate.split("/")[0] * 1 &&
                  month < res.data[i].startdate.split("/")[1] * 1)
              ) {
                const user_name = res.data[i].workername2;
                const type_alba = res.data[i].type == TYPE_ALBA;
                funcTypeCheckAdd(type_alba, rowall, t1, t2, user_name);
                this.setState({ nname: rowall, type1: t1, type2: t2 }, () => {
                  if (flag == 1) {
                    this.show();
                  }
                });
              }
              console.log(res.data);
              if (res.data[i].type == 1) {
                const user_name = res.data[i].workername2;
                let weekk = [0, 0, 0, 0, 0, 0, 0];
                if (
                  year == res.data[i].startdate.split("/")[0] * 1 &&
                  month == res.data[i].startdate.split("/")[1] * 1
                ) {
                  let nn = Math.floor(
                    (res.data[i].startdate.split("/")[2] - 1) / 7
                  );
                  weekk = [nn, nn, nn, nn, nn, nn, nn];
                  console.log(
                    res.data[i].startdate.split("/")[0],
                    res.data[i].startdate.split("/")[1],
                    res.data[i].startdate.split("/")[2]
                  );
                  let dd = new Date(
                    res.data[i].startdate.split("/")[0],
                    res.data[i].startdate.split("/")[1] * 1 - 1,
                    1
                  ).getDay();
                  console.log("오늘 날짜까지 끊자!" + dd);
                  for (
                    let j = 0;
                    j < (res.data[i].startdate.split("/")[2] - 1) % 7;
                    j++
                  ) {
                    weekk[dd]++;
                    dd++;
                    dd = dd % 7;
                  }
                  console.log("///////////////////////////////////////////22");
                  console.log(weekk);
                }

                let sum = 0;
                let eachtime = res.data[i].eachtime.split("/");
                for (let i = 0; i < 7; i++) {
                  console.log(eachtime[i] * 1, week[i]);
                  sum += eachtime[i] * 1 * (week[i] - weekk[i]);
                }
                console.log(">>>");
                console.log(res.data);
                console.log(">>>");
                //변경해야함
                rowall.push([
                  res.data[i].workername2,
                  "알바",
                  String(this.state.pay11 /*시급*/),
                  String(sum /* 시간 */),
                  String(0),
                  String(
                    (this.state.addtime[res.data[i].workername]
                      ? this.state.addtime[res.data[i].workername]
                      : 0) * this.state.pay11 /*추가근로*/
                  ),
                ]);
                t1.push({ label: user_name, value: user_name });
              } else {
                const user_name = res.data[i].workername2;
                let date = new Date().getDate();
                if (
                  year == res.data[i].startdate.split("/")[0] * 1 &&
                  month == res.data[i].startdate.split("/")[1] * 1
                ) {
                  if (date <= res.data[i].startdate.split("/")[2] * 1) date = 0;
                  else {
                    date = date - res.data[i].startdate.split("/")[2] * 1;
                  }
                }
                rowall.push([
                  res.data[i].workername2,
                  "정규직",
                  String(
                    Math.floor(
                      this.state.pay11 *
                        (date /
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1,
                            0
                          ).getDate())
                    )
                  ),
                  "0",
                  String(
                    (this.state.addtime[res.data[i].workername]
                      ? this.state.addtime[res.data[i].workername]
                      : 0) * this.state.pay11 /*시급*/
                  ),
                ]);
                t2.push({ label: user_name, value: user_name });
              }
            }
          }

          this.setState({ nname: rowall, type1: t1, type2: t2 }, () => {
            if (flag == 1) {
              this.show();
            }
          });
          console.log(this.state.nname, this.state.type1, this.state.type2);
        });
    } catch (e) {
      console.error(e);
    }
  };

  clickHandler = async () => {
    try {
      let t = this.state.tableData[0];
      let signOrStamp = "";

      await axios
        .post(
          "http://13.124.141.28:3000/selectBusinessByName",
          {
            bname: this.state.bangCode,
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
            signOrStamp = `<img src="http://13.124.141.28:3000/${this.state.bangCode}.png" alt="도장" z-index="2" width="100" height="100"></img>`;
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
                    span{margin-left:240px;}
                    table{border-collapse:collapse; margin: 10px 30px 10px 10px;}
                    h1{ text-align: center; }
                    th{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                    td{border:1px solid; padding-left: 15px; padding-right: 15px; text-align: center;}
                    .text_underline {text-decoration: underline;}
                    .margin_left{margin-left:15px;}
                    .margin_left2{margin-left:65px;}
                    .text_underline_margin_left{text-decoration: underline;margin-left:50px;}
                    .contract_day{position:relative; left:50%; margin-left: -100px;}
                </style>
                <body>
                  <h1>[${this.state.bangCode}] 근로자 급여명세서</h1>
                  <b>날짜 : ${this.state.itemAA} ${this.state.itemBB}</b><br>
                  <b>이름 : ${this.state.Name}(${
            this.state.WorkingType
          })</b><br>
                  <b>급여산정기간 : 1일 ~ 말일</b><br>
                  <table>
                    <th>내역</th><th>금액</th>
                    <tr><td>(+) 기본급</td><td>${String(t[0])}</td></tr>
                    <tr><td>(+) 기타수당(과세)</td><td>${String(t[1])}</td></tr>
                    <tr><td>(+) 기타수당(비과세)</td><td>${String(
                      t[2]
                    )}</td></tr>
                    <tr><td>(-) 국민연금</td><td>${String(t[3])}</td></tr>
                    <tr><td>(-) 건강보험료</td><td>${String(t[4])}</td></tr>
                    <tr><td>(-) 장기요양보험료</td><td>${String(t[5])}</td></tr>
                    <tr><td>(-) 고용보험료</td><td>${String(t[6])}</td></tr>
                    <tr><td>(-) 소득세</td><td>${String(t[7])}</td></tr>
                    <tr><td>(-) 주민세</td><td>${String(t[8])}</td></tr>
                    <tr><td>(+) 지급액계</td><td>${
                      this.state.PaymentSum
                    }</td></tr>
                    <tr><td>(-) 공제액계</td><td>${
                      this.state.DeductionSum
                    }</td></tr>
                    <tr><td>(=) 차인지급액계</td><td>${
                      this.state.Difference
                    }</td></tr>
                  </table><span>${signOrStamp}</span>
                </body>
              </html>`;
          const { uri } = await Print.printToFileAsync({ html }, true);
          Sharing.shareAsync(uri);
        });
    } catch (error) {
      console.error(error);
    }
    /*let t = this.state.tableData[0];
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
    });*/
  };
  show() {
    //console.log('itmeA : ' + this.state.itemA);
    //console.log('itmeB : ' + this.state.itemB);

    //----------DB에서 불러오는 값들----------------
    // MonthlySalary:보수총액
    let MonthlySalary = "0";

    // 변경해야함
    // 추가급여
    let ExtraWorkAllowance = "0"; // 추가근로수당
    let MealCharge = "0"; // 식대

    // HourlyWage : 시급 / WorkingHour : 한달 일한 시간
    let WorkingHour = "0";
    let HourlyWage = "0";

    // 추가급여
    let ExtraWorkAllowancePartTime = "0"; // 추가근로수당
    let MealChargePartTime = "0"; // 식대

    let WorkingType = "정규직";
    console.log("여기여기요~~");
    console.log(this.state.nname);
    let user_name_let = ''
    for (let i = 0; i < this.state.nname.length; i++) {
      const item_A = this.state.itemA;
      const item_B = this.state.itemB;
      const user_name = this.state.nname[i][0];
      user_name_let = user_name

      // if (item_A == user_name || item_B == user_name) {
      WorkingType = this.state.nname[i][1];
      if (this.state.nname[i][1] === "정규직") {
        MonthlySalary = this.state.nname[i][2]*1;
        MealCharge = this.state.nname[i][3];
        ExtraWorkAllowance = this.state.nname[i][4];
      } else {
        WorkingHour = this.state.nname[i][3];
        HourlyWage = this.state.nname[i][2];
        MealChargePartTime = this.state.nname[i][4];
        ExtraWorkAllowancePartTime = this.state.nname[i][5];
      }
      break;
      // }
    }
    console.log(this.state.itemA);
    console.log(this.state.itemB);
    console.log(MonthlySalary);
    console.log(
      "000000000000000000000000000000000000000000000000000000000000000"
    );
    console.log("이름", this.state.Name);
    console.log("국민연금(%) : ", this.state.NationalPensionPercentage);
    console.log("건강보험(%) : ", this.state.HealthInsurancePercentage);
    console.log("건강보험(정기요양)(%) : ", this.state.RegularCarePercentage);
    console.log("고용보험(%) : ", this.state.EmploymentInsurancePercentage);

    //----------------------계산식---------------------------------------------
    // NationalPension:국민연금 (보수총액*4.5%)
    const NationalPension = getNationalPension(
      MonthlySalary,
      this.state.NationalPensionPercentage
    );
    console.log('NationalPension:'+MonthlySalary);

    // HealthInsurance:건강보험 (보수총액*3.3335%)
    const HealthInsurance = getHealthInsurance(
      MonthlySalary,
      this.state.HealthInsurancePercentage
    );

    // RegularCare:건강보험(정기요양) (건강보험료*5.125%)
    const RegularCare = getRegularCare(
      HealthInsurance,
      this.state.RegularCarePercentage
    );

    // EmploymentInsurance : 고용보험 (보수총액*0.8%)
    const EmploymentInsurance = getEmploymentInsurance(
      MonthlySalary,
      this.state.EmploymentInsurancePercentage
    );

    // SocialInsurance:사대보험 (국민연금+건강보험+고용보험)
    const SocialInsurance = getSocialInsurance(
      NationalPension,
      HealthInsurance,
      RegularCare,
      EmploymentInsurance
    );

    // WithholdingTax:원천과세(IncomeTax+InhabitantsTax)
    // IncomeTax : 갑근세(소득세) : 보수총액*3.0%
    const IncomeTax = calculate_income_tax(MonthlySalary);

    // InhabitantsTax : 주민세 (갑근세의 10%)
    const InhabitantsTax = getInhabitantsTax(IncomeTax);

    // TotalDeduction:공제총액(사대보험+갑근세+주민세) : 보수총액*0.3%
    const TotalDeduction =
      parseInt(SocialInsurance) +
      parseInt(IncomeTax) +
      parseInt(InhabitantsTax);
    // 지급총액 : 보수총액+추가금
    const TotalPayment =
      parseInt(MonthlySalary) +
      parseInt(ExtraWorkAllowance) +
      parseInt(MealCharge);
    // 실지급액(지급총액-공제총액)
    let ActualSalary = parseInt(TotalPayment) - parseInt(TotalDeduction);

    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!공제액",
      TotalDeduction
    );
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ알바계산ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    //MonthlySalaryPartTime : 한달보수총액
    let MonthlySalaryPartTime = parseInt(WorkingHour) * parseInt(HourlyWage);

    // 지급총액 : 보수총액+추가금
    let TotalPaymentPartTime =
      parseInt(MonthlySalaryPartTime) +
      parseInt(ExtraWorkAllowancePartTime) +
      parseInt(MealChargePartTime);

    // IncomeTax : 갑근세(소득세) : 보수총액*3.0%
    let IncomeTaxPartTime =
      Math.floor((parseInt(MonthlySalaryPartTime) * 0.03).toFixed(0) / 10) * 10;

    // InhabitantsTax : 주민세 (갑근세의 10%)  : 보수총액*0.3%
    let InhabitantsTaxPartTime =
      Math.floor((parseInt(IncomeTaxPartTime) * 0.1).toFixed(0) / 10) * 10;

    // WithholdingTax:원천과세(IncomeTax+InhabitantsTax) : 3.3 세금공제
    let WithholdingTax =
      parseInt(IncomeTaxPartTime) + parseInt(InhabitantsTaxPartTime);

    // 실지급액(지급총액-공제총액)
    let ActualSalaryPartTime =
      parseInt(TotalPaymentPartTime) - parseInt(WithholdingTax);

    if (WorkingType == "정규직") {
      console.log("MonthlySalaryPartTime: " + MonthlySalaryPartTime)
      // -------정규------
      this.setState({
        Name: user_name_let,
        WorkingType: "정규직",
        tableData: [
          [
            MonthlySalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            ExtraWorkAllowance,
            MealCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            NationalPension.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            HealthInsurance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            RegularCare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            EmploymentInsurance.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ),
            IncomeTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            InhabitantsTax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          ],
        ],
        DeductionSum: TotalDeduction.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
        PaymentSum: TotalPayment.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
        Difference: ActualSalary.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
      });
    } else {
      // ------알바-------
      this.setState({
        Name: user_name_let,
        WorkingType: "알바",
        tableData: [
          [
            MonthlySalaryPartTime.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ),
            ExtraWorkAllowancePartTime.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ),
            MealChargePartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            0,
            0,
            0,
            0,
            IncomeTaxPartTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            InhabitantsTaxPartTime.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ),
          ],
        ],
        DeductionSum: WithholdingTax.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
        PaymentSum: TotalPaymentPartTime.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
        Difference: ActualSalaryPartTime.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
      });
    }
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
    const { PaymentSum, DeductionSum, Difference, Name, WorkingType } =
      this.state;
    //PaymentSum:지급합계, DeductionSum:공제합계, Difference:차이

    return (
      <View style={styles.image}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.titleArea}>
              <Text style={styles.textTitle}>근로자 급여명세서</Text>
            </View>
            <View style={styles.dropDownArea}>
              <DDP_YEAR
                default_year_data={this.state.itemAA}
                is_visible={this.state.isVisibleAA}
                onOpen={() =>
                  this.changeVisibility({
                    isVisibleAA: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisibleAA: false,
                  })
                }
                onChangeItem={(item) => {
                  this.setState({
                    itemAA: item.value,
                  });
                }}
              />

              <DropDownPicker
                items={DDP_MONTH_ITEMS}
                defaultValue={this.state.itemBB}
                containerStyle={{
                  height: hp("6%"),
                  width: wp("30%"),
                  marginLeft: wp("1%"),
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
                  fontSize: wp("4%"),
                  marginTop: hp("1%"),
                }}
                isVisible={this.state.isVisibleBB}
                onOpen={() =>
                  this.changeVisibility({
                    isVisibleBB: true,
                  })
                }
                onClose={() =>
                  this.setState({
                    isVisibleBB: false,
                  })
                }
                onChangeItem={(item) =>
                  this.setState({
                    itemBB: item.value,
                  })
                }
              />
            </View>

            <View style={styles.dropDownArea2}>
              <DropDownPicker
                items={this.state.type2}
                placeholder="정규직/계약직"
                defaultValue={this.state.itemA}
                containerStyle={{
                  height: hp("6%"),
                  width: wp("30%"),
                  marginLeft: wp("3%"),
                  marginTop: wp("1%"),
                }}
                dropDownStyle={{
                  backgroundColor: "white",
                  borderBottomLeftRadius: wp("1.7%"),
                  borderBottomRightRadius: wp("1.7%"),
                }}
                itemStyle={{ justifyContent: "center", alignItems: "center" }}
                labelStyle={{
                  height: hp("3%"),
                  textAlign: "center",
                  color: "#040525",
                  fontFamily: "NanumSquare",
                  fontSize: wp("3.8%"),
                  marginTop: hp("1%"),
                  ...Platform.select({
                    ios: {
                      fontSize: wp("3.3%"),
                    },
                    android: {
                      fontSize: wp("3.8%"),
                    },
                  }),
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
                onChangeItem={(item) =>
                  this.setState({
                    itemA: item.value,
                    itemB: null,
                  })
                }
              />
              <DropDownPicker
              disabled={this.state.type1 && this.state.type1.length < 1}
                items={this.state.type1}
                placeholder="알바/단기"
                defaultValue={this.state.itemB}
                containerStyle={{
                  height: hp("6%"),
                  width: wp("30%"),
                  marginLeft: wp("1%"),
                  marginTop: wp("1%"),
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
                  fontSize: wp("3.8%"),
                  marginTop: hp("1%"),
                  ...Platform.select({
                    ios: {
                      fontSize: wp("3.3%"),
                    },
                    android: {
                      fontSize: wp("3.8%"),
                    },
                  }),
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
                    itemA: null,
                  })
                }
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.fetchData(1);
                }}
              >
                <Text style={styles.buttonTitle}>조회하기</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.textArea}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textStyle}>이름 : {Name}</Text>
                <Text style={styles.textStyle}>, 근무형태 : {WorkingType}</Text>
              </View>
              <Text style={styles.textStyle}>급여산정기간 : 1일 ~ 말일</Text>
            </View>
            <ScrollView style={{ zIndex: -2000 }}>
              <View style={styles.tableArea}>
                <Table
                  style={styles.wrapper}
                  borderStyle={{ borderWidth: 1, borderColor: "white" }}
                >
                  {/* Left Wrapper */}
                  <TableWrapper style={{ width: wp("40%") }}>
                    <Cell
                      data="내역"
                      style={styles.singleHead}
                      textStyle={styles.tableTitleText}
                    />
                    <TableWrapper style={styles.wrapper}>
                      <Col
                        data={["지급", "공제"]}
                        style={styles.title1}
                        heightArr={[hp("16.5%"), hp("33%")]}
                        textStyle={styles.tableTitleText}
                      />
                      <Col
                        data={state.tableTitle}
                        style={styles.title}
                        heightArr={[
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                          hp("5.5%"),
                        ]}
                        textStyle={styles.tableTitleText}
                      />
                    </TableWrapper>
                    <Cell
                      data="지급액계"
                      style={styles.singleHead1_1}
                      textStyle={styles.tableTitleText}
                    />
                    <Cell
                      data="공제액계"
                      style={styles.singleHead1_1}
                      textStyle={styles.tableTitleText}
                    />
                    <Cell
                      data="차인지급액계"
                      style={styles.singleHead1_1_1}
                      textStyle={styles.tableTitleText}
                    />
                  </TableWrapper>

                  <TableWrapper style={{ flex: 1 }}>
                    <Cell
                      data="금액"
                      style={styles.singleHead1}
                      textStyle={styles.tableTitleText}
                    />
                    <Cols
                      data={state.tableData}
                      heightArr={[
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                        hp("5.5%"),
                      ]}
                      textStyle={styles.tableText}
                    />

                    <Cell
                      data={PaymentSum}
                      style={styles.singleHead1_2}
                      textStyle={styles.tableTitleWhiteText}
                    />
                    <Cell
                      data={DeductionSum}
                      style={styles.singleHead1_2}
                      textStyle={styles.tableTitleWhiteText}
                    />
                    <Cell
                      data={Difference}
                      style={styles.singleHead1_2_1}
                      textStyle={styles.tableTitleWhiteText}
                    />
                  </TableWrapper>
                </Table>
              </View>

              <View style={{ marginTop: hp("10%") }}>
                <Text></Text>
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
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default StatementScreen2;

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
    fontSize: wp("5.55%"),
    fontFamily: "NanumSquareB",
    color: "#040525",
    marginBottom: hp("1%"),
    marginTop: hp("4%"),
  },
  dropDownArea: {
    flexDirection: "row",
    marginTop: hp("3%"),
    marginBottom: hp("0.1%"),
    width: wp("90%"),
    height: hp("6%"),
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: wp("5%"),
  },
  dropDownArea2: {
    flexDirection: "row",
    marginTop: hp("0.1%"),
    marginLeft: wp("5%"),
    width: wp("90%"),
    height: hp("18%"),
    alignItems: "flex-start",
    justifyContent: "flex-start",
    ...Platform.select({
      ios: {
        zIndex: -1000,
      },
    }),
  },
  button: {
    backgroundColor: "#67C8BA",
    marginLeft: wp("2%"),
    marginTop: wp("1%"),
    width: wp("20%"),
    height: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("1.7%"),
  },
  buttonTitle: {
    color: "white",
    fontFamily: "NanumSquare",
    fontSize: wp("4.5%"),
  },
  tableArea: {
    marginBottom: hp("5%"),
    marginTop: hp("2%"),
    width: wp("90%"),
    marginLeft: wp("5%"),
  },
  textArea: {
    marginTop: hp("2%"),
    marginLeft: wp("7%"),
    width: wp("80%"),
    position: "absolute",
    top: hp("27%"),
    ...Platform.select({
      ios: {
        zIndex: -2000,
      },
    }),
  },
  textStyle: {
    fontSize: wp("4.2%"),
    fontFamily: "NanumSquare",
    color: "#040525",
    marginTop: wp("1%"),
    marginBottom: wp("1.5%"),
    marginRight: wp("2%"),
  },
  wrapper: { flexDirection: "row" },
  singleHead: {
    width: wp("40%"),
    height: hp("5.5%"),
    backgroundColor: "#A3E5DA",
    borderTopLeftRadius: wp("4%"),
  },
  singleHead1: {
    height: hp("5.5%"),
    backgroundColor: "#A3E5DA",
    borderTopRightRadius: wp("4%"),
  },
  singleHead1_1: {
    width: wp("40%"),
    height: hp("5.5%"),
    backgroundColor: "#A3E5DA",
  },
  singleHead1_1_1: {
    width: wp("40%"),
    height: hp("5.5%"),
    backgroundColor: "#A3E5DA",
    borderBottomLeftRadius: wp("4%"),
  },
  singleHead1_2: { height: hp("5.5%"), backgroundColor: "#67C8BA" },
  singleHead1_2_1: {
    height: hp("5.5%"),
    backgroundColor: "#67C8BA",
    borderBottomRightRadius: wp("4%"),
  },
  title: { flex: 3, backgroundColor: "#E2F2EF" },
  title1: { flex: 1, backgroundColor: "#A3E5DA" },

  tableText: {
    textAlign: "center",
    fontFamily: "NanumSquare",
    color: "#040525",
    fontSize: wp("3.35%"),
  },
  tableTitleText: {
    textAlign: "center",
    fontFamily: "NanumSquare",
    color: "#040525",
    ...Platform.select({
      ios: {
        fontSize: wp("3.2%"),
      },
      android: {
        fontSize: wp("3.8%"),
      },
    }),
  },
  tableTitleWhiteText: {
    textAlign: "center",
    fontFamily: "NanumSquare",
    color: "white",
    fontSize: wp("3.8%"),
  },
  buttonArea: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: hp("14%"),
    paddingBottom: hp("7%"),
    paddingTop: hp("3%"),
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
