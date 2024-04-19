import Axios from "axios";
export default function useAxios() {
  const axios = Axios.create({
    //baseURL: "https://anoopsai-api.onrender.com",
    baseURL: "http://localhost:3000",
  });

  return axios;
}
