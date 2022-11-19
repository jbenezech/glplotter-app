import {ReactElement, useContext, useEffect} from 'react';
import {ApplicationStateContext} from '@Context/StateContext';
import {usePlotterService} from '@Hooks/usePlotterService';
import {useTheme} from '@mui/material';

export function GLPlotterStateComponent(): ReactElement | null {
  const plotterService = usePlotterService();
  const {displayRate, isRecording, signals, channels, tabs} = useContext(
    ApplicationStateContext
  );
  const theme = useTheme();

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
