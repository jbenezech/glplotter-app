import PlatformProvider from '@Context/PlatformProvider';
import {act, render} from '@testing-library/react';
import App from './App';
import {PlatformContextMock} from './test/utils/PlatformContextMock';

jest.mock('@Services/PlotterService');

process.env.REACT_APP_DEBUG_MODE = 'true';

describe('App', () => {
  it('renders without crashing', async () => {
    await act(() => {
      const {container} = render(
        <PlatformProvider implementation={PlatformContextMock}>
          <App />
        </PlatformProvider>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
