import {ReactElement} from 'react';
import {render, RenderResult} from '@testing-library/react';
import {LightTheme} from 'src/themes';
import {ThemeProvider} from '@mui/material';
import {ApplicationContextProvider} from '@Context/ApplicationContextProvider';
import {BrowserRouter} from 'react-router-dom';
import PlatformProvider from '@Context/PlatformProvider';
import {PlatformContextMock} from './PlatformContextMock';
import {vi} from 'vitest';

vi.mock('react-i18next', async () => {
  const originalModule = await vi.importActual<typeof import('react-i18next')>(
    'react-i18next'
  );

  // this mock makes sure any components using the translate HoC receive the t function as a prop
  return {
    ...originalModule,
    useTranslation: (): unknown => ({
      t: (key: string, options?: Record<string, string>): string => {
        const values =
          options === undefined
            ? []
            : Object.keys(options).map(
                (option) => `${option} ${options[option]}`
              );
        return `${key} ${values.join(' ')}`;
      },
    }),
  };
});

vi.mock('@I18n', async () => {
  const originalModule = await vi.importActual<typeof import('@I18n')>('@I18n');

  return {
    ...originalModule,
    t: (key: string, options?: Record<string, string>): string => {
      const values =
        options === undefined
          ? []
          : Object.keys(options).map(
              (option) => `${option} ${options[option]}`
            );
      return `${key} ${values.join(' ')}`;
    },
  };
});

export function renderWithTestProviders(component: ReactElement): RenderResult {
  return render(
    <PlatformProvider implementation={PlatformContextMock}>
      <ThemeProvider theme={LightTheme}>
        <ApplicationContextProvider>
          <BrowserRouter>{component}</BrowserRouter>
        </ApplicationContextProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
}
