import * as React from "react";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from "./AuthPage.module.scss";
import { RegisterForm } from "../../form/RegisterForm";
import { LoginForm } from "../../form/LoginForm";
import { AuthContext } from "../../context/Auth/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import routesList from "../../util/routesList";
import { Copyright } from "../../component/Copyright";

const AuthPage = () => {
    const pre = "authPage-";

    const { logged } = React.useContext(AuthContext);
    const [registerMode, setRegisterMode] = React.useState(false);

    const { navigate } = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (logged) {
            navigate(routesList.ADMIN_EVENTS)
        }
        setRegisterMode(location.pathname === routesList.USER_SIGNUP)
        //TODO: Verify jwt token for redirect
    }, [])

    return <Container className={styles[`${pre}container`]} component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={styles[`${pre}wrapper`]}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {registerMode ? "Sign up" : "Sign in"}
            </Typography>
            {registerMode ? <RegisterForm /> : <LoginForm />}
            <Link className={styles[`${pre}changeFormLink`]} onClick={() => setRegisterMode(!registerMode)} variant="body2">
                {registerMode ? "Do you have an account? Sign in" : "Don't have an account? Sign Up"}
            </Link>
            <Copyright className={styles[`${pre}copyright`]} />
        </Box>
    </Container>
}

export default AuthPage;