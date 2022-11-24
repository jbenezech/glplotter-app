import {SnackbarProvider} from 'notistack';
import {ReactElement} from 'react';
import '@I18n';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import '@Styles/index.scss';
import {setUseWhatChange} from '@simbathesailor/use-what-changed';
import AppRouter from '@Router/AppRouter';
import {ThemeProvider} from '@mui/material/styles';
import {StylesProvider} from '@mui/styles';
import {ApplicationContextProvider} from '@Context/ApplicationContextProvider';
import {LightTheme} from './themes';
import {registerValidators} from '@Validation/Validators';

registerValidators();

function App(): ReactElement {
  if (process.env.REACT_APP_DEBUG_MODE === 'true') {
    console.info('App is running in debug mode.');
  }
  // Allow the use of https://github.com/simbathesailor/use-what-changed
  // to debug when in debug mode
  setUseWhatChange(process.env.REACT_APP_DEBUG_MODE === 'true');

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={LightTheme}>
        <StylesProvider injectFirst={true}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <ApplicationContextProvider>
              <AppRouter />
            </ApplicationContextProvider>
          </SnackbarProvider>
        </StylesProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
