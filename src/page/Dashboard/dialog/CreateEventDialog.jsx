import * as React from "react";
import { Form, Field } from 'react-final-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, Select, Switch, MenuItem, TextField, IconButton } from "@mui/material";
import DateTimePicker from '@mui/lab/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import createEventInitialValues from "../../../form/CreateEventForm/initialValues"
import withCategoryService from "../../../service/Category";
import withEventService from "../../../service/Event";
import { required } from "../../../util/validation";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";
import { get, isEmpty } from "lodash-es";

const CreateEventDialog = ({ readCategories, title, open, onClose, onSubmit }) => {

    const { isTablet } = React.useContext(MediaQueriesContext)
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        if (readCategories.data && !isEmpty(readCategories.data)) {
            const categories = get(readCategories, "data.data", []);
            setCategories(categories)
        }
    }, [readCategories.data])

    const init = async () => {
        await readCategories.refetch();
    }

    React.useEffect(() => {
        init();
    }, [])

    return (<Form
        onSubmit={onSubmit}
        initialValues={{ ...createEventInitialValues }}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
            return (<form onSubmit={handleSubmit}>
                <Dialog open={open} onClose={onClose} fullScreen={!isTablet} aria-labelledby="createEvent">
                    <DialogTitle>
                        <div className="form-row">
                            {title}
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
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
                                        {categories.length && categories.map(c => {
                                            return <MenuItem value={c._id}>{c.name}</MenuItem>
                                        })}
                                        {/* <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem> */}
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
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={onClose}>CANCEL</Button>
                        <Button disabled={submitting || pristine} type="submit" autoFocus variant="contained">CREATE</Button>
                    </DialogActions>
                </Dialog>
            </form>)
        }}
    />
    )
}

export default withCategoryService(withEventService(CreateEventDialog));