import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      main: '#f8f8f8',
    },
  },
  typography: {
    fontSize: 12,
    h1: {
      fontSize: 22,
    },
    h2: {
      fontSize: 20,
    },
    h3: {
      fontSize: 18,
    },
    h4: {
      fontSize: 16,
    },
    h5: {
      fontSize: 14,
    },
  },
});

export default theme;
