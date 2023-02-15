export const INITIAL_DISPLAY_RATE = 50;

export const DEFAULT_STATE = {
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
      color: '#fff',
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
      chartHeight: 70,
      yPosition: 70,
      zoomRatio: 1,
    },
  ],
  glInfo: {
    pointsPerWindow: 0,
    gpuOverflow: false,
  },
};
