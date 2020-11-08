import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;

async function buscarNomes() {
  return await http.get(`${url}/nomes`);
}
export { buscarNomes };
