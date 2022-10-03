const host = 'http://localhost:3030';

export const url = {
    register: `${host}/users/register`,
    login: `${host}/users/login`,
    logout: host + '/users/logout',
    getAll: `${host}/data/theaters?sortBy=_createdOn%20desc&distinct=title`,
    getOne: (id) => `${host}/data/theaters/${id}`,
    create: `${host}/data/theaters`,
    update: (id) => `${host}/data/theaters/${id}`,
    delete: (id) => `${host}/data/theaters/${id}`,
    myItems: (userId)=> `${host}/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

