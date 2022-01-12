import axios from 'axios';
import {SERVER_URL, CONFIG_JSON} from './Api';

interface UserData {
    id: string;
    name: string;
}

interface PostSignIn {
    (user_id: string, user_pw: string): Promise<UserData | undefined>;
}
interface PostSignInByCode {
    (code: string): Promise<UserData | undefined>;
}
interface PostSignUpByCode {
    (id: string, email: string, name: string, password: string, sign: string, code: string): Promise<UserData | undefined>;
}

export const postSignIn: PostSignIn = function (
    user_id: string, user_pw: string
) {
    return axios.post(`${SERVER_URL}signin`, {id: user_id, password: user_pw }, CONFIG_JSON)
    .then(response => {
        const d = response.data[0];
        if (d === undefined || d === '') return null;
        else return {id: d.id, name: d.name}
    })
}

export const postSignInByCode: PostSignInByCode = function (
    code: string
) {
    return axios.post(`${SERVER_URL}signinByCode`, {code: code}, CONFIG_JSON)
    .then(response => {
        const d = response.data[0];
        if (d === undefined || d === '') return null;
        else return {id: d.id, name: d.name}
    })
}

export const postSignUpByCode: PostSignUpByCode = function (
    id: string, email: string, name: string, password: string, sign: string, code: string,
) {
    return axios.post(`${SERVER_URL}signupByCode`, {id, email, name, password, sign, code}, CONFIG_JSON)
    // .then(response => {
    //     const d = response.data[0];
    //     if (d === undefined || d === '') return null;
    //     else return {id: d.id, name: d.name}
    // })
}