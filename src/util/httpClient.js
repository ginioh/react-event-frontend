import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  timeout: 10000, // 10 seconds
});

export default httpClient;