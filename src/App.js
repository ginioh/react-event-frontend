import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./util/theme"
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Navigation } from "./component/Navigation";
import { AuthProvider } from "./context/Auth/authContext";

// const keycloak = new Keycloak({
//   url: `${isDocker() ? process.env.REACT_APP_KEYCLOAK_DOCKER_URL : process.env.REACT_APP_KEYCLOAK_URL}/auth`,
//   realm: process.env.REACT_APP_KEYCLOAK_REALM,
//   clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID
// });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}

//TODO: Insert route component
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
              <IconButton onClick={onClickDismiss(key)}>
                <CloseIcon />
              </IconButton>
            )}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            maxSnack={3}>
            <AuthProvider>
              <React.Suspense fallback={<CircularProgress />}>
                <Navigation />
              </React.Suspense>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
