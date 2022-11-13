import {ReactElement, useCallback, useContext, useRef, useState} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {useMouseMove} from '@Hooks/useMouseMove';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext} from '@Context/StateContext';
import {GLPlotterComponent} from './GLPlotterComponent';
import {usePlotterService} from '@Hooks/usePlotterService';

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      height: 'calc( 100vh - 60px - 60px)', //full window minus header and footer
      flex: 1,
    },
  })
);

export function GLPlotterContainer(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const classes = useStyles();
  const {isRecording} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);
  const plotterService = usePlotterService();

  const {handleMouseDown, handleMouseUp, handleMouseMove} = useMouseMove({
    containerRect: containerRect,
    onMouseDown: () =>
      isRecording && dispatch({type: 'drawingMode/toggle', payload: {}}),
    onMouseMove: ({movementX}) => plotterService.plotter().move(movementX),
  });

  const handleContainerRef = useCallback((container: HTMLDivElement | null) => {
    containerRef.current = container;
    setContainerRect(container?.getBoundingClientRect() || null);
  }, []);

  return (
    <div
      ref={handleContainerRef}
      className={`${classes.canvas} position-relative bg-dark`}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {containerRef.current && (
        <GLPlotterComponent container={containerRef.current} />
      )}
    </div>
  );
}
