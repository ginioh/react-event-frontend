import axios from "axios";
import isDocker from "./isDocker";
import auth from "../context/Auth/auth";

//TODO: Set only one instance
const httpClient = axios.create({
  baseURL: isDocker() ? process.env.REACT_APP_BACKEND_DOCKER_BASE_URL : process.env.REACT_APP_BACKEND_BASE_URL,
  timeout: 10000, // 10 seconds
});

httpClient.defaults.headers.common['access-control-allow-origin'] = '*';

httpClient.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error)
})


httpClient.interceptors.response.use((config) => {
  return config;
}, (error) => {
  if (401 === error.response.status) {
    // window.location = "/";
    return "UNAUTHORIZED";
  } else {
    return Promise.reject(error);
  }
})

export default httpClient;