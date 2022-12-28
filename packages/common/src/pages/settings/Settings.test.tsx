import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {Settings} from './Settings';

Object.defineProperty(window, 'crypto', {
  value: {
    randomUUID: () => 'abc-abc-abc-abc-abc',
  },
});

describe('Settings', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<Settings />);
    expect(container).toMatchSnapshot();
  });
});
