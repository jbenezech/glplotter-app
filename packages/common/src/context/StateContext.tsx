import {Theme} from '@mui/material/styles';
import {SIGNAL_PIXEL_HEIGHT} from '@Utils/signalUtils';
import {GLPlotterInfo} from 'glplotter';
import {createContext} from 'react';
import {DEFAULT_STATE} from './config';

export interface Signal {
  id: string;
  containerId: string;
  channelId: string;
  color: string | null;
  visible: boolean;
  amplitude: number;
  pitch: number;
  chartHeight: number;
  yPosition: number;
  zoomRatio: number;
}

export interface Channel {
  id: string;
  dataSource: string;
  color: string;
}

export interface Tab {
  id: string;
  position: number;
  visible: boolean;
}

export interface ApplicationStateType {
  displayRate: number;
  isRecording: boolean;
  signalsContainerRect: DOMRect | null;
  tabs: Tab[];
  channels: Channel[];
  signals: Signal[];
  glInfo: GLPlotterInfo;
}

export const InitialApplicationState = (theme: Theme): ApplicationStateType => {
  const state = DEFAULT_STATE;
  const channels = state.channels.map((channel) => ({
    ...channel,
    color: theme.colors.signal,
  }));
  const signals = state.signals.map((signal) => ({
    ...signal,
    chartHeight: SIGNAL_PIXEL_HEIGHT,
  }));

  return {
    ...DEFAULT_STATE,
    channels,
    signals,
  };
};

export const ApplicationStateContext = createContext<ApplicationStateType>(
  {} as ApplicationStateType
);
