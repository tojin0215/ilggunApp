import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY_USER_DATA = "userData";

export const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(KEY_USER_DATA)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.error(`getUserData::${JSON.stringify(e, null, 2)}`)
        return null;
    }
}

export const putUserData = async (user_data) => {
    try {
        const jsonValue = JSON.stringify(user_data)
        await AsyncStorage.setItem(KEY_USER_DATA, jsonValue)
    } catch (e) {
        console.error(`putUserData::${JSON.stringify(e, null, 2)}`)
    }
}
