import {ReactElement, useCallback, useRef, useState} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {GLPlotterComponent} from './GLPlotterComponent';
import {MeasureDrawer} from './MeasureDrawer';
import {Timeline} from './Timeline';

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
        <GLPlotterComponent container={containerRef.current} />
      )}
      {containerRect && (
        <Timeline containerRect={containerRect}>
          <MeasureDrawer containerRect={containerRect} />
        </Timeline>
      )}
    </div>
  );
}
