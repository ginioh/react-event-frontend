import * as React from "react";
import { Button, Input, TextField } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { required } from "../../util/validation";
import updateCategoryInitialValues from "../../form/UpdateCategoryForm/initialValues"
import styles from "./UpdateCategoryForm.module.scss";
import withCategoryService from "../../service/Category";
import { get, isEmpty } from "lodash-es";


const UpdateCategoryForm = ({ id, onSubmit, readCategoryById, setId }) => {
    const pre = "categoryForm-";

    const [item, setItem] = React.useState(updateCategoryInitialValues);

    React.useEffect(() => {
        if (readCategoryById.data) {
            const { data } = readCategoryById;
            setItem(data);
        }
    }, [readCategoryById])

    React.useEffect(() => {
        id && setId(id);
        return () => setId(undefined);
    }, [])

    return <Form
        onSubmit={onSubmit}
        initialValues={item}
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
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
            </form>
            )
        }}
    />
}

export default withCategoryService(UpdateCategoryForm);