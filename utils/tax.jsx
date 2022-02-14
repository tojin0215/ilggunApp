/**
 * 소득세를 계산한다
 * 
 * @param {number} monthly_salary 월급
 * @returns {number} 소득세 계산
 */
function calculate_income_tax(monthly_salary) {
  // IncomeTax : 갑근세(소득세) : 보수총액*3.0%
  //let IncomeTax = (parseInt(monthly_salary)*0.03).toFixed(0)
  let IncomeTax = 0;

  if (parseInt(monthly_salary) < 1060000) {
    IncomeTax = 0;
  } else if (
    (parseInt(monthly_salary) >= 1060000) &
    (parseInt(monthly_salary) <= 1100000)
  ) {
    IncomeTax = 1600;
  } else if (
    (parseInt(monthly_salary) > 1100000) &
    (parseInt(monthly_salary) <= 1200000)
  ) {
    IncomeTax = 2990;
  } else if (
    (parseInt(monthly_salary) > 1200000) &
    (parseInt(monthly_salary) <= 1300000)
  ) {
    IncomeTax = 4740;
  } else if (
    (parseInt(monthly_salary) > 1300000) &
    (parseInt(monthly_salary) <= 1400000)
  ) {
    IncomeTax = 6800;
  } else if (
    (parseInt(monthly_salary) > 1400000) &
    (parseInt(monthly_salary) <= 1500000)
  ) {
    IncomeTax = 8920;
  } else if (
    (parseInt(monthly_salary) > 1500000) &
    (parseInt(monthly_salary) <= 1600000)
  ) {
    IncomeTax = 10980;
  } else if (
    (parseInt(monthly_salary) > 1600000) &
    (parseInt(monthly_salary) <= 1700000)
  ) {
    IncomeTax = 13050;
  } else if (
    (parseInt(monthly_salary) > 1700000) &
    (parseInt(monthly_salary) <= 1800000)
  ) {
    IncomeTax = 15110;
  } else if (
    (parseInt(monthly_salary) > 1800000) &
    (parseInt(monthly_salary) <= 1900000)
  ) {
    IncomeTax = 17180;
  } else if (
    (parseInt(monthly_salary) > 1900000) &
    (parseInt(monthly_salary) <= 2000000)
  ) {
    IncomeTax = 19520;
  } else if (
    (parseInt(monthly_salary) > 2000000) &
    (parseInt(monthly_salary) <= 2100000)
  ) {
    IncomeTax = 22740;
  } else if (
    (parseInt(monthly_salary) > 2100000) &
    (parseInt(monthly_salary) <= 2200000)
  ) {
    IncomeTax = 25950;
  } else if (
    (parseInt(monthly_salary) > 2200000) &
    (parseInt(monthly_salary) <= 2300000)
  ) {
    IncomeTax = 29160;
  } else if (
    (parseInt(monthly_salary) > 2300000) &
    (parseInt(monthly_salary) <= 2400000)
  ) {
    IncomeTax = 33570;
  } else if (
    (parseInt(monthly_salary) > 2400000) &
    (parseInt(monthly_salary) <= 2500000)
  ) {
    IncomeTax = 41630;
  } else if (
    (parseInt(monthly_salary) > 2500000) &
    (parseInt(monthly_salary) <= 2600000)
  ) {
    IncomeTax = 50190;
  } else if (
    (parseInt(monthly_salary) > 2600000) &
    (parseInt(monthly_salary) <= 2700000)
  ) {
    IncomeTax = 58750;
  } else if (
    (parseInt(monthly_salary) > 2700000) &
    (parseInt(monthly_salary) <= 2800000)
  ) {
    IncomeTax = 67300;
  } else if (
    (parseInt(monthly_salary) > 2800000) &
    (parseInt(monthly_salary) <= 2900000)
  ) {
    IncomeTax = 75860;
  } else if (
    (parseInt(monthly_salary) > 2900000) &
    (parseInt(monthly_salary) <= 3000000)
  ) {
    IncomeTax = 84850;
  } else if (
    (parseInt(monthly_salary) > 3000000) &
    (parseInt(monthly_salary) <= 3100000)
  ) {
    IncomeTax = 93400;
  } else if (
    (parseInt(monthly_salary) > 3100000) &
    (parseInt(monthly_salary) <= 3200000)
  ) {
    IncomeTax = 105540;
  } else if (
    (parseInt(monthly_salary) > 3200000) &
    (parseInt(monthly_salary) <= 3300000)
  ) {
    IncomeTax = 117770;
  } else if (
    (parseInt(monthly_salary) > 3300000) &
    (parseInt(monthly_salary) <= 3400000)
  ) {
    IncomeTax = 129990;
  } else if (
    (parseInt(monthly_salary) > 3400000) &
    (parseInt(monthly_salary) <= 3500000)
  ) {
    IncomeTax = 142220;
  } else if (
    (parseInt(monthly_salary) > 3500000) &
    (parseInt(monthly_salary) <= 3600000)
  ) {
    IncomeTax = 154440;
  } else if (
    (parseInt(monthly_salary) > 3600000) &
    (parseInt(monthly_salary) <= 3700000)
  ) {
    IncomeTax = 166670;
  } else if (
    (parseInt(monthly_salary) > 3700000) &
    (parseInt(monthly_salary) <= 3800000)
  ) {
    IncomeTax = 184260;
  } else if (
    (parseInt(monthly_salary) > 3800000) &
    (parseInt(monthly_salary) <= 3900000)
  ) {
    IncomeTax = 197610;
  } else if (
    (parseInt(monthly_salary) > 3900000) &
    (parseInt(monthly_salary) <= 4000000)
  ) {
    IncomeTax = 210960;
  } else if (
    (parseInt(monthly_salary) > 4000000) &
    (parseInt(monthly_salary) <= 4100000)
  ) {
    IncomeTax = 224310;
  } else if (
    (parseInt(monthly_salary) > 4100000) &
    (parseInt(monthly_salary) <= 4200000)
  ) {
    IncomeTax = 237660;
  } else if (
    (parseInt(monthly_salary) > 4200000) &
    (parseInt(monthly_salary) <= 4300000)
  ) {
    IncomeTax = 251010;
  } else if (
    (parseInt(monthly_salary) > 4300000) &
    (parseInt(monthly_salary) <= 4400000)
  ) {
    IncomeTax = 264360;
  } else if (
    (parseInt(monthly_salary) > 4400000) &
    (parseInt(monthly_salary) <= 4500000)
  ) {
    IncomeTax = 277840;
  } else if (
    (parseInt(monthly_salary) > 4500000) &
    (parseInt(monthly_salary) <= 4600000)
  ) {
    IncomeTax = 294370;
  } else if (
    (parseInt(monthly_salary) > 4600000) &
    (parseInt(monthly_salary) <= 4700000)
  ) {
    IncomeTax = 308390;
  } else if (
    (parseInt(monthly_salary) > 4700000) &
    (parseInt(monthly_salary) <= 4800000)
  ) {
    IncomeTax = 322420;
  } else if (
    (parseInt(monthly_salary) > 4800000) &
    (parseInt(monthly_salary) <= 4900000)
  ) {
    IncomeTax = 336440;
  } else if (
    (parseInt(monthly_salary) > 4900000) &
    (parseInt(monthly_salary) <= 5000000)
  ) {
    IncomeTax = 350470;
  }
  return IncomeTax;
}

