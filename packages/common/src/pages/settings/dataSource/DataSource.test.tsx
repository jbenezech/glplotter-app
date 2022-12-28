import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {DataSource} from './DataSource';

describe('DataSource', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<DataSource />);
    expect(container).toMatchSnapshot();
  });
});
