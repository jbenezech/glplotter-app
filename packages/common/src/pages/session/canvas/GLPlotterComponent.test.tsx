import {PlotterService} from '@Services/PlotterService';
import '@testing-library/jest-dom';
import {waitFor} from '@testing-library/react';
import {Location} from 'react-router-dom';
import {listenSpy} from 'src/test/utils/DataServiceMock';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {GLPlotterComponent} from './GLPlotterComponent';

const location: Partial<Location> = {};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useLocation: (): Partial<Location> => location,
}));

jest.mock('@Services/PlotterService');
const plotterService = jest.mocked(new PlotterService());

const glContainer: HTMLElement = document.createElement('div');
const onReady = jest.fn();

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
