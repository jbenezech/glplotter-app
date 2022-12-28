import {ApplicationAction} from '@Context/ApplicationReducer';
import {
  ApplicationStateType,
  InitialApplicationState,
} from '@Context/StateContext';
import '@testing-library/jest-dom';
import {fireEvent, screen} from '@testing-library/react';
import {ReactElement} from 'react';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {LightTheme} from 'src/themes';
import {MainWindow} from './MainWindow';

const state = InitialApplicationState(LightTheme);

const reducerSpy = jest.fn();

jest.mock('../../context/ApplicationReducer', () => ({
  applicationReducer: (
    state: ApplicationStateType,
    action: ApplicationAction
  ): ApplicationStateType => {
    reducerSpy(action);
    return state;
  },
}));

jest.mock('./signal/SignalsContainer', () => ({
  SignalsContainer: (): ReactElement => {
    return <div data-testid="signalscontainer" />;
  },
}));

jest.mock('./canvas/GLPlotterContainer', () => ({
  GLPlotterContainer: (): ReactElement => (
    <div data-testid="plottercontainer" />
  ),
}));

describe('MainWindow', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<MainWindow />);
    expect(container).toMatchSnapshot();
  });

  it('renders all other components', () => {
    renderWithTestProviders(<MainWindow />);

    expect(screen.getByTestId('signalscontainer')).toBeInTheDocument();
    expect(screen.getByTestId('plottercontainer')).toBeInTheDocument();
  });

  it('increases and decreases zoom on mouse wheel', () => {
    const {signals} = state;
    const signal = signals[0];

    renderWithTestProviders(<MainWindow />);

    const container = screen.getByTestId('mainwindow');

    fireEvent.mouseMove(container, {clientX: 0, clientY: 70});
    fireEvent.wheel(container, {
      clientX: 0,
      clientY: 70,
      deltaX: 0,
      deltaY: 100,
    });

    expect(reducerSpy).toHaveBeenCalledWith({
      type: 'zoom/increase',
      payload: {
        signalId: signal.id,
      },
    });

    fireEvent.wheel(container, {
      clientX: 0,
      clientY: 70,
      deltaX: 0,
      deltaY: -100,
    });

    expect(reducerSpy).toHaveBeenCalledWith({
      type: 'zoom/decrease',
      payload: {
        signalId: signal.id,
      },
    });
  });

  it('does not change zoom if no signal is selected', () => {
    renderWithTestProviders(<MainWindow />);

    const container = screen.getByTestId('mainwindow');

    fireEvent.mouseMove(container, {clientX: 0, clientY: 700});
    fireEvent.wheel(container, {
      clientX: 0,
      clientY: 700,
      deltaX: 0,
      deltaY: 100,
    });

    expect(reducerSpy).not.toHaveBeenCalled();
  });
});
