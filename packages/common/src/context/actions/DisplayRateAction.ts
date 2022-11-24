import {ReducerAction} from '@Context/DispatchContext';

export const DisplayRateIncreaseActionType = 'displayRate/increase';
export type DisplayRateIncreasePayload = Record<string, never>;
export type DisplayRateIncreaseAction = ReducerAction<
  typeof DisplayRateIncreaseActionType,
  DisplayRateIncreasePayload
>;

export const DisplayRateDecreaseActionType = 'displayRate/decrease';
export type DisplayRateDecreasePayload = Record<string, never>;
export type DisplayRateDecreaseAction = ReducerAction<
  typeof DisplayRateDecreaseActionType,
  DisplayRateDecreasePayload
>;

export type DisplayRateAction =
  | DisplayRateIncreaseAction
  | DisplayRateDecreaseAction;
