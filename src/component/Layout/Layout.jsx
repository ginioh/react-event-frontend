import * as React from "react";
import { Footer } from "./Footer";
import { Main } from "./Main"
import { Header } from "./Header";

const Layout = ({ children }) => {

    return <>
        <Header />
        <Main>{children}</Main>
        <Footer />
    </>
}

export default Layout