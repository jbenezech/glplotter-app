import i18n from '@I18n';
import * as yup from 'yup';

export const validationChannels = (): yup.SchemaOf<{
  channels: {id: string}[];
}> => {
  return yup.object().shape({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    channels: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(() => i18n.t('form.required')),
        })
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      .unique(i18n.t('channelUnique'), 'id'),
  });
};
