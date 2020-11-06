import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;

async function salvar(instrumento) {
  await http.post(`${url}/instrumentos`, instrumento).then((response) => {
    return response.status == 200 ? true : false;
  });
}
export {
  salvar
};
