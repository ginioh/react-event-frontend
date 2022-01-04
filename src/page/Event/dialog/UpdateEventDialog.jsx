import * as React from "react";
import { Form, Field } from 'react-final-form';
import { Autocomplete, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Input, InputLabel, Select, Switch, MenuItem, TextField, IconButton, Chip } from "@mui/material";
import DateTimePicker from '@mui/lab/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import createEventInitialValues from "../../../form/CreateEventForm/initialValues"
import withCategoryService from "../../../service/Category";
import withEventService from "../../../service/Event";
import withPromoterService from "../../../service/Promoter";
import { MediaQueriesContext } from "../../../context/mediaQueriesContext";
import { get, isEmpty } from "lodash-es";
import styles from "./CreateEventDialog.module.scss";
import withFileService from "../../../service/File";
import moment from "moment";
import * as yup from "yup";
import useDisplayErrors from "../../../hook/useDisplayErrors";
import { validateFormValues } from "../../../util/validation";

const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string(),
    featuredImage: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    category: yup.string().required(),
    promoter: yup.string().required(),
    tags: yup.array().of(yup.string()),
    url: yup.string(),
    location: yup.string(),
    isOffline: yup.boolean().required(),
    isPublic: yup.boolean().required(),
});

const validate = validateFormValues(validationSchema);

