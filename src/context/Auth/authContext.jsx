import React from "react";
import { useNavigate } from "react-router-dom"
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import routes from "../../util/routesList";
import loginFn from "./loginFn";

const AuthContext = React.createContext([{}, () => { }]);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [user, setUser] = React.useState({});
    const [logged, setLogged] = React.useState(undefined);
    const [loading, setLoading] = React.useState(true);

    const { mutate: login } = useMutation(async form => {
        console.log(form)
        return await loginFn(form)
            .then(({data}) => {
                console.log('res',data)
                if (data.access_token && data.expires_in) {
                    setLogged(true);
                    enqueueSnackbar("Login successful.", { variant: "success" })
                    navigate(routes.DASHBOARD);
                    // createSuccessCb();
                }
                return data;
            })
            .catch((err) => {
                setLogged(false)
                // createErrorCb();
                return err;
            });
    });

    // const logout = async () => {
    //     setLoading(true);
    //     const queryName = "logout";
    //     const queryFn = async () => {
    //         return await graphqlClient(LOGOUT_USER);
    //     };
    //     const successCb = () => {
    //         setUser({});
    //     };
    // const query = new DefaultGraphqlResult(queryName, queryFn, show, successCb);
    // await query.getResult();
    // setLoading(false);
    // const { data, errors } = await graphqlClient(LOGOUT_USER);
    // auth.clearAppStorage();
    // if (get(data, "logoutUser")) {
    //     setUser({});
    //     // resetAbility();
    //     setLogged(false);
    //     setLoading(false);
    //     auth.clearUserInfo();
    //     show("success", "Operazione completata", get(data, "logoutUser.message", ""));
    //     history.push(routes.LOGIN);
    // }
    // };

    // const getUser = async () => {
    //     const { data, errors } = await graphqlClient(LOGGED_IN_USER);
    //     if (get(data, "loggedInUser") && !isEmpty(get(data, "loggedInUser"))) {
    //         setUser(get(data, "loggedInUser", {}));
    //         setLoading(false);
    //         history.location.pathname === routes.LOGIN && history.push(routes.DASHBOARD);
    //     } else {
    //         if (errors?.length > 0) {
    //             setUser({});
    //             setLoading(false);
    //             // errors.map(e => show("error", "Errore", e.message));
    //         }
    //     }
    // };

    // React.useEffect(() => {
    //     setLoading(true);
    //     const init = async () => {
    //         await getUser();
    //     };
    //     init();
    // }, [history.location.pathname]);

    // React.useEffect(() => {
    //     if (user && !isEmpty(user)) {
    //         setLogged(true);
    //     } else {
    //         setLogged(false);
    //         resetAbility();
    //         auth.clearAppStorage();
    //         auth.clearUserInfo();
    //         history.push(routes.LOGIN);
    //     }
    // }, [user]);

    // React.useEffect(() => {
    //     const status = [loginInfo.status, verifyAccountInfo.status];
    //     const isLoading = item => item === "loading";
    //     status.some(isLoading) ? setLoading(true) : setLoading(false);
    // }, [loginInfo.status, verifyAccountInfo.status]);

    return (
        <AuthContext.Provider
            value={{
                login,
                // logout,
                // verifyAccount,
                // resetPassword,
                user,
                // getUser,
                logged,
                loading,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
