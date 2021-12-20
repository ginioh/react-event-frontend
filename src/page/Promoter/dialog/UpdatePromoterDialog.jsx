import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";

const UpdatePromoterDialog = ({ title, open, onClose }) => {
    const { isTablet } = React.useContext(MediaQueriesContext);

    return <Dialog open={open} onClose={onClose} fullScreen={!isTablet} aria-labelledby="createEvent">
        <DialogTitle>
            <div className="form-row">
                {title}
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
        </DialogTitle>
        <DialogContent>
            UPDATE PROMOTER FORM
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onClose}>CANCEL</Button>
            <Button 
            // disabled={submitting || pristine} 
            type="submit" autoFocus variant="contained">CREATE</Button>
        </DialogActions>
    </Dialog>
}

export default UpdatePromoterDialog;