import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {fireEvent, screen} from '@testing-library/react';
import {Timeline} from './Timeline';
import {PlotterService} from '@Services/PlotterService';
import {vi, describe, it, expect} from 'vitest';

vi.mock('@Services/PlotterService');

const plotterService = vi.mocked(new PlotterService());

const containerRect = {
  x: 0,
  y: 0,
  width: 1000,
  height: 800,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  toJSON: vi.fn(),
};

const children = <div data-testid="children" />;

describe('Timeline', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <Timeline containerRect={containerRect}>{children}</Timeline>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders children', () => {
    renderWithTestProviders(
      <Timeline containerRect={containerRect}>{children}</Timeline>
    );
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('Moves the plotter on mouse drag', () => {
    renderWithTestProviders(
      <Timeline containerRect={containerRect}>{children}</Timeline>
    );

    const signal = screen.getByTestId('timeline');

    fireEvent.mouseDown(signal, {clientX: 0, clientY: 0});
    fireEvent.mouseMove(signal, {clientX: 100, clientY: 0});
    fireEvent.mouseUp(signal);

    expect(plotterService.plotter().move).toHaveBeenCalledWith(100);
  });

  it('Does not move when Ctrl key is pressed', () => {
    renderWithTestProviders(
      <Timeline containerRect={containerRect}>{children}</Timeline>
    );

    const signal = screen.getByTestId('timeline');

    fireEvent.mouseDown(signal, {clientX: 0, clientY: 0});
    fireEvent.mouseMove(signal, {clientX: 100, clientY: 0, ctrlKey: true});
    fireEvent.mouseUp(signal);

    expect(plotterService.plotter().move).not.toHaveBeenCalled();
  });
});
