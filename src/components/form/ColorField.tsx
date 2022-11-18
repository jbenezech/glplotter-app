import {FieldHookConfig, useField, useFormikContext} from 'formik';
import {useState} from 'react';
import {ColorResult, PhotoshopPicker} from 'react-color';
import {Classes} from 'reactcss';
import {PhotoshopPickerStylesProps} from 'react-color/lib/components/photoshop/Photoshop';
import {createStyles, makeStyles} from '@mui/styles';
import {Text} from '@Components/typography/Text';
import {FormHelperText, Theme, useTheme} from '@mui/material';
import {Palette} from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outter: {
      height: '33px',
      width: '33px',
      marginRight: '20px',
      border: '1px solid black',
      borderColor: theme.colors.border,
      position: 'relative',
    },
    inner: {
      width: '30px!important',
      height: '30px!important',
      position: 'absolute',
      top: '0.5px',
      left: '0.5px',
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
  const theme = useTheme();
  const classes = useStyles(theme);

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
            <div className={`${classes.inner}`} onClick={handleDeleteColor} />
            <div
              className={'w-100 h-100'}
              style={{backgroundColor: field.value}}
            />
            <Text variant={'caption'} className={'w-100 text-center'}>
              {field.value}
            </Text>
          </div>
        )}
        <Palette onClick={(): void => setShowPicker(true)} />
      </div>
      {meta.touched && meta.error ? (
        <FormHelperText className={'text-center'} error={true}>
          {meta.error}
        </FormHelperText>
      ) : null}
    </>
  );
};
