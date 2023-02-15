import {ApplicationAction} from '@Context/ApplicationReducer';
import {ApplicationStateType} from '@Context/StateContext';
import {fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ReactElement} from 'react';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {Session} from './Session';
import {vi, describe, it, expect} from 'vitest';

const reducerSpy = vi.fn();

vi.mock('./channelSettings/ChannelSettings', () => ({
  ChannelSettings: ({onComplete}: {onComplete: () => void}): ReactElement => (
    <div data-testid="channelSettings" onClick={onComplete} />
  ),
}));

vi.mock('./tabSettings/TabSettings', () => ({
  TabSettings: ({onComplete}: {onComplete: () => void}): ReactElement => (
    <div data-testid="tabSettings" onClick={onComplete} />
  ),
}));

vi.mock('./layout/Header', () => ({
  Header: ({onSettings}: {onSettings: () => void}): ReactElement => (
    <div data-testid="header" onClick={onSettings} />
  ),
}));

vi.mock('./layout/Footer', () => ({
  Footer: ({onSettings}: {onSettings: () => void}): ReactElement => (
    <div data-testid="footer" onClick={onSettings} />
  ),
}));

vi.mock('./MainWindow', () => ({
  MainWindow: (): ReactElement => <div data-testid="mainWindow" />,
}));

vi.mock('../../context/ApplicationReducer', () => ({
  applicationReducer: (
    state: ApplicationStateType,
    action: ApplicationAction
  ): ApplicationStateType => {
    reducerSpy(action);
    return state;
  },
}));

describe('Session', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<Session />);
    expect(container).toMatchSnapshot();
  });

  it('renders layout', () => {
    renderWithTestProviders(<Session />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('mainWindow')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders channel settings on click', async () => {
    renderWithTestProviders(<Session />);

    await userEvent.click(screen.getByTestId('header'));
    expect(screen.getByTestId('channelSettings')).toBeInTheDocument();
  });

  it('does not render channel settings when closed', async () => {
    renderWithTestProviders(<Session />);

    await userEvent.click(screen.getByTestId('header'));

    let channel = screen.getByTestId('channelSettings');

    expect(channel).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('CloseIcon'));

    expect(channel).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('header'));

    channel = screen.getByTestId('channelSettings');

    expect(channel).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('channelSettings'));

    expect(channel).not.toBeInTheDocument();
  });

  it('renders tab settings on click', async () => {
    renderWithTestProviders(<Session />);

    await userEvent.click(screen.getByTestId('footer'));
    expect(screen.getByTestId('tabSettings')).toBeInTheDocument();
  });

  it('does not render tab settings when closed', async () => {
    renderWithTestProviders(<Session />);

    await userEvent.click(screen.getByTestId('footer'));

    let tab = screen.getByTestId('tabSettings');

    expect(tab).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('CloseIcon'));

    expect(tab).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('footer'));

    tab = screen.getByTestId('tabSettings');

    expect(tab).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('tabSettings'));

    expect(tab).not.toBeInTheDocument();
  });

  it('increases and decreases display rate on keyboard action', () => {
    renderWithTestProviders(<Session />);

    fireEvent.keyDown(screen.getByTestId('session-window'), {key: '+'});

    expect(reducerSpy).toHaveBeenCalledWith({
      type: 'displayRate/increase',
      payload: {},
    });

    fireEvent.keyDown(screen.getByTestId('session-window'), {key: '-'});

    expect(reducerSpy).toHaveBeenCalledWith({
      type: 'displayRate/decrease',
      payload: {},
    });
  });
});
