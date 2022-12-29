import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AppMenu} from './AppMenu';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@mui/material';
import {LightTheme} from 'src/themes';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  useTranslation: (): unknown => ({
    t: jest.fn(),
  }),
}));

describe('AppMenu', () => {
  const mockUid: {value: `${string}-${string}-${string}-${string}-${string}`} =
    {
      value: 'axc-abc-abc-abc-abc',
    };

  beforeEach(() => {
    window.crypto.randomUUID =
      (): `${string}-${string}-${string}-${string}-${string}` => mockUid.value;
  });

  it('renders without crashing', () => {
    const {container} = render(
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
          <AppMenu />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('opens drawer when click', () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
          <AppMenu />
        </BrowserRouter>
      </ThemeProvider>
    );
    userEvent.click(screen.getByTestId('appmenu-toggle'));
    expect(screen.getByTestId('appmenu-session')).toBeDefined();
  });
  it('does close the drawer on keyboard event', async () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
          <AppMenu />
        </BrowserRouter>
      </ThemeProvider>
    );
    userEvent.click(screen.getByTestId('appmenu-toggle'));
    userEvent.tab();
    await waitFor(() => {
      expect(screen.getByTestId('appmenu-session')).toBeInTheDocument();
    });

    userEvent.keyboard('{Shift}');
    await waitFor(() => {
      expect(screen.getByTestId('appmenu-session')).toBeInTheDocument();
    });

    const element = screen.getByTestId('appmenu-session');
    userEvent.keyboard('{c}');
    await waitForElementToBeRemoved(element);
  });
  it('generates new session when navigating on link', () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
          <AppMenu />
        </BrowserRouter>
      </ThemeProvider>
    );
    userEvent.click(screen.getByTestId('appmenu-toggle'));

    const sessionId = screen
      .getByTestId('appmenu-session')
      .getAttribute('data-session');
    mockUid.value = 'abc-abc-abc-abc-abd';

    userEvent.click(screen.getByTestId('appmenu-session'));
    expect(
      screen.getByTestId('appmenu-session').getAttribute('data-session')
    ).not.toEqual(sessionId);
  });
});
