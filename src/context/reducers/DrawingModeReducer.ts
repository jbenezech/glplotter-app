import {
  DrawingModeAction,
  DrawingModeToggleActionType,
} from '@Context/actions/DrawingModeAction';
import {ApplicationStateType} from '@Context/StateContext';

export const drawingModeReducer = (
  state: ApplicationStateType,
  action: DrawingModeAction
): ApplicationStateType => {
  switch (action.type) {
    case DrawingModeToggleActionType: {
      const newState = {...state, isRecording: !state.isRecording};
      return newState;
    }
    default:
      return state;
  }
};
