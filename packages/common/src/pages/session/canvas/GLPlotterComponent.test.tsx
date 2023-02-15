import {PlotterService} from '@Services/PlotterService';
import {waitFor} from '@testing-library/react';
import {Location} from 'react-router-dom';
import {listenSpy} from 'src/test/utils/DataServiceMock';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {GLPlotterComponent} from './GLPlotterComponent';
import {vi, describe, it, expect} from 'vitest';

const location: Partial<Location> = {};

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual<
    typeof import('react-router-dom')
  >('react-router-dom');
  return {
    ...originalModule,
    useLocation: (): Partial<Location> => location,
  };
});

vi.mock('@Services/PlotterService');
const plotterService = vi.mocked(new PlotterService());

const glContainer: HTMLElement = document.createElement('div');
const onReady = vi.fn();

describe('GLPlotterComponent', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <GLPlotterComponent container={glContainer} onReady={onReady} />
    );
    expect(container).toMatchSnapshot();
  });

  it('Starts listening, buffers data and calls onReady', async () => {
    renderWithTestProviders(
      <GLPlotterComponent container={glContainer} onReady={onReady} />
    );

    await waitFor(() => {
      expect(listenSpy).toHaveBeenCalled();
      expect(plotterService.plotter().bufferData).toHaveBeenCalled();
      expect(onReady).toHaveBeenCalled();
    });
  });

  it('Starts the session when present in the state', async () => {
    location.state = {sessionId: 'abc'};

    renderWithTestProviders(
      <GLPlotterComponent container={glContainer} onReady={onReady} />
    );

    await waitFor(() => {
      expect(listenSpy).toHaveBeenCalledWith('abc', expect.anything());
    });
  });
});
