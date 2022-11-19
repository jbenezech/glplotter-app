import {useDataService} from '@Hooks/useDataService';
import {DataFrame, GLPlotterInfo} from 'glplotter';
import {ReactElement, useCallback, useContext, useEffect} from 'react';
import {INITIAL_DISPLAY_RATE} from '@Context/StateContext';
import {usePlotterService} from '@Hooks/usePlotterService';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {useLocation} from 'react-router-dom';

interface LocationState {
  sessionId?: string;
}

interface GLPlotterComponentProps {
  container: HTMLElement;
  onReady: (ready: boolean) => void;
}

export function GLPlotterComponent({
  container,
  onReady,
}: GLPlotterComponentProps): ReactElement | null {
  const plotterService = usePlotterService();
  const {dispatch} = useContext(ApplicationDispatchContext);

  const dataService = useDataService();

  const locationState = useLocation().state as LocationState | null;

  const startPlotter = useCallback(async (): Promise<void> => {
    onReady(false);
    dataService.stop();
    await plotterService.attach({
      referenceContainer: container,
      displayRate: INITIAL_DISPLAY_RATE,
      stateObserver: (state: GLPlotterInfo) =>
        dispatch({type: 'gl/info', payload: {info: state}}),
    });
    void dataService.listen(locationState?.sessionId, (data: DataFrame) =>
      plotterService.plotter().bufferData(data)
    );

    onReady(true);
  }, [
    container,
    dataService,
    dispatch,
    locationState?.sessionId,
    onReady,
    plotterService,
  ]);

  useEffect(() => {
    const initPlotter = async (): Promise<void> => {
      await startPlotter();
    };

    initPlotter().catch((err) => console.error(err));

    return () => onReady(false);
  }, [onReady, startPlotter]);

  return null;
}
