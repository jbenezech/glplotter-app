import {Text} from '@Components/typography/Text';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext} from '@Context/StateContext';
import {AddCircle, Save} from '@mui/icons-material';
import {Button, Divider, IconButton} from '@mui/material';
import {FormikValues, useFormik} from 'formik';
import {ReactElement, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {SingleChannelSettings} from './SingleChannelSetting';
import {validationChannels} from './validation';

export interface ChannelsFormikValues extends FormikValues {
  channels: ChannelFormikValues[];
}

export interface ChannelFormikValues extends FormikValues {
  key: string;
  id: string;
}

const defaultEmptyChannel: ChannelFormikValues = {
  key: 'new',
  id: '',
};

const buildChannelsInitialValues = (
  channels: string[]
): ChannelsFormikValues => {
  return {
    channels: channels.map((channel) => ({
      key: channel,
      id: channel,
    })),
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

  const channelsForm = useFormik<ChannelsFormikValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationChannels() as yup.SchemaOf<{
      channels: {id: string}[];
    }>,
    onSubmit: (values): void => {
      dispatch({
        type: 'channels/save',
        payload: {
          channels: values.channels.map((value) => value.id),
        },
      });
      onComplete();
    },
  });

  const handleAdd = (): void => {
    const channels = [
      ...channelsForm.values.channels,
      {
        ...defaultEmptyChannel,
        key: `${defaultEmptyChannel.key}-${
          channelsForm.values.channels.length + 1
        }`,
      },
    ];
    void channelsForm.setValues({
      channels: channels,
    });
  };

  const handleDelete = (id: string): void => {
    void channelsForm.setValues({
      channels: channelsForm.values.channels.filter(
        (channel) => channel.id !== id
      ),
    });
  };

  return (
    <div className="w-75 m-auto">
      <Text variant={'h1'}>{t('Channels')}</Text>
      <div className="mt-5">
        {channelsForm.values.channels.map((channel, index) => {
          return (
            <div key={channel.key}>
              <SingleChannelSettings
                formikProps={channelsForm}
                formIndex={index}
                handleDelete={(): void => handleDelete(channel.id)}
              />
              {index < channelsForm.values.channels.length - 1 && (
                <Divider className={'mb-5 mt-2'} />
              )}
            </div>
          );
        })}
      </div>
      <IconButton className={'w-100 mt-2 mb-3'} onClick={handleAdd}>
        <AddCircle fontSize="large" />
      </IconButton>

      <div className="mt-2 px-5 d-flex">
        <Button
          className={'ms-auto'}
          startIcon={<Save />}
          size={'large'}
          variant={'outlined'}
          disableElevation={true}
          onClick={(): void => void channelsForm.submitForm()}
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
}
