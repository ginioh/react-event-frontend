import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";
import { UpdateCategoryForm } from "../../../form/UpdateCategoryForm"

const UpdateCategoryDialog = ({ title, dialog, onSubmit }) => {
    const { isTablet } = React.useContext(MediaQueriesContext);

    return <Dialog open={dialog.open} onClose={dialog.handleClose} fullScreen={!isTablet} aria-labelledby="createEvent">
        <DialogTitle>
            <div className="flex-row">
                <Typography variant="h6">{title}</Typography>
                <IconButton onClick={dialog.handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
        </DialogTitle>
        <DialogContent>
            <UpdateCategoryForm id={dialog.id} onSubmit={onSubmit} />
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={dialog.handleClose}>CANCEL</Button>
            <Button
                // disabled={submitting || pristine} 
                type="submit" autoFocus variant="contained">CREATE</Button>
        </DialogActions>
    </Dialog>
}

export default UpdateCategoryDialog;