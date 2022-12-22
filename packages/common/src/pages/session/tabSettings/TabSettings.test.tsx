import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import '@testing-library/jest-dom';
import {TabSettings} from './TabSettings';
import assert from 'assert';
import {LightTheme} from 'src/themes';
import {registerValidators} from '@Validation/Validators';

registerValidators();

const originalContext = jest.requireActual<
  typeof import('@Context/StateContext')
>('@Context/StateContext');

const originalState = originalContext.InitialApplicationState(LightTheme);

const mockState = {
  ...originalState,
  tabs: [
    ...originalState.tabs,
    {
      ...originalState.tabs[0],
      id: 'Tab2',
    },
  ],
  channels: [
    ...originalState.channels,
    {
      ...originalState.channels[0],
      id: 'ch2',
    },
  ],
  signals: [
    ...originalState.signals,
    {
      ...originalState.signals[0],
      id: 'c1-ch2',
      channelId: 'ch2',
      visible: false,
    },
  ],
};

jest.mock('@Context/StateContext', () => ({
  ...jest.requireActual<typeof import('@Context/StateContext')>(
    '@Context/StateContext'
  ),
  InitialApplicationState: (): Record<string, unknown> => mockState,
}));

const currentTab = mockState.tabs[0];
const onComplete = jest.fn();

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

    userEvent.clear(input);
    userEvent.type(input, 'Other tab');
    userEvent.click(submit);

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

    userEvent.clear(input);
    userEvent.type(input, 'Tab2');
    userEvent.click(submit);

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

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    userEvent.click(submit);

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

    userEvent.click(colorFieldButton);

    userEvent.clear(screen.getByLabelText('#'));

    userEvent.type(screen.getByLabelText('#'), 'B92B2B');

    await waitFor(() => {
      expect(colorField.getAttribute('data-color')).toEqual('#b92b2b');
    });

    userEvent.click(screen.getByText('OK'));

    await waitFor(() => {
      expect(screen.getByText('#b92b2b')).toBeInTheDocument();
    });

    userEvent.click(submit);

    await waitFor(() => expect(onComplete).toHaveBeenCalled());
  });
});
