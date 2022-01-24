import firebase from './firebaseHelper';
import Toast from 'react-native-toast-message';
export const API_URL = "https://courseapi.mashadev.in/v1";
export const LOGO_URL = "https://cdn3.iconfinder.com/data/icons/ramadan-30/129/3-512.png";

export function showMessage(message, isError = false) {
    Toast.show({
        type: isError ? 'error' : 'success',
        position: 'top',
        text1: 'Iqra Quran Tamil',
        text2: message,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
    });
}

export async function getHeaderDetail(headerInfo = {}) {
    try {
        return await firebase.auth().currentUser.getIdToken(true).then((token) => {
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                'Authorization': 'Bearer ' + token
            };
            headers = { ...headers, ...headerInfo };
            return headers;
        }).catch(() => {
            return "New";
        })
    }
    catch {
        return ""
    }
}

export async function getUpdatedToken(token) {
    return await firebase.auth().signInWithCustomToken(token);
}

export function IsNullOrEmpty(name) {
    return name === "" ||
        name === undefined ||
        name === null;
};

export const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item.name] = item.type === "FileDrop" || item.type === "Chip" ? [] : item.defaultValue;
        return obj;
    }, {});

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8));
        return v.toString(16);
    });
}

export function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
