import {ReducerAction} from '@Context/DispatchContext';

export const DrawingModeToggleActionType = 'drawingMode/toggle';
export type DrawingModeTogglePayload = Record<string, never>;
export type DrawingModeToggleAction = ReducerAction<
  typeof DrawingModeToggleActionType,
  DrawingModeTogglePayload
>;

export type DrawingModeAction = DrawingModeToggleAction;
