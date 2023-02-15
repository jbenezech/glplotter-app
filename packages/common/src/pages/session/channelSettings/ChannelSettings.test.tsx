import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {ChannelSettings} from './ChannelSettings';
import {registerValidators} from '@Validation/Validators';
import {ReactElement} from 'react';
import userEvent from '@testing-library/user-event';
import {screen, waitFor} from '@testing-library/react';
import assert from 'assert';
import {vi, describe, it, expect} from 'vitest';

registerValidators();

const onComplete = vi.fn();

vi.mock('./SingleChannelSettings', () => ({
  SingleChannelSettings: ({
    formIndex,
    handleDelete,
  }: {
    formIndex: number;
    handleDelete: () => void;
  }): ReactElement => {
    return (
      <div
        data-testid="channel-setting"
        data-index={formIndex}
        onClick={handleDelete}
      />
    );
  },
}));

describe('ChannelSettings', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <ChannelSettings onComplete={onComplete} />
    );
    expect(container).toMatchSnapshot();
  });

  it('displays current channel setting component', () => {
    const {container} = renderWithTestProviders(
      <ChannelSettings onComplete={onComplete} />
    );
    expect(
      container.querySelectorAll('[data-testid="channel-setting"]').length
    ).toEqual(1);
  });

  it('allows adding channel setting component', async () => {
    const {container} = renderWithTestProviders(
      <ChannelSettings onComplete={onComplete} />
    );
    await userEvent.click(screen.getByTestId('AddCircleIcon'));
    await waitFor(() =>
      expect(
        container.querySelectorAll('[data-testid="channel-setting"]').length
      ).toEqual(2)
    );
  });

  it('allows deleting channel setting component', async () => {
    const {container} = renderWithTestProviders(
      <ChannelSettings onComplete={onComplete} />
    );

    await userEvent.click(screen.getByTestId('AddCircleIcon'));

    const component = container.querySelector('[data-index="1"]');

    assert(component !== null);

    await userEvent.click(component);

    await waitFor(() =>
      expect(
        container.querySelectorAll('[data-testid="channel-setting"]').length
      ).toEqual(1)
    );
  });

  it('saves settings on submit', async () => {
    renderWithTestProviders(<ChannelSettings onComplete={onComplete} />);
    await userEvent.click(screen.getByTestId('SaveIcon'));
    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });
});
