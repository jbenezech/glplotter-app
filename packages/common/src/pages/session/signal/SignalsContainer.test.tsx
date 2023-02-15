import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {ReactElement} from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {SignalsContainer} from './SignalsContainer';
import {Signal} from '@Context/StateContext';
import {vi, describe, it, expect} from 'vitest';

vi.mock('./SignalComponent', () => ({
  SignalComponent: ({signal}: {signal: Signal}): ReactElement => {
    return (
      <div
        data-testid="signal"
        style={{
          position: 'absolute',
          top: `${signal.yPosition}px`,
        }}
      />
    );
  },
}));

const assignContainerBounds = (): void => {
  const signalsContainer = screen.getByTestId('signalscontainer');
  signalsContainer.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 1000,
    height: 800,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: vi.fn(),
  }));
  fireEvent(window, new Event('resize'));
};

describe('SignalsContainer', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<SignalsContainer />);
    expect(container).toMatchSnapshot();
  });

  it('moves signal with mouse', () => {
    renderWithTestProviders(<SignalsContainer />);

    assignContainerBounds();

    const signal = screen.getByTestId('signal');

    //signal will be positionned at y=0 at start
    //as component is rendered before we mock getBoundingClientRect
    fireEvent.mouseDown(signal, {clientX: 0, clientY: 0});
    fireEvent.mouseMove(signal, {clientX: 0, clientY: 200});
    fireEvent.mouseUp(signal);

    expect(signal.style.top).toEqual('200px');
  });
});
