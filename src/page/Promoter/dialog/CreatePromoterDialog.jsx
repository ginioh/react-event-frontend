import * as React from "react";
import * as yup from "yup";
import { Form, Field } from 'react-final-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { validateFormValues } from "../../../util/validation";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";
import createPromoterInitialValues from "../../../form/CreatePromoterForm/initialValues";

const CreatePromoterDialog = ({ title, dialog, onSubmit }) => {
    const { isTablet } = React.useContext(MediaQueriesContext);

    const validationSchema = yup.object({
        name: yup.string().required(),
        website: yup.string().required(),
        email: yup.string().required(),
        logo: yup.string()
    });

    const validate = validateFormValues(validationSchema);

    let submit;

    return <Form
        onSubmit={onSubmit}
        initialValues={{ ...createPromoterInitialValues }}
        validate={validate}
        render={({ handleSubmit, form, submitting, values }) => {
            submit = handleSubmit;
            return <form onSubmit={e => handleSubmit(e)}>
                <Dialog open={dialog.open} onClose={dialog.handleClose} fullScreen={!isTablet} aria-labelledby="createEvent">
                    <DialogTitle>
                        <div className="form-row">
                            {title}
                            <IconButton onClick={dialog.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <Field name="name">
                            {props => <TextField
                                {...props.input}
                                error={props.meta.error ? true : false}
                                margin="normal"
                                fullWidth
                                label="Name"
                                type="text"
                                id="name"
                            // autoComplete="current-password"
                            />}
                        </Field>
                        <Field name="website">
                            {props => <TextField
                                sx={{ mt: "16px", mb: "8px" }}
                                {...props.input}
                                error={props.meta.error ? true : false}
                                fullWidth
                                id="website"
                                label="Website"
                                variant="outlined"
                            />}
                        </Field>
                        <Field name="email">
                            {props => <TextField
                                sx={{ mt: "16px", mb: "8px" }}
                                {...props.input}
                                error={props.meta.error ? true : false}
                                fullWidth
                                id="email"
                                label="Email"
                                variant="outlined"
                            />}
                        </Field>
                        LOGO
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={dialog.handleClose}>CANCEL</Button>
                        <Button
                            // disabled={submitting || pristine} 
                            type="submit" autoFocus variant="contained">CREATE</Button>
                    </DialogActions>
                </Dialog>
            </form>
        }}
    />
}

export default CreatePromoterDialog;