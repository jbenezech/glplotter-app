import {ApplicationAction} from '@Context/ApplicationReducer';
import {
  ApplicationStateType,
  InitialApplicationState,
} from '@Context/StateContext';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {LightTheme} from 'src/themes';
import {SignalComponent} from './SignalComponent';

const reducerSpy = jest.fn();

jest.mock('../../../context/ApplicationReducer', () => ({
  applicationReducer: (
    state: ApplicationStateType,
    action: ApplicationAction
  ): ApplicationStateType => {
    reducerSpy(action);
    return state;
  },
}));

const state = InitialApplicationState(LightTheme);
const {signals} = state;
const signal = signals[0];

describe('SignalComponent', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <SignalComponent signal={signal} />
    );
    expect(container).toMatchSnapshot();
  });

  it('displays channel name and zoom', () => {
    renderWithTestProviders(<SignalComponent signal={signal} />);
    expect(screen.getByText('ch1')).toBeInTheDocument();
    expect(screen.getByText('x1')).toBeInTheDocument();
  });

  it('increases and decreases zoom on click', () => {
    renderWithTestProviders(<SignalComponent signal={signal} />);

    const increaseButton = screen.getByTestId('ArrowDropUpIcon').parentElement;
    const decreaseButton =
      screen.getByTestId('ArrowDropDownIcon').parentElement;

    assert(increaseButton !== null);
    assert(decreaseButton !== null);

    userEvent.click(increaseButton);

    expect(reducerSpy).toHaveBeenCalledWith({
      type: 'zoom/increase',
      payload: {
        signalId: signal.id,
      },
    });

    userEvent.click(decreaseButton);

    expect(reducerSpy).toHaveBeenCalledWith({
      type: 'zoom/decrease',
      payload: {
        signalId: signal.id,
      },
    });
  });
});
