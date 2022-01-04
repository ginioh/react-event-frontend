import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";

const DeleteEventDialog = ({ title, dialog, onSubmit }) => {
    const { isTablet } = React.useContext(MediaQueriesContext);

    return <Dialog open={dialog.open} onClose={dialog.handleClose} fullScreen={!isTablet} aria-labelledby="createEvent">
        <DialogTitle>
            <div className="form-row">
                {title}
                <IconButton onClick={dialog.handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
        </DialogTitle>
        <DialogContent>
            Do you want to delete this event?
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={dialog.handleClose}>CANCEL</Button>
            <Button onClick={() => onSubmit(dialog.id)} autoFocus variant="contained">CONFIRM</Button>
        </DialogActions>
    </Dialog>
}

export default DeleteEventDialog;