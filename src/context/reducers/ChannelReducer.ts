import {
  ChannelAction,
  ChannelsSaveActionType,
} from '@Context/actions/ChannelAction';
import {ApplicationStateType, Signal, Tab} from '@Context/StateContext';
import {
  calculateNextSignalYPosition,
  SIGNAL_PIXEL_HEIGHT,
} from '@Utils/signalUtils';

const createSignalForTabAndChannel = (
  tab: Tab,
  channel: string,
  existingSignals: Signal[]
): Signal => {
  return {
    id: `${tab.id}-${channel}`,
    containerId: tab.id,
    channelId: channel,
    color: '#fff',
    visible: tab.visible,
    amplitude: 8,
    pitch: 1,
    chartHeight: SIGNAL_PIXEL_HEIGHT,
    yPosition: calculateNextSignalYPosition(existingSignals),
  };
};

export const channelReducer = (
  state: ApplicationStateType,
  action: ChannelAction
): ApplicationStateType => {
  switch (action.type) {
    case ChannelsSaveActionType: {
      const addedChannels = action.payload.channels.filter(
        (channel) => !state.channels.includes(channel)
      );
      const removedChannels = state.channels.filter(
        (channel) => !action.payload.channels.includes(channel)
      );

      //remove signals for which the channel has been removed
      const newSignals = state.signals.filter(
        (signal) => !removedChannels.includes(signal.channelId)
      );

      //add signals on each tab for the added channels
      addedChannels.forEach((channel) =>
        state.tabs.forEach((tab) => {
          const signal = createSignalForTabAndChannel(
            tab,
            channel,
            newSignals.filter((signal) => signal.containerId === tab.id)
          );
          newSignals.push(signal);
        })
      );

      return {
        ...state,
        channels: action.payload.channels,
        signals: newSignals,
      };
    }
    default:
      return state;
  }
};
