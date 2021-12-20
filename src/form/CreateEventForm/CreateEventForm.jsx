import * as React from "react";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Form, Field } from 'react-final-form';
import { required } from "../../util/validation";
import styles from "./EventForm.module.scss";
import withCategoryService from "../../service/Category";
import createEventInitialValues from "./initialValues";

const CreateEventForm = ({ readCategories, onSubmit }) => {
    const pre = "eventForm-";

    const init = async () => {
        await readCategories.refetch();
    }

    React.useEffect(() => {
        init();
    }, [])

    return <Form
        onSubmit={onSubmit}
        initialValues={{ ...createEventInitialValues }}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
            return (<form id="createEventForm" className={styles[`${pre}container`]} onSubmit={handleSubmit}>
                <Field name="title" validate={required}>
                    {props => <div>
                        <TextField
                            {...props.input}
                            error={props.meta.error ? true : false}
                            margin="normal"
                            fullWidth
                            label="Title"
                            type="text"
                            id="title"
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
                <Field name="startDate" validate={required}>
                    {props => <div>
                        <DateTimePicker
                            {...props.input}
                            renderInput={(props) => <TextField sx={{ mt: "16px", mb: "8px" }} fullWidth variant="outlined" {...props} />}
                            margin="normal"
                            label="Start date"
                            type="text"
                            id="startDate"
                        // autoComplete="current-password"
                        /></div>}
                </Field>
                <Field name="endDate" validate={required}>
                    {props => <div>
                        <DateTimePicker
                            {...props.input}
                            renderInput={(props) => <TextField sx={{ mt: "16px", mb: "8px" }} fullWidth variant="outlined" {...props} />}
                            margin="normal"
                            label="End date"
                            type="text"
                            id="endDate"
                        // autoComplete="current-password"
                        /></div>}
                </Field>
                <Field name="category" validate={required}>
                    {props => <div>
                        <FormControl sx={{ mt: "16px", mb: "8px" }} fullWidth>
                            <InputLabel id="categoryLabel">Category</InputLabel>
                            <Select
                                {...props.input}
                                error={props.meta.error ? true : false}
                                labelId="categoryLabel"
                                id="category"
                                label="Category"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl></div>}
                </Field>
                <Field name="url" validate={required}>
                    {props => <div>
                        <TextField
                            {...props.input}
                            error={props.meta.error ? true : false}
                            margin="normal"
                            fullWidth
                            label="Url"
                            type="text"
                            id="url"
                        // autoComplete="current-password"
                        /></div>}
                </Field>
                <Field name="location" validate={required}>
                    {props => <div>
                        <TextField
                            {...props.input}
                            margin="normal"
                            fullWidth
                            label="Location"
                            type="text"
                            id="location"
                        // autoComplete="current-password"
                        /></div>}
                </Field>
                <div className="form-row">
                    <Field name="isOffline" validate={required}>
                        {props => <FormControlLabel {...props.input} control={<Switch checked={props.input.value} onChange={props.input.onChange} />} label="Offline" />}
                    </Field>
                    <Field name="isPublic" validate={required}>
                        {props => <FormControlLabel {...props.input} control={<Switch checked={props.input.value} onChange={props.input.onChange} />} label="Public" />}
                    </Field>
                </div>
            </form>
            )
        }}
    />
}

export default withCategoryService(CreateEventForm);