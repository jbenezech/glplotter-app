import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {Settings} from './Settings';

describe('Settings', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<Settings />);
    expect(container).toMatchSnapshot();
  });
});
