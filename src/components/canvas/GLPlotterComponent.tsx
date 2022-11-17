import {useDataService} from '@Hooks/useDataService';
import {DataFrame, GLPlotterInfo} from 'glplotter';
import {ReactElement, useContext, useEffect} from 'react';
import {
  ApplicationStateContext,
  InitialApplicationState,
} from '@Context/StateContext';
import {usePlotterService} from '@Hooks/usePlotterService';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {APP_THEME} from '@Theme';

interface GLPlotterComponentProps {
  container: HTMLElement;
}

export function GLPlotterComponent({
  container,
}: GLPlotterComponentProps): ReactElement | null {
  const plotterService = usePlotterService();
  const {displayRate, isRecording, signals, channels, tabs} = useContext(
    ApplicationStateContext
  );
  const {dispatch} = useContext(ApplicationDispatchContext);

  const dataService = useDataService();

  useEffect(() => {
    plotterService.attach({
      referenceContainer: container,
      displayRate: InitialApplicationState.displayRate,
      stateObserver: (state: GLPlotterInfo) =>
        dispatch({type: 'gl/info', payload: {info: state}}),
    });
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
  }, [container, dataService, dispatch, plotterService]);

  useEffect(() => {
    const activeTab = tabs.find((tab) => !!tab.visible);
    if (!activeTab) {
      return;
    }

    plotterService.plotter().replaceSignals(
      signals
        .filter((signal) => signal.containerId === activeTab.id)
        .map((signal) => {
          const channel = channels.find(
            (channel) => channel.id === signal.channelId
          );
          const channelColor = channel
            ? channel.color
            : APP_THEME.color.default.signal;
          return {
            ...signal,
            color: signal.color ? signal.color : channelColor,
          };
        })
    );
  }, [signals, plotterService, tabs, channels]);

  useEffect(() => {
    plotterService.plotter().displayRate(displayRate);
  }, [displayRate, plotterService]);

  useEffect(() => {
    plotterService.plotter().switchMode(isRecording ? 'ROTATE' : 'MANUAL');
  }, [isRecording, plotterService]);

  return null;
}
