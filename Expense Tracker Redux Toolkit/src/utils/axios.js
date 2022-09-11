import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lws-server-data.herokuapp.com/",
});

export default axiosInstance;
