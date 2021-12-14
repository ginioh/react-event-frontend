import axios from "axios";
import isDocker from "../../util/isDocker";

const loginFn = async ({ username, password }) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', process.env.REACT_APP_KEYCLOAK_CLIENTID);
    params.append('grant_type', "password");

    return await axios.post(`${isDocker() ? process.env.REACT_APP_KEYCLOAK_DOCKER_URL : process.env.REACT_APP_KEYCLOAK_URL}/auth/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/token`, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

export default loginFn;