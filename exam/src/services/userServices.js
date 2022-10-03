import { url } from '../helpers/endpoints.js';
import {setUserData, deleteUserData, getUserData } from './auth.js';
import { get, post } from '../helpers/requester.js'

export async function login(email, password) {
    const result = await post(url.login, {email, password});

    const userData = {
        
        email: result.email,
        userId: result._id,
        accessToken: result.accessToken
    }

    setUserData(userData);
    return result;
}

export async function register(email, password) {
    const result = await post(url.register, {email, password});

    const userData = {
        
        email: result.email,
        userId: result._id,
        accessToken: result.accessToken
    }

    setUserData(userData);
    return result;
}

export async function logout() {
    const result =  get(url.logout);

    return result;
}