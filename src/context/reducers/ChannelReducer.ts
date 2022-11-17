import {
  ChannelAction,
  ChannelsSaveActionType,
} from '@Context/actions/ChannelAction';
import {ApplicationStateType} from '@Context/StateContext';
import {
  calculateNextSignalYPosition,
  createSignalForTabAndChannel,
} from '@Utils/signalUtils';

export const channelReducer = (
  state: ApplicationStateType,
  action: ChannelAction
): ApplicationStateType => {
  switch (action.type) {
    case ChannelsSaveActionType: {
      const stateChannelIds = state.channels.map((channel) => channel.id);
      const payloadChannelIds = action.payload.channels.map(
        (channel) => channel.id
      );

      const addedChannels = action.payload.channels.filter(
        (channel) => !stateChannelIds.includes(channel.id)
      );
      const removedChannelIds = stateChannelIds.filter(
        (channel) => !payloadChannelIds.includes(channel)
      );

      //remove signals for which the channel has been removed
      const newSignals = state.signals.filter(
        (signal) => !removedChannelIds.includes(signal.channelId)
      );

      //add signals on each tab for the added channels
      addedChannels.forEach((channel) =>
        state.tabs.forEach((tab) => {
          const signal = createSignalForTabAndChannel(tab, channel);
          signal.yPosition = calculateNextSignalYPosition(
            state.signalsContainerRect,
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
