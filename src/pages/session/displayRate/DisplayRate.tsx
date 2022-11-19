import {Text} from '@Components/typography/Text';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext} from '@Context/StateContext';
import {AddCircle, RemoveCircle} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {createStyles, makeStyles} from '@mui/styles';
import {ReactElement, useContext} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      width: '100px',
    },
  })
);

export function DisplayRate(): ReactElement {
  const {displayRate} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);
  const classes = useStyles();
  const {t} = useTranslation();

  const increaseDisplayRate = (): void => {
    dispatch({type: 'displayRate/increase', payload: {}});
  };

  const decreaseDisplayRate = (): void => {
    dispatch({type: 'displayRate/decrease', payload: {}});
  };

  return (
    <div className="d-flex align-items-center">
      <IconButton
        color="primary"
        component="label"
        onClick={increaseDisplayRate}
      >
        <AddCircle fontSize="large" />
      </IconButton>
      <IconButton
        color="primary"
        component="label"
        onClick={decreaseDisplayRate}
      >
        <RemoveCircle fontSize="large" />
      </IconButton>
      <Text className={classes.text}>
        {t('display-rate-value', {value: displayRate})}
      </Text>
    </div>
  );
}
