import {screen} from '@testing-library/react';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {Info} from './Info';
import {vi, describe, it, expect} from 'vitest';

vi.mock('@Context/StateContext', async () => {
  const originalContext = await vi.importActual<
    typeof import('@Context/StateContext')
  >('@Context/StateContext');
  return {
    ...originalContext,
    InitialApplicationState: (): Record<string, unknown> => ({
      glInfo: {
        pointsPerWindow: 100,
        gpuOverflow: false,
      },
    }),
  };
});

describe('Info', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<Info />);
    expect(container).toMatchSnapshot();
  });

  it('displays points per window', () => {
    renderWithTestProviders(<Info />);
    expect(screen.getByText('100 ppw')).toBeInTheDocument();
  });
});
