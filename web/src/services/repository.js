import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;

async function get(resource) {
    return await http.get(`${url}/${resource}`);
}


async function post(resource, payload) {
    return http.post(`${url}/${resource}`, payload);
} 

async function remove(resource, params) {
    return http.delete(`${url}/${resource}/${params}`);
}

export { get, post, remove };



