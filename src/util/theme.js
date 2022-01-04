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
  typography: {
    htmlFontSize: 16
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
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "700",
          // flexDirection: "row",
          // alignItems: "center",
        }
      }
    }
  }
});