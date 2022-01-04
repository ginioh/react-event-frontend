import React from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { useQuery, useMutation } from "react-query";
import { useSnackbar } from "notistack";
import userInfoFn from "./userInfoFn";
import signupFn from "./signupFn";
import routesList from "../../util/routesList";
import useAuth from "../../hook/useAuth";
import { useKeycloak } from "@react-keycloak/web";
import { Backdrop, CircularProgress } from "@mui/material";

const AuthContext = React.createContext([{}, () => { }]);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const { enqueueSnackbar } = useSnackbar();
    const { keycloak, initialized } = useKeycloak()
    const [keycloakInitialized, setKeycloakInitialized] = React.useState(false);

    keycloak.onAuthLogout = () => {
        console.log('onAuthLogout');
        auth.clearAppStorage();
        auth.clearUserInfo();
    };
    keycloak.onReady = () => {
        // console.log('onReady');
        setKeycloakInitialized(true);
    };
    keycloak.onAuthSuccess = async () => {
        // console.log('onAuthSuccess');
        await auth.setToken(keycloak.token)
        enqueueSnackbar("Login successful.", { variant: "success" })
        // await auth.setRefreshToken(keycloak.refreshToken);
    };
    keycloak.onAuthError = () => {
        // console.log('onAuthError');
        // enqueueSnackbar("Login error.", { variant: "error" })
        auth.clearAppStorage();
        auth.clearUserInfo();
    };
    keycloak.onAuthRefreshSuccess = async () => {
        // console.log('onAuthRefreshSuccess');
        await auth.setToken(keycloak.token);
    };
    keycloak.onAuthRefreshError = () => {
        // console.log('onAuthRefreshError');
    };
    keycloak.onTokenExpired = () => {
        // console.log('onTokenExpired');
        keycloak.updateToken(300).then(
            (response) => {
                //I want to update my existing Token
                // console.log('refreshTokenResponse', response)
            })
            .catch(e => {
                console.log(e)
            })
    };

    const [loading, setLoading] = React.useState(true);

    const isAuthorized = (roles) => {
        if (keycloak && roles) {
            return roles.some(r => {
                const realm = keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);
                return realm || resource;
            });
        }
        return false;
    }

    // const { mutate: signup, status: signupInfo } = useMutation(async form => {
    //     return await signupFn(form)
    //         .then(async ({ message }) => {
    //             if (message) {
    //                 enqueueSnackbar(message, { variant: "success" })
    //                 navigate(routesList.HOME);
    //             }
    //         })
    //         .catch((err) => {
    //             enqueueSnackbar("Login error.", { variant: "error" })
    //             navigate(routesList.HOME)
    //             return err;
    //         });
    // });

    // const logout = async () => {
    //     !!keycloak.authenticated && keycloak.logout();
    //     auth.clearAppStorage();
    //     navigate(routesList.HOME);
    // }

    // keycloak.loadUserInfo().then(userInfo => {
    //     this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub})
    // });

    const userInfo = useQuery(
        "userInfo",
        async () => await userInfoFn()
            .then(async res => {
                const { data } = res;
                await auth.setUserInfo(data)
                // setLogged(true)
                // setLogged(true)
            })
            .catch(err => {
                // auth.clearAppStorage();
                // auth.clearUserInfo();
                // setLogged(false)
                // enqueueSnackbar("Session expired. Please login again.", { variant: "warning" })
                // navigate((routesList.HOME))
            }),
        {
            manual: true,
            enabled: false,
        }
    );

    const init = async () => {
        // await userInfo.refetch();
    }

    React.useEffect(() => {
        //TODO: verify jwt token for redirect
        init();
    }, [location.pathname]);

    // const onAuthChange = async () => {
    //     if (keycloak) {
    //         if (keycloak.authenticated) {
    //         } else {
    //             auth.clearAppStorage();
    //         }
    //     }
    // }

    React.useEffect(() => {
        const status = [userInfo.status];
        const isLoading = item => item === "loading";
        status.some(isLoading) ? setLoading(true) : setLoading(false);
    }, [userInfo.status]);

    if (!keycloakInitialized) {
        return <Backdrop
            open={true}
            sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="primary" />
        </Backdrop>;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthorized,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
