import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../../page/Auth";
import { DashboardPage } from "../../page/Dashboard";
import routes from "../../util/routesList"
import { PromoterPage } from "../../page/Promoter";
import { CategoryPage } from "../../page/Category";

const Navigation = () => {
    return (
        <Routes>
            <Route exact path={routes.ADMIN_EVENTS} element={<DashboardPage />} />
            <Route path={routes.LOGIN} element={<AuthPage />} />
            <Route path={routes.ADMIN_PROMOTERS} element={<PromoterPage />} />
            <Route path={routes.ADMIN_CATEGORIES} element={<CategoryPage />} />
        </Routes>
    )
}

export default Navigation;