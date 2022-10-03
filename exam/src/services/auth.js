export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
};

export function getUserData() {
   const userData = JSON.parse(sessionStorage.getItem('userData'));
   if(userData) {
        return userData;
    }
}   

export function deleteUserData() {
    sessionStorage.removeItem('userData');
}

export function getUserId() {
   let userData = sessionStorage.getItem('userData');
   if(userData) {
   const userId = JSON.parse(userData).getItem('userId');
   return userId;
}
}

export function isLoggedIn() {
    return Boolean(JSON.parse(sessionStorage.getItem('userData')));
}