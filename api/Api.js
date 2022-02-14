
import axios from 'axios';

export const SERVER_URL = "http://13.124.141.28:3000/";
export const CONFIG_JSON = {
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const getSelectSign = (id, id2) => {
    return axios.post(`${SERVER_URL}selectSign`, {id, id2}, CONFIG_JSON)
}

export const postAddBusiness = (
    id,
    businessOwner,
    workplace,
    businessRegistrationNumber,
    businessPhoneNumber,
    zipCode,
    address1,
    address2,
    stamp,
    fivep,
    ) => (
    axios.post(`${SERVER_URL}addBusiness`, {
            id : id,
            name : businessOwner,
            bname: workplace,
            bnumber:businessRegistrationNumber,
            bphone:businessPhoneNumber,
            baddress: `${address1}  ${address2}(${zipCode})`,
            stamp: stamp,
            fivep: fivep
          }, CONFIG_JSON)
)

export const postUploadStamp = (file, workplace) => (
    axios.post(
        `${SERVER_URL}uploadStamp`, {
            method: 'POST',
            headers: CONFIG_JSON.headers,
            body: JSON.stringify({
                file: file.base64,
                bname: workplace
            }),
        })
)

export const getSelectBusiness = (user_id) => {
    return axios.post(
        `${SERVER_URL}selectBusiness`, {
            id: user_id,
        }, CONFIG_JSON)
}

export const postloginHistoryWorker = (worker_name, login_time, business_name) => {
    axios.post(`${SERVER_URL}addLoginHistoryWorker`, {
        workername: worker_name,
        login_time: login_time,
        business_name: business_name,
    }).then(response => console.log(response))
    .catch(error => console.log(error))
}

export const getDayStr = (date_obj) => {
  switch (date_obj.getDay()) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fir";
    case 6:
      return "sat";
    default:
      return "sun";
  }
};

export const getWorkTodos = (business_name, date_obj, worker_id) => {
    const data = {
      bang: business_name,
      year: date_obj.getFullYear(),
      month: date_obj.getMonth() + 1,
      date: date_obj.getDate(),
      worker: worker_id,
    };
    return axios
      .post(`${SERVER_URL}selectWorkTodo`, data)
      .then((response) => response.data);
  };
  
export const getBusinessByWorker = (worker_id) => {
    return axios
      .post(`${SERVER_URL}selectBusinessByWorker`, { id: worker_id })
      .then((response) => response.data[0]);
  };
  
export const getWorkerTimelog = (business_name, date_obj, worker_id) => {
    const data = {
      bang: business_name,
      year: date_obj.getFullYear(),
      month: date_obj.getMonth() + 1,
      date: date_obj.getDate(),
      day: getDayStr(date_obj),
      workername: worker_id,
    };
    return axios
      .post(`${SERVER_URL}selectTimelogAsWorker`, data)
      .then((response) => response.data);
  };

export const getWorker = (business_name, worker_id) => {
    const data = {
      business: business_name,
      workername: worker_id,
    };
    return axios
      .post(`${SERVER_URL}businessWorker`, data)
      .then((response) => response.data[0]);
  };
  
export const getWorkerByDay = (business_name, date_obj, worker_id) => {
    const data = {
      business: business_name,
      year: date_obj.getFullYear(),
      month: date_obj.getMonth() + 1,
      date: date_obj.getDate(),
      day: getDayStr(date_obj),
      workername: worker_id,
    };
    return axios.post(`${SERVER_URL}selectWorkerAsDayAsWorker`, data);
};