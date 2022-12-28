import {ReactElement, ReactNode, useContext} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {useMouse} from '@Hooks/useMouse';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext} from '@Context/StateContext';
import {usePlotterService} from '@Hooks/usePlotterService';

const useStyles = makeStyles(() =>
  createStyles({
    timeline: {
      zIndex: '1',
    },
  })
);

interface TimelineProps {
  containerRect: DOMRect;
  children: ReactNode;
}

export function Timeline({
  containerRect,
  children,
}: TimelineProps): ReactElement {
  const classes = useStyles();
  const {isRecording} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);
  const plotterService = usePlotterService();

  const {handleMouseDown, handleMouseUp, handleMouseMove, handleMouseLeave} =
    useMouse({
      containerRect: containerRect,
      onMouseDrag: ({movementX, withControl}) => {
        if (withControl) {
          return;
        }
        isRecording && dispatch({type: 'drawingMode/toggle', payload: {}});
        plotterService.plotter().move(movementX);
      },
    });

  return (
    <div
      className={`${classes.timeline} position-absolute w-100 h-100 top-0 left-0`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="timeline"
    >
      {children}
    </div>
  );
}
