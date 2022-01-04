import * as React from "react";
import * as yup from "yup";
import { isEmpty } from "lodash-es";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Field } from 'react-final-form';
import { validateFormValues } from "../../../util/validation";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";
import createCategoryInitialValues from "../../../form/CreateCategoryForm/initialValues"
import useDisplayErrors from "../../../hook/useDisplayErrors";
import styles from "./CategoryDialog.module.scss";
import * as Muicon from "@mui/icons-material";

const Icon = ({ name, ...rest }) => {
    const IconComponent = Muicon[name];
    return IconComponent ? <IconComponent {...rest} /> : null;
};

const CreateCategoryDialog = ({ title, dialog, onSubmit }) => {
    const pre = "categoryDialog-";

    const { isTablet } = React.useContext(MediaQueriesContext);
    const { showErrors } = useDisplayErrors();

    const validationSchema = yup.object({
        name: yup.string().required(),
        description: yup.string(),
        icon: yup.string().required()
    });

    const validate = validateFormValues(validationSchema);

    let submit;

    return <Form
        onSubmit={onSubmit}
        initialValues={{ ...createCategoryInitialValues }}
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
                        <Field name="description">
                            {props => <TextField
                                sx={{ mt: "16px", mb: "8px" }}
                                {...props.input}
                                error={props.meta.error ? true : false}
                                fullWidth
                                id="description"
                                label="Description"
                                multiline
                                rows={4}
                                variant="outlined"
                            />}
                        </Field>
                        <div className="flex-row">
                            <Field name="icon">
                                {props => <><TextField
                                    {...props.input}
                                    error={props.meta.error ? true : false}
                                    margin="normal"
                                    fullWidth
                                    label="Icon"
                                    type="text"
                                    id="icon"
                                // autoComplete="current-password"
                                /><Icon className={styles[`${pre}selectedIcon`]} name={props.input.value} /></>}
                            </Field>

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dialog.handleClose}>CANCEL</Button>
                        <Button
                            disabled={submitting}
                            onClick={async e => {
                                const { errors } = form.getState();
                                if (errors && !isEmpty(errors)) {
                                    showErrors(errors);
                                } else {
                                    submit(e)
                                }
                            }}
                            type="submit" autoFocus variant="contained">CREATE</Button>
                    </DialogActions>
                </Dialog>
            </form>
        }}
    />
}

export default CreateCategoryDialog;