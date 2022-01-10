import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY_USER_DATA = "userData";


interface UserData {
    id: number | null;
    name: string | null;
}
interface GetUserData {
    (): Promise<UserData | null>;
}
interface PutUserData {
    (user_data: UserData): Promise<void>;
}

export const getUserData: GetUserData = async () => {
    return new Promise(function(resolve, reject) {
        AsyncStorage.getItem(KEY_USER_DATA)
        .then(jsonValue => {
            (jsonValue !== null && jsonValue !== "" && JSON.parse(jsonValue) !== "") ? resolve(JSON.parse(jsonValue)) : reject(null)
        })
    })
    // try {
    //     const jsonValue = await AsyncStorage.getItem(KEY_USER_DATA)
    //     return (jsonValue !== null && jsonValue !== "" && JSON.parse(jsonValue) !== "") ? JSON.parse(jsonValue) : null;
    // } catch(e) {
    //     console.error(`getUserData::${JSON.stringify(e, null, 2)}`)
    //     return null;
    // }
}

export const putUserData: PutUserData = async (user_data: UserData) => {
    try {
        const jsonValue = JSON.stringify(user_data)
        await AsyncStorage.setItem(KEY_USER_DATA, jsonValue)
    } catch (e) {
        console.error(`putUserData::${JSON.stringify(e, null, 2)}`)
    }
}
