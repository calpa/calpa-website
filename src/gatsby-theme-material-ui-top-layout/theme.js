import { createTheme } from '@mui/material';

export const palette = {
  background: {
    main: '#f8f8f8',
  },
  blue: {
    light: '#337ab7',
    main: '#0056b3',
    dark: '#0f457f',
  },
};

const theme = createTheme({
  palette,
  typography: {
    fontSize: 16,
    // fontFamily: 'Iansui',
    h1: {
      fontSize: 24,
      fontWeight: 600,
    },
    h2: {
      fontSize: 22,
      fontWeight: 600,
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
    },
  },
});

export default theme;
