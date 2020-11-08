import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;

async function salvar(instrumento) {
  return http.post(`${url}/instrumentos`, instrumento);
}
export { salvar };
