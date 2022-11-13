import {ReducerAction} from '@Context/DispatchContext';

export const ChannelsSaveActionType = 'channels/save';
export interface ChannelsSavePayload {
  channels: string[];
}
export type ChannelsSaveAction = ReducerAction<
  typeof ChannelsSaveActionType,
  ChannelsSavePayload
>;

export type ChannelAction = ChannelsSaveAction;
