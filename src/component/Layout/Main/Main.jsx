import * as React from "react";
import styles from "./Main.module.scss";

const Main = ({children}) => {
    const pre = "main-";

    return <main className={styles[`${pre}container`]}>{children}</main>
}

export default Main