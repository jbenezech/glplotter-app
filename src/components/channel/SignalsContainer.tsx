import {ReactElement, useCallback, useContext, useState} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {APP_THEME} from '@Theme';
import {ApplicationStateContext, Signal} from '@Context/StateContext';
import {SignalComponent} from './SignalComponent';
import {useMouseMove} from '@Hooks/useMouseMove';
import {SIGNAL_PIXEL_HEIGHT} from '@Utils/signalUtils';
import {ApplicationDispatchContext} from '@Context/DispatchContext';

const useStyles = makeStyles(() =>
  createStyles({
    signals: {
      height: '100%',
      width: '100px',
      borderRight: `1px solid ${APP_THEME.color.default.separator}`,
    },
  })
);

const findSignalAtPosition = (
  signals: Signal[],
  positionY: number
): Signal | undefined => {
  return signals.find(
    (signal) =>
      signal.yPosition - SIGNAL_PIXEL_HEIGHT / 2 < positionY &&
      signal.yPosition + SIGNAL_PIXEL_HEIGHT / 2 > positionY
  );
};

export function SignalsContainer(): ReactElement {
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const classes = useStyles();
  const {tabs, signals} = useContext(ApplicationStateContext);
  const {dispatch} = useContext(ApplicationDispatchContext);
  const activeTab = tabs.find((tab) => tab.visible);
  const [movingSignal, setMovingSignal] = useState<Signal | undefined>();

  const {handleMouseDown, handleMouseUp, handleMouseMove} = useMouseMove({
    containerRect: containerRect,
    onMouseDown: ({positionY}) => {
      const signal = findSignalAtPosition(signals, positionY);
      if (signal !== undefined) {
        setMovingSignal(signal);
      }
    },
    onMouseMove: ({positionY}) => {
      if (!movingSignal) {
        return;
      }
      dispatch({
        type: 'signal/move',
        payload: {
          signalId: movingSignal.id,
          yPosition: positionY,
        },
      });
    },
    onMouseUp: () => setMovingSignal(undefined),
  });

  const handleContainerRef = useCallback((container: HTMLDivElement | null) => {
    setContainerRect(container?.getBoundingClientRect() || null);
  }, []);

  return (
    <div
      className={`${classes.signals} bg-dark`}
      ref={handleContainerRef}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {signals
        .filter((signal) => signal.containerId === activeTab?.id)
        .filter((signal) => signal.visible)
        .map((signal) => (
          <SignalComponent
            key={signal.id}
            signal={signal}
            highlight={movingSignal?.id === signal.id}
          />
        ))}
    </div>
  );
}
