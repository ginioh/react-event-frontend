import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import routesList from "../../util/routesList";
import { AuthContext } from "../../context/Auth/authContext";

const PrivateRoute = ({ children, roles, ...rest }) => {
    const location = useLocation();
    const { isAuthorized } = React.useContext(AuthContext);

    return isAuthorized(roles) ? children : <Navigate to={routesList.HOME} replace={true} state={{ path: location.pathname }} />
};

export default PrivateRoute;