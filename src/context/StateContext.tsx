import {SIGNAL_PIXEL_HEIGHT} from '@Utils/signalUtils';
import {createContext} from 'react';

export interface Signal {
  id: string;
  containerId: string;
  channelId: string;
  color: string;
  visible: boolean;
  amplitude: number;
  pitch: number;
  chartHeight: number;
  yPosition: number;
}

export interface Tab {
  id: string;
  visible: boolean;
}

export interface ApplicationStateType {
  displayRate: number;
  isRecording: boolean;
  tabs: Tab[];
  channels: string[];
  signals: Signal[];
}

export const InitialApplicationState: ApplicationStateType = {
  displayRate: 50,
  isRecording: true,
  tabs: [
    {
      id: 'c1',
      visible: true,
    },
  ],
  channels: ['ch1'],
  signals: [
    {
      id: 'c1-ch1',
      containerId: 'c1',
      channelId: 'ch1',
      color: '#fff',
      visible: true,
      amplitude: 8,
      pitch: 1,
      chartHeight: SIGNAL_PIXEL_HEIGHT,
      yPosition: 70,
    },
  ],
};

export const ApplicationStateContext = createContext<ApplicationStateType>(
  InitialApplicationState
);
