import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext, Signal, Tab} from '@Context/StateContext';
import {FormikValues, useFormik} from 'formik';
import {ReactElement, useContext} from 'react';
import {validationTab} from './validation';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {Button, Checkbox, TextField} from '@mui/material';
import {Save} from '@mui/icons-material';
import {Text} from '@Components/typography/Text';

export interface TabFormikValues extends FormikValues {
  id: string;
  signals: Signal[];
  tabs: Tab[];
}

interface TabSettingProps {
  currentTab: Tab;
  onComplete: () => void;
}

export function TabSetting({
  currentTab,
  onComplete,
}: TabSettingProps): ReactElement | null {
  const {tabs, signals} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);
  const {t} = useTranslation();

  const initialValues = {
    id: currentTab.id,
    signals: signals
      .filter((signal) => signal.containerId === currentTab.id)
      .sort((sig1, sig2) => sig1.id.localeCompare(sig2.id)),
    tabs: tabs,
  };

  const tabForm = useFormik<TabFormikValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationTab() as yup.SchemaOf<{
      id: string;
      tabs: {id: string}[];
    }>,
    onSubmit: (values): void => {
      dispatch({
        type: 'tab/save',
        payload: {
          tabs: [
            ...tabs.filter((tab) => tab.id !== currentTab.id),
            {
              ...currentTab,
              id: values.id,
            },
          ],
          signals: [
            ...signals.filter((signal) => signal.containerId !== currentTab.id),
            ...values.signals.map((signal) => ({
              ...signal,
              containerId: values.id,
              id: `${values.id}-${signal.channelId}`,
            })),
          ],
        },
      });
      onComplete();
    },
  });

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    signal: Signal,
    index: number
  ): void => {
    void tabForm.setFieldValue(`signals[${index}]`, {
      ...signal,
      visible: event.target.checked,
    });
  };

  return (
    <div className="w-75 m-auto">
      <Text variant="h1">{t('Tab')}</Text>
      <div className="d-flex my-5 w-100">
        <TextField
          className={'flex-grow-1'}
          label={t('Id')}
          helperText={tabForm.touched.id && tabForm.errors.id}
          error={tabForm.touched.id && Boolean(tabForm.errors.id)}
          onChange={tabForm.handleChange}
          onBlur={tabForm.handleBlur}
          name={'id'}
          value={tabForm.values.id}
          required={true}
        />
      </div>
      <Text variant="h2">{t('Signals')}</Text>
      <div className={'mt-4'}>
        {tabForm.values.signals.map((signal, index) => {
          return (
            <div key={signal.id} className={'d-flex'}>
              <div className={'w-75'}>{signal.id}</div>
              <Checkbox
                checked={!!signal.visible}
                onChange={(event): void =>
                  handleCheckboxChange(event, signal, index)
                }
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 px-5 d-flex">
        <Button
          className={'ms-auto'}
          startIcon={<Save />}
          size={'large'}
          variant={'outlined'}
          disableElevation={true}
          onClick={(): void => void tabForm.submitForm()}
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
}
