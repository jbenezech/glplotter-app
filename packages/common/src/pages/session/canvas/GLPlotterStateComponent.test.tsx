import {PlotterService} from '@Services/PlotterService';
import {waitFor} from '@testing-library/react';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {GLPlotterStateComponent} from './GLPlotterStateComponent';
import {DEFAULT_STATE} from '@Context/config';
import {ApplicationStateType} from '@Context/StateContext';
import {vi, describe, it, expect} from 'vitest';

vi.mock('@Services/PlotterService');
const plotterService = vi.mocked(new PlotterService());

const mockState: ApplicationStateType = DEFAULT_STATE;

vi.mock('@Context/StateContext', async () => {
  const originalContext = await vi.importActual<
    typeof import('@Context/StateContext')
  >('@Context/StateContext');
  return {
    ...originalContext,
    InitialApplicationState: (): ApplicationStateType => mockState,
  };
});

describe('GLPlotterStateComponent', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<GLPlotterStateComponent />);
    expect(container).toMatchSnapshot();
  });

  it('sets the state of the plotter', async () => {
    const {signals} = mockState;
    const signalsWithColorFromChannel = signals.map((signal) => ({
      ...signal,
      color: '#fff',
    }));

    renderWithTestProviders(<GLPlotterStateComponent />);
    await waitFor(() => {
      expect(plotterService.plotter().replaceSignals).toHaveBeenCalledWith(
        signalsWithColorFromChannel
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
