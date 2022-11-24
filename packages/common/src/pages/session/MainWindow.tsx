import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {ApplicationStateContext, Signal} from '@Context/StateContext';
import {useMouse} from '@Hooks/useMouse';
import {Theme, useTheme} from '@mui/material';
import {createStyles, makeStyles} from '@mui/styles';
import {findSignalAtPosition, SIGNAL_PIXEL_HEIGHT} from '@Utils/signalUtils';
import {ReactElement, useCallback, useContext, useState} from 'react';
import {GLPlotterContainer} from './canvas/GLPlotterContainer';
import {SignalsContainer} from './channel/SignalsContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: theme.colors.canvas,
    },
    highlight: {
      position: 'absolute',
      width: '100vw',
      height: `${SIGNAL_PIXEL_HEIGHT}px`,
      backgroundColor: theme.colors.signalSelection,
      pointerEvents: 'none',
    },
  })
);

export function MainWindow(): ReactElement {
  const {tabs, signals} = useContext(ApplicationStateContext);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [selectedSignal, setSelectedSignal] = useState<Signal | undefined>();
  const {dispatch} = useContext(ApplicationDispatchContext);
  const theme = useTheme();
  const classes = useStyles(theme);

  const {handleMouseMove, handleMouseLeave, handleMouseWheel} = useMouse({
    containerRect,
    onMouseMove: ({positionY}) => {
      setSelectedSignal(findSignalAtPosition(tabs, signals, positionY));
    },
    onMouseWheel: ({movementY}) => {
      if (selectedSignal === undefined) {
        return;
      }
      dispatch({
        type: movementY > 0 ? 'zoom/increase' : 'zoom/decrease',
        payload: {
          signalId: selectedSignal.id,
        },
      });
    },
  });

  const handleContainerRef = useCallback((container: HTMLDivElement | null) => {
    setContainerRect(container?.getBoundingClientRect() || null);
  }, []);

  const selectionInlineStyle = {
    top: (selectedSignal?.yPosition || 0) - SIGNAL_PIXEL_HEIGHT / 2,
    left: 0,
  };

  return (
    <div
      ref={handleContainerRef}
      className={`${classes.main} container-fluid gx-0 d-flex position-relative`}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onWheel={handleMouseWheel}
    >
      <SignalsContainer />
      <GLPlotterContainer />
      {selectedSignal && (
        <div className={classes.highlight} style={selectionInlineStyle} />
      )}
    </div>
  );
}
