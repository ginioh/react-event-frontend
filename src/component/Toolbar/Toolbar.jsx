import * as React from "react";
import Button from '@mui/material/Button';
import { toLower } from "lodash-es";
import styles from "./Toolbar.module.scss";

const Toolbar = ({ objects }) => {
    const pre = "toolbar-";

    return <div className={styles[`${pre}container`]}>
        <div className={styles[`${pre}wrapper`]}>
            {objects.map((o, i) => {
                return <Button
                    key={`${toLower(o.name)}-${i}`}
                    variant="contained"
                    onClick={o.onClick}
                >
                    {o.name}
                </Button>
            })}

        </div>
    </div>

}

export default Toolbar;