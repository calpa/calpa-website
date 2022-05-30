import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      main: '#f8f8f8',
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontSize: 24,
    },
    h2: {
      fontSize: 22,
    },
    h3: {
      fontSize: 20,
    },
    h4: {
      fontSize: 18,
    },
    h5: {
      fontSize: 16,
    },
  },
});

export default theme;
