import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {ApplicationStateContext, Signal} from '@Context/StateContext';
import {SignalComponent} from './SignalComponent';
import {useMouse} from '@Hooks/useMouse';
import {findSignalAtPosition} from '@Utils/signalUtils';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {Theme, useTheme} from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    signals: {
      height: '100%',
      width: '100px',
      borderRight: `1px solid ${theme.colors.separator}`,
      userSelect: 'none',
    },
  })
);

export function SignalsContainer(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const classes = useStyles(theme);
  const {tabs, signals, signalsContainerRect} = useContext(
    ApplicationStateContext
  );
  const {dispatch} = useContext(ApplicationDispatchContext);
  const activeTab = tabs.find((tab) => tab.visible);
  const [movingSignal, setMovingSignal] = useState<Signal | undefined>();

  const {handleMouseDown, handleMouseUp, handleMouseMove, handleMouseLeave} =
    useMouse({
      containerRect: signalsContainerRect,
      onMouseDown: ({positionY}) => {
        const signal = findSignalAtPosition(tabs, signals, positionY);
        if (signal !== undefined) {
          setMovingSignal(signal);
        }
      },
      onMouseDrag: ({positionY}) => {
        if (!movingSignal) {
          return;
        }
        dispatch({
          type: 'signal/move',
          payload: {
            signalId: movingSignal.id,
            yPosition: Math.min(
              signalsContainerRect?.height || 0,
              Math.max(positionY, 0)
            ),
          },
        });
      },
      onMouseUp: () => setMovingSignal(undefined),
    });

  const setContainerRect = useCallback((): void => {
    if (containerRef.current !== null) {
      dispatch({
        type: 'signal/resize-container',
        payload: {
          containerRect: containerRef.current.getBoundingClientRect(),
        },
      });
    }
  }, [dispatch]);

  const handleContainerRef = useCallback(
    (container: HTMLDivElement | null) => {
      containerRef.current = container;
      setContainerRect();
    },
    [setContainerRect]
  );

  const handleResize = useCallback(
    () => setContainerRect(),
    [setContainerRect]
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div
      className={`${classes.signals} position-relative`}
      ref={handleContainerRef}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="signalscontainer"
    >
      {signals
        .filter((signal) => signal.containerId === activeTab?.id)
        .filter((signal) => signal.visible)
        .map((signal) => (
          <SignalComponent key={signal.id} signal={signal} />
        ))}
    </div>
  );
}
