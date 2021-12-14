import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../../page/Auth";
import { DashboardPage } from "../../page/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import routes from "../../util/routesList"

const Navigation = () => {
    return (
        <Routes>
            <Route exact path={routes.LOGIN} element={<AuthPage />} />
            <PrivateRoute path={routes.DASHBOARD} element={<DashboardPage />} />
        </Routes>
    )
}

export default Navigation;