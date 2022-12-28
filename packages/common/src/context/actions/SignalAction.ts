import {ReducerAction} from '@Context/ApplicationReducer';

export const SignalMoveActionType = 'signal/move';
export interface SignalMovePayload {
  signalId: string;
  yPosition: number;
}
export type SignalMoveAction = ReducerAction<
  typeof SignalMoveActionType,
  SignalMovePayload
>;

export const SignalResizeActionType = 'signal/resize-container';
export interface SignalResizePayload {
  containerRect: DOMRect;
}
export type SignalResizeAction = ReducerAction<
  typeof SignalResizeActionType,
  SignalResizePayload
>;

export type SignalAction = SignalMoveAction | SignalResizeAction;
