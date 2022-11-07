import {useDataService} from '@Hooks/useDataService';
import {useGlPlotter} from '@Hooks/useGlPlotter';
import {DataFrame} from 'glplotter';
import {createRef, ReactElement, useEffect} from 'react';
import {makeStyles, createStyles} from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      height: 'calc( 100vh - 60px - 60px)', //full window minus header and footer
      flex: 1,
    },
  })
);

export function CanvasContainer(): ReactElement {
  const containerRef = createRef<HTMLDivElement>();
  const {plotter, detach, attach} = useGlPlotter();
  const classes = useStyles();

  const onData = (data: DataFrame): void => {
    plotter().bufferData({
      channelId: 'ch1',
      points: data.points,
    });
  };

  const dataService = useDataService({onData});

  useEffect(() => {
    if (containerRef.current !== null) {
      const plotter = attach(containerRef.current);

      /*eslint-disable-next-line*/
      plotter.addSignal({
        id: 'sig1',
        containerId: 'c1',
        channelId: 'ch1',
        color: [255, 255, 255, 1],
        visible: true,
        amplitude: 8,
        pitch: 1,
        chartHeight: 70,
        yPosition: 95,
      });

      void dataService.listen();
    }
  }, [containerRef, dataService, attach, detach]);

  useEffect(
    () => () => {
      try {
        dataService.stop();
        detach();
      } catch (err) {
        console.error(err);
      }
    },
    [dataService, detach]
  );

  return (
    <div
      ref={containerRef}
      className={`${classes.canvas} position-relative bg-dark`}
    />
  );
}
