import axios from "axios";
import isDocker from "../../util/isDocker";

export default async ({ refresh_token }) => await axios.post(`${isDocker() ? process.env.REACT_APP_KEYCLOAK_DOCKER_URL : process.env.REACT_APP_KEYCLOAK_URL}/auth/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/token`, {
    refresh_token,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENTID,
    grant_type: "refresh_token"
}, {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});
