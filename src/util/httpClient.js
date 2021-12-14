import axios from "axios";
import isDocker from "./isDocker";

//TODO: Set only one instance
const httpClient = axios.create({
    baseURL: isDocker ? process.env.REACT_APP_BACKEND_DOCKER_BASE_URL : process.env.REACT_APP_BACKEND_BASE_URL,
    timeout: 10000, // 10 seconds
});

httpClient.request.use((config) => {
    return config;
}, (error) => Promise.reject(error))

export default httpClient;