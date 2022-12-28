import {PlotterService} from '@Services/PlotterService';
import '@testing-library/jest-dom';
import {waitFor} from '@testing-library/react';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {LightTheme} from 'src/themes';
import {GLPlotterStateComponent} from './GLPlotterStateComponent';

jest.mock('@Services/PlotterService');
const plotterService = jest.mocked(new PlotterService());

const originalContext = jest.requireActual<
  typeof import('@Context/StateContext')
>('@Context/StateContext');

const originalState = originalContext.InitialApplicationState(LightTheme);

const mockState = {...originalState};

jest.mock('@Context/StateContext', () => ({
  ...jest.requireActual<typeof import('@Context/StateContext')>(
    '@Context/StateContext'
  ),
  InitialApplicationState: (): Record<string, unknown> => mockState,
}));

describe('GLPlotterStateComponent', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<GLPlotterStateComponent />);
    expect(container).toMatchSnapshot();
  });

  it('sets the state of the plotter', async () => {
    const {signals} = mockState;
    const signalsWithColor = signals.map((signal) => ({
      ...signal,
      color: '#DED628',
    }));

    renderWithTestProviders(<GLPlotterStateComponent />);
    await waitFor(() => {
      expect(plotterService.plotter().replaceSignals).toHaveBeenCalledWith(
        signalsWithColor
      );
      expect(plotterService.plotter().displayRate).toHaveBeenCalledWith(
        mockState.displayRate
      );
      expect(plotterService.plotter().switchMode).toHaveBeenCalledWith(
        'ROTATE'
      );
    });
  });

  it('sets the color of the signal when specified', async () => {
    const {signals} = mockState;
    const signalsWithColor = signals.map((signal) => ({
      ...signal,
      color: '#fff',
    }));
    mockState.signals = signalsWithColor;

    renderWithTestProviders(<GLPlotterStateComponent />);
    await waitFor(() => {
      expect(plotterService.plotter().replaceSignals).toHaveBeenCalledWith(
        signalsWithColor
      );
    });
  });

  it('sets the drawing mode from the state', async () => {
    mockState.isRecording = false;

    renderWithTestProviders(<GLPlotterStateComponent />);
    await waitFor(() => {
      expect(plotterService.plotter().switchMode).toHaveBeenCalledWith(
        'MANUAL'
      );
    });
  });
});
