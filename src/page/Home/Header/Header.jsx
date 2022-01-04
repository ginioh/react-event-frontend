import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom"
import {
    List, ListItem, ListItemIcon, ListItemText, AppBar, Divider, Box, Toolbar, Tooltip, IconButton, Typography, Container, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import routesList from '../../../util/routesList';
import { toLower } from "lodash-es";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CelebrationIcon from '@mui/icons-material/Celebration'
import { useKeycloak } from "@react-keycloak/web";
import styles from "./Header.module.scss";
import { AuthContext } from "../../../context/Auth/authContext";

const Header = ({ name }) => {
    const pre = "homepage-header-";

    const { keycloak } = useKeycloak();
    const { isAuthorized } = React.useContext(AuthContext)
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (url) => {

        if (location.pathname === url) {
            setDrawerOpen(false);
        } else {
            navigate(url)
        }
    }

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const routes = [
        {
            name: 'Home',
            url: routesList.HOME,
            icon: <HomeIcon />,
            role: "user"
        },
        {
            name: 'My Events',
            url: routesList.ADMIN_EVENTS,
            icon: <TheaterComedyIcon />,
            role: "user"
        },
    ]

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {keycloak.authenticated ?
                    <div className={styles[`${pre}sidebar-header`]}>
                        <div>
                            <Typography className="text-black">Hello,</Typography>
                            <Typography className="text-black">{keycloak.idTokenParsed.name}</Typography>
                        </div>
                        <Tooltip title="Logout" placement="top">
                            <IconButton sx={{ height: "max-content", width: "max-content" }} onClick={() => keycloak.logout({ redirectUri: process.env.REACT_APP_BASE_URL + routesList.HOME })}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    : <>
                        <ListItem button onClick={() => keycloak.login()}>
                            <ListItemIcon>
                                <CelebrationIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem sx={{ mt: 0, mb: 0 }} button onClick={() => keycloak.register()}>
                            <ListItemIcon>
                                <CelebrationIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign up" />
                        </ListItem>
                    </>}
                <Divider />
                {routes.filter(r => !r.role || keycloak.tokenParsed?.roles?.indexOf(r.role) > -1).map((r, i) => (
                    <ListItem sx={{ mt: 0, mb: 0 }} button key={`${toLower(r.name)}-${i}`} onClick={() => handleNavigation(r.url)}>
                        <ListItemIcon>
                            {r.icon}
                        </ListItemIcon>
                        <ListItemText primary={r.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return <AppBar className={styles[`${pre}container`]} position="sticky" color="transparent">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    LOGO
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={toggleDrawer(!drawerOpen)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor='left'
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {list()}
                    </SwipeableDrawer>
                    {/* <div>
                        <React.Fragment>
                            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
                            <SwipeableDrawer
                                anchor='left'
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                                onOpen={toggleDrawer(true)}
                            >
                                {list()}
                            </SwipeableDrawer>
                        </React.Fragment>
                    </div> */}
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {routes.filter(r => !r.role || keycloak.tokenParsed?.roles?.indexOf(r.role) > -1).map((r, i) => (
                        <Button
                            key={`${toLower(r.name)}-${i}`}
                            onClick={() => handleNavigation(r.url)}
                            sx={{ my: 2, color: "black", display: 'block' }}
                        >
                            {r.name}
                        </Button>
                    ))}
                </Box>

                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex', color: 'white', display: 'block' } }}
                >
                    <div className="form-row">
                        {keycloak.authenticated ? <>
                            {isAuthorized(["admin"]) && <Button variant="contained" size="small" sx={{ mr: 3 }} onClick={() => handleNavigation(routesList.ADMIN_EVENTS)}>
                                ADMIN PANEL
                            </Button>}
                            <Typography sx={{ mr: 2, color: "MenuText" }} color="primary">{`Hello, ${keycloak.idTokenParsed.name}`}</Typography>
                            <Button
                                className={styles[`${pre}button`]}
                                variant="text"
                                sx={{ color: "MenuText" }}
                                onClick={() => keycloak.logout({ redirectUri: process.env.REACT_APP_BASE_URL + routesList.HOME })}
                            >
                                LOGOUT
                            </Button>
                        </> : <>
                            <Button
                                sx={{ color: "MenuText" }}
                                onClick={() => keycloak.login()}
                                className={styles[`${pre}button`]}
                            >
                                LOGIN
                            </Button>
                            <Button
                                sx={{ color: "MenuText" }}
                                onClick={() => keycloak.register()}
                                className={styles[`${pre}button`]}
                            >
                                SIGN UP
                            </Button></>}
                    </div>
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
}

export default Header