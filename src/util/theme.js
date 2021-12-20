import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: "#ee9b00",
      light: "#ffb52a",
      dark: "#c78100"
    },
    secondary: {
      main: "#ae2012",
      light: "#e32a18",
      dark: "#8a190e"
    }
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          height: '64px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#ee9b00'
        }
      }
    }
  }
});