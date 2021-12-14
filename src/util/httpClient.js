import axios from "axios";
import isDocker from "./isDocker";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: `${isDocker() ? process.env.REACT_APP_KEYCLOAK_DOCKER_URL : process.env.REACT_APP_KEYCLOAK_URL}/auth`,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID
});

//TODO: Set only one instance
const httpClient = axios.create({
  baseURL: isDocker() ? process.env.REACT_APP_BACKEND_DOCKER_BASE_URL : process.env.REACT_APP_BACKEND_BASE_URL,
  timeout: 10000, // 10 seconds
});

httpClient.interceptors.request.use((config) => {
  //document.getElementById('username').innerText = keycloak.subject;
  return config;
}, (error) => Promise.reject(error))

export default httpClient;