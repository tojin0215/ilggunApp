
import axios from 'axios';

const SERVER_URL = "http://13.124.141.28:3000/";
const CONFIG_JSON = {
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const getSelectSign = (id, id2) => {
    return axios.post(`${SERVER_URL}/selectSign`, {id, id2}, CONFIG_JSON)
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
    axios.post(`${SERVER_URL}/addBusiness`, {
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
        `${SERVER_URL}/uploadStamp`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: file.base64,
                bname: workplace
            }),
        })
)