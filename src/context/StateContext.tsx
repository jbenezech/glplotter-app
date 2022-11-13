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
  channels: [],
  signals: [],
};

export const ApplicationStateContext = createContext<ApplicationStateType>(
  InitialApplicationState
);
