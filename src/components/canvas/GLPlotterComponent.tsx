import {useDataService} from '@Hooks/useDataService';
import {DataFrame} from 'glplotter';
import {ReactElement, useContext, useEffect} from 'react';
import {ApplicationStateContext} from '@Context/StateContext';
import {usePlotterService} from '@Hooks/usePlotterService';

interface GLPlotterComponentProps {
  container: HTMLElement;
}

export function GLPlotterComponent({
  container,
}: GLPlotterComponentProps): ReactElement | null {
  const plotterService = usePlotterService();
  const {displayRate, isRecording, signals} = useContext(
    ApplicationStateContext
  );

  const dataService = useDataService();

  useEffect(() => {
    plotterService.attach(container);
    void dataService.listen((data: DataFrame) =>
      plotterService.plotter().bufferData(data)
    );
    return () => {
      try {
        dataService.stop();
        plotterService.detach();
      } catch (err) {
        console.error(err);
      }
    };
  }, [container, dataService, plotterService]);

  useEffect(() => {
    plotterService.plotter().replaceSignals(signals);
  }, [signals, plotterService]);

  useEffect(() => {
    plotterService.plotter().displayRate(displayRate);
  }, [displayRate, plotterService]);

  useEffect(() => {
    plotterService.plotter().switchMode(isRecording ? 'ROTATE' : 'MANUAL');
  }, [isRecording, plotterService]);

  return null;
}
