import {ApplicationStateContext} from '@Context/StateContext';
import {Movement, Position, useMouse} from '@Hooks/useMouse';
import {usePlotterService} from '@Hooks/usePlotterService';
import {createStyles, makeStyles} from '@mui/styles';
import {APP_THEME} from '@Theme';
import {GLPlotter, MeasureConfig} from 'glplotter';
import {ReactElement, useContext, useEffect, useState} from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      zIndex: '1',
    },
    focus: {
      cursor: 'grab',
    },
  })
);

interface MeasureDrawerProps {
  containerRect: DOMRect;
}

interface Measure {
  id: string;
  startY: number;
  width: number;
  startTimestamp: number;
  endTimestamp: number;
  tabId: string;
}

const findMeasureAtPosition = (
  measures: Measure[],
  pixelX: number,
  pixelY: number,
  plotter: GLPlotter
): Measure | undefined => {
  const queryTimestamp = plotter.timestamp(pixelX);

  return measures.find((measure) => {
    const timestampCenter =
      measure.startTimestamp +
      (measure.endTimestamp - measure.startTimestamp) / 2;
    const minTimestamp = timestampCenter - 100;
    const maxTimestamp = timestampCenter + 100;

    const minPixelY = measure.startY;
    const maxPixelY = measure.startY + 30;

    if (
      queryTimestamp >= minTimestamp &&
      queryTimestamp <= maxTimestamp &&
      pixelY >= minPixelY &&
      pixelY <= maxPixelY
    ) {
      return measure;
    }

    return undefined;
  });
};

const measureMapper = (measure: Measure): MeasureConfig => {
  return {
    id: measure.id,
    pixelTop: measure.startY,
    timestamp: measure.startTimestamp,
    pixelWidth: measure.width,
    color: APP_THEME.color.default.measure,
  };
};

export function MeasureDrawer({
  containerRect,
}: MeasureDrawerProps): ReactElement {
  const classes = useStyles();
  const {tabs} = useContext(ApplicationStateContext);
  const plotterService = usePlotterService();
  const [pendingMeasure, setPendingMeasure] = useState<Measure | undefined>();
  const [drawing, setDrawing] = useState(false);
  const [measures, setMeasures] = useState<Measure[]>([]);

  const setMeasureInFocus = ({positionX, positionY}: Position): void => {
    const measure = findMeasureAtPosition(
      measures,
      positionX,
      positionY,
      plotterService.plotter()
    );
    setPendingMeasure(measure);
  };

  const drawMeasure = ({positionX, positionY, movementX}: Movement): void => {
    if (!pendingMeasure) {
      const currentTab = tabs.find((tab) => !!tab.visible);
      if (currentTab === undefined) {
        return;
      }
      setPendingMeasure({
        id: `${positionX}-${positionY}`,
        startY: positionY,
        width: movementX,
        startTimestamp: plotterService.plotter().timestamp(positionX),
        endTimestamp: plotterService.plotter().timestamp(positionX),
        tabId: currentTab.id,
      });
      return;
    }

    setPendingMeasure({
      ...pendingMeasure,
      width: pendingMeasure.width + movementX,
      endTimestamp:
        pendingMeasure.endTimestamp +
        plotterService.plotter().pixelToTimestamp(movementX),
    });
  };

  const moveMeasure = ({movementX}: Movement): void => {
    if (!pendingMeasure) {
      return;
    }

    setPendingMeasure({
      ...pendingMeasure,
      startTimestamp:
        pendingMeasure.startTimestamp +
        plotterService.plotter().pixelToTimestamp(movementX),
      endTimestamp:
        pendingMeasure.endTimestamp +
        plotterService.plotter().pixelToTimestamp(movementX),
    });
  };

  const deleteMeasure = ({positionX, positionY}: Position): void => {
    const measure = findMeasureAtPosition(
      measures,
      positionX,
      positionY,
      plotterService.plotter()
    );
    if (measure === undefined) {
      return;
    }
    plotterService.plotter().removeMeasure(measure.id);
    setMeasures(
      measures.filter((otherMeasure) => otherMeasure.id !== measure.id)
    );
  };

  useEffect(() => {
    if (pendingMeasure === undefined) {
      return;
    }
    plotterService.plotter().removeMeasure(pendingMeasure.id);
    plotterService.plotter().addMeasure(measureMapper(pendingMeasure));
  }, [pendingMeasure, plotterService]);

  useEffect(() => {
    const currentTab = tabs.find((tab) => !!tab.visible);
    if (currentTab === undefined) {
      return;
    }
    plotterService
      .plotter()
      .replaceMeasures(
        measures
          .filter((measure) => measure.tabId === currentTab.id)
          .map(measureMapper)
      );
  }, [tabs, measures, plotterService]);

  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
    handleDoubleClick,
  } = useMouse({
    containerRect: containerRect,
    onMouseMove: (position) => {
      setMeasureInFocus(position);
    },
    onMouseDrag: (movement) => {
      if (movement.withControl) {
        setDrawing(true);
        drawMeasure(movement);
        return;
      }

      if (!pendingMeasure) {
        return;
      }

      moveMeasure(movement);

      return false;
    },
    onMouseUp: () => {
      setDrawing(false);
      if (pendingMeasure !== undefined) {
        setMeasures([
          ...measures.filter((measure) => measure.id !== pendingMeasure.id),
          pendingMeasure,
        ]);
      }
      setPendingMeasure(undefined);
    },
    onDoubleClick: (position) => {
      deleteMeasure(position);
    },
  });

  return (
    <div
      className={`${classes.drawer} ${
        pendingMeasure !== undefined && !drawing ? classes.focus : ''
      } position-absolute w-100 h-100 top-0 left-0`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
    />
  );
}