/**
 * 국민연금 계산
 * 
 * @param {number} MonthlySalary 월급
 * @param {number} NationalPensionPercentage 국민연금 요율
 * @returns 
 */
export function getNationalPension(MonthlySalary, NationalPensionPercentage) {
  return (
    Math.floor(
      ((parseInt(MonthlySalary) * NationalPensionPercentage) / 100).toFixed(0) /
        10
    ) * 10
  );
}

/**
 * 건강보험 계산
 * 
 * @param {number} MonthlySalary 월급
 * @param {number} HealthInsurancePercentage 건강보험 요율
 * @returns 
 */
export function getHealthInsurance(MonthlySalary, HealthInsurancePercentage) {
  return (
    Math.floor(
      ((parseInt(MonthlySalary) * HealthInsurancePercentage) / 100).toFixed(0) /
        10
    ) * 10
  );
}

/**
 * 건강보험(정기요양) 계산
 * 
 * @param {number} HealthInsurance 월급
 * @param {number} RegularCarePercentage 건강보험(정기요양) 요율
 * @returns 
 */
export function getRegularCare(HealthInsurance, RegularCarePercentage) {
  return (
    Math.floor(
      ((HealthInsurance * RegularCarePercentage) / 100).toFixed(0) / 10
    ) * 10
  );
}

/**
 * 고용보험 계산
 * 
 * @param {number} MonthlySalary 월급
 * @param {number} EmploymentInsurancePercentage 고용보험 요율
 * @returns 
 */
export function getEmploymentInsurance(
  MonthlySalary,
  EmploymentInsurancePercentage
) {
  return (
    Math.floor(
      ((parseInt(MonthlySalary) * EmploymentInsurancePercentage) / 100).toFixed(
        0
      ) / 10
    ) * 10
  ); //근로자_고용보험
}

export function getSocialInsurance(
  NationalPension,
  HealthInsurance,
  RegularCare,
  EmploymentInsurance
) {
  return (
    parseInt(NationalPension) +
    parseInt(HealthInsurance) +
    parseInt(RegularCare) +
    parseInt(EmploymentInsurance)
  ).toFixed(0);
}

export function getInhabitantsTax(IncomeTax) {
  return Math.floor((parseInt(IncomeTax) * 0.1).toFixed(0) / 10) * 10;
}

export default calculate_income_tax;


/** 
 * A simple string example.
 * @param  {boolean} type_alba
 * @param  {Array} rowall
 * @param  {Array} t1
 * @param  {Array} t2
 * @param  {string} user_name
 */
export function funcTypeCheckAdd(type_alba, rowall, t1, t2, user_name) {
  if (type_alba) {
    rowall.push([user_name, "알바", "0", "0", "0", "0"]);
    t1.push({ label: user_name, value: user_name });
  } else {
    rowall.push([user_name, "정규직", "0", "0", "0"]);
    t2.push({ label: user_name, value: user_name });
  }
}

/** 
 * A simple string example.
 * @param  {Array} week
 * @param  {number} year
 * @param  {number} month
 */
export function calculateWeek(week, year, month) {
  let nalsu = new Date(year, month, 0).getDate();
  let namugi = nalsu % 7;
  let it = new Date(year, month, 0).getDay();
  console.log(nalsu, namugi, it, year, month);
  for (let i = 0; i < namugi; i++) {
    week[(it - i) % 7]++;
  }
}
