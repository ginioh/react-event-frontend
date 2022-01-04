import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { EventPage } from "../../page/Event";
import routes from "../../util/routesList"
import { HomePage } from "../../page/Home";
import { PromoterPage } from "../../page/Promoter";
import { CategoryPage } from "../../page/Category";
import { PrivateRoute } from "../PrivateRoute";
import { Layout } from "../Layout";

const Navigation = () => {
    return (
        <Routes>
            <Route exact path={routes.HOME} element={<HomePage />} />
            <Route path={routes.ADMIN_EVENTS} element={<Layout><EventPage /></Layout>} />
            <Route path={routes.ADMIN_PROMOTERS} element={<Layout><PromoterPage /></Layout>} />
            <Route path={routes.ADMIN_CATEGORIES} element={<PrivateRoute roles={['admin']}><Layout><CategoryPage /></Layout></PrivateRoute>} />
        </Routes>
    )
}

export default Navigation;