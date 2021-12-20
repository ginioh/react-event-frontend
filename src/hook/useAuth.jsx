import * as React from "react";
import { isEmpty } from "lodash-es";

const TOKEN_KEY = "jwtToken";
const USER_INFO = "userInfo";

const parse = JSON.parse;
const stringify = JSON.stringify;

const useAuth = () => {

    const clear = (key) => {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        }

        return null;
    };

    const clearAppStorage = () => {
        if (localStorage) {
            localStorage.clear();
        }

        if (sessionStorage) {
            sessionStorage.clear();
        }
    };

    const clearToken = (tokenKey = TOKEN_KEY) => {
        return clear(tokenKey);
    };

    const clearUserInfo = (userInfo = USER_INFO) => {
        return clear(userInfo);
    };

    const get = (key) => {
        if (localStorage && localStorage.getItem(key)) {
            return parse(localStorage.getItem(key)) || null;
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return parse(sessionStorage.getItem(key)) || null;
        }

        return null;
    };

    const getToken = (tokenKey = TOKEN_KEY) => {
        return get(tokenKey);
    };

    const getUserInfo = (userInfo = USER_INFO) => {
        return parse(get(userInfo));
    };

    const set = async (value, key, isLocalStorage) => {
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
    };

    const setToken = async (value = "", isLocalStorage = false, tokenKey = TOKEN_KEY) => {
        return await set(value, tokenKey, isLocalStorage);
    };

    const setUserInfo = async (value = "", isLocalStorage = false, userInfo = USER_INFO) => {
        return await set(stringify(value), userInfo, isLocalStorage);
    };

    return {
        clear,
        clearAppStorage,
        clearToken,
        clearUserInfo,
        get,
        getToken,
        getUserInfo,
        set,
        setToken,
        setUserInfo
    };
};

export default useAuth;