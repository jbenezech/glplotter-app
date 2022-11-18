import {useDataService} from '@Hooks/useDataService';
import {DataFrame, GLPlotterInfo} from 'glplotter';
import {ReactElement, useContext, useEffect} from 'react';
import {
  ApplicationStateContext,
  INITIAL_DISPLAY_RATE,
} from '@Context/StateContext';
import {usePlotterService} from '@Hooks/usePlotterService';
import {ApplicationDispatchContext} from '@Context/DispatchContext';
import {useTheme} from '@mui/material';

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
  const theme = useTheme();

  const dataService = useDataService();

  useEffect(() => {
    plotterService.attach({
      referenceContainer: container,
      displayRate: INITIAL_DISPLAY_RATE,
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
          const channelColor = channel ? channel.color : theme.colors.signal;
          return {
            ...signal,
            color: signal.color ? signal.color : channelColor,
          };
        })
    );
  }, [signals, plotterService, tabs, channels, theme.colors.signal]);

  useEffect(() => {
    plotterService.plotter().displayRate(displayRate);
  }, [displayRate, plotterService]);

  useEffect(() => {
    plotterService.plotter().switchMode(isRecording ? 'ROTATE' : 'MANUAL');
  }, [isRecording, plotterService]);

  return null;
}
