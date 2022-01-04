import * as React from "react";
import styles from "../AuthPage.module.scss";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright } from "../../../component/Copyright";
import { RegisterForm } from "../../../form/RegisterForm";
import { AuthContext } from "../../../context/Auth/authContext";
import { useNavigate } from "react-router-dom";
import routesList from "../../../util/routesList";

const SignupPage = () => {
    const pre = "authPage-";

    const { signup, logged } = React.useContext(AuthContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (logged) {
            navigate(routesList.HOME)
        }
        //TODO: Verify jwt token for redirect
    }, [])

    return <Container className={styles[`${pre}container`]} component="div" maxWidth="xs">
        <CssBaseline />
        <Box className={styles[`${pre}wrapper`]}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {"Sign up"}
            </Typography>
            <RegisterForm />
            <Link className={styles[`${pre}changeFormLink`]} onClick={() => navigate(routesList.USER_LOGIN)} variant="body2">
                {"Do you have an account? Sign in"}
            </Link>
        </Box>
    </Container>
}

export default SignupPage;