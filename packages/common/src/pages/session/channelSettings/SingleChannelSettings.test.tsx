import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import '@testing-library/jest-dom';
import {ChannelsFormikValues} from './ChannelSettings';
import {registerValidators} from '@Validation/Validators';
import {ReactElement} from 'react';
import userEvent from '@testing-library/user-event';
import {act, fireEvent, screen, waitFor} from '@testing-library/react';
import {FormikProps, Formik, Form} from 'formik';
import assert from 'assert';
import {SingleChannelSettings} from './SingleChannelSettings';
import {validationChannels} from './validation';
import * as yup from 'yup';

registerValidators();

const handleDelete = jest.fn();
const onSubmit = jest.fn();

const values = {
  channels: [
    {
      key: 'ch1',
      id: 'ch1',
      dataSource: 'ch1',
      color: '#000',
    },
    {
      key: 'ch2',
      id: 'ch2',
      dataSource: 'ch1',
      color: '#000',
    },
  ],
};

const renderInForm = (): ReactElement => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={values}
      enableReinitialize={true}
      validationSchema={
        validationChannels() as yup.SchemaOf<{
          channels: {id: string}[];
        }>
      }
    >
      {(formikProps: FormikProps<ChannelsFormikValues>): JSX.Element => (
        <Form>
          {formikProps.values.channels.map((channel, index) => (
            <div
              key={channel.key}
              data-testid={`channelsettings-${channel.key}`}
            >
              <SingleChannelSettings
                formikProps={formikProps}
                formIndex={index}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </Form>
      )}
    </Formik>
  );
};

describe('SingleChannelSettings', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(renderInForm());
    expect(container).toMatchSnapshot();
  });

  it('calls delete on button click', () => {
    const {container} = renderWithTestProviders(renderInForm());

    const button = container.querySelector(
      '[data-testid="channelsettings-ch1"] [data-testid="DeleteIcon"]'
    );

    assert(button !== null);

    userEvent.click(button);
    expect(handleDelete).toHaveBeenCalled();
  });

  it('displays current channel values', () => {
    const {container} = renderWithTestProviders(renderInForm());
    expect(container.querySelector('input[value="ch1"]')).toBeInTheDocument();
  });

  it('allows changing the name', async () => {
    const {container} = renderWithTestProviders(renderInForm());

    const input = container.querySelector('input[value="ch1"]');
    const form = container.querySelector('form');

    assert(input !== null);
    assert(form !== null);

    userEvent.clear(input);
    userEvent.type(input, 'Other channel');

    await act(() => form.submit());

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('does not allow duplicate name', async () => {
    const {container} = renderWithTestProviders(renderInForm());

    const input = container.querySelector('input[value="ch1"]');
    const form = container.querySelector('form');

    assert(input !== null);
    assert(form !== null);

    userEvent.clear(input);
    userEvent.type(input, 'ch2');

    await act(() => form.submit());

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled());

    await waitFor(() =>
      expect(container.querySelector('.Mui-error')).toBeDefined()
    );
  });

  it('allows changing the datasource', async () => {
    const {container} = renderWithTestProviders(renderInForm());

    const input = container.querySelector(
      'input[name="channels.0.dataSource"]'
    );
    const form = container.querySelector('form');

    assert(input !== null);
    assert(form !== null);

    userEvent.clear(input);
    userEvent.type(input, 'ch2');

    const autocomplete = input.parentElement;
    assert(autocomplete !== null);

    fireEvent.keyDown(autocomplete, {key: 'ArrowDown'});
    fireEvent.keyDown(autocomplete, {key: 'Enter'});

    await act(() => form.submit());

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('allows changing channel color', async () => {
    const {container} = renderWithTestProviders(renderInForm());

    const input = container.querySelector('input[value="ch1"]');
    const form = container.querySelector('form');

    assert(input !== null);
    assert(form !== null);

    const colorFieldButton = container.querySelector(
      '[data-testid="channelsettings-ch1"] [data-testid="colorfield-palette"]'
    );
    const colorField = container.querySelector(
      '[data-testid="channelsettings-ch1"] [data-testid="colorfield"]'
    );

    assert(colorFieldButton !== null);
    assert(colorField !== null);

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

    await act(() => form.submit());

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });
});
