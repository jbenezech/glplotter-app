import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ReactElement, ReactNode} from 'react';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {GLPlotterContainer} from './GLPlotterContainer';
import {vi, describe, it, expect} from 'vitest';

vi.mock('./GLPlotterComponent', () => ({
  GLPlotterComponent: ({
    onReady,
  }: {
    onReady: (ready: boolean) => void;
  }): ReactElement => {
    return (
      <div data-testid="plotterComponent" onClick={(): void => onReady(true)} />
    );
  },
}));

vi.mock('./GLPlotterStateComponent', () => ({
  GLPlotterStateComponent: (): ReactElement => (
    <div data-testid="plotterState" />
  ),
}));

vi.mock('./Timeline', () => ({
  Timeline: ({children}: {children: ReactNode}): ReactElement => (
    <div data-testid="timeline">{children}</div>
  ),
}));

vi.mock('./MeasureDrawer', () => ({
  MeasureDrawer: (): ReactElement => <div data-testid="measures" />,
}));

describe('GLPlotterContainer', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<GLPlotterContainer />);
    expect(container).toMatchSnapshot();
  });

  it('renders all other components', async () => {
    renderWithTestProviders(<GLPlotterContainer />);

    await waitFor(() => {
      expect(screen.getByTestId('plotterComponent')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId('plotterComponent'));

    await waitFor(() => {
      expect(screen.getByTestId('plotterState')).toBeInTheDocument();
      expect(screen.getByTestId('timeline')).toBeInTheDocument();
      expect(screen.getByTestId('measures')).toBeInTheDocument();
    });
  });
});
