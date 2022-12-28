import {Text} from '@Components/typography/Text';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext, Channel} from '@Context/StateContext';
import {AddCircle, Save} from '@mui/icons-material';
import {Button, Divider, IconButton} from '@mui/material';
import {Form, Formik, FormikProps, FormikValues} from 'formik';
import {ReactElement, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {SingleChannelSettings} from './SingleChannelSettings';
import {validationChannels} from './validation';

export interface ChannelsFormikValues extends FormikValues {
  channels: ChannelFormikValues[];
}

export interface ChannelFormikValues extends FormikValues {
  key: string;
  id: string;
  dataSource: string;
  color: string;
}

const defaultEmptyChannel: ChannelFormikValues = {
  key: 'new',
  id: '',
  name: '',
  dataSource: '',
  color: '#fff',
};

const channelToForm = (channel: Channel): ChannelFormikValues => {
  return {
    key: channel.id,
    id: channel.id,
    dataSource: channel.dataSource,
    color: channel.color,
  };
};

const formToChannel = (channel: ChannelFormikValues): Channel => {
  return {
    id: channel.id,
    dataSource: channel.dataSource,
    color: channel.color,
  };
};

const buildChannelsInitialValues = (
  channels: Channel[]
): ChannelsFormikValues => {
  return {
    channels: channels.map(channelToForm),
  };
};

interface ChannelSettingsProps {
  onComplete: () => void;
}

export function ChannelSettings({
  onComplete,
}: ChannelSettingsProps): ReactElement {
  const {channels} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);
  const {t} = useTranslation();
  const initialValues = buildChannelsInitialValues(channels);

  const onSubmit = (values: ChannelsFormikValues): void => {
    dispatch({
      type: 'channels/save',
      payload: {
        channels: values.channels.map(formToChannel),
      },
    });
    onComplete();
  };

  const handleAdd = (form: FormikProps<ChannelsFormikValues>): void => {
    const channels = [
      ...form.values.channels,
      {
        ...defaultEmptyChannel,
        key: `${defaultEmptyChannel.key}-${form.values.channels.length + 1}`,
      },
    ];
    void form.setValues({
      channels: channels,
    });
  };

  const handleDelete = (
    form: FormikProps<ChannelsFormikValues>,
    id: string
  ): void => {
    void form.setValues({
      channels: form.values.channels.filter((channel) => channel.id !== id),
    });
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={
        validationChannels() as yup.SchemaOf<{
          channels: {id: string}[];
        }>
      }
    >
      {(formikProps: FormikProps<ChannelsFormikValues>): JSX.Element => (
        <Form className={'w-75 m-auto'}>
          <Text variant={'h1'}>{t('channel-settings.title')}</Text>
          <div className="mt-5">
            {formikProps.values.channels.map((channel, index) => {
              return (
                <div key={channel.key}>
                  <SingleChannelSettings
                    formikProps={formikProps}
                    formIndex={index}
                    handleDelete={(): void =>
                      handleDelete(formikProps, channel.id)
                    }
                  />
                  {index < formikProps.values.channels.length - 1 && (
                    <Divider className={'mb-5 mt-2'} />
                  )}
                </div>
              );
            })}
          </div>
          <IconButton
            className={'w-100 mt-2 mb-3'}
            onClick={(): void => handleAdd(formikProps)}
          >
            <AddCircle fontSize="large" />
          </IconButton>

          <div className="mt-2 px-5 d-flex">
            <Button
              className={'ms-auto'}
              type={'submit'}
              startIcon={<Save />}
              size={'large'}
              variant={'outlined'}
              disableElevation={true}
            >
              {t('save')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
