import userEvent from '@testing-library/user-event';
import assert from 'assert';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {DisplayRate} from './DisplayRate';

describe('DisplayRate', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<DisplayRate />);
    expect(container).toMatchSnapshot();
  });

  it('renders buttons and default value', () => {
    const {container} = renderWithTestProviders(<DisplayRate />);
    expect(container.querySelectorAll('svg').length).toEqual(2);
    expect(container.querySelector('p')?.innerHTML).toContain('50');
  });

  it('increases display rate when clicking on plus', () => {
    const {container} = renderWithTestProviders(<DisplayRate />);

    const button = container.querySelector('label:first-child');
    assert(button !== null);

    userEvent.click(button);

    expect(container.querySelector('p')?.innerHTML).toContain('100');
  });

  it('decreases display rate when clicking on minus', () => {
    const {container} = renderWithTestProviders(<DisplayRate />);

    const button = container.querySelector('label:nth-child(2)');
    assert(button !== null);

    userEvent.click(button);

    expect(container.querySelector('p')?.innerHTML).toContain('25');
  });
});
