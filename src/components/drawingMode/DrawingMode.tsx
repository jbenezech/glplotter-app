import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext} from '@Context/StateContext';
import {PauseCircle, PlayCircle} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import {ReactElement, useContext} from 'react';

export function DrawingMode(): ReactElement {
  const {isRecording} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);

  const toggleDrawingMode = (): void => {
    dispatch({type: 'drawingMode/toggle', payload: {}});
  };

  return (
    <div className="d-flex align-items-center">
      <IconButton color="primary" component="label" onClick={toggleDrawingMode}>
        {isRecording ? <PauseCircle /> : <PlayCircle />}
      </IconButton>
    </div>
  );
}
