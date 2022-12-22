import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import '@testing-library/jest-dom';
import {Header} from './Header';
import {ReactElement} from 'react';

const onSettings = jest.fn();

jest.mock('../displayRate/DisplayRate', () => ({
  DisplayRate: (): ReactElement => <div data-testid="displayRate" />,
}));

jest.mock('../drawingMode/DrawingMode', () => ({
  DrawingMode: (): ReactElement => <div data-testid="drawingMode" />,
}));

jest.mock('./Info', () => ({
  Info: (): ReactElement => <div data-testid="info" />,
}));

describe('Header', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <Header onSettings={onSettings} />
    );
    expect(container).toMatchSnapshot();
  });

  it('displays visibility icon, display rate, drawing mode and info', () => {
    renderWithTestProviders(<Header onSettings={onSettings} />);
    expect(
      screen.getByTestId('SettingsInputComponentIcon')
    ).toBeInTheDocument();
    expect(screen.getByTestId('displayRate')).toBeInTheDocument();
    expect(screen.getByTestId('drawingMode')).toBeInTheDocument();
    expect(screen.getByTestId('info')).toBeInTheDocument();
  });

  it('calls onSettings when clicking icon', () => {
    renderWithTestProviders(<Header onSettings={onSettings} />);

    userEvent.click(screen.getByTestId('header-settings'));

    expect(onSettings).toHaveBeenCalled();
  });
});
