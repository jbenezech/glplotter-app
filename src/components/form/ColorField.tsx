import {FieldHookConfig, useField, useFormikContext} from 'formik';
import {useState} from 'react';
import {ColorResult, PhotoshopPicker} from 'react-color';
import {Classes} from 'reactcss';
import {PhotoshopPickerStylesProps} from 'react-color/lib/components/photoshop/Photoshop';
import {createStyles, makeStyles} from '@mui/styles';
import {APP_THEME} from '@Theme';
import {Text} from '@Components/typography/Text';
import {FormHelperText} from '@mui/material';
import {Palette} from '@mui/icons-material';

const useStyles = makeStyles(() =>
  createStyles({
    outter: {
      height: '30px',
      width: '30px',
      marginRight: '20px',
      border: '1px solid black',
      borderColor: APP_THEME.color.default.border,
    },
    inner: {
      width: '30px!important',
      height: '30px!important',
      marginTop: '-1px',
    },
  })
);

const pickerStyle: Partial<Classes<PhotoshopPickerStylesProps>> = {
  default: {
    picker: {
      position: 'absolute',
      zIndex: 1,
    },
  },
};

export const ColorField = ({
  ...props
}: FieldHookConfig<string | undefined>): JSX.Element => {
  const [field, meta] = useField(props);
  const {setFieldTouched, setFieldValue, handleBlur} = useFormikContext();
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState<string | undefined>();
  const classes = useStyles();

  const handleNewColor = (color: ColorResult): void => {
    setColor(color.hex);
  };

  const saveNewColor = (): void => {
    if (!color) {
      return;
    }

    setFieldTouched(field.name, true, true);
    setFieldValue(field.name, color, true);
    handleBlur(field.name);
    setShowPicker(false);
  };

  const handleDeleteColor = (): void => {
    setFieldTouched(field.name, true, true);
    setFieldValue(field.name, '', true);
    handleBlur(field.name);
  };

  return (
    <>
      {showPicker && (
        <PhotoshopPicker
          onAccept={saveNewColor}
          onCancel={(): void => setShowPicker(false)}
          onChangeComplete={handleNewColor}
          color={color}
          styles={pickerStyle}
        />
      )}
      <div className={'d-flex w-100 flex-wrap justify-content-center'}>
        {field.value && (
          <div key={field.value} className={`${classes.outter} me-3`}>
            <div
              className={`${classes.inner}`}
              style={{backgroundColor: field.value}}
              onClick={handleDeleteColor}
            />
            <Text variant={'caption'} className={'w-100 text-center'}>
              {field.value}
            </Text>
          </div>
        )}
        <Palette
          className={`${classes.inner} mt-2`}
          onClick={(): void => setShowPicker(true)}
        />
      </div>
      {meta.touched && meta.error ? (
        <FormHelperText className={'text-center'} error={true}>
          {meta.error}
        </FormHelperText>
      ) : null}
    </>
  );
};
