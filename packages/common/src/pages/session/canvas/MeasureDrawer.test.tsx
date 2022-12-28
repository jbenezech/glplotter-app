import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import '@testing-library/jest-dom';
import {fireEvent, screen} from '@testing-library/react';
import {PlotterService} from '@Services/PlotterService';
import {MeasureDrawer} from './MeasureDrawer';

jest.mock('@Services/PlotterService');

const plotterService = jest.mocked(new PlotterService());

const containerRect = {
  x: 0,
  y: 0,
  width: 1000,
  height: 800,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: jest.fn(),
};

const measure = {
  id: '100-0',
  pixelTop: 0,
  timestamp: 100,
  pixelWidth: 100,
  color: '#8B861E',
};

const drawMeasure = (): void => {
  const drawer = screen.getByTestId('measuredrawer');
  fireEvent.mouseDown(drawer, {clientX: measure.timestamp, clientY: 0});
  fireEvent.mouseMove(drawer, {
    clientX: measure.timestamp,
    clientY: 0,
    ctrlKey: true,
  });
  fireEvent.mouseMove(drawer, {
    clientX: measure.timestamp + measure.pixelWidth,
    clientY: 0,
    ctrlKey: true,
  });
  fireEvent.mouseUp(drawer);
};

describe('MeasureDrawer', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <MeasureDrawer containerRect={containerRect} />
    );
    expect(container).toMatchSnapshot();
  });

  it('draws a measure', () => {
    renderWithTestProviders(<MeasureDrawer containerRect={containerRect} />);

    drawMeasure();

    expect(plotterService.plotter().removeMeasure).toHaveBeenCalledWith(
      measure.id
    );
    expect(plotterService.plotter().addMeasure).toHaveBeenCalledWith(measure);
  });

  it('moves a measure', () => {
    renderWithTestProviders(<MeasureDrawer containerRect={containerRect} />);

    const drawer = screen.getByTestId('measuredrawer');

    drawMeasure();

    expect(plotterService.plotter().addMeasure).toHaveBeenCalledWith(measure);

    fireEvent.mouseMove(drawer, {clientX: 100, clientY: 0});
    fireEvent.mouseDown(drawer, {clientX: 100, clientY: 0});
    fireEvent.mouseMove(drawer, {clientX: 200, clientY: 0});
    fireEvent.mouseUp(drawer);

    expect(plotterService.plotter().removeMeasure).toHaveBeenCalledWith(
      measure.id
    );
    expect(plotterService.plotter().addMeasure).toHaveBeenLastCalledWith({
      ...measure,
      timestamp: 200,
    });
  });

  it('deletes a measure', () => {
    renderWithTestProviders(<MeasureDrawer containerRect={containerRect} />);

    const drawer = screen.getByTestId('measuredrawer');

    drawMeasure();

    expect(plotterService.plotter().addMeasure).toHaveBeenCalledWith(measure);

    fireEvent.doubleClick(drawer, {clientX: 100, clientY: 0});

    expect(plotterService.plotter().removeMeasure).toHaveBeenCalledWith(
      measure.id
    );
    expect(plotterService.plotter().replaceMeasures).toHaveBeenLastCalledWith(
      []
    );
  });
});
