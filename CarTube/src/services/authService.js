import * as api from './api.js';
import * as request from './requester.js';

const USER_KEY = 'user';
export const login = (username, password) => {
    return request.post(api.login, { username, password })
        .then(user => {
            saveUser(user);
            return user;
        })

};

export const register = (username, password) => {
    return request.post(api.register, { username, password })
        .then(user => {
            saveUser(user);
            return user;
        })

};

export const logout = (ctx) => {
    
    return request.get(api.logout)
            .finally(destroSession);

}


function saveUser(data) {
    if (data.accessToken == undefined) {
        return alert('Error')
    }
    localStorage.setItem(USER_KEY, JSON.stringify(data));
}

export function getUser() {
    let user = localStorage.getItem(USER_KEY);
    if (user) {
        return JSON.parse(user);
    }

}

function destroSession() {
    localStorage.removeItem(USER_KEY);
}