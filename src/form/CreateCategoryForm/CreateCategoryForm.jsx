import * as React from "react";
import { Button, Input, TextField } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { required } from "../../util/validation";
import styles from "./CreateCategoryForm.module.scss";
import createCategoryInitialValues from "../../form/CreateCategoryForm/initialValues"
import MaterialUiIconPicker from 'react-material-ui-icon-picker';

const CreateCategoryForm = ({ onSubmit }) => {
    const pre = "categoryForm-";

    return <Form
        onSubmit={onSubmit}
        initialValues={{ ...createCategoryInitialValues }}
        render={({ handleSubmit, submitting, pristine, values }) => {
            return (<form id="createCategoryForm" className={styles[`${pre}container`]} onSubmit={handleSubmit}>
                <Field name="name" validate={required}>
                    {props => <div>
                        <TextField
                            {...props.input}
                            error={props.meta.error ? true : false}
                            margin="normal"
                            fullWidth
                            label="Name"
                            type="text"
                            id="name"
                        // autoComplete="current-password"
                        /></div>}
                </Field>
                <Field name="description" validate={required}>
                    {props => <div>
                        <TextField
                            sx={{ mt: "16px", mb: "8px" }}
                            {...props.input}
                            fullWidth
                            id="description"
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </div>}
                </Field>
                <Field name="icon" validate={required}>
                    {props => <label htmlFor="contained-button-file">
                        <MaterialUiIconPicker onPick={this.showPickedIcon} />
                    </label>}
                </Field>
            </form>
            )
        }}
    />
}

export default CreateCategoryForm;