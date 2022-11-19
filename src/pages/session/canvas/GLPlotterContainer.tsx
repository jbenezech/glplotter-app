import {ReactElement, useCallback, useRef, useState} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {GLPlotterComponent} from './GLPlotterComponent';
import {MeasureDrawer} from './MeasureDrawer';
import {Timeline} from './Timeline';
import {GLPlotterStateComponent} from './GLPlotterStateComponent';

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      height: 'calc( 100vh - 60px - 60px)', //full window minus header and footer
      flex: 1,
      userSelect: 'none',
    },
  })
);

export function GLPlotterContainer(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const classes = useStyles();
  const [plotterReady, setPlotterReady] = useState(false);

  const handleContainerRef = useCallback((container: HTMLDivElement | null) => {
    containerRef.current = container;
    setContainerRect(container?.getBoundingClientRect() || null);
  }, []);

  return (
    <div
      ref={handleContainerRef}
      className={`${classes.canvas} position-relative`}
    >
      {containerRef.current && (
        <GLPlotterComponent
          container={containerRef.current}
          onReady={setPlotterReady}
        />
      )}
      {containerRect && plotterReady && (
        <>
          <GLPlotterStateComponent />
          <Timeline containerRect={containerRect}>
            <MeasureDrawer containerRect={containerRect} />
          </Timeline>
        </>
      )}
    </div>
  );
}
