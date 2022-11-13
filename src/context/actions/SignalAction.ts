import {ReducerAction} from '@Context/DispatchContext';

export const SignalMoveActionType = 'signal/move';
export interface SignalMovePayload {
  signalId: string;
  yPosition: number;
}
export type SignalMoveAction = ReducerAction<
  typeof SignalMoveActionType,
  SignalMovePayload
>;

export type SignalAction = SignalMoveAction;
