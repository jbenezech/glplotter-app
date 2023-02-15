import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {Header} from './Header';
import {ReactElement} from 'react';
import {vi, describe, it, expect} from 'vitest';

const onSettings = vi.fn();

vi.mock('../displayRate/DisplayRate', () => ({
  DisplayRate: (): ReactElement => <div data-testid="displayRate" />,
}));

vi.mock('../drawingMode/DrawingMode', () => ({
  DrawingMode: (): ReactElement => <div data-testid="drawingMode" />,
}));

vi.mock('./Info', () => ({
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

  it('calls onSettings when clicking icon', async () => {
    renderWithTestProviders(<Header onSettings={onSettings} />);

    await userEvent.click(screen.getByTestId('header-settings'));

    expect(onSettings).toHaveBeenCalled();
  });
});
