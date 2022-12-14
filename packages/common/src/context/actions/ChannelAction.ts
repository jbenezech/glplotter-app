import {ReducerAction} from '@Context/ApplicationReducer';
import {Channel} from '@Context/StateContext';

export const ChannelsSaveActionType = 'channels/save';
export interface ChannelsSavePayload {
  channels: Channel[];
}
export type ChannelsSaveAction = ReducerAction<
  typeof ChannelsSaveActionType,
  ChannelsSavePayload
>;

export type ChannelAction = ChannelsSaveAction;
