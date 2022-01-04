import * as React from "react";
import { Copyright } from "../../Copyright";
import styles from "./Footer.module.scss";

const Footer = () => {
    const pre = "footer-";

    return <footer className={styles[`${pre}container`]}><Copyright /></footer>
}

export default Footer