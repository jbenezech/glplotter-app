import '@mui/material/styles';

interface CustomColors {
  border: string;
  separator: string;
  signal: string;
  measure: string;
  canvas: string;
  colorOnCanvas: string;
  signalSelection: string;
}

declare module '@mui/material' {
  interface Theme {
    colors: CustomColors;
  }
  interface ThemeOptions {
    colors: CustomColors;
  }
}
