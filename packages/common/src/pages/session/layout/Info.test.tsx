import {screen} from '@testing-library/react';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import '@testing-library/jest-dom';
import {Info} from './Info';

jest.mock('@Context/StateContext', () => ({
  ...jest.requireActual<typeof import('@Context/StateContext')>(
    '@Context/StateContext'
  ),
  InitialApplicationState: (): Record<string, unknown> => ({
    glInfo: {
      pointsPerWindow: 100,
      gpuOverflow: false,
    },
  }),
}));

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
