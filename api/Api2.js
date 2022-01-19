import axios from 'axios';
// import https from 'https';
import { getMinimumPayPerHour } from '../const/default-value';
import {SERVER_URL, CONFIG_JSON} from './Api';

// interface UserData {
//     id: string;
//     name: string;
// }

// interface PostSignIn {
//     (user_id: string, user_pw: string): Promise<UserData | undefined>;
// }
// interface PostSignInByCode {
//     (code: string): Promise<UserData | undefined>;
// }
// interface PostSignUpByCode {
//     (id: string, email: string, name: string, password: string, sign: string, code: string): Promise<UserData | undefined>;
// }
// interface PostInsurancePercentage {
//     (business_code: string, find_year: string): Promise<{
//         national_pension_percentage: number;
//         health_insurance_percentage: number;
//         regular_care_percentage: number;
//         employment_insurance_percentage: number;
//         hourly_wage: number;
//     } | null>
// }

// export const postSignIn: PostSignIn = function (
//     user_id: string, user_pw: string
// ) {
export const postSignIn = function (
    user_id, user_pw
) {
    try {
        axios.post(`${SERVER_URL}signin`, {id: user_id, password: user_pw }, CONFIG_JSON)
    .then(r => console.log(`postSignIn::r::${JSON.stringify(r.data, null, 2)}`))
    .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
        //   console.log('Error', error.message);
        }
        console.log(error.config);
    })
    } catch(e) {
        console.log(`postSignIn::e::${e}`)
    }
    
    
    return axios.post(`${SERVER_URL}signin`, {id: user_id, password: user_pw }, CONFIG_JSON)
    .then(response => {
        console.log(`postSignIn::response::${response}`)
        const d = response.data[0];
        if (d === undefined || d === '') return null;
        else return {id: d.id, name: d.name}
    })
}

// export const postSignInByCode: PostSignInByCode = function (
//     code: string
// ) {
export const postSignInByCode = function (
    code
) {
    return axios.post(`${SERVER_URL}signinByCode`, {code: code}, CONFIG_JSON)
    .then(response => {
        const d = response.data[0];
        if (d === undefined || d === '') return null;
        else return {id: d.id, name: d.name}
    })
}

// export const postSignUpByCode: PostSignUpByCode = function (
//     id: string, email: string, name: string, password: string, sign: string, code: string,
// ) {
export const postSignUpByCode = function (
    id, email, name, password, sign, code,
) {
    return axios.post(`${SERVER_URL}signupByCode`, {id, email, name, password, sign, code}, CONFIG_JSON)
    // .then(response => {
    //     const d = response.data[0];
    //     if (d === undefined || d === '') return null;
    //     else return {id: d.id, name: d.name}
    // })
}

// export const postInsurancePercentage: PostInsurancePercentage = function(
//     business_code: string, find_year: string
// ) {
export const postInsurancePercentage = function(
    business_code, find_year
) {
    return axios.post(`${SERVER_URL}insurancePercentage`, {bang: business_code}, CONFIG_JSON)
    // .then(result => {console.log(result.data); return result})
    .then(result => result.data.filter(value => value.date === find_year))
    .then(result => {
        if (result.length === 0) return null
        const data = result[0]
        return {
            national_pension_percentage: data.NationalPensionPercentage? data.NationalPensionPercentage : 4.5,
            health_insurance_percentage: data.HealthInsurancePercentage? data.HealthInsurancePercentage : 3.43,
            regular_care_percentage: data.RegularCarePercentage? data.RegularCarePercentage : 11.25,
            employment_insurance_percentage: data.EmploymentInsurancePercentage? data.EmploymentInsurancePercentage : 0.8,
            hourly_wage: data.HourlyWage? data.HourlyWage : getMinimumPayPerHour(0),
        }
    })
}