const UpdateEventDialog = ({ readEventById, readCategories, readPromoters, uploadFile, title, dialog, onSubmit, setEventId }) => {
    const pre = "create-event-dialog-"

    const [item, setItem] = React.useState(createEventInitialValues)
    const [featuredImage, setFeaturedImage] = React.useState(undefined);
    const [tags, setTags] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const { isTablet } = React.useContext(MediaQueriesContext)
    const { showErrors } = useDisplayErrors();

    const initFns = async () => {
        readCategories.refetch();
        readPromoters.refetch();
    }

    const init = async () => {
        await initFns();
    }

    const handleId = async () => {
        if (dialog.id) {
            setEventId(dialog.id)
            // await readEventById.refetch({ id: dialog.id });
        }
    }

    React.useEffect(() => {
        if (readEventById.data) {
            const item = Object.assign({}, readEventById.data, {
                category: readEventById.data.category._id,
                promoter: readEventById.data.promoter._id
            })
            setItem(item)
            setLoading(false)
        }
    }, [readEventById.data])

    React.useEffect(() => {
        handleId()
    }, [dialog.id])

    React.useEffect(() => {
        init();
        return () => setEventId(undefined)
    }, [])

    let submit;
    return (<Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={item}
        render={({ handleSubmit, reset, form, submitting, pristine, values }) => {
            submit = handleSubmit;

            return (<form onSubmit={handleSubmit}>
                <Dialog className={styles[`${pre}container`]} open={dialog.open} onClose={dialog.handleClose} fullScreen={!isTablet} aria-labelledby="createEvent">
                    <DialogTitle>
                        <div className="flex-row">
                            {title}
                            <IconButton onClick={dialog.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        {loading ? <CircularProgress /> : <>
                            <Field name="title">
                                {props => <div>
                                    <TextField
                                        {...props.input}
                                        error={props.meta.error ? true : false}
                                        margin="normal"
                                        fullWidth
                                        label="Title"
                                        type="text"
                                        id="title"
                                    /></div>}
                            </Field>
                            <Field name="description">
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
                            <div className="form-row">
                                <Field name="startDate">
                                    {props =>
                                        <DateTimePicker
                                            {...props.input}
                                            value={moment(props.input.value).toISOString()}
                                            onChange={(e, value) => props.input.onChange(moment(value).toISOString())}
                                            renderInput={(props) => <TextField fullWidth sx={{ mt: "16px", mb: "8px" }} fullWidth variant="outlined" {...props} />}
                                            margin="normal"
                                            label="Start date"
                                            type="text"
                                            id="startDate"
                                        />}
                                </Field>
                                <Field name="endDate">
                                    {props =>
                                        <DateTimePicker
                                            {...props.input}
                                            value={moment(props.input.value).toISOString()}
                                            onChange={(e, value) => props.input.onChange(moment(value).toISOString())}
                                            renderInput={(props) => <TextField fullWidth sx={{ mt: "16px", mb: "8px" }} fullWidth variant="outlined" {...props} />}
                                            margin="normal"
                                            label="End date"
                                            type="text"
                                            id="endDate"
                                        />}
                                </Field>
                            </div>
                            <Field name="tags">
                                {props => <Autocomplete
                                    fullWidth
                                    name={props.input.name}
                                    value={tags}
                                    multiple
                                    onChange={(e, value) => {
                                        setTags((state) => value)
                                    }}
                                    id="tags"
                                    options={[]}
                                    // defaultValue={[]}
                                    freeSolo
                                    renderTags={(value, getTagProps) => {
                                        if (value && value.length) {
                                            return value.map((option, index) => (
                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                            ))
                                        }
                                    }
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            sx={{ mt: "16px", mb: "8px" }}
                                            {...params}
                                            label="Tags"
                                        />
                                    )}
                                />
                                }
                            </Field>
                            <div className="form-row">
                                <div className="form-column" style={{ flexBasis: "50%" }}>
                                    <Field name="category">
                                        {props =>
                                            <FormControl sx={{ mt: "16px", mb: "8px" }} fullWidth>
                                                <InputLabel id="categoryLabel">Category</InputLabel>
                                                <Select
                                                    {...props.input}
                                                    error={props.meta.error ? true : false}
                                                    labelId="categoryLabel"
                                                    id="category"
                                                    label="Category"
                                                >
                                                    {get(readCategories, "data.data", []).map((c, i) => <MenuItem key={`${c.name}-${i}`} value={c._id}>{c.name}</MenuItem>)}
                                                </Select>
                                            </FormControl>}
                                    </Field>
                                    <Field name="promoter">
                                        {props =>
                                            <FormControl sx={{ mt: "16px", mb: "8px" }} fullWidth>
                                                <InputLabel id="promoterLabel">Promoter</InputLabel>
                                                <Select
                                                    {...props.input}
                                                    error={props.meta.error ? true : false}
                                                    labelId="promoterLabel"
                                                    id="promoter"
                                                    label="Promoter"
                                                >
                                                    {get(readPromoters, "data.data", []).map((p, i) => <MenuItem key={`${p.name}-${i}`} value={p._id}>{p.name}</MenuItem>)}
                                                </Select>
                                            </FormControl>}
                                    </Field>
                                    <Field name="url">
                                        {props => <TextField
                                            {...props.input}
                                            error={props.meta.error ? true : false}
                                            margin="normal"
                                            fullWidth
                                            label="Url"
                                            type="text"
                                            id="url"
                                        />}
                                    </Field>
                                    <Field name="location">
                                        {props => <TextField
                                            {...props.input}
                                            margin="normal"
                                            fullWidth
                                            label="Location"
                                            type="text"
                                            id="location"
                                        />}
                                    </Field>
                                    <div className="form-row">
                                        <Field name="isOffline" type="checkbox">
                                            {props => <FormControlLabel {...props.input} control={<Switch checked={props.input.value} onChange={props.input.onChange} />} label="Offline" />}
                                        </Field>
                                        <Field name="isPublic" type="checkbox">
                                            {props => <FormControlLabel {...props.input} control={<Switch checked={props.input.value} onChange={props.input.onChange} />} label="Public" />}
                                        </Field>
                                    </div>
                                </div>
                                <div style={{ flexBasis: "50%" }}>
                                    <div className="form-column">
                                        <img src={item.featuredImage || "/placeholder.svg"} width={200} alt="placeholder" />
                                        <Field name="featuredImage">
                                            {props => <label {...props.input} onChange={e => {
                                                e.preventDefault();
                                                const file = e.target.files[0];
                                                props.input.onChange(process.env.REACT_APP_BACKEND_BASE_URL + "/uploads/" + file.name)
                                                setFeaturedImage(file)
                                            }} htmlFor="contained-button-file">
                                                <Input accept="image/*" id="contained-button-file" type="file" />
                                            </label>}
                                        </Field>
                                    </div>
                                </div>
                            </div></>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => dialog.handleClose()}>CANCEL</Button>
                        <Button disabled={submitting}
                            onClick={async e => {
                                const { errors, values } = form.getState();
                                if (errors && !isEmpty(errors)) {
                                    showErrors(errors);
                                } else {
                                    if (values.featuredImage && values.featuredImage !== get(readEventById, "data.data.featuredImage", "")) {
                                        await uploadFile({ file: featuredImage })
                                    }
                                    await submit(e)
                                }
                            }}
                            type="submit" variant="contained">CREATE</Button>
                    </DialogActions>
                </Dialog>
            </form>)
        }}
    />
    )
}

export default withPromoterService(withCategoryService(withEventService(withFileService(UpdateEventDialog))));