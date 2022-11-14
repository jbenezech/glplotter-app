import {ReducerAction} from '@Context/DispatchContext';

export const ZoomIncreaseActionType = 'zoom/increase';
export interface ZoomIncreasePayload {
  signalId: string;
}
export type ZoomIncreaseAction = ReducerAction<
  typeof ZoomIncreaseActionType,
  ZoomIncreasePayload
>;

export const ZoomDecreaseActionType = 'zoom/decrease';
export interface ZoomDecreasePayload {
  signalId: string;
}
export type ZoomDecreaseAction = ReducerAction<
  typeof ZoomDecreaseActionType,
  ZoomDecreasePayload
>;

export type ZoomAction = ZoomIncreaseAction | ZoomDecreaseAction;
