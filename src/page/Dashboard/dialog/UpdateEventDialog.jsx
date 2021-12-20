import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";

const UpdateEventDialog = ({ title, open, onClose, onSubmit }) => {
    const { isTablet } = React.useContext(MediaQueriesContext);

    return <Dialog open={open} onClose={onClose} fullScreen={!isTablet} aria-labelledby="updateEvent">
        <DialogTitle>
            <div className="flex-row">
                <Typography variant="h6">{title}</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
        </DialogTitle>
        <DialogContent>
            UPDATE EVENT FORM
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onClose}>CANCEL</Button>
            <Button
                // disabled={submitting || pristine} 
                type="submit" autoFocus variant="contained">SAVE</Button>
        </DialogActions>
    </Dialog>
}

export default UpdateEventDialog;