import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthPage } from './page/Auth';
import theme from "./util/theme"
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

//TODO: Insert route component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<CircularProgress />}>
          <AuthPage />
        </React.Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
