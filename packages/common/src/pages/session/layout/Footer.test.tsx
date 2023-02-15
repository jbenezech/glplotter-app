import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {Footer} from './Footer';
import {ReactElement} from 'react';
import {vi, describe, it, expect} from 'vitest';

const onSettings = vi.fn();

vi.mock('../tabs/TabList', () => ({
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

  it('calls onSettings when clicking icon', async () => {
    renderWithTestProviders(<Footer onSettings={onSettings} />);

    await userEvent.click(screen.getByTestId('footer-settings'));

    expect(onSettings).toHaveBeenCalled();
  });
});
