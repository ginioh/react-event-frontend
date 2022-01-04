import httpClient from "../../util/httpClient";

const signupFn = async ({ username, password }) => {
    const data = {
        username,
        credentials: [{
            type: "password",
            value: password,
            temporary: false,
        }]
    }

    return await httpClient.post(`/accounts/signup`, data);
}

export default signupFn;