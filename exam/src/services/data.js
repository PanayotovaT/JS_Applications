import { get, post, put, del } from '../helpers/requester.js';
import { url } from '../helpers/endpoints.js';



export async function getAll() {

    return await get(url.getAll);
}


export async function getOne(id) {
    return await get(url.getOne(id))
}

export async function getMyItems(userId) {
    return await get(url.myItems(userId));
}

export async function create(item) {
    return await post(url.create, item);
}

export async function update(id, item) {
    return await put(url.update(id), item);
}

export async function deleteItem(id) {
    return await del(url.delete(id));
}


