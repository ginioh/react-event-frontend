import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import routesList from "../../util/routesList";
import { Layout } from "../Layout";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const auth = useAuth();

    const token = auth.getToken();

    if (!token) return <Navigate to={routesList.LOGIN} state={{ path: location.pathname }} />
    return <Layout>{children}</Layout>
};

export default PrivateRoute;