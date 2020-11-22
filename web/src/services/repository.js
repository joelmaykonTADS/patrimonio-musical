import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;

async function get(resource) {
    console.log(url)
    return await http.get(`${url}/${resource}`);
}

async function post(resource, payload) {
    return http.post(`${url}/${resource}`, payload);
}

export { get, post };



