import {SnackbarProvider} from 'notistack';
import React, {ReactElement} from 'react';
import '@I18n';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import '@Styles/index.scss';
import {APP_THEME} from '@Theme';
import {setUseWhatChange} from '@simbathesailor/use-what-changed';
import AppRouter from '@Router/AppRouter';
import {
  Theme,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import {StylesProvider} from '@mui/styles';
import {ApplicationStateProvider} from './context/ApplicationContextProvider';

const theme: Theme = responsiveFontSizes(
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
      primary: {
        main: APP_THEME.color.custom.primary,
      },
      secondary: {
        main: APP_THEME.color.custom.secondary,
      },
      text: {
        primary: APP_THEME.color.custom.font.primary,
        secondary: APP_THEME.color.custom.font.secondary,
        disabled: APP_THEME.color.custom.font.disabled,
      },
    },
  })
);

function App(): ReactElement {
  if (process.env.REACT_APP_DEBUG_MODE === 'true') {
    console.info('App is running in debug mode.');
  }
  // Allow the use of https://github.com/simbathesailor/use-what-changed
  // to debug when in debug mode
  setUseWhatChange(process.env.REACT_APP_DEBUG_MODE === 'true');

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst={true}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <ApplicationStateProvider>
              <AppRouter />
            </ApplicationStateProvider>
          </SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
