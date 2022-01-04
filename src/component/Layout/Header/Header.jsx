import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import routesList from '../../../util/routesList';
import { toLower } from "lodash-es";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Divider } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { AuthContext } from "../../../context/Auth/authContext";

const Header = ({ name }) => {
    const { keycloak } = useKeycloak();
    const { logged } = React.useContext(AuthContext);
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
            name: 'Events',
            url: routesList.ADMIN_EVENTS,
            icon: <CelebrationIcon />,
            role: "admin"
        },
        {
            name: 'Categories',
            url: routesList.ADMIN_CATEGORIES,
            icon: <TheaterComedyIcon />,
            role: "admin"
        },
        {
            name: 'Promoters',
            url: routesList.ADMIN_PROMOTERS,
            icon: <SupervisedUserCircleIcon />,
            role: "admin"
        }
    ]

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {keycloak.authenticated ? <div className="form-row">
                    <div className="column">
                        <Typography>Hello,</Typography>
                        {/* <Typography>{userInfo.name}</Typography> */}
                    </div>
                </div> : <>
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
    
    return <AppBar position="fixed">
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
                    <div>
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
                    </div>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {routes.filter(r => !r.role || keycloak.tokenParsed?.roles?.indexOf(r.role) > -1).map((r, i) => (
                        <Button
                            key={`${toLower(r.name)}-${i}`}
                            onClick={() => handleNavigation(r.url)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
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
                        {keycloak.authenticated ? <><Button variant="contained" color="secondary" size="small" sx={{ mr: 3 }} onClick={() => handleNavigation(routesList.HOME)}>
                            BACK TO SITE
                        </Button><Typography sx={{ mr: 2 }}>{`Hello, ${keycloak.idTokenParsed.name}`}</Typography><Button
                            onClick={() => keycloak.logout({ redirectUri: process.env.REACT_APP_BASE_URL + routesList.HOME })}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                                LOGOUT
                            </Button></> : <><Button
                                onClick={() => keycloak.login()}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                LOGIN
                            </Button>
                            <Button
                                onClick={() => keycloak.register()}
                                sx={{ my: 2, color: 'white', display: 'block' }}
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