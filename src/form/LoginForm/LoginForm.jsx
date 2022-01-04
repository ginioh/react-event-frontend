import * as React from "react";
import { Form, Field } from 'react-final-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { required } from "../../util/validation";
import styles from "./LoginForm.module.scss";
import initialValues from "./initialValues";
import { AuthContext } from "../../context/Auth/authContext";

const LoginForm = () => {
    const pre = "loginForm-";
    const onSubmit = async (values) => await login(values);
    const { login } = React.useContext(AuthContext);

    return <Form
        onSubmit={onSubmit}
        initialValues={{ ...initialValues }}
        render={({ handleSubmit }) => (
            <form className={styles[`${pre}container`]} onSubmit={handleSubmit}>
                <div>
                    <Field name="username">
                        {props => <div>
                            <TextField
                                margin="normal"
                                fullWidth
                                name={props.input.name}
                                value={props.input.value}
                                onChange={props.input.onChange}
                                label="Username"
                                type="text"
                                id="username"
                            // autoComplete="current-password"
                            /></div>}
                    </Field>
                </div>
                <div>
                    <Field name="password">
                        {props => <div>
                            <TextField
                                margin="normal"
                                fullWidth
                                name={props.input.name}
                                value={props.input.value}
                                onChange={props.input.onChange}
                                label="Password"
                                type="password"
                                id="password"
                            // autoComplete="current-password"
                            /></div>}
                    </Field>
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Sign In
                </Button>
            </form>
        )}
    />
}

export default LoginForm;