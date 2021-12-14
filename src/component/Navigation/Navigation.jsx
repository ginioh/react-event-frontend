import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../../page/Auth";
import { DashboardPage } from "../../page/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import routes from "../../util/routesList"
import { PromoterPage } from "../../page/Promoter";
import { CategoryPage } from "../../page/Category";

const Navigation = () => {
    return (
        <Routes>
            <Route exact path={routes.LOGIN} element={<AuthPage />} />
            <Route path={routes.DASHBOARD} element={<DashboardPage />} />
            <Route path={routes.PROMOTERS} element={<PromoterPage />} />
            <Route path={routes.CATEGORIES} element={<CategoryPage />} />
        </Routes>
    )
}

export default Navigation;