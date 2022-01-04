import * as React from "react";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from "../AuthPage.module.scss";
import { LoginForm } from "../../../form/LoginForm";
import { AuthContext } from "../../../context/Auth/authContext";
import { useNavigate } from "react-router-dom";
import routesList from "../../../util/routesList";
import { Copyright } from "../../../component/Copyright";

const LoginPage = () => {
    const pre = "authPage-";

    const { logged } = React.useContext(AuthContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (logged) {
            navigate(routesList.HOME)
        }
    }, [])

    return <Container className={styles[`${pre}container`]} component="div" maxWidth="xs">
        <CssBaseline />
        <Box className={styles[`${pre}wrapper`]}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {"Sign in"}
            </Typography>
            <LoginForm />
            <Link className={styles[`${pre}changeFormLink`]} onClick={() => navigate(routesList.USER_SIGNUP)} variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
            <Copyright className={styles[`${pre}copyright`]} />
        </Box>
    </Container>
}

export default LoginPage;