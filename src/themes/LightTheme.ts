import {createTheme, responsiveFontSizes, Theme} from '@mui/material';

const colors = {
  border: '#ff3402',
  separator: '#FBEAEF',
  signal: '#DED628',
  measure: '#8B861E',
  canvas: '#000',
  colorOnCanvas: '#fff',
  signalSelection: 'rgba(255, 255, 255, 0.2)',
};

export const LightTheme: Theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: ['Karla'].join(','),
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      h2: {
        fontSize: 28,
      },
      h3: {
        fontSize: 36,
        fontWeight: 'bold',
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#8307ff',
      },
      secondary: {
        main: '#b972ff',
      },
      text: {
        primary: '#717171',
        secondary: '#b9b9b9',
        disabled: '#8307ff66',
      },
    },
    colors,
  })
);
