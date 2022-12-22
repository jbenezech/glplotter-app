import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import '@testing-library/jest-dom';
import {Footer} from './Footer';
import {ReactElement} from 'react';

const onSettings = jest.fn();

jest.mock('../tabs/TabList', () => ({
  TabList: (): ReactElement => <div data-testid="tabs" />,
}));

describe('Footer', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <Footer onSettings={onSettings} />
    );
    expect(container).toMatchSnapshot();
  });

  it('displays visibility icon and TabList component', () => {
    renderWithTestProviders(<Footer onSettings={onSettings} />);
    expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument();
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('calls onSettings when clicking icon', () => {
    renderWithTestProviders(<Footer onSettings={onSettings} />);

    userEvent.click(screen.getByTestId('footer-settings'));

    expect(onSettings).toHaveBeenCalled();
  });
});
