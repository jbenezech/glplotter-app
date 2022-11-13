import {Close, Delete} from '@mui/icons-material';
import {TextField} from '@mui/material';
import {FormikErrors, FormikProps} from 'formik';
import {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {ChannelFormikValues, ChannelsFormikValues} from './ChannelSettings';

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
    <div className="d-flex w-100 align-items-center">
      <TextField
        className={'flex-grow-1'}
        label={t('Id')}
        helperText={touched.id && errors.id}
        error={touched.id && Boolean(errors.id)}
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        name={`channels.${formIndex}.id`}
        value={values.id}
        required={true}
      />
      {
        <div className={'d-flex justify-content-end ms-3'} role="button">
          <Delete onClick={handleDelete} />
        </div>
      }
    </div>
  );
}
