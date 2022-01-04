import * as React from "react";
import { IconButton, Link, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import styles from "./TableActions.module.scss";

const TableActions = ({ id, updateDialog, deleteDialog, url }) => {
    const pre = "table-actions-"

    return <div className={styles[`${pre}container`]}>
        <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => updateDialog.handleOpen(id)}>
                <EditIcon color="primary" />
            </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => deleteDialog.handleOpen(id)}>
                <DeleteIcon className={styles[`${pre}delete-icon`]} />
            </IconButton>
        </Tooltip>
        {url && <Tooltip title="Link" placement="top">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <IconButton>
                    <LinkIcon className={styles[`${pre}link-icon`]} />
                </IconButton>
            </a>
        </Tooltip>}
    </div>
}

export default React.memo(TableActions);