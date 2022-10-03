
export const baseUrl = 'http://localhost:3030';
export const login = `${baseUrl}/users/login`;
export const register = `${baseUrl}/users/register`;
export const logout = `${baseUrl}/users/logout`;
export const cars = `${baseUrl}/data/cars`;

export const myCars = `${baseUrl}/data/cars?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc`;
export const byYear = `${baseUrl}/data/cars?where=year%3D{query}`;