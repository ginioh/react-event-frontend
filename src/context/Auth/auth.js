import { isEmpty } from "lodash-es";

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_INFO = "userInfo";

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
    clear(key) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        }

        return null;
    },

    clearAppStorage() {
        if (localStorage) {
            localStorage.clear();
        }

        if (sessionStorage) {
            sessionStorage.clear();
        }
    },

    clearToken(tokenKey = TOKEN_KEY) {
        return auth.clear(tokenKey);
    },

    clearUserInfo(userInfo = USER_INFO) {
        return auth.clear(userInfo);
    },

    get(key) {
        if (localStorage && localStorage.getItem(key)) {
            return parse(localStorage.getItem(key)) || null;
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return parse(sessionStorage.getItem(key)) || null;
        }

        return null;
    },

    getToken(tokenKey = TOKEN_KEY) {
        return auth.get(tokenKey);
    },

    getRefreshToken(tokenKey = REFRESH_TOKEN_KEY) {
        return auth.get(tokenKey);
    },

    getUserInfo(userInfo = USER_INFO) {
        return auth.get(userInfo);
    },

    async set(value, key, isLocalStorage) {
        if (isEmpty(value)) {
            return null;
        }

        if (isLocalStorage && localStorage) {
            return localStorage.setItem(key, stringify(value));
        }

        if (sessionStorage) {
            return sessionStorage.setItem(key, stringify(value));
        }

        return null;
    },

    async setToken(value = "", isLocalStorage = false, tokenKey = TOKEN_KEY) {
        return await auth.set(value, tokenKey, isLocalStorage);
    },

    async setRefreshToken(value = "", isLocalStorage = false, tokenKey = REFRESH_TOKEN_KEY) {
        return await auth.set(value, tokenKey, isLocalStorage);
    },

    async setUserInfo(value = "", isLocalStorage = false, userInfo = USER_INFO) {
        return await auth.set(stringify(value), userInfo, isLocalStorage);
    },
};

export default auth;
