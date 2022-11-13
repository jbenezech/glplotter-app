import {Text} from '@Components/typography/Text';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext} from '@Context/StateContext';
import {AddCircle, RemoveCircle} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {createStyles, makeStyles} from '@mui/styles';
import {ReactElement, useContext} from 'react';

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
        <AddCircle />
      </IconButton>
      <IconButton
        color="primary"
        component="label"
        onClick={decreaseDisplayRate}
      >
        <RemoveCircle />
      </IconButton>
      <Text className={classes.text}>{`${displayRate} mm/s`}</Text>
    </div>
  );
}
