import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {TabSettings} from './TabSettings';
import assert from 'assert';
import {registerValidators} from '@Validation/Validators';
import {vi, describe, it, expect} from 'vitest';
import {ApplicationStateType} from '@Context/StateContext';
import {DEFAULT_STATE} from '@Context/config';

registerValidators();

const mockState: ApplicationStateType = {
  ...DEFAULT_STATE,
  tabs: [
    ...DEFAULT_STATE.tabs,
    {
      ...DEFAULT_STATE.tabs[0],
      id: 'Tab2',
    },
  ],
  channels: [
    ...DEFAULT_STATE.channels,
    {
      ...DEFAULT_STATE.channels[0],
      id: 'ch2',
    },
  ],
  signals: [
    ...DEFAULT_STATE.signals,
    {
      ...DEFAULT_STATE.signals[0],
      id: 'c1-ch2',
      channelId: 'ch2',
      visible: false,
    },
  ],
};

vi.mock('@Context/StateContext', async () => {
  const originalContext = await vi.importActual<
    typeof import('@Context/StateContext')
  >('@Context/StateContext');
  return {
    ...originalContext,
    InitialApplicationState: (): ApplicationStateType => mockState,
  };
});

const currentTab = mockState.tabs[0];
const onComplete = vi.fn();

describe('TabSettings', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(
      <TabSettings currentTab={currentTab} onComplete={onComplete} />
    );
    expect(container).toMatchSnapshot();
  });

  it('displays current tab values', () => {
    const {container} = renderWithTestProviders(
      <TabSettings currentTab={currentTab} onComplete={onComplete} />
    );
    expect(container.querySelector('input[value="c1"]')).toBeInTheDocument();
    expect(
      screen
        .getByTestId('tabsettings-checkbox-c1-ch1')
        .querySelector('input[type="checkbox"]')
    ).toBeChecked();
  });

  it('allows changing the name', async () => {
    const {container} = renderWithTestProviders(
      <TabSettings currentTab={currentTab} onComplete={onComplete} />
    );

    const input = container.querySelector('input[value="c1"]');
    const submit = container.querySelector('button[type="submit"]');

    assert(input !== null);
    assert(submit !== null);

    await userEvent.clear(input);
    await userEvent.type(input, 'Other tab');

    await userEvent.click(submit);

    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });

  it('does not allow duplicate name', async () => {
    const {container} = renderWithTestProviders(
      <TabSettings currentTab={currentTab} onComplete={onComplete} />
    );

    const input = container.querySelector('input[value="c1"]');
    const submit = container.querySelector('button[type="submit"]');

    assert(input !== null);
    assert(submit !== null);

    await userEvent.clear(input);
    await userEvent.type(input, 'Tab2');

    await userEvent.click(submit);

    await waitFor(() =>
      expect(container.querySelector('.Mui-error')).toBeDefined()
    );
  });

  it('allows changing signal visibility', async () => {
    const {container} = renderWithTestProviders(
      <TabSettings currentTab={currentTab} onComplete={onComplete} />
    );

    const checkbox = screen
      .getByTestId('tabsettings-checkbox-c1-ch2')
      .querySelector('input[type="checkbox"]');
    const submit = container.querySelector('button[type="submit"]');

    assert(checkbox !== null);
    assert(submit !== null);

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    await userEvent.click(submit);

    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });

  it('allows changing signal color', async () => {
    const {container} = renderWithTestProviders(
      <TabSettings currentTab={currentTab} onComplete={onComplete} />
    );

    const colorFieldButton = container.querySelector(
      '[data-testid="tabsettings-c1-ch1"] [data-testid="colorfield-palette"]'
    );
    const colorField = container.querySelector(
      '[data-testid="tabsettings-c1-ch1"] [data-testid="colorfield"]'
    );
    const submit = container.querySelector('button[type="submit"]');

    assert(colorFieldButton !== null);
    assert(colorField !== null);
    assert(submit !== null);

    await userEvent.click(colorFieldButton);

    await userEvent.clear(screen.getByLabelText('#'));

    await userEvent.type(screen.getByLabelText('#'), 'B92B2B');

    await waitFor(() => {
      expect(colorField.getAttribute('data-color')).toEqual('#b92b2b');
    });

    await userEvent.click(screen.getByText('OK'));

    await waitFor(() => {
      expect(screen.getByText('#b92b2b')).toBeInTheDocument();
    });

    await userEvent.click(submit);

    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });
});
