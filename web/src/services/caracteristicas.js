import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;

async function buscarCaracteristicas() {
  return await http.get(`${url}/caracteristicas`);
}
export { buscarCaracteristicas };
