import {Delete} from '@mui/icons-material';
import {Autocomplete, TextField} from '@mui/material';
import {FormikErrors, FormikProps} from 'formik';
import {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {ChannelFormikValues, ChannelsFormikValues} from './ChannelSettings';
import {ColorField} from '@Components/form/ColorField';

const DATA_SOURCES = ['ch1', 'ch2', 'ch3'];

interface SingleChannelSettingsProps {
  formikProps: FormikProps<ChannelsFormikValues>;
  formIndex: number;
  handleDelete: () => void;
}

export function SingleChannelSettings({
  formikProps,
  formIndex,
  handleDelete,
}: SingleChannelSettingsProps): ReactElement {
  const {t} = useTranslation();
  const values = formikProps.values.channels[formIndex];
  const errors = (
    formikProps.errors.channels
      ? formikProps.errors.channels[formIndex] || {}
      : {}
  ) as FormikErrors<ChannelFormikValues>;
  const touched = formikProps.touched.channels
    ? formikProps.touched.channels[formIndex] || {}
    : {};

  return (
    <div className="d-flex w-100 align-items-start">
      <TextField
        className={'w-25'}
        label={t('Id')}
        helperText={touched.id && errors.id}
        error={touched.id && Boolean(errors.id)}
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        name={`channels.${formIndex}.id`}
        value={values.id}
        required={true}
      />
      <Autocomplete
        className={'w-50 ms-5'}
        disablePortal
        value={values.dataSource}
        options={DATA_SOURCES}
        onChange={(event, newValue): void => {
          formikProps.setFieldValue(
            `channels.${formIndex}.dataSource`,
            newValue
          );
        }}
        renderInput={(params): ReactElement => (
          <TextField
            {...params}
            helperText={touched.dataSource && errors.dataSource}
            error={touched.dataSource && Boolean(errors.dataSource)}
            required={true}
            label={t('Data source')}
            name={`channels.${formIndex}.dataSource`}
            value={values.dataSource}
          />
        )}
      />
      <div className={'w-25 align-self-center'}>
        <ColorField name={`channels.${formIndex}.color`} />
      </div>
      {
        <div
          className={
            'd-flex flex-grow-1 justify-content-end align-self-center ms-3'
          }
          role="button"
        >
          <Delete onClick={handleDelete} />
        </div>
      }
    </div>
  );
}
