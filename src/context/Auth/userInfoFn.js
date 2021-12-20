import httpClient from "../../util/httpClient";
import auth from "./auth";

const userInfoFn = async () => {
    const token = await auth.getToken();

    return await httpClient.get(`/accounts/userInfo`);
}

export default userInfoFn;