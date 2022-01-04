import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from 'react-error-boundary'
import theme from "./util/theme"
import { Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Navigation } from "./component/Navigation";
import { AuthProvider } from "./context/Auth/authContext";
import { MediaQueriesProvider } from "./context/mediaQueriesContext";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import isDocker from "./util/isDocker";

const keycloak = new Keycloak({
  url: `${isDocker() ? process.env.REACT_APP_KEYCLOAK_DOCKER_URL : process.env.REACT_APP_KEYCLOAK_URL}/auth`,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID
});

const keycloakInitOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  pkceMethod: 'S256',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
    },
  },
});

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>There was an error:</p>
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MediaQueriesProvider>
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
                <React.Suspense fallback={<Backdrop
                  open={true}
                  sx={{ width: '100%', height: 'calc(100vh - 64px - 2rem - 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                  <CircularProgress color="primary" />
                </Backdrop>}>
                  <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onError={(error, errorInfo) => {
                      console.log(error)
                      console.log(errorInfo)
                    }}
                    onReset={() => { }}
                  >
                    <ReactKeycloakProvider authClient={keycloak}>
                      <AuthProvider>
                        <Navigation />
                      </AuthProvider>
                    </ReactKeycloakProvider>
                  </ErrorBoundary>
                </React.Suspense>
              </SnackbarProvider>
            </MediaQueriesProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter >
  );
}

export default App;
