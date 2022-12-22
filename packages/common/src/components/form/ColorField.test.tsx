import {render, screen, waitFor} from '@testing-library/react';
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  FormikContextType,
} from 'formik';
import {ColorField} from './ColorField';
import {LightTheme} from '../../themes';
import {ThemeProvider} from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const fieldMock: FieldInputProps<string | undefined> = {
  name: 'color',
  value: undefined,
  onChange: jest.fn(),
  onBlur: jest.fn(),
};
const metaMock: FieldMetaProps<string | undefined> = {
  touched: false,
  error: '',
  initialError: '',
  initialTouched: false,
  initialValue: '',
  value: '',
};
const helperMock: FieldHelperProps<string> = {
  setValue: jest.fn(),
  setError: jest.fn(),
  setTouched: jest.fn(),
};

const formikContextMock: Partial<FormikContextType<string>> = {
  setFieldTouched: jest.fn(),
  setFieldValue: jest.fn(),
  handleBlur: jest.fn(),
};

const originalModule = jest.requireActual<typeof import('formik')>('formik');

jest.mock('formik', () => ({
  originalModule,
  useField: jest.fn(() => {
    return [fieldMock, metaMock, helperMock];
  }),
  useFormikContext: jest.fn(() => {
    return formikContextMock;
  }),
}));

describe('ColorField', () => {
  it('renders without crashing', () => {
    const wrapper = jest.mocked(<ColorField name="color" />, {shallow: true});
    expect(wrapper).toMatchSnapshot();
  });

  it('renders passed value', () => {
    fieldMock.value = '#000';
    render(
      <ThemeProvider theme={LightTheme}>
        <ColorField name="color" />
      </ThemeProvider>
    );
    expect(screen.getByTestId('colorfield-bg').style.backgroundColor).toEqual(
      'rgb(0, 0, 0)'
    );
    expect(screen.getByTestId('colorfield-text').innerHTML).toEqual('#000');
  });

  it('allows picking value', async () => {
    fieldMock.value = '#000';
    render(
      <ThemeProvider theme={LightTheme}>
        <ColorField name="color" />
      </ThemeProvider>
    );

    userEvent.click(screen.getByTestId('colorfield-palette'));

    userEvent.clear(screen.getByLabelText('#'));

    userEvent.type(screen.getByLabelText('#'), '22194D');

    await waitFor(() => {
      expect(
        screen.getByTestId('colorfield').getAttribute('data-color')
      ).toEqual('#22194d');
    });

    userEvent.click(screen.getByText('OK'));

    await waitFor(() => {
      expect(formikContextMock.setFieldTouched).toHaveBeenCalledWith(
        'color',
        true,
        true
      );
      expect(formikContextMock.setFieldValue).toHaveBeenCalledWith(
        'color',
        '#22194d',
        true
      );
      expect(formikContextMock.handleBlur).toHaveBeenCalledWith('color');
    });
  });

  it('allows allows deleting a color', async () => {
    fieldMock.value = '#000';
    render(
      <ThemeProvider theme={LightTheme}>
        <ColorField name="color" />
      </ThemeProvider>
    );

    userEvent.click(screen.getByTestId('colorfield-delete'));

    await waitFor(() => {
      expect(formikContextMock.setFieldTouched).toHaveBeenCalledWith(
        'color',
        true,
        true
      );
      expect(formikContextMock.setFieldValue).toHaveBeenCalledWith(
        'color',
        '',
        true
      );
      expect(formikContextMock.handleBlur).toHaveBeenCalledWith('color');
    });
  });

  it('shows error when set', async () => {
    metaMock.touched = true;
    metaMock.error = 'error';
    render(
      <ThemeProvider theme={LightTheme}>
        <ColorField name="color" />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('colorfield-error')).toBeDefined();
    });
  });

  it('closes picker on cancel', () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <ColorField name="color" />
      </ThemeProvider>
    );

    userEvent.click(screen.getByTestId('colorfield-palette'));

    const cancelButton = screen.getByText('Cancel');

    userEvent.click(cancelButton);

    expect(cancelButton).not.toBeInTheDocument();
  });
});
