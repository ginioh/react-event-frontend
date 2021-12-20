import React from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { useQuery, useMutation } from "react-query";
import { useSnackbar } from "notistack";
import loginFn from "./loginFn";
import userInfoFn from "./userInfoFn"
import { CircularProgress } from "@mui/material";
import routesList from "../../util/routesList";
import useAuth from "../../hook/useAuth";

const AuthContext = React.createContext([{}, () => { }]);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const { enqueueSnackbar } = useSnackbar();

    const [logged, setLogged] = React.useState(undefined);
    const [loading, setLoading] = React.useState(true);

    const { mutate: login } = useMutation(async form => {
        return await loginFn(form)
            .then(async ({ data }) => {
                if (data.access_token && data.expires_in) {
                    setLogged(true);
                    await auth.setToken(data.access_token, true)
                    enqueueSnackbar("Login successful.", { variant: "success" })
                    navigate(routesList.HOME);
                }
            })
            .catch((err) => {
                setLogged(false)
                enqueueSnackbar("Login error.", { variant: "error" })
                navigate(routesList.HOME)
                return err;
            });
    });

    const logout = async () => {
        auth.clearAppStorage();
        navigate(routesList.HOME);
    }

    const userInfo = useQuery(
        "userInfo",
        async () => await userInfoFn()
            .then(async res => {
                setLogged(true)
                const { data } = res;
                await auth.setUserInfo(data)
                // setLogged(true)
            })
            .catch(err => {
                // auth.clearAppStorage();
                // auth.clearUserInfo();
                setLogged(false)
                // enqueueSnackbar("Session expired. Please login again.", { variant: "warning" })
                // navigate((routesList.HOME))
            }),
        {
            manual: true,
            enabled: false,
        }
    );

    const init = async () => {
        await userInfo.refetch();
    }

    const onLoggedChange = async () => {
        if (logged !== undefined) {
            // if (logged && userInfo.data) {
            //     console.log(userInfo)
            //     const { data } = userInfo.data;
            //     // await auth.setUserInfo(data)
            //     setLogged(true)
            // }
        } else {
            auth.clearAppStorage();
            auth.clearUserInfo();
            setLogged(false)
            enqueueSnackbar("Session expired. Please login again.", { variant: "warning" })
        }
    }

    React.useEffect(() => {
        onLoggedChange();
    }, [logged])

    React.useEffect(() => {
        //TODO: verify jwt token for redirect
        init();
    }, [location.pathname]);

    React.useEffect(() => {
        const status = [userInfo.status];
        const isLoading = item => item === "loading";
        status.some(isLoading) ? setLoading(true) : setLoading(false);
    }, [userInfo.status]);

    return (
        <AuthContext.Provider
            value={{
                login,
                logged,
            }}
        >
            {loading === undefined || loading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
