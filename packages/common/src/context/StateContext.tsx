import {Theme} from '@mui/material/styles';
import {SIGNAL_PIXEL_HEIGHT} from '@Utils/signalUtils';
import {GLPlotterInfo} from 'glplotter';
import {createContext} from 'react';

export const INITIAL_DISPLAY_RATE = 50;

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
  return {
    displayRate: INITIAL_DISPLAY_RATE,
    isRecording: true,
    signalsContainerRect: null,
    tabs: [
      {
        id: 'c1',
        position: 1,
        visible: true,
      },
    ],
    channels: [
      {
        id: 'ch1',
        dataSource: 'ch1',
        color: theme.colors.signal,
      },
    ],
    signals: [
      {
        id: 'c1-ch1',
        containerId: 'c1',
        channelId: 'ch1',
        color: null,
        visible: true,
        amplitude: 8,
        pitch: 1,
        chartHeight: SIGNAL_PIXEL_HEIGHT,
        yPosition: 70,
        zoomRatio: 1,
      },
    ],
    glInfo: {
      pointsPerWindow: 0,
      gpuOverflow: false,
    },
  };
};

export const ApplicationStateContext = createContext<ApplicationStateType>(
  {} as ApplicationStateType
);
